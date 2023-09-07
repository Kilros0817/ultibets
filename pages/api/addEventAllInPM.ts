import {ethers} from 'ethers'
import {
    nativeTokenDailyBetsAbiInPM,
    ultibetsTokenDailyBetsAbiInPM
} from '../../utils/assets';
import {
    bscTestnetChainId,
    chainRPCs,
    contractAddressesInDailyBets,
    arbitrumGoerliChainId,
    fujiChainId,
    mumbaiChainId,
} from '../../utils/config';
import { delay } from '../../utils/interact/utility';

export const addEventAllInPM = async (req: any, res: any) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');

    const chainParams = {
        "testnet": {
            mumbaiChainId: {
                chainId: mumbaiChainId,
                rpc: (chainRPCs as any)[mumbaiChainId],
                // rpc: 'https://polygon-mumbai.blockpi.network/v1/rpc/public',
                contractAddressForNativeToken: contractAddressesInDailyBets[mumbaiChainId][0],
                contractAddressForUtbetsToken: contractAddressesInDailyBets[mumbaiChainId][1],
            },
            bscTestnetChainId: {
                chainId: bscTestnetChainId,
                rpc: (chainRPCs as any)[bscTestnetChainId],
                // rpc: 'https://bsc-testnet.public.blastapi.io',
                contractAddressForNativeToken: contractAddressesInDailyBets[bscTestnetChainId][0],
                contractAddressForUtbetsToken: contractAddressesInDailyBets[bscTestnetChainId][1],
            },
            arbitrumGoerliChainId: {
            chainId: arbitrumGoerliChainId,
                rpc: (chainRPCs as any)[arbitrumGoerliChainId],
                contractAddressForNativeToken: contractAddressesInDailyBets[arbitrumGoerliChainId][0],
                contractAddressForUtbetsToken: contractAddressesInDailyBets[arbitrumGoerliChainId][1],
            },
            fujiChainId: {
                chainId: fujiChainId,
                rpc: (chainRPCs as any)[fujiChainId],
                // rpc: 'https://avalanche-fuji-c-chain.publicnode.com',
                contractAddressForNativeToken: contractAddressesInDailyBets[fujiChainId][0],
                contractAddressForUtbetsToken: contractAddressesInDailyBets[fujiChainId][1],
            },
        },

        "mainnet": [

        ]
    }

    let receipt: any = [];
    let error;

    let currentChainParams = (chainParams as any)[process?.env?.MAINNET_OR_TESTNET!];
    const data = req.body

    if (data.repeatLevel == 1) {
        //single chain 
        currentChainParams = (Object.entries(currentChainParams).filter(([key, value]) => (value as any).chainId == data.chainId))[0];
        currentChainParams = {
            [data.chainId]: currentChainParams[1]
        }
    }

    await Promise.all(Object.values(currentChainParams).map(async (chainParam: any) => {
        const provider = new ethers.providers.JsonRpcProvider(chainParam?.rpc);
        const wallet = new ethers.Wallet(`0x${process.env.ADMIN_WALLET_PRIVATE_KEY}`, provider);

        const contracts = [
            {
                isNative: true,
                address: chainParam?.contractAddressForNativeToken,
                abi: nativeTokenDailyBetsAbiInPM,
            },
            {
                isNative: false,
                address: chainParam?.contractAddressForUtbetsToken,
                abi: ultibetsTokenDailyBetsAbiInPM,
            }
        ]

        await contracts.reduce(async (promise1, contractItem, _2) => {
            await promise1;

            const key = contractItem.isNative ? `${chainParam.chainId}a` : `${chainParam.chainId}b`;
            try {
                let contractAddress = contractItem?.address;

                const contract = new ethers.Contract(contractAddress, contractItem?.abi, provider.getSigner(wallet.address));

                const unsignedTx = await contract.populateTransaction.addEvent(
                    data.description,
                    data.category,
                    data.subcategory,
                    data.eventStartTime,
                );

                const tx = await wallet.sendTransaction(unsignedTx);

                await tx.wait();

                await delay(5000);

                receipt.push({
                    [`${key}`]: true,
                })
            } catch (error) {
                error = error;
                receipt.push({
                    [`${key}`]: false,
                })
            }
        }, Promise.resolve())
    }))

    if (error) {
        res.status(500).json({
            isSuccess: false,
            result: receipt,
        });
    } else {
        res.status(200).json({
            isSuccess: true,
            result: receipt,
        });
    }
}
export default addEventAllInPM;