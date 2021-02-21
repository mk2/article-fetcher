import * as mockttp from 'mockttp';

import * as qiita from '../qiita';

const mockServer = mockttp.getLocal();

describe('qiita adapter', () => {
  beforeEach(async () => mockServer.start(3000));
  afterEach(async () => mockServer.stop());

  test('トークンがある場合は、Authorizationヘッダーが設定される', async () => {
    const endpointMock = await mockServer.get('/qiita/testUser').thenReply(200, JSON.stringify([]));
    await qiita.fetchArticles('testUser', 'testQiitaAccessToken');
    const requests = await endpointMock.getSeenRequests();
    expect(requests.length).toBe(1);
    expect(requests[0].headers['authorization']).toBe('Bearer testQiitaAccessToken');
  });

  test('トークンがない場合は、Authorizationヘッダーが設定されない', async () => {
    const endpointMock = await mockServer.get('/qiita/testUser').thenReply(200, JSON.stringify([]));
    await qiita.fetchArticles('testUser', '');
    const requests = await endpointMock.getSeenRequests();
    expect(requests.length).toBe(1);
    expect(requests[0].headers['authorization']).toBeUndefined();
  });
});
