import {
    Box,
    Flex,
    Image,
    Text,
} from '@chakra-ui/react'
import {
    useState,
} from 'react'
import { CgProfile, } from 'react-icons/cg'
import {
    useAccount,
} from 'wagmi';
import PredictionsTab from '../../../components/mypredictions/PredictionsTab'
import MyNFTsComponent from '../../../components/myprofile/mynfts/MyNFTsComponent';
import Sidebar from '../../../components/Sidebar'

const MyNFTs = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const { address, } = useAccount();

    return (
        <Flex
            className='referral-page-wrapper'
            width={['100%']}
        >
            <Flex
                width='90px'
                justifyContent='center'
            >
                <Sidebar />
            </Flex>

            <Box
                my='30px'
                px='20px'
                width={['calc(100vw - 130px)']}
                className='my-referral-wrapper'
                zIndex={0}
            >
                <Box
                >
                    <PredictionsTab />
                </Box>

                <Flex
                    mt={['41px']}
                    justifyContent={['center', 'center', 'start']}
                    gap={['20px', '20px', '34px']}
                    direction={['column', 'column', 'row']}
                >
                    <Flex
                        alignItems={'center'}
                        gap={'15px'}
                    >
                        <Image
                            src={'/images/pngs/my-nfts/my-nft.svg'}
                            alt='my-nft'
                            width={'14px'}
                            height={'16px'}
                        />
                        <Text
                            fontFamily={'Nunito'}
                            fontWeight={'700'}
                            fontSize={['18px', '22px']}
                            lineHeight={'30px'}
                        >
                            My NFTs
                        </Text>
                    </Flex>

                    {
                        address && (
                            <Flex
                                justifyContent={['start', 'start', 'start']}
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
                                    fontSize={['17px', '20px']}
                                    lineHeight='27px'
                                    textTransform={'capitalize'}
                                    color='#E18933'
                                >
                                    {address?.slice(0, 8) + "... "} Profile
                                </Text>
                            </Flex>
                        )
                    }
                </Flex>

                <Flex
                    gap={'18px'}
                    fontFamily={'Nunito'}
                    fontWeight={'700'}
                    fontSize={['14px', '17px']}
                    lineHeight={'23px'}
                    color={'#FFFFFF'}
                    textTransform={'capitalize'}
                    cursor={'pointer'}
                    width='max-content'
                    zIndex={1}
                    mt={'20px'}
                >

                    {/* <Image
                        src={starImage}
                    /> */}
                    <Text
                        // color={pathName.includes('/leaderboard') ? '#E18833' : 'white'}
                        onClick={() => setTabIndex(0)}
                        color={tabIndex == 0 ? '#E18933' : 'white'}
                    >
                        Claimable NFTs
                    </Text>

                    <Text
                    >
                        |
                    </Text>
                    {/* <Image
                        src={storyTellingImage}
                    /> */}
                    <Text
                        // color={pathName.includes('/my-predictions') ? '#E18833' : 'white'}
                        onClick={() => setTabIndex(1)}
                        color={tabIndex == 1 ? '#E18933' : 'white'}
                    >
                        Claimed NFTs
                    </Text>
                </Flex>

                <MyNFTsComponent
                    tabIndex={tabIndex}
                />

            </Box >
        </Flex >
    )
}

export default MyNFTs
