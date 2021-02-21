import * as core from '@actions/core';

interface Member {
  id: string;
  name: string;
}

async function run(): Promise<void> {
  try {
    const zennAccounts: Member[] = JSON.parse(core.getInput('zenn'));
    core.debug(JSON.stringify(zennAccounts));
    core.setOutput('zennAccounts', zennAccounts);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
