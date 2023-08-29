import { waitForTransaction, writeContract } from "@wagmi/core";
import {parseEther} from "viem";
import {
    contractAddressesInDailyBets,
} from '../../config';
import { nativeTokenDailyBetsAbiInPM, ultibetsTokenDailyBetsAbiInPM } from '../../assets';

// function placePrediction(uint256 _eventID, EventResultInPM _eventValue)
export const placeBetInPM = async (
    eventID: number,
    _eventValue: number,
    newBetAmount: number | null,
    referer: string,
    signature: string,
    address: any,
    chainId: number,
    isNativeToken: boolean
) => {
    try {
        const { hash } = await writeContract({
            address: (contractAddressesInDailyBets as any)[chainId][isNativeToken ? 0 : 1],
            abi: isNativeToken ? nativeTokenDailyBetsAbiInPM : ultibetsTokenDailyBetsAbiInPM,
            functionName: 'placePrediction',
            args: isNativeToken ? [
                eventID,
                _eventValue,
            ] : [
                eventID,
                _eventValue,
                parseEther((newBetAmount ?? 0).toString()),
                referer != '' ? referer : address,
                signature,
            ],
            value: isNativeToken ? parseEther((newBetAmount ?? 0)?.toString()) : undefined,
        });
        const data = await waitForTransaction({ hash });
        if (data.status == "success") {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.log(e, "============error in place sbc=============")
        return false
    }
}

// function placePredictionUsingPerk(
//     uint256 _eventID,
//     EventResult _eventValue,
//     uint8 _perkRound
// ) external {}
export const placeBetUsingPerk = async (
    eventID: number,
    eventValue: number,
    perkRound: number,
    chainId: number
) => {
    try {
        const { hash } = await writeContract({
            address: (contractAddressesInDailyBets as any)[chainId][1],
            abi: ultibetsTokenDailyBetsAbiInPM,
            functionName: 'placePredictionUsingPerk',
            args: [
                eventID,
                eventValue,
                perkRound,
            ],
        });
        const data = await waitForTransaction({ hash });
        if (data.status == "success") {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.log(e, "============error in place perk bet=============")
        return false
    }
}

// function withdrawGain(uint256 _eventID, uint8 _betValue)
export const widthdrawGain = async (
    eventID: number,
    _betValue: number,
    chainId: number,
    isNativeToken: boolean
) => {
    try {
        const { hash } = await writeContract({
            address: (contractAddressesInDailyBets as any)[chainId][isNativeToken ? 0 : 1],
            abi: isNativeToken ? nativeTokenDailyBetsAbiInPM : ultibetsTokenDailyBetsAbiInPM,
            functionName: 'withdrawGain',
            args: [eventID, _betValue]
        });
        const data = await waitForTransaction({ hash });
        if (data.status == "success") {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.log(e, "============error in withdraw gain=============")
        return false
    }
}

// function cancelEvent(uint256 _eventID) external onlyAdmin {
export const cancelEvent = async (
    eventID: number,
    chainId: number,
    isNativeToken: boolean
) => {
    try {
        const { hash } = await writeContract({
            address: (contractAddressesInDailyBets as any)[chainId][isNativeToken ? 0 : 1],
            abi: isNativeToken ? nativeTokenDailyBetsAbiInPM : ultibetsTokenDailyBetsAbiInPM,
            functionName: 'cancelEvent',
            args: [eventID]
        });
        const data = await waitForTransaction({ hash });
        if (data.status == "success") {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.log(e, "============error in cancel event=============")
        return false
    }
}

//     function addEvent(
//     string memory _description,
//     uint8 _category,
//     uint8 _subcategory,
//     uint256 _eventStartTime,
//     uint256 _eventDate
// ) public onlyAdmin {

export const addEvent = async (
    description: string,
    category: number,
    subcategory: number,
    eventStartTime: number,
    chainId: number,
    isNativeToken: boolean
) => {
    try {
        const { hash } = await writeContract({
            address: (contractAddressesInDailyBets as any)[chainId][isNativeToken ? 0 : 1],
            abi: isNativeToken ? nativeTokenDailyBetsAbiInPM : ultibetsTokenDailyBetsAbiInPM,
            functionName: 'addEvent',
            args: [description,
                category,
                subcategory,
                eventStartTime,]
        });
        const data = await waitForTransaction({ hash });
        if (data.status == "success") {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.log(e, "============error in add event=============")
        return false
    }
}

// function reportResult(uint256 _eventID, EventResultInPM _result)
export const reportResult = async (
    eventID: number,
    _result: number,
    chainId: number,
    isNativeToken: boolean
) => {
    try {
        const { hash } = await writeContract({
            address: (contractAddressesInDailyBets as any)[chainId][isNativeToken ? 0 : 1],
            abi: isNativeToken ? nativeTokenDailyBetsAbiInPM : ultibetsTokenDailyBetsAbiInPM,
            functionName: 'reportResult',
            args: [eventID, _result,],
        });
        const data = await waitForTransaction({ hash });
        if (data.status == "success") {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.log(e, "============error in report result=============")
        return false
    }
}

// function claimBetCancelled(uint256 _eventID, EventResultInPM _EventResultInPM)
export const claimBetCancelled = async (
    eventID: number,
    _result: number,
    chainId: number,
    isNativeToken: boolean
) => {
    try {
        const { hash } = await writeContract({
            address: (contractAddressesInDailyBets as any)[chainId][isNativeToken ? 0 : 1],
            abi: isNativeToken ? nativeTokenDailyBetsAbiInPM : ultibetsTokenDailyBetsAbiInPM,
            functionName: 'claimBetCancelled',
            args: [eventID, _result,],
        });
        const data = await waitForTransaction({ hash });
        if (data.status == "success") {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.log(e, "============error in claim bet=============")
        return false
    }
}

