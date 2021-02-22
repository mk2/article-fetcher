import * as core from '@actions/core';
import { NestedError } from 'ts-nested-error';

interface GithubActionInputs {
  zenn: UserInfo[];
  qiita: UserInfo[];
  retentionDays: number;
  artifactName: string;
  outputJsonFileName: string;
  accessToken: string;
}

class GithubActionInputError extends NestedError {}

export const GithubActionInputs = {
  get(useDummy = false, values?: Partial<GithubActionInputs>): GithubActionInputs {
    return { ...(useDummy ? this.dummy() : this.real()), ...values };
  },
  dummy(): GithubActionInputs {
    return {
      zenn: [{ id: 'mk2', name: 'mk2(Zenn)' }],
      qiita: [{ id: 'mk2', name: 'mk2(Qiita)' }],
      retentionDays: 1,
      artifactName: 'articles',
      outputJsonFileName: 'articles.json',
      accessToken: 'dummy',
    };
  },
  real(): GithubActionInputs {
    const zenn = getParsedInput<UserInfo[]>('zenn', '[]');
    const qiita = getParsedInput<UserInfo[]>('qiita', '[]');
    const retentionDays = parseInt(core.getInput('retentionDays') ?? '1', 10);
    const artifactName = core.getInput('artifactName') ?? 'articles';
    const outputJsonFileName = core.getInput('outputJsonFileName') ?? 'articles.json';
    const qiitaToken = core.getInput('qiitaToken') ?? '';

    return {
      zenn,
      qiita,
      retentionDays,
      artifactName,
      outputJsonFileName,
      accessToken: qiitaToken,
    };
  },
} as const;

function getParsedInput<T = unknown>(name: string, defaultValue?: string): T {
  try {
    return JSON.parse(core.getInput('zenn') ?? defaultValue);
  } catch (e) {
    throw new GithubActionInputError(`Error: getting github action input for ${name}`, e);
  }
}

export function uploadArtifact(): void {}

export function infoLog(message: unknown): void {
  core.info(typeof message === 'string' ? message : JSON.stringify(message));
}
