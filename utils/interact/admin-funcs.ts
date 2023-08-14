import axios from 'axios';
import { delay } from '../../utils/interact/utility';
import { toast } from 'react-toastify';
import { newChainAttrs } from '../config';

// function approve(address spender, uint256 amount) public virtual override returns (bool) {
export const addEvents = async (
    data: any
) => {
    const callArr = [
        {
            isNative: true,
        },
        {
            isNative: false
        }
    ]
    if (data.repeatLevel == 1) {

        await callArr.reduce(async (promise1, callItem, _2) => {
            await promise1;

            const key = callItem.isNative ? `${data.chainId}a` : `${data.chainId}b`;
            const requestBody = {
                info: data,
                isNative: callItem.isNative
            }
            const response = (await axios.post(
                '/api/addEventPM',
                requestBody,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )).data;

            if (response.isSuccess) {
                toast.success(`${(newChainAttrs as any)[data.chainId].name} - ${callItem.isNative ? "Native" : "UTBETS"} deployed.`);
            } else {
                toast.warn(`${(newChainAttrs as any)[data.chainId].name} - ${callItem.isNative ? "Native" : "UTBETS"} failed.`);
            }
            await delay(5000);

        }, Promise.resolve())

    } else if (data.repeatLevel == 2) {
        const chainIds = {
            "testnet": [43113, 420, 80001, 97],
            "mainnet": [43114, 56, 10, 137]
        }

        const currentChainIds = (chainIds as any)[`${process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET}`];
        await Promise.all(Object.values(currentChainIds).map(async (chainId: any) => {
            await callArr.reduce(async (promise1, callItem, _2) => {
                await promise1;
                data.chainId = chainId;
                const requestBody = {
                    info: data,
                    isNative: callItem.isNative
                }
                const response = (await axios.post(
                    '/api/addEventPM',
                    requestBody,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )).data;

                if (response.isSuccess) {
                    toast.success(`${(newChainAttrs as any)[chainId].name} - ${callItem.isNative ? "Native" : "UTBETS"} deployed.`);
                } else {
                    toast.warn(`${(newChainAttrs as any)[chainId].name} - ${callItem.isNative ? "Native" : "UTBETS"} failed.`);
                }

                await delay(5000);

            }, Promise.resolve())
        }))
    }
}
