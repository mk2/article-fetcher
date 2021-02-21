import 'reflect-metadata';

import * as fs from 'fs';
import { DateTime } from 'luxon';
import { NestedError } from 'ts-nested-error';

import { ArtifactArticle } from './data-transfer-types';
import { QiitaFetcher, ZennFetcher } from './fetchers';
import * as github from './github';
import { logger } from './logger';

async function run(): Promise<void> {
  const inputs = github.getGithubActionInputs();
  const fetchers: Fetcher[] = [
    ZennFetcher.create(inputs.zenn),
    QiitaFetcher.create(inputs.qiita, inputs.qiitaAccessToken),
  ];

  const now = DateTime.utc();
  const from = now.minus({ days: inputs.fromDaysAgo }).startOf('day');
  const to = now.startOf('day');
  logger.info(`from: ${from.toISO()}`);
  logger.info(`to: ${to.toISO()}`);

  let result: ArtifactArticle[] = [];
  const errors: Error[] = [];

  for (const fetcher of fetchers) {
    try {
      result = result.concat(await fetcher(from, to));
    } catch (e) {
      errors.push(new NestedError(fetcher.name), e);
    }
  }

  if (fetchers.length === errors.length) {
    github.actionFailed(new NestedError('failed all fetcher', ...errors));
    return;
  }

  try {
    await fs.promises.writeFile(inputs.outputJsonFileName, JSON.stringify(result, null, 2));
    await github.uploadArtifact(inputs.artifactName, inputs.outputJsonFileName, inputs.retentionDays);
  } catch (e) {
    github.actionFailed(new NestedError('failed creating artifact', e));
  }
}

async function start(): Promise<void> {
  try {
    logger.info('Start article-fetcher.');
    await run();
    logger.info('Finish article-fetcher successfully.');
  } catch (e) {
    github.actionFailed(e);
  }
}

start();
