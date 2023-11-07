import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { ironOptions } from '../../../lib/iron';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  // @ts-ignore
  if (!req.session.siwe) {
    res.status(401).json({ message: 'You have to first sign_in' });
    return;
  }
  switch (method) {
    case 'GET':
      // @ts-ignore
      res.send({ address: req.session.siwe?.address });
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, ironOptions);
