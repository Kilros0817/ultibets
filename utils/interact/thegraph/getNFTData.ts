import axios from "axios";
import { toast } from "react-toastify";

export const getNFTData = async (
    address: string,
    chainId?: number,
) => {
    // console.log("address: ", address);

    let query = `{
        sbcnfts(where: {owner: "${address}"}) {
            id
            owner
            tokenURI
            eventID
            isClaimed
            isFreeBet
            roundLevel
            blockTimestamp
            totalPlayers
            remainPlayers
            type
        }
    }`;

    const params = {
        query: query,
        chainId: chainId,
    }

    let returnedData;
    let isSuccess;

    try {
        const res = await axios.post("/api/subgraph/returnDataFromSubgraph", params, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        returnedData = res?.data?.data?.sbcnfts;

        console.log("returned data: ==========", returnedData);

        if (returnedData?.length > 0) {
            console.log("nft data: ", returnedData);

            isSuccess = true;
        } else {
            isSuccess = false;
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