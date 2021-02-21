import * as core from '@actions/core';
import * as artifact from '@actions/artifact';
import * as _fs from 'fs';
import { kMaxLength } from 'buffer';
const fs = _fs.promises;

interface Member {
  id: string;
  name: string;
}

async function run(): Promise<void> {
  try {
    const zennAccounts: Member[] = JSON.parse(core.getInput('zenn'));
    await fs.writeFile('./hoge.json', JSON.stringify(zennAccounts));
    await artifact.create().uploadArtifact('test', ['hoge.json'], './');
    core.info(JSON.stringify(zennAccounts));
    core.setOutput('zennAccounts', zennAccounts);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
