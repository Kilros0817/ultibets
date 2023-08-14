const ethers = require("ethers");
import {
    nativeTokenDailyBetsAbiInPM,
    ultibetsTokenDailyBetsAbiInPM
} from '../../utils/assets';
import {
    chainRPCs,
    contractAddressesInDailyBets,
} from '../../utils/config';

export const addEventPM = async (req: any, res: any) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    
    const data = req.body.info;
    const isNative = req.body.isNative;
    const chainId = data.chainId;
    const abi = isNative ? nativeTokenDailyBetsAbiInPM : ultibetsTokenDailyBetsAbiInPM;
    const provider = new ethers.providers.JsonRpcProvider(chainRPCs[chainId]);
    const wallet = new ethers.Wallet(`0x${process.env.ADMIN_WALLET_PRIVATE_KEY}`, provider);
    const contractAddress = isNative ? contractAddressesInDailyBets[chainId][0] : contractAddressesInDailyBets[chainId][1]; 

    try {
        const contract = new ethers.Contract(contractAddress, abi, provider.getSigner(wallet.address));

        const unsignedTx = await contract.populateTransaction.addEvent(
            data.description,
            data.category,
            data.subcategory,
            data.eventStartTime,
        );
        const tx = await wallet.sendTransaction(unsignedTx);
        await tx.wait();

        res.status(200).json({
            isSuccess: true,
        });

    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            isSuccess: false,
        });
    }
}
export default addEventPM;
