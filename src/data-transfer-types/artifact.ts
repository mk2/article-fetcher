import { DateTime } from 'luxon';
import { Merge } from 'type-fest';

import { UserInfo } from './github';
import { QiitaArticle } from './qiita';
import { ZennArticle } from './zenn';

function summarize(article: RawArtifactArticle): string | undefined {
  switch (article.where) {
    case 'qiita.com':
      return `${(article.summary ?? '').substr(0, 300)} ...`;
    case 'zenn.dev':
      return article.summary;
  }
}

export interface ArtifactArticle {
  where: 'zenn.dev' | 'qiita.com';
  authorId: string;
  authorName: string;
  url: string;
  title: string;
  summary?: string;
  publishDate: string;
}

export const ArtifactArticle = {
  from(article: RawArtifactArticle): ArtifactArticle {
    return {
      ...article,
      publishDate: article.publishDate.toISO(),
      summary: summarize(article),
    };
  },
};

export type RawArtifactArticle = Merge<
  ArtifactArticle,
  {
    publishDate: DateTime;
  }
>;

export const RawArtifactArticle = {
  fromZennArticle(article: ZennArticle, zennUser: UserInfo): RawArtifactArticle {
    return {
      where: 'zenn.dev',
      authorId: zennUser.id,
      authorName: zennUser.name,
      publishDate: article.pubDate,
      title: article.title,
      url: article.link,
      summary: article.description,
    };
  },
  fromQiitaArticle(article: QiitaArticle, qiitaUser: UserInfo): RawArtifactArticle {
    return {
      where: 'qiita.com',
      authorId: qiitaUser.id,
      authorName: qiitaUser.name,
      publishDate: article.created_at,
      title: article.title,
      url: article.url,
      summary: article.rendered_body,
    };
  },
};
