# MoTekLab MD Converter Pro

**Official hub and workflow guide for [MoTekLab MD Converter Pro](https://md.moteklab.com)** — a 100% client-side, zero-telemetry bidirectional converter for **Markdown**, **Rich Text**, **RTF 1.5 (Word & Scrivener)**, **HTML**, and **PDF**, featuring embedded PNG/JPEG pictures, native **Arabic RTL (`\rtlpar\qr`)**, live **Mermaid SVG diagrams**, **KaTeX math**, and **Burner Mode** panic purge.

- **Launch Live Web App:** [md.moteklab.com](https://md.moteklab.com)
- **Complete Technical Architecture Guide:** [MD Converter Privacy, RTF & Arabic RTL Guide](https://www.moteklab.com/blog/md-converter-rtf-images-arabic-rtl-privacy-guide)
- **Distribution & Ecosystem Hub:** [motaz-hefny/Distrib_Repo](https://github.com/motaz-hefny/Distrib_Repo)

---

## Direct Browser Workflows (Zero Server Uploads)

| Workflow | Use Case | Direct Tool Link |
|---|---|---|
| **ChatGPT to Word / Google Docs** | Clean raw AI Markdown, math, and tables without gray theme backgrounds | [md.moteklab.com/chatgpt-to-word](https://md.moteklab.com/chatgpt-to-word/) |
| **Claude & Gemini to Word / Docs** | Export Claude Artifacts and Gemini reports to clean RTF or Rich Text | [md.moteklab.com/claude-gemini-to-word](https://md.moteklab.com/claude-gemini-to-word/) |
| **Arabic RTL Markdown to RTF** | Word-ready Arabic `.rtf` with native `\rtlpar\qr` and mixed LTR isolation | [md.moteklab.com/arabic-markdown-to-rtf](https://md.moteklab.com/arabic-markdown-to-rtf/) |
| **Image & Rich Text to RTF** | Embed PNG and JPEG binary images directly via `\shppict\pngblip` | [md.moteklab.com/image-to-rtf](https://md.moteklab.com/image-to-rtf/) |
| **Mermaid Diagram to SVG & PDF** | Offline Mermaid flowcharts and sequence diagrams compiled to HTML/PDF | [md.moteklab.com/mermaid-to-svg-pdf](https://md.moteklab.com/mermaid-to-svg-pdf/) |
| **Markdown to Email HTML** | Inline CSS styling built for Gmail, Outlook, and Apple Mail | [md.moteklab.com/markdown-to-email](https://md.moteklab.com/markdown-to-email/) |
| **Markdown to Slack / Jira / CSV** | Instant Slack `mrkdwn`, Jira Wiki markup, and Excel/CSV pipe tables | [md.moteklab.com/markdown-to-slack-jira](https://md.moteklab.com/markdown-to-slack-jira/) |

---

## Privacy & Architecture Highlights

- **100% Client-Side Execution:** Every RTF binary picture export, DOMPurify HTML sanitization pass, KaTeX equation, and Mermaid diagram renders locally in your browser with offline PWA support.
- **Zero Cloud Storage:** Documents stay strictly in local memory (`Burner Mode` skips even `localStorage` and offers a 1-click Panic Purge).
- **Source Code Model:** Core application source code is maintained privately by [MoTekLab](https://www.moteklab.com); this public repository hosts ecosystem documentation and links to compiled MoTekLab tools.
