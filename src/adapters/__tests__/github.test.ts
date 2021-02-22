import * as github from '../github';

describe('github', () => {
  it('useDummyをtrueにしたら、ダミーのGithub Actions Inputが帰ってくること', async () => {
    expect(github.GithubActionInputs.get(true)).toEqual({
      zenn: [{ id: 'mk2', name: 'mk2(Zenn)' }],
      qiita: [{ id: 'mk2', name: 'mk2(Qiita)' }],
      retentionDays: 1,
      artifactName: 'articles',
      outputJsonFileName: 'articles.json',
      accessToken: 'dummy',
    });
  });
});
