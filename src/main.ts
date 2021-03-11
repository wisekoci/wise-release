import * as core from '@actions/core'
import gitUtils from './utils/git'
import changelogUtils from './utils/changelog'
import JiraPlugin from './plugins/jira'

async function run(): Promise<void> {
  try {
    const jiraPrefix: string = core.getInput('jira-prefix')
    const tagPrefix: string = core.getInput('tag-prefix')

    core.debug(
      `Start Release action jiraPrefix: ${jiraPrefix}, tagPrefix: ${tagPrefix}`
    )

    core.debug('setting git user')
    await gitUtils.setupUser()

    core.debug('create changelog')
    await changelogUtils.create()

    core.debug('read changelog')
    const changelog = ''

    core.debug('parse changelog')
    const jira = new JiraPlugin({
      prefix: 'BBC',
      baseUrl: 'https://telepass.atlassian.net/browse'
    })
    const updatedChangelog = jira.parse(changelog)

    core.debug(`write changelog ${updatedChangelog}`)

    core.setOutput('End Release action', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
