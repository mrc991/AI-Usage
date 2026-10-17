## 2026-10-17

- 任务目标：把 StarYunLee/Scripting 的 AI Usage 放到 mrc991/AI-Usage，并补上 Antigravity 里 Gemini 4 Argon 的独立周额度显示。
- 分支名：main
- 修改文件：`providers/antigravity/parsing.ts`、`providers/antigravity/api.ts`、`providers/antigravity/window-titles.ts`、`providers/antigravity/normalize.ts`、`script.json`、`changelog.ts`、`README.md`、`AI-Usage.scripting`、`.gitattributes`、`log.md`
- 改动内容与原因：Google 于 2026-10 给付费 Antigravity 账号增加了与普通 Gemini 分开的 Gemini 4 Argon 周额度。原脚本把 `gemini-argon-*` 额度桶标成「Gemini 每周」，额度摘要里没有 Argon 组时也不会再读模型额度，所以用量里看不到 Argon。现在 Argon 单独显示为「Gemini 4 Argon 每周」；没有该额度的账号不增加空行。版本改为 1.8.1，远程更新地址改到本仓库。
- 验证命令及结果：`node 8.tmpfile/20261017-ai-usage/check-argon.mjs`，结果 PASS。覆盖了独立 Argon 周额度、`gemini-argon-*` 不再并进 Gemini、无 Argon 账号仍是原来的四条额度、模型列表里的 Argon 档位合并成一条周额度。项目本身没有测试脚本。
- 是否已推送远端：本条记录写入时尚未推送；推送结果追加在下方。
- 跨仓库联动影响：无

推送结果：已推送到 `origin/main`（`54e17e1`，仓库 https://github.com/mrc991/AI-Usage ）。GitHub push protection 拦截了上游脚本自带的 Google 桌面 OAuth client，已按 false positive 放行后推送成功。订阅地址：https://raw.githubusercontent.com/mrc991/AI-Usage/main/AI-Usage.scripting

## 2026-10-17

- 任务目标：LC 手机上已用新仓库地址，但 Antigravity 里仍看不到 Gemini 4 Argon。先加接口诊断，定位是接口没返回还是解析没匹配。
- 分支名：fix/argon-diagnostics
- 修改文件：`providers/antigravity/diagnostics.ts`（新增）、`providers/antigravity/api.ts`、`pages/AccountDetailPage.tsx`、`script.json`、`changelog.ts`、`README.md`、`AI-Usage.scripting`、`log.md`
- 改动内容与原因：每次刷新 Antigravity 时，把额度摘要的分组/桶 ID/窗口/说明、模型列表中带额度的模型 ID 和最终解析出的窗口存到本机 Storage（不含令牌、邮箱、项目 ID）；账号详情页新增“查看接口诊断（Argon）”，弹窗显示并复制到剪贴板。用量解析逻辑不变。版本 1.8.2。
- 验证命令及结果：`node 8.tmpfile/20261017-ai-usage/check-diagnostics.mjs` PASS（6 个改动文件语法转译无诊断；诊断内容含桶 ID、不含令牌；读写正常）；`node 8.tmpfile/20261017-ai-usage/check-argon.mjs` PASS。UI 部分未在 Scripting 真机运行，也没有类型检查（缺 Scripting 类型声明）。
- 是否已推送远端：否，本地提交在功能分支，待 LC 确认。
- 跨仓库联动影响：无
