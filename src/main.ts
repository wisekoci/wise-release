import * as core from '@actions/core'
// import JiraPlugin from './plugins/jira'

async function run(): Promise<void> {
  try {
    const jiraPrefix: string = core.getInput('jira-prefix')
    const tagPrefix: string = core.getInput('tag-prefix')

    core.debug(
      `Start Release action jiraPrefix: ${jiraPrefix}, tagPrefix: ${tagPrefix}`
    )

    core.setOutput('End Release action', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
