import {
    avalancheChainId,
    bscChainId,
    polygonChainId,
    arbitrumChainId,
    fujiChainId,
    bscTestnetChainId,
    mumbaiChainId,
    arbitrumGoerliChainId,
    subgraphurls,
} from "../../../utils/config";
const axios = require("axios");

export default async function getDataFromSubgraph(req: any, res: any) {
    const { query, chainId, } = req.body;

    if (chainId != -1 && chainId != -2) {
        let subgraphUrl = (subgraphurls as any)[chainId];

        try {
            const result = await axios.post(subgraphUrl, {
                query: query,
            });

            res.status(200).json({
                isSuccess: true,
                data: result.data.data,
            });
        } catch (error) {
            res.status(500).json({
                isSuccess: false,
                data: "",
            });
        }
    } else if (chainId == -1) {
        // only used to get if referral is wasted already
        const chainIds = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? [
            avalancheChainId, bscChainId, arbitrumChainId, polygonChainId,
        ] : [
            fujiChainId, bscTestnetChainId, arbitrumGoerliChainId, mumbaiChainId,
        ]

        let isSuccess = true;
        let data: any[] = [];
        let error;

        await chainIds.filter(item => (subgraphurls as any)[item] != '').reduce(async (promise, chainId, _1) => {
            await promise;

            //@ts-ignore
            let subgraphUrl = (subgraphurls as any)[chainId];

            try {
                const result = await axios.post(subgraphUrl, {
                    query: query,
                });

                data.push(result?.data?.data);
            } catch (error) {
                error = error;
                isSuccess = false;
            }

        }, Promise.resolve());

        if (error) {
            res.status(500).json({
                isSuccess: false,
                data: data
            });
        } else {
            res.status(200).json({
                isSuccess: true,
                data: data
            });
        }
    } else if (chainId == -2) {
        const { wallet, } = req.body;

        // only used to get if referral is wasted already
        const chainIds = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? [
            avalancheChainId, bscChainId, arbitrumChainId, polygonChainId,
        ] : [
            fujiChainId, bscTestnetChainId, arbitrumGoerliChainId, mumbaiChainId,
        ]

        let isSuccess = true;
        let data: any[] = [];
        let error;

        await chainIds.filter(item => (subgraphurls as any)[item] != '').reduce(async (promise, chainId, _1) => {
            await promise;

            let subgraphUrl = (subgraphurls as any)[chainId];

            try {
                const result = await axios.post(subgraphUrl, {
                    query: query,
                });

                data.push({
                    [chainId]: {
                        ...(result?.data?.data),
                    }
                });
            } catch (error) {
                error = error;
                isSuccess = false;
            }

        }, Promise.resolve());

        if (error) {
            res.status(500).json({
                isSuccess: false,
                data: data
            });
        } else {
            res.status(200).json({
                isSuccess: true,
                data: data
            });
        }
    }
}
