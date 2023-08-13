import axios from "axios";
import { toast } from "react-toastify";

export const getUserBetDataInPM = async (
    bettor: string,
    isNativeToken: boolean,
    chainId?: number,
) => {
    let query = `{
          bettorPredictions(
            where: {
                bettor: "${bettor}",
                event_: {
                    tokenType:  ${isNativeToken ? 0 : 1},
                }
            }) {
            betTime
            amount
            paidAmount
            prediction
            event {
                eventID
                description
                result
                tokenType
                status
                betType
                sidePools {
                    sideValue
                    amount
                }
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

        returnedData = res?.data?.data?.bettorPredictions;
        console.log("returned data: ", returnedData);

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
        returnedData: returnedData,
    };
};