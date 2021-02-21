/**
 * zenn.dev
 *
 * RSSの詳細: https://zenn.dev/zenn/articles/zenn-feed-rss
 * 
 * Sample RSS Data:
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>
    <![CDATA[ mk2さんのフィード ]]>
    </title>
    <description>
    <![CDATA[ Zennのmk2さん（@mk2）のフィード ]]>
    </description>
    <link>https://zenn.dev/mk2</link>
    <image>
      <url>https://zenn.dev/images/logo-only-dark.png</url>
      <title>mk2さんのフィード</title>
      <link>https://zenn.dev/mk2</link>
    </image>
    <generator>zenn.dev</generator>
    <lastBuildDate>Sun, 21 Feb 2021 14:45:21 GMT</lastBuildDate>
    <atom:link href="https://zenn.dev/mk2/feed" rel="self" type="application/rss+xml"/>
    <language>
      <![CDATA[ ja ]]>
    </language>
    <item>
      <title>
      <![CDATA[ Yarn v2で始めてみるzenn-cliライフ ]]>
      </title>
      <description>
      <![CDATA[ zennで記事を公開するにあたり、Github連携でやってみようと思っていました。今回それを設定にするにあたり、zenn-cli w/Yarn v2でリポジトリを作ってみたので共有します（大したことはやってないです）。 リポジトリの作成・zennへの連携 GitHubリポジトリでZennのコンテンツを管理する 上記を参考に、リポジトリをGithubで作成しzennに連携します。 リポジトリの初期化 Zenn CLIをインストールする ここを参考に、良い感じにyarn v2に読み替えながらやっていきます。 1. まずYarn v2の有効化。 ... ]]>
      </description>
      <link>https://zenn.dev/mk2/articles/d0c3df3b6a3b889cca8c</link>
      <guid isPermaLink="true">https://zenn.dev/mk2/articles/d0c3df3b6a3b889cca8c</guid>
      <pubDate>Sun, 21 Feb 2021 11:58:44 GMT</pubDate>
      <enclosure url="https://res.cloudinary.com/dlhzyuewr/image/upload/s--QKOMjC90--/co_rgb:222%2Cg_south_west%2Cl_text:notosansjp-medium.otf_37_bold:mk2%2Cx_203%2Cy_98/c_fit%2Cco_rgb:222%2Cg_north_west%2Cl_text:notosansjp-medium.otf_70_bold:Yarn%2520v2%25E3%2581%25A7%25E5%25A7%258B%25E3%2582%2581%25E3%2581%25A6%25E3%2581%25BF%25E3%2582%258Bzenn-cli%25E3%2583%25A9%25E3%2582%25A4%25E3%2583%2595%2Cw_1010%2Cx_90%2Cy_100/g_south_west%2Ch_90%2Cl_fetch:aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL3plbm4tdXNlci11cGxvYWQvYXZhdGFyL2ljb25fOWMzYmQ3YmNjMi5qcGVn%2Cr_max%2Cw_90%2Cx_87%2Cy_72/v1609308637/og/new_txlqub.png" length="0" type="image/png"/>
      <dc:creator>mk2</dc:creator>
    </item>
  </channel>
</rss>
 */

import parser from 'fast-xml-parser';
import fetch from 'node-fetch';

import { zennRssUrl } from '../config';
import { RawZennArticle, ZennArticle } from '../data-transfer-types';

export async function fetchArticles(userId: string): Promise<ZennArticle[]> {
  const response = await fetch(zennRssUrl(userId));
  if (response.status !== 200) {
    return [];
  }

  const result = await response.text();
  if (!parser.validate(result)) {
    return [];
  }

  const xml = parser.parse(result);
  const items: RawZennArticle[] = [xml.rss.channel.item].flat();
  return items.map(article => ZennArticle.from(article));
}
