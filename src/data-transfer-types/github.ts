export interface UserInfo {
  id: string;
  name: string;
}

export interface GithubActionInputs {
  zenn: UserInfo[];
  qiita: UserInfo[];
  qiitaAccessToken: string;
  fromDaysAgo: number;
  retentionDays: number;
  artifactName: string;
  outputJsonFileName: string;
}

export const GithubActionInputs = {
  from(inputs: RawGithubActionInputs): GithubActionInputs {
    const zenn = JSON.parse(inputs.zenn);
    const qiita = JSON.parse(inputs.qiita);
    const retentionDays = parseInt(inputs.retentionDays, 10);
    const artifactName = inputs.artifactName;
    const outputJsonFileName = inputs.outputJsonFileName;
    const qiitaAccessToken = inputs.qiitaAccessToken;
    const fromDaysAgo = parseInt(inputs.fromDaysAgo, 10);

    return {
      zenn,
      qiita,
      retentionDays,
      artifactName,
      outputJsonFileName,
      qiitaAccessToken,
      fromDaysAgo,
    };
  },
} as const;

interface RawGithubActionInputs {
  zenn: string;
  qiita: string;
  retentionDays: string;
  artifactName: string;
  outputJsonFileName: string;
  qiitaAccessToken: string;
  fromDaysAgo: string;
}
