
import {  waitForTransaction, writeContract } from "@wagmi/core";
import {
    merchStoreContractAddresses,
} from '../../config';
import { merchStoreAbi } from '../../assets';
import { parseEther, parseUnits } from "viem";

// function claimPrize() external {
export const buyPacks = async (
    account: any,
    usdcAmount: number,
    utbetsAmount: number,
    signature: any,
    chainId: number,
) => {
    try {
        const { hash } = await writeContract({
            address: (merchStoreContractAddresses as any)[chainId],
            abi: merchStoreAbi,
            functionName: 'buyPacks',
            args: [account, 
                parseUnits(String(usdcAmount), 6),
                parseEther(String(utbetsAmount)),
                signature
            ],
        });
        const data = await waitForTransaction({ hash });
        if (data.status == "success") {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.log(e, "============error in buy pack=============")
        return false
    }
}
