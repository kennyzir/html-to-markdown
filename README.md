# "HTML to Markdown"

> Convert HTML pages to clean Markdown for LLM consumption. Use when building RAG pipelines, preparing web content for AI context windows, or extracting readable content from HTML. Strips scripts, styles, nav, ads. Preserves headings, links, lists, code blocks, and tables.

[![License: MIT-0](https://img.shields.io/badge/License-MIT--0-blue.svg)](LICENSE)
[![Claw0x](https://img.shields.io/badge/Powered%20by-Claw0x-orange)](https://claw0x.com)
[![OpenClaw Compatible](https://img.shields.io/badge/OpenClaw-Compatible-green)](https://openclaw.org)

## What is This?

This is a native skill for **OpenClaw** and other AI agents. Skills are modular capabilities that agents can install and use instantly - no complex API setup, no managing multiple provider keys.

Built for OpenClaw, compatible with Claude, GPT-4, and other agent frameworks.

## Installation

### For OpenClaw Users

Simply tell your agent:

```
Install the ""HTML to Markdown"" skill from Claw0x
```

Or use this connection prompt:

```
Add skill: html-to-markdown
Platform: Claw0x
Get your API key at: https://claw0x.com
```

### For Other Agents (Claude, GPT-4, etc.)

1. Get your free API key at [claw0x.com](https://claw0x.com) (no credit card required)
2. Add to your agent's configuration:
   - Skill name: `html-to-markdown`
   - Endpoint: `https://claw0x.com/v1/call`
   - Auth: Bearer token with your Claw0x API key

### Via CLI

```bash
npx @claw0x/cli add html-to-markdown
```

---


# HTML to Markdown

Convert any HTML content or URL into clean, LLM-ready Markdown. Strips noise (scripts, styles, nav, ads), preserves structure (headings, links, lists, code blocks, tables).

## How It Works

1. Accept raw HTML string or fetch from URL (10s timeout, follows redirects)
2. Strip non-content elements: `<script>`, `<style>`, `<nav>`, `<footer>`, `<aside>`
3. Convert semantic HTML to Markdown: headings, bold, italic, links, images, code, lists, tables, blockquotes
4. Decode HTML entities, normalize whitespace
5. Return clean Markdown with metadata

## Use Cases

- RAG pipeline preprocessing (web → Markdown → embeddings)
- LLM context window preparation
- Content extraction from web pages
- Documentation conversion
- Web scraping post-processing

## Prerequisites

1. **Sign up at [claw0x.com](https://claw0x.com)**
2. **Create API key** in Dashboard
3. **Set environment variable**: `export CLAW0X_API_KEY="ck_live_..."`

## Pricing

**FREE.** No charge per call.

- Requires Claw0x API key for authentication
- No usage charges (price_per_call = 0)
- Unlimited calls

## Example

**Input**:
```json
{
  "url": "https://example.com/article"
}
```

**Output**:
```json
{
  "markdown": "# Article Title\n\nFirst paragraph...\n\n## Section\n\n- Item 1\n- Item 2",
  "char_count": 1234,
  "line_count": 45,
  "source": "https://example.com/article"
}
```

## Error Codes

| Code | Meaning |
|------|---------|
| 400 | Missing html/url, or URL fetch failed |
| 401 | Missing or invalid API key |
| 500 | Conversion failed (not billed) |

## About Claw0x

[Claw0x](https://claw0x.com) is the native skills layer for AI agents.

**GitHub**: [github.com/kennyzir/html-to-markdown](https://github.com/kennyzir/html-to-markdown)


---

## About Claw0x

Claw0x is the native skills layer for AI agents - not just another API marketplace.

**Why Claw0x?**
- **One key, all skills** - Single API key for 50+ production-ready skills
- **Pay only for success** - Failed calls (4xx/5xx) are never charged
- **Built for OpenClaw** - Native integration with the OpenClaw agent framework
- **Zero config** - No upstream API keys to manage, we handle all third-party auth

**For Developers:**
- [Browse all skills](https://claw0x.com/skills)
- [Sell your own skills](https://claw0x.com/docs/sell)
- [API Documentation](https://claw0x.com/docs/api-reference)
- [OpenClaw Integration Guide](https://claw0x.com/docs/openclaw)

## Links

- [Claw0x Platform](https://claw0x.com)
- [OpenClaw Framework](https://openclaw.org)
- [Skill Documentation](https://claw0x.com/skills/html-to-markdown)
