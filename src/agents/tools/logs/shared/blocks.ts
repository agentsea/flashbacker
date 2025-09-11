export function splitIntoBlocks(text: string): string[] {
  if (!text) return [];

  const lines = text.split(/\r?\n/);
  const blocks: string[] = [];
  let current: string[] = [];

  const flush = (): void => {
    if (current.length) {
      blocks.push(current.join('\n'));
      current = [];
    }
  };

  for (const line of lines) {
    if (/^\s{0,3}#{1,6}\s/.test(line) || /^```/.test(line)) {
      flush();
      current.push(line);
    } else {
      current.push(line);
    }
  }

  flush();
  return blocks.filter(b => b.trim().length > 0);
}

export function normalizeBlock(text: string): string {
  let t = text;
  // UUIDs
  t = t.replace(/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi, 'uuid');
  // ISO timestamps
  t = t.replace(/\d{4}-\d{2}-\d{2}t\d{2}:\d{2}:\d{2}\.\d{3}z/gi, 'iso-date');
  // Dates
  t = t.replace(/\d{4}-\d{2}-\d{2}/g, 'date');
  // Drop noisy metadata lines
  t = t
    .split(/\n/)
    .filter(line => !/\*?last updated/i.test(line) && !/last updated:/i.test(line))
    .join('\n');
  // Numbers to 0
  t = t.replace(/\d+/g, '0');
  // Case-fold
  t = t.toLowerCase();
  // Whitespace normalize
  t = t.replace(/[\t ]+/g, ' ').replace(/[ ]+\n/g, '\n');
  return t.trim();
}


