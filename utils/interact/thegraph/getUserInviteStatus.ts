import axios from "axios";
import { toast } from "react-toastify";

export const getUserInviteStatus = async (
    bettor: string,
) => {
    let query = `{
          bettorPredictions(
            where: {
                bettor: "${bettor}",
            }) {
            betTime
            amount
            paidAmount
            prediction
            }
    }`;

    const params = {
        query: query,
        chainId: -1,
    }

    let isSuccess;
    let canBeInvited = true;

    try {
        const res = await axios.post("/api/subgraph/returnDataFromSubgraph", params, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        let returnedData = res?.data?.data;
        if (returnedData.length > 0) {
            for (let i = 0; i < returnedData.length; i++) {
                if (returnedData[i]?.bettorPredictions.length > 0) {
                    canBeInvited = false;
                    break;
                }
            }
            isSuccess = true;
        }
    } catch (e) {
        // toast.error("Failed to fetch from subgraph. ");
        // console.log(e, "============error============");
        isSuccess = false;
    }

    return {
        isSuccess: isSuccess,
        returnedData: canBeInvited,
    };
};