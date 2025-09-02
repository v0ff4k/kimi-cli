# kimi-cli
Extend cursor cli with kimi power, replace OpenAI with KiMi

### TODO
  1. install Cursor cli
  2. add to folder /home/{your_user}/.local/share/cursor-agent/versions/{YYYY}.{MM}.{DD}-{random_sha}
  3. bash `ln -sf "$(command -v node)" /home/{your_user}/.local/share/kimi-cli/node`
  4. unpack all in ine index.js : `esbuild --bundle --platform=node --outfile=index.js`


do not forget to set your username with  {your_user}

## Additional features
### Add into PATH
`export PATH="/home/user/.local/share/kimi-cli:$PATH"`

### use as in Cursor
```
kimi-agent --prompt "write hello-world on C++"
kimi-agent --context-file ./main.py --prompt "optimize"
kimi-agent --stream
```
