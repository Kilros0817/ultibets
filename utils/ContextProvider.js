import { useState } from "react";
import { ChainContext } from "./Context";

const ContextProvider = ({ children }) => {
    const [isNativeToken, setIsNativeToken] = useState(true);
    const [prediction, setPrediction] = useState({
        sideToPredict: {
            'soccer': 'home',
            'basketball': 'home',

            'us-football': 'home',
            'tennis': 'yes',
            'combat-sports': 'home',

            'motor-sports': 'home',
            'cryptos': 'yes',
            'stocks': 'yes',

            'politics': 'yes',
            'movies-tv-Series': 'home',
            'music': 'home',

            'sbc': 'yes',
        }
    });
    const [sbc, setSbc] = useState({
        playerId: 456,
        remainingPlayers: [
            400, // registration
            350, // round 1
            300, // round 2
            250, // round 3
            200, // round 4
            150, // round 5
            100, // final vote
        ],
        sideToPredict: "yes",
        currentPrizePool: "yes",
    });
    const [myPredictionDataSelectedDate, setMyPredictionDataSelectedDate] = useState(new Date());
    const [predictionMarketSelectedDate, setPredictionMarketSelectedDate] = useState(new Date());
    const [adminSelectedDate, setAdminSelectedDate] = useState(new Date());
    const [shouldRender, setShouldRender] = useState(false);
    const [categoryInPM, setCategoryInPM] = useState(0);
    const [subCategoryInPM, setSubCategoryInPM] = useState(0);
    const [currentPMEventID, setCurrentPMEventID] = useState(0);
    const [referral, setReferral] = useState('');

    return (
        <ChainContext.Provider
            value={{
                isNativeToken,
                setIsNativeToken,
                prediction,
                setPrediction,
                sbc,
                setSbc,
                myPredictionDataSelectedDate,
                setMyPredictionDataSelectedDate,
                predictionMarketSelectedDate,
                setPredictionMarketSelectedDate,
                adminSelectedDate,
                setAdminSelectedDate,
                shouldRender,
                setShouldRender,
                categoryInPM,
                setCategoryInPM,
                subCategoryInPM,
                setSubCategoryInPM,
                currentPMEventID,
                setCurrentPMEventID,
                referral,
                setReferral,
            }}
        >
            {children}
        </ChainContext.Provider>
    );
};

export default ContextProvider;