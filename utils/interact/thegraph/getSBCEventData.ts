import axios from "axios";
import { toast } from "react-toastify";
import { EventStateInSBC, } from "../../config";

export const getSBCEvents = async (
    isNativeToken: boolean,
    chainId?: number
) => {
    let query = `{
        sbcevents(where: {
            state_not: ${EventStateInSBC.Completed}, 
            category_gte: ${isNativeToken ? 0 : 1},
            category_lt: ${isNativeToken ? 1 : 3}
        }) {
            id
            eventID
            description
            currentLevel
            maxPlayers
            orgFeePercent
            prizeOfEvent
            registerDeadline
            roundBetAmount
            registerAmount
            soloVote
            splitVote
            state
            totalAmount
            totalPlayers
            totalRound
            voteStartTime
            votingResult
            winnersNumber
            claimedWinnersNumber
            category
            rounds {
              currentTotalPoolAmount
              description
              noPoolAmount
              result
              startTime
              state
              yesPoolAmount
              level
              id
              playersOnRound
              playersBettedOnRound
            }
        }
    }`;

    const params = {
        query: query,
        chainId: chainId,
    }

    let returnedData = [];
    let isSuccess;

    try {
        const res = await axios.post("/api/subgraph/returnDataFromSubgraph", params, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        returnedData = res?.data?.data?.sbcevents;
        if (returnedData?.length > 0) {
            console.log("returned data: ", returnedData);
            isSuccess = true;
        } else {
            isSuccess = true;
            returnedData = [];
        }
    } catch (e) {
        // toast.error("Failed to fetch from subgraph. ");
        // console.log(e, "============error============");
        isSuccess = false;
    }

    return {
        isSuccess: isSuccess,
        eventData: returnedData,
    };
};