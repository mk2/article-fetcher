const mockttpBaseUrl = 'http://localhost:3000';

export const isTest = (): boolean => {
  return process.env.NODE_ENV === 'test';
};

export const qiitaApiUrl = (userName: string): string =>
  isTest() ? `${mockttpBaseUrl}/qiita/${userName}` : `https://qiita.com/api/v2/users/${userName}/items`;

export const zennRssUrl = (id: string): string =>
  isTest() ? `${mockttpBaseUrl}/zenn/${id}` : `https://zenn.dev/${id}/feed`;
