# Article Fetcher

- [Zenn](https://zenn.dev)と[Qiita](https://qiita.com)から指定したユーザー ID の記事を取得する Github Action

## 使い方

### 前日の記事を取得する例

#### Zenn/Qiita のアカウントと名前を記載した json ファイルを作成

- `zenn-members.json`

```json
[
  {
    "id": "mk2",
    "name": "mk2"
  }
]
```

- `qiita-members.json`

```json
[
  {
    "id": "mk2",
    "name": "mk2"
  }
]
```

#### 通知するためのスクリプトを用意

- 例：`notify.mjs`というファイルを作成

```sh
npm i form-data got
```

```js
import FormData from 'form-data';
import fs from 'fs';
import got from 'got';
import path from 'path';

const url = 'https://...';

async function main() {
  const dirname = path.dirname(new URL(import.meta.url).pathname);
  const data = await fs.promises.readFile(path.resolve(dirname, './articles.json'));
  const articles = JSON.parse(data);
  console.log(articles);
  for (const a of articles) {
    try {
      const body = new FormData();
      body.append('source', `${a.authorName} ${a.title} ${a.url} ${a.url}`);
      body.append('format', 'html');
      await got.post(url, { body });
    } catch (e) {
      console.error(e);
    }
  }
}

main();
```

#### GitHub アクションのワークフローを設定

- 例：`.github/workflows/notify.yaml`というファイルを作成

```yaml
name: Notify Zenn/Qiita Posts

on:
  workflow_dispatch:
  schedule:
    - cron: '00 3 * * *'

jobs:
  notify-job:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/setup-node@v2
        with:
          node-version: '14'
      - name: zenn/qiitaのユーザーIDリストの設定
        id: id-list-json
        run: |
          zenn=$(echo $(cat ./zenn-members.json))
          echo "::set-output name=zenn::$zenn"
          qiita=$(echo $(cat ./qiita-members.json))
          echo "::set-output name=qiita::$qiita"
      - uses: mk2/article-fetcher
        with:
          zenn: ${{ steps.id-list-json.outputs.zenn }}
          qiita: ${{ steps.id-list-json.outputs.qiita }}
          fromDaysAgo: 1
          qiitaAccessToken: ${{ secrets.QIITA_ACCESS_TOKEN }}
      - run: |
          node notify.mjs
```

## 開発環境

- Node 12.x
- Yarn v2
  - 最新の yarn berry が必要です。下記のコマンドでいれてください（2021/2/23 時点）
  - `yarn set version from sources --branch 2262`
