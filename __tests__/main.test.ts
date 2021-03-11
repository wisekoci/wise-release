import JiraPlugin from '../src/plugins/jira'

test('empty markdown', async () => {
  const markdown = ''

  const jira = new JiraPlugin({
    prefix: 'BBC',
    baseUrl: 'https://telepass.atlassian.net/browse'
  })

  const result = jira.parse(markdown)

  expect(result).toEqual('')
})

test('one ticket in markdown', async () => {
  const markdown = '[BBC-12] add employee bulk upload'

  const jira = new JiraPlugin({
    prefix: 'BBC',
    baseUrl: 'https://telepass.atlassian.net/browse'
  })

  const result = jira.parse(markdown)

  expect(result).toEqual(
    '[https://telepass.atlassian.net/browse/BBC-12](BBC-12) add employee bulk upload'
  )
})

test('many ticket in markdown', async () => {
  const markdown = `
  - [BBC-1] add employee bulk upload
  - [BBC-2] add employee single dialog
  - [BBC-3] add employee validation errors
  - [BBC-4] add employee delete
  `

  const jira = new JiraPlugin({
    prefix: 'BBC',
    baseUrl: 'https://telepass.atlassian.net/browse'
  })

  const result = jira.parse(markdown)

  expect(result).toEqual(`
  - [https://telepass.atlassian.net/browse/BBC-1](BBC-1) add employee bulk upload
  - [https://telepass.atlassian.net/browse/BBC-2](BBC-2) add employee single dialog
  - [https://telepass.atlassian.net/browse/BBC-3](BBC-3) add employee validation errors
  - [https://telepass.atlassian.net/browse/BBC-4](BBC-4) add employee delete
  `)
})
