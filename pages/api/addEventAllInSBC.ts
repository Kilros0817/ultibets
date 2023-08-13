const ethers = require("ethers");
import {
    nativeTokenBetsAbiInSBC,
    ultibetsTokenBetsAbiInSBC
} from '../../utils/assets';
import {
    bscTestnetChainId,
    chainRPCs,
    contractAddressesInSBC,
    opGoerliChainId,
    fujiChainId,
    mumbaiChainId,
} from '../../utils/config';
import { delay } from '../../utils/interact/utility';

export const addEventInPM = async (req: any, res: any) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');

    const chainParams = {
        "testnet": {
            mumbaiChainId: {
                chainId: mumbaiChainId,
                // rpc: (chainRPCs as any)[mumbaiChainId],
                rpc: 'https://polygon-mumbai.blockpi.network/v1/rpc/public',
                contractAddressForNativeToken: contractAddressesInSBC[mumbaiChainId][0],
                contractAddressForUtbetsToken: contractAddressesInSBC[mumbaiChainId][1],
            },
            bscTestnetChainId: {
                chainId: bscTestnetChainId,
                // rpc: (chainRPCs as any)[bscTestnetChainId],
                rpc: 'https://bsc-testnet.public.blastapi.io',
                contractAddressForNativeToken: contractAddressesInSBC[bscTestnetChainId][0],
                contractAddressForUtbetsToken: contractAddressesInSBC[bscTestnetChainId][1],
            },
            opGoerliChainId: {
            chainId: opGoerliChainId,
                rpc: (chainRPCs as any)[opGoerliChainId],
                contractAddressForNativeToken: contractAddressesInSBC[opGoerliChainId][0],
                contractAddressForUtbetsToken: contractAddressesInSBC[opGoerliChainId][1],
            },
            fujiChainId: {
                chainId: fujiChainId,
                // rpc: (chainRPCs as any)[fujiChainId],
                rpc: 'https://avalanche-fuji-c-chain.publicnode.com',
                contractAddressForNativeToken: contractAddressesInSBC[fujiChainId][0],
                contractAddressForUtbetsToken: contractAddressesInSBC[fujiChainId][1],
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
                abi: nativeTokenBetsAbiInSBC,
            },
            {
                isNative: false,
                address: chainParam?.contractAddressForUtbetsToken,
                abi: ultibetsTokenBetsAbiInSBC,
            }
        ]

        await contracts.reduce(async (promise1, contractItem, _2) => {
            await promise1;

            const key = contractItem.isNative ? `${chainParam.chainId}a` : `${chainParam.chainId}b`;
            try {
                let contractAddress = contractItem?.address;
                console.log("contract address: ", contractAddress);

                const contract = new ethers.Contract(contractAddress, contractItem?.abi, provider.getSigner(wallet.address));

                let unsignedTx;
                if (contractItem.isNative) {
                    unsignedTx = await contract.populateTransaction.createNewEvent(
                        data.description,
                        data.maxPlayers,
                        ethers.utils.parseEther(data.registrationCost.toString()),
                        data.registerDeadline,
                        data.totalRound,
                        ethers.utils.parseEther(data.roundBetCost.toString()),
                        data.orgFeePercent,
                    );
                } else {
                    unsignedTx = await contract.populateTransaction.createNewEvent(
                        data.description,
                        data.maxPlayers,
                        ethers.utils.parseEther(data.registrationCost.toString()),
                        data.registerDeadline,
                        data.totalRound,
                        ethers.utils.parseEther(data.roundBetCost.toString()),
                        data.orgFeePercent,
                        data.isWarrior,
                    );
                }

                const tx = await wallet.sendTransaction(unsignedTx);
                await tx.wait();
                await delay(1000);

                receipt.push({
                    [`${key}`]: true,
                })
            } catch (error) {
                console.log("error: ", error);
                error = error;

                receipt.push({
                    [`${key}`]: false,
                })
            }
        }, Promise.resolve())
    }))

    console.log("===========================: receipt: ", receipt);

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
export default addEventInPM;