import axios from "axios";
import { toast } from "react-toastify";

export const getDailyEventDetailData = async (
    eventID: string,
    isNativeToken: boolean,
    chainId?: number,
) => {
    let query = `{
        dailyEvents(where: {
            eventID: "${eventID}",
            tokenType: ${isNativeToken ? 0 : 1},
        }) {
            betType
            bettingVolume
            category
            description
            eventID
            result
            startTime
            status
            subcategory
            tokenType
            sidePools {
              sideValue
              amount
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

        returnedData = res?.data?.data?.dailyEvents;
        if (returnedData?.length > 0) {
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