type Fetcher = (
  from: import('luxon').DateTime,
  to: import('luxon').DateTime,
) => Promise<import('./data-transfer-types').ArtifactArticle[]>;
