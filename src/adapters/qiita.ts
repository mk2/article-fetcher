import fetch from 'node-fetch';
import { DateTime } from 'luxon';

interface QiitaArticle {
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

type RawQiitaArticle = QiitaArticle & {
  created_at: string;
  updated_at: string;
};

const qiitaApiUrl = (userName: string): string => `https://qiita.com/api/v2/users/${userName}/items`;

export async function fetchArticles(userName: string, accessToken: string): Promise<QiitaArticle[]> {
  const response = await fetch(qiitaApiUrl(userName), {
    headers: { 'content-type': 'application/json', charset: 'utf-8', Authorization: `Bearer ${accessToken}` },
  });
  if (response.status !== 200) {
    return [];
  }
  const result: RawQiitaArticle[] = await response.json();
  return result.map(
    (entity: RawQiitaArticle): QiitaArticle => {
      return {
        ...entity,
        created_at: DateTime.fromISO(entity.created_at),
        updated_at: DateTime.fromISO(entity.updated_at),
      };
    },
  );
}
