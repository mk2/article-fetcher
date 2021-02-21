import { DateTime } from 'luxon';

import { zenn } from '../adapters';
import { ArtifactArticle, RawArtifactArticle, UserInfo } from '../data-transfer-types';
import { logger } from '../logger';

export type ZennFetcher = Fetcher;
export const ZennFetcher = {
  create(qiitaUsers: UserInfo[]): ZennFetcher {
    return async (from: DateTime, to: DateTime) => {
      const result: ArtifactArticle[] = [];
      for (const qiitaUser of qiitaUsers) {
        const articles = await zenn.fetchArticles(qiitaUser.id);
        logger.info(`Fetched ${articles.length} articles from Zenn. (${qiitaUser.id})`);
        articles.forEach(article => {
          const rawArtifactArticle = RawArtifactArticle.fromZennArticle(article, qiitaUser);
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
