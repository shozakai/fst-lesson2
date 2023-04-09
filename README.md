# fst-lesson2


## Domains

### production (branch: master)
https://xxxxx
- FTP
```bash
server : xxxxx
path   : xxxxx
user   : xxxxx
pass   : xxxxx
```

### test (branch: develop)
http://shed-dev.com/
- basic auth : `xxxxx` / `xxxxx`


## Development

### env
- node (v12.13.0)
- npm (v6.12.0)

### files
- `package.json` 使用パッケージの管理ファイル
- `webpack.config.js` webpackの設定ファイル
- `public` 公開フォルダ
- `src` ビルド前の開発用ソースコード

### command
```bash
# node_modules install (初回のみ)
$ npm install

# develop
$ npm run start

# build
$ npm run build
```