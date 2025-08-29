#!/usr/bin/env php
<?php
/**
 * Kimi CLI - Терминальная пусковая установка для класса курсор/Claude Code
 * PHP 7.1+ Реализация единого файла
 * ------------------------------------------------------------
 * Prepare:
 *  # 1. Chmod
 *  chmod +x kimi-cli.php
 * 
 * # 2. SetAPI_KEY directly(or plase in .env/outside)
 * nano kimi-cli.php        # Or directly: sed -i 's/xxxxxxxx/key/' kimi-cli.php
 * # 3. run
 * ./kimi-cli.php
 * ------------------------------------------------------------
 * How to use:
 * ./kimi-cli.php                    ...interactive
 * ./kimi-cli.php -h                 ToSee help
 * echo "What can you do" | ./kimi-cli.php     one ask-answer in response
 */

const API_KEY = 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';  // <<<<<< api token
const API_URL = 'https://api.moonshot.cn/v1/chat/completions';

// ---------- start ----------
function sendPrompt(string $prompt): string
{
    $payload = json_encode([
        'model'      => 'moonshot-v1-8k',
        'messages'   => [['role' => 'user', 'content' => $prompt]],
        'temperature'=> 0.7,
        'max_tokens' => 1024,
    ]);

    $ch = curl_init(API_URL);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_HTTPHEADER     => [
            'Content-Type: application/json',
            'Authorization: Bearer ' . API_KEY,
        ],
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 30,
    ]);

    $response = curl_exec($ch);
    if ($response === false) {
        die("curl failed: " . curl_error($ch) . PHP_EOL);
    }
    curl_close($ch);

    $data = json_decode($response, true);
    if (!isset($data['choices'][0]['message']['content'])) {
        die("API return exception: " . $response . PHP_EOL);
    }
    return $data['choices'][0]['message']['content'];
}

function interactive()
{
    echo "Kimi CLI starnet, type  exit  - to quit.\n";
    while (true) {
        $line = readline('>>> ');
        if ($line === false) break;          // Ctrl-D
        $line = trim($line);
        if (!$line) continue;
        if (in_array(strtolower($line), ['exit', 'quit'])) break;
        readline_add_history($line);

        echo sendPrompt($line), "\n\n";
    }
    echo "Bye!\n";
}

// ---------- main in ----------
if ($argc > 1 && in_array($argv[1], ['-h', '--help'])) {
    echo "use: {$argv[0]} [-h|--help]   enter interactive mode\n";
    echo "       echo 'ask' | {$argv[0]}   一 1 ask-response dialogue\n";
    exit(0);
}

if (posix_isatty(STDIN)) {
    // terminal
    interactive();
} else {
    // interactive
    $prompt = trim(file_get_contents('php://stdin'));
    if ($prompt !== '') {
        echo sendPrompt($prompt), PHP_EOL;
    }
}
