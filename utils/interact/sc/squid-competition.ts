import { readContract, waitForTransaction, writeContract } from "@wagmi/core";
import {parseEther} from "viem";
import {
    contractAddressesInSBC,
} from '../../config';
import { nativeTokenBetsAbiInSBC, ultibetsTokenBetsAbiInSBC } from '../../assets';

// function registerOnEvent(uint256 _eventID) external payable
export const registerOnEvent = async (
    eventID: number,
    registerAmount: number,
    chainId: number,
    isNativeToken: boolean
) => {
    try {
        const { hash } = await writeContract({
            address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
            abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
            functionName: 'registerOnEvent',
            args: isNativeToken ? [eventID] : [eventID,],
            value: isNativeToken ? parseEther((registerAmount ?? '0')?.toString()) : undefined,
        });
        const data = await waitForTransaction({ hash });
        if (data.status == "success") {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.log(e, "============error in register=============")
        return false
    }
}

// function getRegisterIDOfBettor(
//     uint256 _eventID,
//     address _bettor
// ) public view returns(uint16)
export const getRegisterIDOfBettor = async (
    eventID: number,
    chainId: number,
    isNativeToken: boolean,
    bettor: string,
) => {
    const registerID = await readContract({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: "registerIDOfBettor",
        args: [bettor, eventID,],
    });

    return registerID
}

// function placePrediction(uint256 _eventID, RoundResult _result) external payable {
export const placeBetInSBC = async (
    eventID: number,
    result: number,
    roundBetAmount: number,
    chainId: number,
    isNativeToken: boolean
) => {
    try {
        const { hash } = await writeContract({
            address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
            abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
            functionName: 'placePrediction',
            args: isNativeToken ? [eventID, result] : [eventID, result,],
            value: isNativeToken ? parseEther((roundBetAmount ?? '0')?.toString()) : undefined,
        });
        const data = await waitForTransaction({ hash });
        if (data.status == "success") {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.log(e, "============error in register=============")
        return false
    }
}

// function Vote(uint8 _playerVote, uint256 _eventID) external
export const vote = async (
    option: number,
    eventID: number,
    chainId: number,
    isNativeToken: boolean
) => {
    try {
        const { hash } = await writeContract({
            address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
            abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
            functionName: 'vote',
            args: [option, eventID],
        });
        const data = await waitForTransaction({ hash });
        if (data.status == "success") {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.log(e, "============error in vote=============")
        return false
    }
}

// function isWinner(
//     address _address,
//     uint256 _eventID,
//     uint8 _level
// ) public view returns (bool) {
export const isWinner = async (
    address: any,
    eventID: number,
    roundLevel: number,
    chainId: number,
    isNativeToken: boolean
) => {
    const result = await readContract({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: "isWinner",
        args: [address, eventID, roundLevel],
    })

    return result;
}

// mapping(address => mapping(uint256 => bool)) playersVoteState;
export const playersVoteState = async (
    eventID: number,
    address: any,
    chainId: number,
    isNativeToken: boolean
) => {
    const result = await readContract({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: "playersVoteState",
        args: [address, eventID,],
    })

    return result;
}

// mapping(uint256 => EvenEventVotetInfo) public eventVote;
export const eventVote = async (
    eventID: number,
    chainId: number,
    isNativeToken: boolean
) => {
    const result = await readContract({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: "eventVote",
        args: [eventID,],
    })

    return result;
}

// function getWinnerIDs(
//     uint256 _eventID
// ) public view returns (uint16[] memory)
export const getWinnerIDs = async (
    eventID: number,
    chainId: number,
    isNativeToken: boolean
) => {
    const result = await readContract({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: "getWinnerIDs",
        args: [eventID,],
    })

    return result;
}

// function getFinalRoundWinnersByEvent(
//     uint256 _eventID
// ) public view returns(address[] memory)
export const getFinalRoundWinnersByEvent = async (
    eventID: number,
    chainId: number,
    isNativeToken: boolean
) => {
    const result = await readContract({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: "getFinalRoundWinnersByEvent",
        args: [eventID,],
    })

    return result;
}

// function createNewEvent(
//     string memory _desc,
//     uint256 _maxPlayers,
//     uint256 _registerAmount,
//     uint256 _registerDeadline,
//     uint8 _totalRound,
//     uint256 _roundAmount,
//     uint8 _orgFeePercent,
//    // bool _isWarrior
// ) external virtual onlyAdmin {
export const createNewEvent = async (
    description: string,
    maxPlayers: number,
    registrationCost: number,
    registerDeadline: number,
    totalRound: number,
    roundBetCost: number,
    orgFeePercent: number,
    isWarrior: boolean,
    chainId: number,
    isNativeToken: boolean,
) => {
    try {
        const { hash } = await writeContract({
            
            address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
            abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
            functionName: 'createNewEvent',
            args: isNativeToken ? [
                description,
                maxPlayers,
                parseEther(registrationCost.toString()),
                registerDeadline,
                totalRound,
                parseEther(roundBetCost.toString()),
                orgFeePercent,
            ] : [
                description,
                maxPlayers,
                parseEther(registrationCost.toString()),
                registerDeadline,
                totalRound,
                parseEther(roundBetCost.toString()),
                orgFeePercent,
                isWarrior,
            ],
        });
        const data = await waitForTransaction({ hash });
        if (data.status == "success") {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.log(e, "============error in event create=============")
        return false
    }
}

// function addRound(
//     uint256 _eventID,
//     string memory _desc,
//     uint256 _startTime
// ) public onlyAdmin
export const addRound = async (
    eventID: number,
    description: string,
    startTime: number,
    chainId: number,
    isNativeToken: boolean
) => {
    try {
        const { hash } = await writeContract({
            address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
            abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
            functionName: 'addRound',
            args: [
                eventID,
                description,
                startTime,
            ],
        });
        const data = await waitForTransaction({ hash });
        if (data.status == "success") {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.log(e, "============error in add round=============")
        return false
    }
}

// function reportResult(
//     uint256 _roundID,
//     RoundResult _result
// ) public virtual onlyOracle
export const reportResultForSBCRound = async (
    roundID: number,
    result: number,
    chainId: number,
    isNativeToken: boolean
) => {
    try {
        const { hash } = await writeContract({
            address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
            abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
            functionName: 'reportResult',
            args: [
                roundID,
                result,
            ],
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

// function resultVote(uint256 _eventID) external onlyAdmin {
export const resultVote = async (
    eventID: number,
    chainId: number,
    isNativeToken: boolean
) => {
    try {
        const { hash } = await writeContract({
            address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
            abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
            functionName: 'resultVote',
            args: [
                eventID,
            ],
        });
        const data = await waitForTransaction({ hash });
        if (data.status == "success") {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.log(e, "============error in vote result=============")
        return false
    }
}

// function pickWinner(uint256 _eventID) public onlyAdmin {
export const pickWinner = async (
    eventID: number,
    chainId: number,
    isNativeToken: boolean
) => {
    try {
        const { hash } = await writeContract({
            address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
            abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
            functionName: 'pickWinner',
            args: [
                eventID,
            ],
        });
        const data = await waitForTransaction({ hash });
        if (data.status == "success") {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.log(e, "============error in pick winner=============")
        return false
    }
}

// mapping(address => mapping(uint256 => mapping(uint8 => RoundResult)))
// public bettorDecisionOnRound;
export const bettorDecisionOnRound = async (
    eventID: number,
    roundID: number,
    address: any,
    chainId: number,
    isNativeToken: boolean
) => {
    const result = await readContract({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: "bettorDecisionOnRound",
        args: [address, eventID, roundID,],
    })
    return result;
}

// function winnersClaimPrize(uint256 _eventID) public onlyAdmin {
export const winnersClaimPrize = async (
    eventID: number,
    chainId: number,
    isNativeToken: boolean
) => {
    try {
        const { hash } = await writeContract({
            address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
            abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
            functionName: 'winnersClaimPrize',
            args: [
                eventID,
            ],
        });
        const data = await waitForTransaction({ hash });
        if (data.status == "success") {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.log(e, "============error in claim prize=============")
        return false
    }
}

// function getWinnersNumber(
//     uint256 _eventID,
//     RoundResult _result
// ) external view returns (uint16 winnerNumber)

export const getWinnersNumber = async (
    eventID: number,
    result: number,
    chainId: number,
    isNativeToken: boolean
) => {
    const registerID = await readContract({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: "getWinnersNumber",
        args: [+eventID, result],
    });

    return registerID
}

///======================================= This is for warrior event only  (utbets token only)
// function registerOnWarriorEvent(
//     uint256 _eventID,
//     bytes memory _signature
// ) external

export const registerOnWarriorEvent = async (
    eventID: number,
    signature: string,
    chainId: number
) => {
    try {
        const { hash } = await writeContract({
            address: (contractAddressesInSBC as any)[chainId][1],
            abi: ultibetsTokenBetsAbiInSBC,
            functionName: 'registerOnWarriorEvent',
            args: [eventID, signature,],
        });
        const data = await waitForTransaction({ hash });
        if (data.status == "success") {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.log(e, "============error in register warrior=============")
        return false
    }
}