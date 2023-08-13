import { Button, Flex, Image, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import '@fontsource/nunito'
import TokenStakeModal from '../modal/token/TokenStakeModal'
import { useClaim } from '../../utils/interact/sc/token-stake'
import AnnounceModal from '../modal/AnnounceModal'
import { checkIconInGreenBg } from '../../utils/assets'
import TokenUnstakeModal from '../modal/token/TokenUnstakeModal'
import AddLiquidityModal from '../modal/token/AddLiquidityModal'
import { toast } from 'react-toastify'
import { useAccount, useNetwork } from 'wagmi'
import RemoveLiquidityModal from '../modal/token/RemoveLiquidityModal'
import { checkIfWalletConnected } from '../../utils/interact/utility'

export type StakingCardProps = {
  chainId: number
  pairTokenLogo: string
  poolName: string
  chainName?: string
  stakedAmount: number
  claimAbleAmount: number
  claimedAmount: number
  isNativeUtbetsLp: boolean
  setIsOpenModal: (isOpenModal: boolean) => void
}

const StakingCard = ({
  chainId,
  pairTokenLogo,
  poolName,
  chainName,
  stakedAmount,
  claimAbleAmount,
  claimedAmount,
  isNativeUtbetsLp,
  setIsOpenModal,
}: StakingCardProps) => {
  const { chain, } = useNetwork();
  const { address, } = useAccount();
  const {
    isOpen: isOpenTokenStakeModal,
    onOpen: onOpenTokenStakeModal,
    onClose: onCloseTokenStakeModal,
  } = useDisclosure();
  const {
    isOpen: isOpenClaimSuccessAnnounceModal,
    onOpen: onOpenClaimSuccessAnnounceModal,
    onClose: onCloseClaimSuccessAnnounceModal,
  } = useDisclosure();
  const {
    isOpen: isOpenAddLiquidityModal,
    onOpen: onOpenAddLiquidityModal,
    onClose: onCloseAddLiquidityModal,
  } = useDisclosure();
  const {
    isOpen: isOpenRemoveLiquidityModal,
    onOpen: onOpenRemoveLiquidityModal,
    onClose: onCloseRemoveLiquidityModal,
  } = useDisclosure();
  const {
    isOpen: isOpenTokenUnstakeModal,
    onOpen: onOpenTokenUnstakeModal,
    onClose: onCloseTokenUnstakeModal,
  } = useDisclosure();

  const claim = useClaim(
    isNativeUtbetsLp,
  );

  const checkChainId = () => {
    if (chainId != chain?.id) {
      toast.error('Please switch chain at first');
      return false;
    } else {
      return true;
    }
  }

  const handleClaim = async () => {
    if (!checkIfWalletConnected(address)) return;
    if (checkChainId() == false) {
      return;
    }
    if (claim.isLoading) return;

    try {
      claim.claimFunction?.();
      onOpenClaimSuccessAnnounceModal();
    } catch (err) {
      console.log('error in claim reward: ', err);
    }
  }

  const handleStakeModal = () => {
    console.log("stake button clicked");
    if (checkChainId() == false) {
      return;
    }
    if (!checkIfWalletConnected(address)) return;
    setIsOpenModal(true);
    onOpenTokenStakeModal();
  };

  const handleUnStakeModal = () => {
    console.log("unstake button clicked");
    if (checkChainId() == false) {
      return;
    }
    if (!checkIfWalletConnected(address)) return;
    setIsOpenModal(true);
    onOpenTokenUnstakeModal();
  }

  const handleAddLiquidityModal = () => {
    console.log("add liquidity button clicked");
    if (checkChainId() == false) {
      return;
    }
    if (!checkIfWalletConnected(address)) return;
    setIsOpenModal(true);
    onOpenAddLiquidityModal();
  };

  const handleRemoveLiquidityModal = () => {
    console.log("remove liquidity button clicked");
    if (!checkIfWalletConnected(address)) return;
    if (checkChainId() == false) {
      return;
    }
    setIsOpenModal(true);
    onOpenRemoveLiquidityModal();
  };

  return (
    <Flex
      direction='column'
      justifyContent='space-between'
      p={['30px', '37px']}
      border='1px solid white'
      borderRadius='5px'
      fontFamily='Nunito'
      width={['310px', '360px']}
      height={['511px', '535px']}
    >
      <Flex
        direction='row'
        alignItems={chainName ? 'start' : 'center'}
      >
        <Image
          width={['14px', '16px']}
          height={['14px', '16px']}
          src={"/images/pngs/token-logo/utbets.png"}
          mr={['14px', '16px']}
          mt={chainName ? '2.5px' : '0'}
        />
        <Image
          width={['14px', '16px']}
          height={['14px', '16px']}
          src={pairTokenLogo}
          mr={['14px', '16px']}
          mt={chainName ? '2.5px' : '0'}
        />
        <Flex
          direction='column'
          textAlign='left'
          fontSize={['14px', '16px']}
        >
          <Text>
            {poolName}
          </Text>
          <Text
            display={chainName ? 'flex' : 'none'}
          >
            ({chainName})
          </Text>
        </Flex>
      </Flex>

      <Flex
        justifyContent='space-between'
        mt='16px'
        fontSize={['14px', '16px']}
      >
        <Text
          textAlign={'left'}
        >
          Staked Amount:
        </Text>
        <Text
          color='#E18933'
          textAlign='right'
        >
          {stakedAmount.toFixed(0)}LP
        </Text>
      </Flex>

      <Flex
        justifyContent='space-between'
        mt='6px'
        fontSize={['14px', '16px']}
      >
        <Text
          textAlign={'left'}
        >
          Claimable amount:
        </Text>
        <Text
          color='#E18933'
          textAlign='right'
        >
          {claimAbleAmount.toFixed(0)} $UTBETS
        </Text>
      </Flex>

      <Flex
        justifyContent='space-between'
        mt='7px'
        fontSize={['14px', '16px']}
      >
        <Text
          textAlign={'left'}
        >
          Claimed amount:
        </Text>
        <Text
          color='#E18933'
          textAlign='right'
        >
          {claimedAmount.toFixed(0)} $UTBETS
        </Text>
      </Flex>

      <Flex
        justifyContent={'center'}
        mt='22px'
      >
        <Button
          border='1px solid #FC541C'
          px='41px'
          width='180px'
          borderRadius='34px'
          background='transparent'
          _hover={{
            backgroundColor: '#FC541C',
          }}
          _active={{
            backgroundColor: '#FC541C',
          }}
          onClick={handleAddLiquidityModal}
          fontSize={['14px', '16px']}
        >
          Add Liquidity
        </Button>
      </Flex>

      <Flex
        justifyContent={'center'}
        mt='22px'
      >
        <Button
          border='1px solid #FF9100'
          px='41px'
          width='180px'
          borderRadius='34px'
          background='transparent'
          _hover={{
            backgroundColor: '#FF9100',
          }}
          _active={{
            backgroundColor: '#FF9100',
          }}
          onClick={handleRemoveLiquidityModal}
          fontSize={['14px', '16px']}
        >
          Remove Liquidity
        </Button>
      </Flex>

      <Flex
        justifyContent={'center'}
        mt='22px'
      >
        <Button
          border='1px solid #FC541C'
          px='41px'
          width='180px'
          borderRadius='34px'
          background='transparent'
          _hover={{
            backgroundColor: '#FC541C',
          }}
          _active={{
            backgroundColor: '#FC541C',
          }}
          onClick={handleStakeModal}
          fontSize={['14px', '16px']}
        >
          Stake LP
        </Button>
      </Flex>

      <Flex
        justifyContent={'center'}
        mt='22px'
      >
        <Button
          border='1px solid #FF9100'
          px='41px'
          width='180px'
          borderRadius='34px'
          background='transparent'
          _hover={{
            backgroundColor: '#FF9100',
          }}
          _active={{
            backgroundColor: '#FF9100',
          }}
          onClick={handleClaim}
          fontSize={['14px', '16px']}
        >
          Claim
        </Button>
      </Flex>

      <Flex
        justifyContent={'center'}
        mt='22px'
      >
        <Button
          border='1px solid #696969'
          px='41px'
          width='180px'
          borderRadius='34px'
          background='transparent'
          _hover={{
            backgroundColor: '#696969',
          }}
          _active={{
            backgroundColor: '#696969',
          }}
          onClick={handleUnStakeModal}
          fontFamily={'Nunito'}
          fontSize={['14px', '16px']}
        >
          Unstake LP
        </Button>
      </Flex>
      <TokenStakeModal
        isOpenTokenStakeModal={isOpenTokenStakeModal}
        onCloseTokenStakeModal={() => {
          onCloseTokenStakeModal();
          setIsOpenModal(false);
        }}
        poolName={poolName}
        isNativeUtbetsLp={isNativeUtbetsLp}
      />
      <AnnounceModal
        isOpenAnnounceModal={isOpenClaimSuccessAnnounceModal && claim.isSuccess}
        onCloseAnnounceModal={onCloseClaimSuccessAnnounceModal}
        announceText={'You has been successfully claimed'}
        announceLogo={checkIconInGreenBg}
        announceModalButtonText={'Close'}
      />
      <TokenUnstakeModal
        isOpenTokenUnstakeModal={isOpenTokenUnstakeModal}
        onCloseTokenUnstakeModal={() => {
          onCloseTokenUnstakeModal();
          setIsOpenModal(false);
        }}
        poolName={poolName}
        stakedAmount={stakedAmount}
        isNativeUtbetsLp={isNativeUtbetsLp}
      />
      <AddLiquidityModal
        isOpenAddLiquidityModal={isOpenAddLiquidityModal}
        onCloseAddLiquidityModal={() => {
          onCloseAddLiquidityModal();
          setIsOpenModal(false);
        }}
        poolName={poolName}
        isNativeUtbetsLp={isNativeUtbetsLp}
      />
      <RemoveLiquidityModal
        isOpenRemoveLiquidityModal={isOpenRemoveLiquidityModal}
        onCloseRemoveLiquidityModal={() => {
          onCloseRemoveLiquidityModal();
          setIsOpenModal(false);
        }}
        poolName={poolName}
        isNativeUtbetsLp={isNativeUtbetsLp}
      />
      <AnnounceModal
        isOpenAnnounceModal={isOpenClaimSuccessAnnounceModal && claim.isLoading}
        onCloseAnnounceModal={onCloseClaimSuccessAnnounceModal}
        announceText={'Your transaction is currently processing on the blockchain'}
        announceGif={true}
        announceModalButtonText={'Close'}
      />
    </Flex>
  )
}

export default StakingCard;
