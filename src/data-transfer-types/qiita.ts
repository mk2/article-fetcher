import { DateTime } from 'luxon';
import { Merge } from 'type-fest';

export interface QiitaArticle {
  id: string;
  rendered_body: string;
  body: string;
  comments_count: number;
  likes_count: number;
  private: boolean;
  tags: { name: string; version: string }[];
  created_at: DateTime;
  updated_at: DateTime;
  title: string;
  url: string;
  user: unknown;
  page_views_count: number;
}

export const QiitaArticle = {
  from(article: RawQiitaArticle): QiitaArticle {
    return {
      ...article,
      created_at: DateTime.fromISO(article.created_at).setZone('utc'),
      updated_at: DateTime.fromISO(article.updated_at).setZone('utc'),
    };
  },
};

export type RawQiitaArticle = Merge<
  QiitaArticle,
  {
    created_at: string;
    updated_at: string;
  }
>;
