import { DateTime } from 'luxon';

import { qiita } from '../adapters';
import { ArtifactArticle, RawArtifactArticle, UserInfo } from '../data-transfer-types';
import { logger } from '../logger';

export type QiitaFetcher = Fetcher;
export const QiitaFetcher = {
  create(qiitaUsers: UserInfo[], qiitaAccessToken: string): QiitaFetcher {
    return async (from: DateTime, to: DateTime) => {
      const result: ArtifactArticle[] = [];
      for (const qiitaUser of qiitaUsers) {
        const articles = await qiita.fetchArticles(qiitaUser.id, qiitaAccessToken);
        logger.info(`Fetched ${articles.length} articles from Qiita. (${qiitaUser.id})`);
        articles.forEach(article => {
          const rawArtifactArticle = RawArtifactArticle.fromQiitaArticle(article, qiitaUser);
          if (from <= rawArtifactArticle.publishDate && rawArtifactArticle.publishDate < to) {
            result.push(ArtifactArticle.from(rawArtifactArticle));
            logger.info(`Found: ${JSON.stringify(rawArtifactArticle)}`);
          }
        });
      }
      return result;
    };
  },
};
