import {exec} from '@actions/exec'

const setupUser = async () => {
  await exec('git', [
    'config',
    '--global',
    'user.name',
    `"github-actions[bot]"`
  ])
  await exec('git', [
    'config',
    '--global',
    'user.email',
    `"github-actions[bot]@users.noreply.github.com"`
  ])
}

const pullBranch = async (branch: string) => {
  await exec('git', ['pull', 'origin', branch])
}

export default {
  setupUser,
  pullBranch
}
