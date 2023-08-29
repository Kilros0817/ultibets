import { writeContract, waitForTransaction } from "@wagmi/core";
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
        const { hash } = await writeContract({
            address: (rndGeneratorContract as any)[chainId],
            abi: rndGeneratorAbi,
            functionName: 'requestRandomWords',
            args: [],
        });
        const data = await waitForTransaction({ hash });
        if (data.status == "success") {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.log(e, "============error in generate random number=============")
        return false
    }
}