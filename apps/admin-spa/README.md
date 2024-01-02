# About

管理者ページ

# ディレクトリ構造とルーティング

- ルーティングは[@generouted/react-router](https://www.npmjs.com/package/@generouted/react-router) のライブラリーを参照
- 他のディレクトリは [vite](https://www.npmjs.com/package/vite) のライブラリーを参照

# 開発

1. `pnpm` 利用できる環境
2. `pnpm install`
3. `pnpm dev`

# デプロイとビルド

- firebase cli の install
- firebase login
  - 複数アカウント使う場合 `firebase login:list`, `firebase login:add`, `firebase login:use [account]` を活用
- `pnpm deploy:firebase:staging` or `pnpm deploy:firebase:prod`
