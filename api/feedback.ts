import { NowRequest, NowResponse } from '@vercel/node'
import { octokit } from '../server/auth'

export default function Feedback(req: NowRequest, res: NowResponse) {
  if (req.method === 'POST') {
    const userNavigator = Object.keys(req.body.navigator)
      .map((navigatorKey) => {
        return `${navigatorKey}: ${req.body.navigator[navigatorKey]}`
      })
      .join('\n')

    octokit
      .request('POST /repos/{owner}/{repo}/issues', {
        owner: 'evillt',
        repo: 'ahnn',
        title: `${req.body.emotion}${req.body.title}`,
        labels: ['user feedback'],
        body: `
### Email

${req.body.email}

### UserNavigator

\`\`\`
${userNavigator}
\`\`\`
`.trim(),
      })
      .then(() => {
        res.status(200)
        res.json({ msg: 'ok' })
      })
  }
}
