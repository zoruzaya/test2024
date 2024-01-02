## Installation

Use Turbo's CLI to init your project:

```bash
git clone git@github.com:meme-org/manual.git
```

# ディレクト構造

[turbo repo](https://turbo.build/repo/docs/installing) を使っております。
アプリとPackageについては、各ディレクトのReadmeを参照してください。

## Quick Start

> **Note**
> The [db](./packages/db) package is preconfigured to use Supabase

To get it running, follow the steps below:

### Setup dependencies

1. `pnpm` 利用できる環境
2. `pnpm install`
3. `cp .env_example .env`
4. `.env` を設定（SupabaseのDBの構造が一致する必要がある）
5. pnpm dev
6. `localhost:3000` と `localhost:3001` を開く

### if you are using local supabase

look at [supabase folder](supabase/readme.md)

### When it's time to add a new package

`pnpm turbo gen init`

## Deployment

### deploy admin

1. [deploy admin site](apps/admin-spa/README.md)
2. [deploy user site](apps/user-spa/README.md)
3. [make sure supabase is connected](supabase/README.md)

## References

The stack originates from [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo).
# test2024
