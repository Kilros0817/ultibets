import axios from "axios";

export const getDailyEventData = async (
    isNativeToken: boolean,
    category: number,
    startTimestamp: number,
    endTimeStamp: number,
    eventStatusInPM: number, //0 : open, 1: cancel, 2: end
    chainId?: number,
) => {
    let query;

    if (category == 0) {
        query = `{
            dailyEvents(where: {
                tokenType: ${isNativeToken ? 0 : 1},
                startTime_gte: "${startTimestamp}",
                startTime_lt: "${endTimeStamp}",
                status: ${eventStatusInPM},
            }) {
                eventID
                betType
                bettingVolume
                category
                description
                id
                result
                startTime
                status
                subcategory
                tokenType
              }
        }`;
    } else {
        query = `{
            dailyEvents(where: {
                tokenType: ${isNativeToken ? 0 : 1},
                category:  ${category},
                startTime_gte: "${startTimestamp}",
                startTime_lt: "${endTimeStamp}",
                status: ${eventStatusInPM},
            }) {
                eventID
                betType
                bettingVolume
                category
                description
                id
                result
                startTime
                status
                subcategory
                tokenType
              }
        }`;
    }

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
            console.log("returned data: ", returnedData);
            isSuccess = true;
        } else {
            isSuccess = true;
            returnedData = [];
        }
    } catch (e) {
        // toast.error("Failed to fetch from subgraph. ");
        console.log(e, "============error============");
        isSuccess = false;
    }

    return {
        isSuccess: isSuccess,
        returnedData: returnedData,
    };
};