import fs from 'fs-extra';
import readline from 'readline';

export async function* readJsonlStream(filePath: string): AsyncGenerator<any> {
  const stream = fs.createReadStream(filePath, { encoding: 'utf-8' });
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

  for await (const line of rl) {
    const trimmed = (line as string).trim();
    if (!trimmed) continue;
    try {
      yield JSON.parse(trimmed);
    } catch {
      // skip invalid lines
    }
  }
}


