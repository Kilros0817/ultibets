import { readContract, writeContract } from "@wagmi/core";
import {
    ultiBetsLeaderBoardAddresses,
} from '../../config';
import { UltiBetsLeaderBoardAbi } from '../../assets';

// mapping(string => bool) public isUsedName;
export const isUsedName = async (
    name: string,
    chainId: number,
) => {
    const result = await readContract({
        address: (ultiBetsLeaderBoardAddresses as any)[chainId],
        abi: UltiBetsLeaderBoardAbi,
        functionName: "isUsedName",
        args: [name],
    })

    return result;
}

// function registerOnLeaderboard(string memory _name) external {
export const registerOnLeaderboard = async (
    name: string,
    chainId: number
) => {
    try {
        const { wait } = await writeContract({
            mode: "recklesslyUnprepared",
            address: (ultiBetsLeaderBoardAddresses as any)[chainId],
            abi: UltiBetsLeaderBoardAbi,
            functionName: 'registerOnLeaderboard',
            args: [name],
        });
        await wait();
        return true;
    } catch (e) {
        console.log(e, "============error in register leaderboard=============")
        return false
    }
}
