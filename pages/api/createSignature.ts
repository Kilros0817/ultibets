import { ethers } from 'ethers'
import { ultibetsSignAbi } from '../../utils/assets'
import { ultibetsSignAddresses } from '../../utils/config'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '../../lib/iron'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // @ts-ignore
  if (!req.session?.siwe) {
    res.status(401).json({ message: 'You have to first sign_in' })
    return
  }
  try {
    const data = req.body

    const provider = new ethers.providers.JsonRpcProvider(data.rpc)
    const ultibetsSignContract = new ethers.Contract(
      (ultibetsSignAddresses as any)[data.chainId],
      ultibetsSignAbi,
      provider
    )
    const admin = new ethers.Wallet(
      `0x${process.env.ADMIN_WALLET_PRIVATE_KEY}`,
      provider
    )

    let sign
    const hash = await ultibetsSignContract.getMessageHash(
      data.bettor,
      data.eventID
    )

    sign = await admin.signMessage(ethers.utils.arrayify(hash))

    res.status(200).json({
      isSuccess: true,
      signature: sign,
    })
  } catch (error) {
    console.log('error: ', error)

    res.status(500).json({
      isSuccess: false,
      signature: '',
    })
  }
}

export default withIronSessionApiRoute(handler, ironOptions)
