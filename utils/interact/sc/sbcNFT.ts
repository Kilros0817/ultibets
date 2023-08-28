import { readContract, writeContract } from "@wagmi/core";
import {
    nftClaimerContract,
    NFTType,
} from '../../config';
import { nftClaimerAbi } from '../../assets';

// function massClaimSBCNFT() public {}
export const massClaimSBCNFT = async (
    chainId: number
) => {
    try {
        const { wait } = await writeContract({
            mode: "recklesslyUnprepared",
            address: (nftClaimerContract as any)[chainId],
            abi: nftClaimerAbi,
            functionName: 'massClaimSBCNFT',
            args: [],
        });
        await wait();
        return true;
    } catch (e) {
        console.log(e, "============error in claim nfts=============")
        return false
    }
}

//function claimFreeBetPerk(uint256 _tokenID) external {}
export const claimFreeBetPerk = async (
    tokenId: any,
    chainId: number
) => {
    try {
        const { wait } = await writeContract({
            mode: "recklesslyUnprepared",
            address: (nftClaimerContract as any)[chainId],
            abi: nftClaimerAbi,
            functionName: 'claimFreeBetPerk',
            args: [tokenId],
        });
        await wait();
        return true;
    } catch (e) {
        console.log(e, "============error in claim free perk=============")
        return false
    }
}

// function setRoundNFTURI(
//     NFTType _type,
//     uint256 _eventID,
//     uint8 _level,
//     string memory _uri
// ) external onlyOwner
export const setRoundNFTURI = async (
    type: NFTType,
    eventID: number,
    level: number,
    uri: string,
    chainId: number
) => {
    try {
        const { wait } = await writeContract({
            mode: "recklesslyUnprepared",
            address: (nftClaimerContract as any)[chainId],
            abi: nftClaimerAbi,
            functionName: 'setRoundNFTURI',
            args: [
                type,
                eventID,
                level,
                uri,
            ],
        });
        await wait();
        return true;
    } catch (e) {
        console.log(e, "============error in set round NFT URI=============")
        return false
    }
}

// function getNumberOfClaimedPerks(
//     address _holder
// ) external view returns (uint16[] memory)
export const getNumberOfClaimedPerks = async (
    address: any,
    chainId: number,
) => {
    const result = await readContract({
        address: (nftClaimerContract as any)[chainId],
        abi: nftClaimerAbi,
        functionName: "getNumberOfClaimedPerks",
        args: [address],
    })

    return result;
}