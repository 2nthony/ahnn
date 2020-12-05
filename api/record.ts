import { NowRequest, NowResponse } from '@vercel/node'

export default function Record(req: NowRequest, res: NowResponse) {
  console.log('received')
  if (req.method === 'POST') {
    console.log(req.body)
    res.status(200)
    res.json(req.body)
  }
}
