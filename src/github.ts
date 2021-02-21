import * as artifact from '@actions/artifact';
import * as core from '@actions/core';
import c from 'ansi-colors';

import { GithubActionInputs } from './data-transfer-types';

export function getGithubActionInputs(): GithubActionInputs {
  return GithubActionInputs.from({
    zenn: core.getInput('zenn'),
    qiita: core.getInput('qiita'),
    artifactName: core.getInput('artifactName'),
    fromDaysAgo: core.getInput('fromDaysAgo'),
    outputJsonFileName: core.getInput('outputJsonFileName'),
    qiitaAccessToken: core.getInput('qiitaAccessToken'),
    retentionDays: core.getInput('retentionDays'),
  });
}

export async function uploadArtifact(
  name: string,
  file: string,
  retentionDays: number,
  rootDirectory = './',
): Promise<void> {
  await artifact.create().uploadArtifact(name, [file], rootDirectory, { retentionDays });
}

export function infoLog(message: unknown, prefix = ''): void {
  core.info(c.green(`${prefix} ${typeof message === 'string' ? message : JSON.stringify(message)}`));
}

export function errorLog(message: unknown, prefix = ''): void {
  core.info(c.red(`${prefix} ${typeof message === 'string' ? message : JSON.stringify(message)}`));
}

export function actionFailed(e: Error): void {
  core.setFailed(e);
}
