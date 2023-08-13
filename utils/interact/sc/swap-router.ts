import {
    Address,
    useAccount,
    useContractRead,
    useContractWrite,
    useNetwork,
    usePrepareContractWrite,
    useWaitForTransaction,
} from 'wagmi';
import {
    uniswapV2Router02routerAddresses,
    mumbaiChainId,
    polygonChainId,
    wrappedNativeTokenAddresses,
    utbetsTokenAddresses,
    secondsIn15Mins,
    usdcAddresses,
    avalancheChainId,
    newChainAttrs,
} from '../../config';
import { uniswapV2Router02Abi } from '../../assets';
import { BigNumber, ethers } from 'ethers';

// function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts);
export const useGetAmountsOut = (
    amount: number,
    inputToken: string,
    outputToken: string,
) => {
    const { chain } = useNetwork();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { data: getAmountsOut, error, isLoading } = useContractRead({
        address: (uniswapV2Router02routerAddresses as any)[chainId],
        abi: uniswapV2Router02Abi,
        functionName: "getAmountsOut",
        cacheTime: 2_000,
        args: [
            ethers.utils.parseEther(amount.toString()),
            [
                inputToken,
                outputToken,
            ]
        ],
        watch: true,
        chainId: chainId,
        onSuccess() {
            console.log("getting amount out success")
        },
        onError(error: any) {
            console.log("error occured in getting amount out: ", error);
        }
    });

    return {
        status: error == undefined ? true : false,
        result: getAmountsOut,
        isLoading,
    }
}

// function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
// external
// payable
// returns (uint[] memory amounts);
// native token -> utbets token
export const useSwapExactETHForTokens = (
    amount: number,
) => {
    const { chain } = useNetwork();
    const { address, } = useAccount();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (uniswapV2Router02routerAddresses as any)[chainId],
        abi: uniswapV2Router02Abi,
        functionName: 'swapExactETHForTokens',
        cacheTime: 2_000,
        args: [
            0,
            [
                (wrappedNativeTokenAddresses as any)[chainId],
                (utbetsTokenAddresses as any)[chainId],
            ],
            address ?? '0x0',
            Math.round(Date.now() / 1000 + secondsIn15Mins),
        ],
        overrides: {
            value: ethers.utils.parseEther((amount == null ? 0 : amount)?.toString()),
            gasLimit: BigNumber.from(3000000),
        },
        onSuccess(data) {
            console.log('prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('prepare contract write Error for native to utbets', prepareError)
        },
    })
    const { write: swapExactETHForTokensFunction, data } = useContractWrite(config)
    const { isLoading, isSuccess, isError, error, } = useWaitForTransaction({
        hash: data?.hash,
        cacheTime: 2_000,
        onSuccess(data) {
            console.log("wait for transaction success: ", data);
        },
        onError(error) {
            console.log('wait for transaction result error: ', error);
        },
    })

    return {
        status: error == undefined ? true : false,
        isLoading,
        swapExactETHForTokensFunction,
        isSuccess,
    }
}

// swapExactTokensForETH(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline)
// utbets token -> native token
export const useSwapExactTokensForETH = (
    amount: number,
) => {
    const { chain } = useNetwork();
    const { address, } = useAccount();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (uniswapV2Router02routerAddresses as any)[chainId],
        abi: uniswapV2Router02Abi,
        functionName: 'swapExactTokensForETH',
        cacheTime: 2_000,
        args: [
            ethers.utils.parseEther(amount.toString()),
            0,
            [
                (utbetsTokenAddresses as any)[chainId],
                (wrappedNativeTokenAddresses as any)[chainId],
            ],
            address ?? '0x0',
            Math.round(Date.now() / 1000 + secondsIn15Mins),
        ],
        overrides: {
            gasLimit: BigNumber.from(3000000),
        },
        onSuccess(data) {
            console.log('prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('prepare contract write Error', prepareError)
        },
    })
    const { write: swapExactTokensForETHFunction, data } = useContractWrite(config)
    const { isLoading, isSuccess, isError, error, } = useWaitForTransaction({
        hash: data?.hash,
        cacheTime: 2_000,
        onSuccess(data) {
            console.log("wait for transaction success: ", data);
        },
        onError(error) {
            console.log('wait for transaction result error: ', error);
        },
    })

    return {
        status: error == undefined ? true : false,
        isLoading,
        swapExactTokensForETHFunction,
        isSuccess,
    }
}


// swapExactTokensForTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline)
// utbets token -> usdc, usdc -> utbets
export const useSwapExactTokensForTokens = (
    amount: number,
    paymentTokenIndex: number,
) => {
    const { chain } = useNetwork();
    const { address, } = useAccount();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (uniswapV2Router02routerAddresses as any)[chainId],
        abi: uniswapV2Router02Abi,
        functionName: 'swapExactTokensForTokens',
        cacheTime: 2_000,
        args: [
            ethers.utils.parseEther(amount.toString()),
            0,
            [
                paymentTokenIndex == 0 ? (utbetsTokenAddresses as any)[chainId] : (usdcAddresses as any)[chainId],
                paymentTokenIndex == 0 ? (usdcAddresses as any)[chainId] : (utbetsTokenAddresses as any)[chainId],
            ],
            address ?? '0x0',
            Math.round(Date.now() / 1000 + secondsIn15Mins),
        ],
        overrides: {
            gasLimit: BigNumber.from(3000000),
        },
        onSuccess(data) {
            console.log('prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('prepare contract write Error', prepareError)
        },
    })
    const { write: swapExactTokensForTokensFunction, data } = useContractWrite(config)
    const { isLoading, isSuccess, isError, error, } = useWaitForTransaction({
        hash: data?.hash,
        cacheTime: 2_000,
        onSuccess(data) {
            console.log("wait for transaction success: ", data);
        },
        onError(error) {
            console.log('wait for transaction result error: ', error);
        },
    })

    return {
        status: error == undefined ? true : false,
        isLoading,
        swapExactTokensForTokensFunction,
        isSuccess,
    }
}

// function approve(address spender, uint256 amount) public virtual override returns (bool) {
export const useApprove = (
    tokenAddress: any,
    spender: string,
    amount: string,
    isUsdc?: boolean,
) => {
    const { chain } = useNetwork();
    const { address, } = useAccount();

    const { config, error: prepareError } = usePrepareContractWrite({
        address: tokenAddress,
        abi: [{
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },],
        functionName: 'approve',
        cacheTime: 2_000,
        args: [
            //@ts-ignore
            spender,
            (isUsdc && chain?.id == avalancheChainId) ? ethers.BigNumber.from(Math.round(Number(amount))).mul((ethers.BigNumber.from(10)).pow(6))
                : ethers.utils.parseEther(amount),
        ],
        overrides: {
            gasLimit: BigNumber.from(3000000),
        },
        onSuccess(data) {
            console.log('prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('prepare contract write Error', prepareError)
        },
    })
    const { write: approveFunction, data } = useContractWrite(config)
    const { isLoading, isSuccess, isError, error, } = useWaitForTransaction({
        hash: data?.hash,
        cacheTime: 2_000,
        onSuccess(data) {
            console.log("wait for transaction success: ", data);
        },
        onError(error) {
            console.log('wait for transaction result error: ', error);
        },
    })

    return {
        status: error == undefined ? true : false,
        isLoading,
        approveFunction,
        isSuccess,
    }
}

// function addLiquidity(
//     address tokenA,
//     address tokenB,
//     uint amountADesired,
//     uint amountBDesired,
//     uint amountAMin,
//     uint amountBMin,
//     address to,
//     uint deadline
// ) external returns(uint amountA, uint amountB, uint liquidity);
export const useAddLiquidity = (
    tokenA: string,
    tokenB: string,
    amountADesired: string,
    amountBDesired: string,
    isTokenBUsdc: boolean,
    amountAMin?: string,
    amountBMin?: string,
    to?: string,
    deadline?: number
) => {
    const { chain } = useNetwork();
    const { address, } = useAccount();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (uniswapV2Router02routerAddresses as any)[chainId],
        abi: uniswapV2Router02Abi,
        functionName: 'addLiquidity',
        cacheTime: 2_000,
        args: [
            tokenA,
            tokenB,
            ethers.utils.parseEther(amountADesired),
            (isTokenBUsdc && chainId == avalancheChainId) ? ethers.BigNumber.from(Math.round(Number(amountBDesired))).mul((ethers.BigNumber.from(10)).pow(6)) : ethers.utils.parseEther(amountBDesired),
            ethers.utils.parseEther(amountAMin ?? '0'),
            (isTokenBUsdc && chainId == avalancheChainId) ? ethers.BigNumber.from(Math.round(Number(amountBMin ?? '0'))).mul((ethers.BigNumber.from(10)).pow(6)) : ethers.utils.parseEther(amountBMin ?? '0'),
            to ?? address,
            deadline ?? Math.round(Date.now() / 1000) + secondsIn15Mins,
        ],
        overrides: {
            gasLimit: BigNumber.from('3000000'),
        },
        onSuccess(data) {
            console.log('prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('prepare contract write Error', prepareError)
        },
    })
    const { write: addLiquidityFunction, data } = useContractWrite(config)
    const { isLoading, isSuccess, isError, error, } = useWaitForTransaction({
        hash: data?.hash,
        cacheTime: 2_000,
        onSuccess(data) {
            console.log("wait for transaction success: ", data);
        },
        onError(error) {
            console.log('wait for transaction result error: ', error);
        },
    })

    return {
        status: error == undefined ? true : false,
        isLoading,
        addLiquidityFunction,
        isSuccess,
    }
}

