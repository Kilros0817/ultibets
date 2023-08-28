import axios from "axios";

export const getLPTokenStakeData = async (
    address: string,
) => {
    let query = `{
            stakeInfos (where: {id: "${address}"}) {
              id
              nuClaimedAmount
              nuStakeAmount
              uuClaimedAmount
              uuStakeAmount
            }
        }`;

    const params = {
        query: query,
        chainId: -2,
        wallet: address,
    }

    let isSuccess;
    let data = {};
    
    try {
        const res = await axios.post("/api/subgraph/returnDataFromSubgraph", params, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        let returnedData = res?.data?.data;

        if (returnedData.length > 0) {

            for (let i = 0; i < returnedData.length; i++) {
                Object.entries(returnedData[i]).map(([key, value]) => {
                    data = {
                        ...data, [key]: value,
                    }
                })
                console.log("data: =====================", data);
            }
            isSuccess = true;
        }
    } catch (e) {
        // toast.error("Failed to fetch from subgraph. ");
        console.log(e, "============error============");
        isSuccess = false;
    }

    return {
        isSuccess: isSuccess,
        returnedData: {
            data
        },
    };
};