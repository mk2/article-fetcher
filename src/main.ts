import * as core from '@actions/core';

async function run(): Promise<void> {
  try {
    const zennAccounts: string = core.getInput('zenn');
    core.debug(zennAccounts);
    core.setOutput('zennAccounts', zennAccounts);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