// function addLiquidityETH(
//     address token,
//     uint amountTokenDesired,
//     uint amountTokenMin,
//     uint amountETHMin,
//     address to,
//     uint deadline
// ) external payable returns(uint amountToken, uint amountETH, uint liquidity);
export const useAddLiquidityETH = (
    token: string,
    amountTokenDesired: string,
    amountOfNativeToken: string,
    amountTokenMin?: string,
    amountETHMin?: string,
    to?: string,
    deadline?: number
) => {
    const { chain } = useNetwork();
    const { address, } = useAccount();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (uniswapV2Router02routerAddresses as any)[chainId],
        abi: uniswapV2Router02Abi,
        functionName: 'addLiquidityETH',
        cacheTime: 2_000,
        args: [
            token,
            ethers.utils.parseEther(amountTokenDesired),
            ethers.utils.parseEther(amountTokenMin ?? '0'),
            ethers.utils.parseEther(amountETHMin ?? '0'),
            to ?? address,
            deadline ?? Math.round(Date.now() / 1000) + secondsIn15Mins,
        ],
        overrides: {
            value: ethers.utils.parseEther(amountOfNativeToken),
            gasLimit: BigNumber.from(3000000),
        },
        onSuccess(data) {
            console.log('===========prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('===========prepare contract write Error', prepareError)
        },
    })
    const { write: addLiquidityETHFunction, data } = useContractWrite(config)
    const { isLoading, isSuccess, isError, error, } = useWaitForTransaction({
        hash: data?.hash,
        cacheTime: 2_000,
        onSuccess(data) {
            console.log("wait for transaction success: ", data);
        },
        onError(error) {
            console.log('wait for transaction result error: ', error);
        },
    })

    return {
        status: error == undefined ? true : false,
        isLoading,
        addLiquidityETHFunction,
        isSuccess,
    }
}

// function removeLiquidity(
//     address tokenA,
//     address tokenB,
//     uint liquidity,
//     uint amountAMin,
//     uint amountBMin,
//     address to,
//     uint deadline
// ) external returns(uint amountA, uint amountB);
export const useRemoveLiquidity = (
    tokenA: string,
    tokenB: string,
    liquidity: string,
    amountAMin?: string,
    amountBMin?: string,
    to?: string,
    deadline?: number
) => {
    const { chain } = useNetwork();
    const { address, } = useAccount();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (uniswapV2Router02routerAddresses as any)[chainId],
        abi: uniswapV2Router02Abi,
        functionName: 'removeLiquidity',
        cacheTime: 2_000,
        args: [
            tokenA,
            tokenB,
            ethers.utils.parseEther(liquidity),
            ethers.utils.parseEther(amountAMin ?? '0'),
            ethers.utils.parseEther(amountBMin ?? '0'),
            to ?? address,
            deadline ?? Math.round(Date.now() / 1000) + secondsIn15Mins,
        ],
        overrides: {
            gasLimit: BigNumber.from(3000000),
        },
        onSuccess(data) {
            console.log('prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('prepare contract write Error', prepareError)
        },
    })
    const { write: removeLiquidityFunction, data } = useContractWrite(config)
    const { isLoading, isSuccess, isError, error, } = useWaitForTransaction({
        hash: data?.hash,
        cacheTime: 2_000,
        onSuccess(data) {
            console.log("wait for transaction success: ", data);
        },
        onError(error) {
            console.log('wait for transaction result error: ', error);
        },
    })

    return {
        status: error == undefined ? true : false,
        isLoading,
        removeLiquidityFunction,
        isSuccess,
    }
}

// function removeLiquidityETH(
//     address token,
//     uint liquidity,
//     uint amountTokenMin,
//     uint amountETHMin,
//     address to,
//     uint deadline
// ) external returns(uint amountToken, uint amountETH);
export const useRemoveLiquidityETH = (
    token: string,
    liquidity: string,
    amountTokenMin?: string,
    amountETHMin?: string,
    to?: string,
    deadline?: number
) => {
    const { chain } = useNetwork();
    const { address, } = useAccount();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (uniswapV2Router02routerAddresses as any)[chainId],
        abi: uniswapV2Router02Abi,
        functionName: 'removeLiquidityETH',
        cacheTime: 2_000,
        args: [
            token,
            ethers.utils.parseEther(liquidity),
            ethers.utils.parseEther(amountTokenMin ?? '0'),
            ethers.utils.parseEther(amountETHMin ?? '0'),
            to ?? address,
            deadline ?? Math.round(Date.now() / 1000) + secondsIn15Mins,
        ],
        overrides: {
            gasLimit: BigNumber.from(3000000),
        },
        onSuccess(data) {
            console.log('prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('prepare contract write Error', prepareError)
        },
    })
    const { write: removeLiquidityETHFunction, data } = useContractWrite(config)
    const { isLoading, isSuccess, isError, error, } = useWaitForTransaction({
        hash: data?.hash,
        cacheTime: 2_000,
        onSuccess(data) {
            console.log("wait for transaction success: ", data);
        },
        onError(error) {
            console.log('wait for transaction result error: ', error);
        },
    })

    return {
        status: error == undefined ? true : false,
        isLoading,
        removeLiquidityETHFunction,
        isSuccess,
    }
}