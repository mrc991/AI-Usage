import { asObject, type JsonObject } from "./parsing";

const DIAG_KEY = "ai_usage_antigravity_diag_v1";
const MAX_LINES = 80;

export type AntigravityDiagnostics = {
  fetchedAt: string;
  lines: string[];
};

function diagKey(profileId: string): string {
  return `${DIAG_KEY}_${profileId}`;
}

function str(value: unknown): string {
  return typeof value === "string" ? value : value == null ? "-" : String(value);
}

function pick(object: JsonObject | null, keys: string[]): unknown {
  for (const key of keys) {
    if (object && key in object) return object[key];
  }
  return undefined;
}

/** 只记录额度分组/桶/模型 ID 等结构信息，不记录令牌、邮箱或项目 ID。 */
export function describeQuotaSummary(payload: JsonObject): string[] {
  const lines = [`[额度摘要] 顶层字段: ${Object.keys(payload).join(", ") || "无"}`];
  const groups = pick(payload, ["groups", "quotaGroups", "quota_groups"]);
  if (!Array.isArray(groups)) {
    lines.push("[额度摘要] 没有 groups 数组");
    return lines;
  }
  groups.forEach((groupValue, groupIndex) => {
    const group = asObject(groupValue);
    const name = str(pick(group, ["displayName", "display_name"]));
    const buckets = pick(group, ["buckets", "quotaBuckets", "quota_buckets"]);
    const list = Array.isArray(buckets) ? buckets : [];
    lines.push(`[分组${groupIndex}] ${name}（${list.length} 个桶）`);
    list.forEach((bucketValue) => {
      const bucket = asObject(bucketValue);
      if (!bucket) return;
      lines.push(
        `  桶 ${str(pick(bucket, ["bucketId", "bucket_id", "id"]))} | 窗口 ${str(bucket.window)} | 说明 ${str(bucket.description)} | 剩余 ${str(pick(bucket, ["remainingFraction", "remaining_fraction", "remaining"]))}`,
      );
    });
  });
  return lines;
}

export function describeAvailableModels(payload: JsonObject): string[] {
  const models = asObject(payload.models) || payload;
  const ids = Object.keys(models);
  const withQuota: string[] = [];
  const argon: string[] = [];
  for (const id of ids) {
    const model = asObject(models[id]);
    const hasQuota = Boolean(pick(model, ["quotaInfo", "quota_info"]));
    if (hasQuota) withQuota.push(id);
    if (id.toLowerCase().includes("argon")) argon.push(`${id}${hasQuota ? "(有额度)" : "(无额度)"}`);
  }
  return [
    `[模型列表] 共 ${ids.length} 个，带额度 ${withQuota.length} 个`,
    `[模型列表] Argon 相关: ${argon.length ? argon.join(", ") : "无"}`,
    `[模型列表] 带额度的模型: ${withQuota.join(", ") || "无"}`,
  ];
}

export function saveDiagnostics(profileId: string, lines: string[]): void {
  try {
    Storage.set(diagKey(profileId), {
      fetchedAt: new Date().toISOString(),
      lines: lines.slice(0, MAX_LINES),
    } satisfies AntigravityDiagnostics);
  } catch {
    /* 诊断信息写入失败不影响用量 */
  }
}

export function readDiagnostics(profileId: string): AntigravityDiagnostics | null {
  try {
    const value = Storage.get<AntigravityDiagnostics>(diagKey(profileId));
    return value && Array.isArray(value.lines) ? value : null;
  } catch {
    return null;
  }
}
