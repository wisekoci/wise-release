export type JiraPluginOptions = {
  prefix: string
  baseUrl: string
}
/**
 * Jira Plugin
 *
 * convert jira ticket into jira link
 * const jira = JiraPlugin({ prefix: "BBC", baseUrl: 'https://telepass.atlassian.net/browse' })
 */

class JiraPlugin {
  private prefix: string
  private baseUrl: string
  private regex: RegExp

  constructor(options: JiraPluginOptions) {
    this.prefix = options.prefix
    this.baseUrl = options.baseUrl
    this.regex = new RegExp(/(\[BBC+-[0-9]+\])(?!\()/gm)
  }

  createMarkdownLink(url: string, text: string): string {
    return `[${url}](${text})`
  }

  parse(markdown: string): string {
    return markdown.replace(this.regex, (_: unknown, ticket: string) => {
      const id = ticket.replace('[', '').replace(']', '')
      const url = this.createMarkdownLink(`${this.baseUrl}/${id}`, id)
      return url
    })
  }
}

export default JiraPlugin
