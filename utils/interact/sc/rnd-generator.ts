import { writeContract } from "@wagmi/core";
import {
    rndGeneratorContract,
} from '../../config';
import { rndGeneratorAbi } from '../../assets';

// function requestRandomWords()
//         public onlyOwner
// returns(uint256 requestId)

export const requestRandomWords = async (
    chainId: number,
) => {
    try {
        const { wait } = await writeContract({
            mode: "recklesslyUnprepared",
            address: (rndGeneratorContract as any)[chainId],
            abi: rndGeneratorAbi,
            functionName: 'requestRandomWords',
            args: [],
        });
        await wait();
        return true;
    } catch (e) {
        console.log(e, "============error in generate random number=============")
        return false
    }
}