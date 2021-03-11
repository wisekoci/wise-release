import {exec} from '@actions/exec'

const create = async () => {
  await exec('conventional-changelog', [
    '-p',
    'angular',
    '-i',
    `CHANGELOG.md`,
    '-s'
  ])
}

export default {
  create
}
