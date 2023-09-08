import {
	Flex,
	Text,
	Image,
	Button,
	useDisclosure,
	Tooltip,
} from '@chakra-ui/react';
import { CgProfile, } from 'react-icons/cg'
import { useAccount, useNetwork } from 'wagmi';
import { useState } from 'react';
import { parseEther } from 'viem';
import axios from 'axios';
import AnnounceModal from '../modal/AnnounceModal';
import { checkIconInGreenBg } from '../../utils/assets';
import { chainRPCs, polygonChainId, mumbaiChainId, } from '../../utils/config';
import { toast } from 'react-toastify';
import { claimReferralBettingReward } from '../../utils/interact/sc/ultibetsreward';
import ReferralModal from '../modal/ReferralModal';

type ProfileProps = {
	totalReferrals: number
	isFirstPredictionRewardDisable: boolean
	referralBettingReward: number
}
const Profile = ({
	totalReferrals,
	isFirstPredictionRewardDisable,
	referralBettingReward,
}: ProfileProps) => {
	const { chain, } = useNetwork();
	const { address, } = useAccount();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	
	const {
		isOpen: isOpenClaimFirstBettingRewardSuccessAnnounceModal,
		onOpen: onOpenClaimFirstBettingRewardSuccessAnnounceModal,
		onClose: onCloseClaimFirstBettingRewardSuccessAnnounceModal,
	} = useDisclosure();

	const {
		isOpen: isOpenReferralModal,
		onOpen: onOpenReferralModal,
		onClose: onCloseReferralModal,
	} = useDisclosure();

	const referralStatistics = [
		{
			label: 'referrals:',
			value: totalReferrals,
			borderColor: 'linear-gradient(to bottom, #FF720A, #739AF0)'
		},
		{
			label: 'You receive:',
			value: '10%*',
			borderColor: 'linear-gradient(to bottom, #19A2A5, #739AF0)'
		},
	]

	const handleFirstPredictionReward = async () => {
		const isMainnet = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? true : false;
		const referralChainId = isMainnet ? polygonChainId : mumbaiChainId;
		if (referralChainId != chain?.id ?? 0) {
			toast.error(`Please switch your chain to ${isMainnet ? 'Polygon' : 'Mumbai'}`);
			return;
		}

		const data = {
			chainId: chain?.id ?? 0,
			rpc: (chainRPCs as any)[chain?.id ?? mumbaiChainId],
			eventID: parseEther(String(referralBettingReward)).toString(), // this is not just eventid, but use here
			bettor: address,
		};

		const result = await axios.post(
			'/api/createSignature',
			data,
			{
				headers: {
					"Content-Type": "application/json",
				},
			});

		if ((result as any).data.isSuccess) {
			const signature = (result as any).data.signature
			try {
				setIsLoading(true);
				const result = await claimReferralBettingReward(
					referralBettingReward,
					signature,
					chain?.id ?? 0
				)

				if (result)
					onOpenClaimFirstBettingRewardSuccessAnnounceModal();

				setIsLoading(false);
			} catch (err) {
				setIsLoading(false);
				console.log('error in claim reward: ', err);
			}
		}

	}

	return (
		<Flex
			direction={'column'}
		>
			<Flex
			>
				<Flex
					alignItems={'center'}
					mr='14px'
				>
					<CgProfile
						color='#E18933'
					/>
				</Flex>

				<Text
					fontFamily={'nunito'}
					fontWeight='700'
					fontSize={'20px'}
					lineHeight='27px'
					textTransform={'capitalize'}
					color='#E18933'
				>
					{`${address?.slice(0, 8)}... Profile`}
				</Text>
			</Flex>

			<Flex
				mt='33px'
			>
				<Button
					onClick={onOpenReferralModal}
					height={'50px'}
					px={'30px'}
					background={'unset'}
					borderRadius={'15px'}
					border={'1px solid #FC541C'}
					_hover={{
						background: '#FC541C',
					}}
					color={'white'}
					fontSize={'14px'}
					lineHeight={'19px'}
					textTransform={'capitalize'}
				>
					Share Referral Code
				</Button>
			</Flex>

			<Flex
				direction={['column', 'column', 'column', 'row']}
				gap='37px'
			>
				<Flex
					gap='37px'
					mt='47px'
					direction={['column', 'row']}
				>
					{
						referralStatistics.map((item, index) => (
							<Tooltip
								label={
									<Flex
										direction={'column'}
									>
										<Flex
										>
											first prediction of minimum 100 uTBETS to get a 10 UTBETS reward
										</Flex>
										<Flex
											fontSize={'15px'}
										>
											*(first prediction made on UltiBets, no matter which chain you've used)
										</Flex>
									</Flex>
								}
								bg={'#1F1F1F'}
								placement={'top'}
								borderRadius={'20px'}
								textTransform={'capitalize'}
								fontWeight={'700'}
								fontFamily={'Nunito'}
								offset={[0, 20]}
								fontSize={'20px'}
								border={'1px solid white'}
								p={'20px'}
								display={index == 1 ? 'flex' : 'none'}
								key={index}
							>
								<Flex
									key={index}
									borderRadius={'15px'}
									fontFamily={'Nunito'}
									fontStyle={'normal'}
									textAlign='center'
									textTransform={'capitalize'}
									fontWeight={'700'}
									px='1px'
									py='1px'
									width={'max-content'}
									background={item.borderColor}
									cursor={index == 1 ? 'pointer' : 'auto'}
								>
									<Flex
										direction='column'
										background={'#1F1F1F'}
										px='24px'
										py='12px'
										borderRadius={'15px'}

									>
										<Text
											fontSize={'18px'}
											lineHeight={'27px'}
										>
											{item.label}
										</Text>

										<Text
											fontSize={'24px'}
											lineHeight={'33px'}
										>
											{item.value}
										</Text>
									</Flex>

								</Flex>
							</Tooltip>
						))
					}
				</Flex>

				<Flex
					gap='37px'
					mt={['0px', '0px', '0px', '47px']}
					direction={['column', 'row']}
				>
					<Flex
						borderRadius={'15px'}
						fontFamily={'Nunito'}
						fontStyle={'normal'}
						textAlign='center'
						textTransform={'capitalize'}
						fontWeight={'700'}
						px='1px'
						py='1px'
						width={'max-content'}
						background={'linear-gradient(to bottom, #19A2A5, #739AF0)'}
					>
						<Flex
							background={'#1F1F1F'}
							px='24px'
							py='12px'
							borderRadius={'15px'}
							gap={['10px', '30px']}
							direction={['column', 'row']}
						>
							<Flex
								direction={'column'}
								justifyContent={'center'}
							>
								<Text
									fontSize={'18px'}
									lineHeight={'25px'}
								>
									First Prediction
								</Text>
								<Text
									fontSize={'18px'}
									lineHeight={'25px'}
								>
									Reward
								</Text>
							</Flex>

							<Flex
								alignItems={'center'}
							>
								<Button
									onClick={handleFirstPredictionReward}
									height={'46px'}
									width={'155px'}
									background={'unset'}
									borderRadius={'34px'}
									border={'1px solid #FC541C'}
									_hover={{
										background: '#FC541C',
									}}
									color={'white'}
									fontSize={'14px'}
									lineHeight={'19px'}
									textTransform={'capitalize'}
									isDisabled={isFirstPredictionRewardDisable}
								>
									claim reward
								</Button>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
			<AnnounceModal
				isOpenAnnounceModal={isOpenClaimFirstBettingRewardSuccessAnnounceModal}
				onCloseAnnounceModal={onCloseClaimFirstBettingRewardSuccessAnnounceModal}
				announceText={'You successfully claimed your first prediction reward from referral.'}
				announceLogo={checkIconInGreenBg}
				announceModalButtonText={'Close'}
			/>
			<AnnounceModal
				isOpenAnnounceModal={
					isLoading
				}
				onCloseAnnounceModal={() => setIsLoading(false)}
				announceText={'Your transaction is currently processing on the blockchain'}
				announceGif={true}
				announceModalButtonText={'Close'}
			/>
			<ReferralModal
				isOpen={isOpenReferralModal}
				onClose={onCloseReferralModal}
			/>
		</Flex >
	)
}

export default Profile;
