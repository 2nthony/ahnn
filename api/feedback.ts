import { NowRequest, NowResponse } from '@vercel/node'
import { octokit } from '../server/auth'

export default function Feedback(req: NowRequest, res: NowResponse) {
  if (req.method === 'POST') {
    octokit
      .request('POST /repos/{owner}/{repo}/issues', {
        owner: 'evillt',
        repo: 'ahnn',
        title: `${req.body.emotion}${req.body.title}`,
        labels: ['user feedback'],
        body: `
UserAgent: \`${req.body.userAgent}\`
`,
      })
      .then(() => {
        res.status(200)
        res.json({ msg: 'ok' })
      })
  }
}
