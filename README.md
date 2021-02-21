# Article Fetcher

- [Zenn](https://zenn.dev)と[Qiita](https://qiita.com)から指定したユーザー ID の記事を取得する Github Action

## 使い方

- 前日の記事を取得する例

```yml
my-job: # make sure the action works on a clean machine without building
  runs-on: ubuntu-latest
  steps:
    - uses: mk2/article-fetcher
      with:
        zenn: '[{"id": "mk2", "name":"朝倉"}]'
        qiita: '[{"id": "mk2", "name": "朝倉"}]'
        qiitaAccessToken: ${{ secrets.QIITA_ACCESS_TOKEN }}
    - run: |
        node -e "const {spawnSync}=require('child_process');const url='https://idobata.io/hook/custom/844d3335-68f4-445f-ba22-7b70d7746319';console.log(url);const json=JSON.parse(require('fs').readFileSync('./articles.json'));json.forEach(a => spawnSync('curl',['--data-urlencode','source='+a.title,url]));"
```

## 開発環境

- Node 12.x
- Yarn v2
  - 最新の yarn berry が必要です。下記のコマンドでいれてください（2021/2/23 時点）
  - `yarn set version from sources --branch 2262`
