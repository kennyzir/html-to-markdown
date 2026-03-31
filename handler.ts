// ClawHub Local Skill - runs entirely in your agent, no API key required
// HTML to Markdown - Convert HTML to clean Markdown for LLM consumption

function htmlToMarkdown(html: string): string {
  let md = html;
  md = md.replace(/<script[\s\S]*?<\/script>/gi, '');
  md = md.replace(/<style[\s\S]*?<\/style>/gi, '');
  md = md.replace(/<nav[\s\S]*?<\/nav>/gi, '');
  md = md.replace(/<footer[\s\S]*?<\/footer>/gi, '');
  md = md.replace(/<aside[\s\S]*?<\/aside>/gi, '');
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n# $1\n');
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n## $1\n');
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n### $1\n');
  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n#### $1\n');
  md = md.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, '\n##### $1\n');
  md = md.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, '\n###### $1\n');
  md = md.replace(/<(?:strong|b)[^>]*>([\s\S]*?)<\/(?:strong|b)>/gi, '**$1**');
  md = md.replace(/<(?:em|i)[^>]*>([\s\S]*?)<\/(?:em|i)>/gi, '*$1*');
  md = md.replace(/<a[^>]+href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');
  md = md.replace(/<img[^>]+src=["']([^"']*)["'][^>]*alt=["']([^"']*)["'][^>]*\/?>/gi, '![$2]($1)');
  md = md.replace(/<img[^>]+alt=["']([^"']*)["'][^>]*src=["']([^"']*)["'][^>]*\/?>/gi, '![$1]($2)');
  md = md.replace(/<img[^>]+src=["']([^"']*)["'][^>]*\/?>/gi, '![]($1)');
  md = md.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, '\n```\n$1\n```\n');
  md = md.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, '\n```\n$1\n```\n');
  md = md.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`');
  md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n');
  md = md.replace(/<\/?(?:ul|ol)[^>]*>/gi, '\n');
  md = md.replace(/<br\s*\/?>/gi, '\n');
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n$1\n');
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, '\n> $1\n');
  md = md.replace(/<hr\s*\/?>/gi, '\n---\n');
  md = md.replace(/<th[^>]*>([\s\S]*?)<\/th>/gi, '| $1 ');
  md = md.replace(/<td[^>]*>([\s\S]*?)<\/td>/gi, '| $1 ');
  md = md.replace(/<tr[^>]*>([\s\S]*?)<\/tr>/gi, '$1|\n');
  md = md.replace(/<[^>]+>/g, '');
  md = md.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
  md = md.replace(/\n{3,}/g, '\n\n').trim();
  return md;
}

export async function run(input: { html?: string; url?: string }) {
  if (!input.html && !input.url) throw new Error('Either html or url is required');
  const startTime = Date.now();
  let html: string;
  let sourceUrl: string | null = null;
  if (input.url) {
    const response = await fetch(input.url, { headers: { 'User-Agent': 'Claw0x-HTML2MD/1.0', 'Accept': 'text/html' }, redirect: 'follow', signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error(`Failed to fetch URL: ${response.status}`);
    html = await response.text();
    sourceUrl = response.url;
  } else {
    html = input.html!;
  }
  if (html.length > 5 * 1024 * 1024) throw new Error('HTML content too large (max 5MB)');
  const markdown = htmlToMarkdown(html);
  return {
    markdown, char_count: markdown.length, line_count: markdown.split('\n').length, source: sourceUrl || 'inline',
    _meta: { skill: 'html-to-markdown', latency_ms: Date.now() - startTime, input_size: html.length, output_size: markdown.length },
  };
}
export default run;
