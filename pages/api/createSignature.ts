const ethers = require("ethers");
import { ultibetsSignAbi } from "../../utils/assets";
import { ultibetsSignAddresses } from "../../utils/config";

export default async function createSignature(req: any, res: any) {
    try {
        const data = req.body
        res.setHeader('Access-Control-Allow-Origin', '*');
        
        const provider = new ethers.providers.JsonRpcProvider(data.rpc);
        const ultibetsSignContract = new ethers.Contract((ultibetsSignAddresses as any)[data.chainId], ultibetsSignAbi, provider)
        const admin = new ethers.Wallet(`0x${process.env.ADMIN_WALLET_PRIVATE_KEY}`, provider);

        let sign;
        const hash = await ultibetsSignContract.getMessageHash(data.bettor, data.eventID);
        sign = await admin.signMessage(ethers.utils.arrayify(hash));

        res.status(200).json({
            isSuccess: true,
            signature: sign
        });
    } catch (error) {
        console.log("error: ", error);

        res.status(500).json({
            isSuccess: false,
            signature: ""
        });
    }
}