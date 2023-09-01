import { ethers } from "ethers";
import { toast } from "react-toastify";
import { EventResultInPM, NFTType, RoundResultInSBC } from "../config";
import { getFormattedDateString } from "../formatters";

export const getNFTTypeString = (type: NFTType) => {
    let nftTypeString = '';
    switch (type) {
        case NFTType.Normal:
            nftTypeString = 'Native Token NFT';
            break;

        case NFTType.UTBETS:
            nftTypeString = 'Utbets Token NFT';
            break;

        case NFTType.Warrior:
            nftTypeString = 'Warrior NFT';
            break;
    }

    return nftTypeString;
}

export const getDateAndTimeIntervalsAccordingToUserTimeZone = (date: Date) => {
    const timezoneOffset = new Date().getTimezoneOffset(); // returns mins of offset

    if (timezoneOffset >= 0) {
        // utc - zones: america
        const formattedStartDateString = getFormattedDateString(date, "-"); // returns "2023-02-23"
        const utcStartDate = new Date(formattedStartDateString).getTime() + timezoneOffset * 60 * 1000;
        const startTimestamp = new Date(utcStartDate).getTime() / 1000;

        const milliSecondsInEndTime = new Date(utcStartDate).getTime() + 24 * 3600 * 1000;
        const endTimeStamp = milliSecondsInEndTime / 1000;

        return {
            startTimestamp,
            endTimeStamp,
        }
    } else {
        // utc+ zones:  asia, europe, africa countries
        const formattedStartDateString = getFormattedDateString(date, "-"); // returns "2023-02-23"
        const utcStartDate = new Date(formattedStartDateString).getTime() + timezoneOffset * 60 * 1000;
        const startDateString = getFormattedDateString(new Date(utcStartDate - 1), ""); // returns "20230222"
        const startTimestamp = new Date(utcStartDate).getTime() / 1000;

        const milliSecondsInEndTime = new Date(utcStartDate).getTime() + 24 * 3600 * 1000;
        const endDateString = getFormattedDateString(new Date(milliSecondsInEndTime - 1), "");
        const endTimeStamp = milliSecondsInEndTime / 1000;

        return {
            startTimestamp,
            endTimeStamp,
        }
    }
}

export const convertBetValue2Number = (type: string, side: string) => {
    let betValueNumber = 0;
    switch (side) {
        case 'home':
            betValueNumber = EventResultInPM.Home;
            break;
        case 'draw':
            betValueNumber = EventResultInPM.Draw;
            break;
        case 'away':
            betValueNumber = EventResultInPM.Away;
            break;
        case 'yes':
            if (type == 'prediction') betValueNumber = 0;
            else betValueNumber = RoundResultInSBC.Yes;
            break;
        case 'no':
            if (type == 'prediction') betValueNumber = 1;
            else betValueNumber = RoundResultInSBC.No;
            break;
    }
    return betValueNumber;
}

export const checkIfWalletConnected = (address: string | undefined) => {
    if (!address) {
        toast.error('Please connect your wallet at first');
        return false;
    } else {
        return true;
    }
}

export const getContract = (contractAddress: string, contractAbi: any, provider: any) => {
    const contract = new ethers.Contract(contractAddress, contractAbi, provider);
    return contract;
}

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
