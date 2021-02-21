/**
 * qiita.com
 *
 * APIの詳細: https://qiita.com/api/v2/docs
 */

import fetch from 'node-fetch';

import { qiitaApiUrl } from '../config';
import { QiitaArticle, RawQiitaArticle } from '../data-transfer-types';

export async function fetchArticles(userName: string, qiitaAccessToken: string): Promise<QiitaArticle[]> {
  const response = await fetch(qiitaApiUrl(userName), {
    headers: {
      'content-type': 'application/json',
      charset: 'utf-8',
      ...(qiitaAccessToken ? { Authorization: `Bearer ${qiitaAccessToken}` } : undefined),
    },
  });
  if (response.status !== 200) {
    return [];
  }
  const result: RawQiitaArticle[] = await response.json();
  return result.map(article => QiitaArticle.from(article));
}
