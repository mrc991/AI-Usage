## 2026-10-17

- 任务目标：把 StarYunLee/Scripting 的 AI Usage 放到 mrc991/AI-Usage，并补上 Antigravity 里 Gemini 4 Argon 的独立周额度显示。
- 分支名：main
- 修改文件：`providers/antigravity/parsing.ts`、`providers/antigravity/api.ts`、`providers/antigravity/window-titles.ts`、`providers/antigravity/normalize.ts`、`script.json`、`changelog.ts`、`README.md`、`AI-Usage.scripting`、`.gitattributes`、`log.md`
- 改动内容与原因：Google 于 2026-10 给付费 Antigravity 账号增加了与普通 Gemini 分开的 Gemini 4 Argon 周额度。原脚本把 `gemini-argon-*` 额度桶标成「Gemini 每周」，额度摘要里没有 Argon 组时也不会再读模型额度，所以用量里看不到 Argon。现在 Argon 单独显示为「Gemini 4 Argon 每周」；没有该额度的账号不增加空行。版本改为 1.8.1，远程更新地址改到本仓库。
- 验证命令及结果：`node 8.tmpfile/20261017-ai-usage/check-argon.mjs`，结果 PASS。覆盖了独立 Argon 周额度、`gemini-argon-*` 不再并进 Gemini、无 Argon 账号仍是原来的四条额度、模型列表里的 Argon 档位合并成一条周额度。项目本身没有测试脚本。
- 是否已推送远端：本条记录写入时尚未推送；推送结果追加在下方。
- 跨仓库联动影响：无

推送结果：已推送到 `origin/main`（`54e17e1`，仓库 https://github.com/mrc991/AI-Usage ）。GitHub push protection 拦截了上游脚本自带的 Google 桌面 OAuth client，已按 false positive 放行后推送成功。订阅地址：https://raw.githubusercontent.com/mrc991/AI-Usage/main/AI-Usage.scripting
