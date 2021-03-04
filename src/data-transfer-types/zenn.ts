import { DateTime } from 'luxon';
import { Merge } from 'type-fest';

export interface ZennArticle {
  title: string;
  description: string;
  link: string;
  guid: string;
  pubDate: DateTime;
  enclosure: string;
  'dc:creator': string;
}

export const ZennArticle = {
  from(article: RawZennArticle): ZennArticle {
    return {
      ...article,
      pubDate: DateTime.fromHTTP(article.pubDate).setZone('utc'),
    };
  },
};

export type RawZennArticle = Merge<
  ZennArticle,
  {
    pubDate: string;
  }
>;
