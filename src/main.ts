import * as qiita from './adapters/qiita';
import * as zenn from './adapters/zenn';
import * as github from './adapters/github';

async function run(): Promise<void> {
  const actionsInput = github.GithubActionInputs.get();
  const result: Article[] = [];
  for (const zennUser of actionsInput.zenn) {
    const articles = await zenn.fetchArticles(zennUser.id);
    articles.forEach(article => {
      result.push({
        authorId: zennUser.id,
        authorName: zennUser.name,
        publishDate: article.pubDate.toISO(),
        title: article.title,
        url: article.link,
        summary: article.description,
      });
    });
  }

  for (const qiitaUser of actionsInput.qiita) {
    const articles = await qiita.fetchArticles(qiitaUser.id, actionsInput.accessToken);
    articles.forEach(article => {
      result.push({
        authorId: qiitaUser.id,
        authorName: qiitaUser.name,
        publishDate: article.created_at.toISO(),
        title: article.title,
        url: article.url,
        summary: article.body,
      });
    });
  }

  github.infoLog(result);
}

run();
