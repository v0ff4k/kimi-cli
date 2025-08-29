#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

/**
 * replace original index.js with this one(as-is)
 * 1. Запросы идут в вашу API (Kimi).
 * 2. Поддерживает все CLI-флаги Cursor:
 *      --prompt "text"
 *      --model "moonshot-v1-8k"
 *      --context-file path/to/file
 * 3. Добавлена опция --stream
 */
const API_KEY = process.env.KIMI_API_KEY ?? (() => {
  console.error('❌  export KIMI_API_KEY=sk-xxx');
  process.exit(1);
})();
const ENDPOINT = 'https://api.moonshot.cn/v1/chat/completions';

// --- парсер аргументов (минимальный) ---
const ARGV = Object.fromEntries(
  process.argv.slice(2).reduce((acc, arg, i, arr) => {
    if (arg.startsWith('--')) acc.push([arg.slice(2), arr[i + 1] ?? true]);
    return acc;
  }, [])
);

// --- helpers ---
async function requestKimi(messages, model = 'moonshot-v1-8k', stream = false) {
  const body = JSON.stringify({ model, messages, temperature: 0.6, stream });
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` },
    body,
  });

  if (!res.ok) throw new Error(await res.text());

  if (!stream) {
    const json = await res.json();
    return json.choices?.[0]?.message?.content ?? '';
  }

  // SSE
  for await (const chunk of res.body) {
    const lines = chunk.toString().trim().split('\n');
    for (const l of lines) {
      if (l.startsWith('data: ')) {
        const d = l.slice(6);
        if (d === '[DONE]') return;
        try {
          const token = JSON.parse(d).choices?.[0]?.delta?.content || '';
          process.stdout.write(token);
        } catch {}
      }
    }
  }
}

async function readFile(path) {
  const fs = await import('node:fs/promises');
  return fs.readFile(path, 'utf8');
}

// --- главная логика ---
(async () => {
  const prompt = ARGV.prompt;
  const contextFile = ARGV['context-file'];
  const model = ARGV.model || 'moonshot-v1-8k';
  const stream = !!ARGV.stream;

  let messages = [];
  if (contextFile) {
    const content = await readFile(contextFile);
    messages.push({ role: 'system', content: `File:\n${content}` });
  }

  if (prompt) {
    messages.push({ role: 'user', content: prompt });
    const reply = await requestKimi(messages, model, stream);
    if (!stream) console.log(reply);
    return;
  }

  // fallback → интерактив
  const rl = createInterface({ input: stdin, output: stdout, prompt: '🤖> ' });
  rl.prompt();
  rl.on('line', async line => {
    const text = line.trim();
    if (['exit', 'quit', 'q'].includes(text.toLowerCase())) return rl.close();
    messages.push({ role: 'user', content: text });
    try {
      const reply = await requestKimi(messages, model, stream);
      if (!stream) console.log('\n' + reply);
      messages.push({ role: 'assistant', content: reply });
    } catch (e) {
      console.error('❌', e.message);
    }
    rl.prompt();
  });
  rl.on('close', () => console.log('👋'));
})();
