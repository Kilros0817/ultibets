import {
  Box,
  Flex,
  Text,
  useDisclosure,
  Image,
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { useNetwork } from 'wagmi';
import HomeCarousel from '../../components/Container/Carousel'
import Sidebar from '../../components/Sidebar'
import { chainAttrs, mumbaiChainId, newChainAttrs, polygonChainId, sortByItems } from '../../utils/config'
import { useChainContext } from '../../utils/Context'
import AdminEventCardList from '../../components/predictions/AdminEventCardList';
import AddEventModalInPM from '../../components/modal/AddEventModalInPM';
import CalendarModal from '../../components/modal/CalendarModal';
import { calendarImage } from '../../utils/assets';
import AdminSBCComponent from '../../components/Admin/AdminSBCComponent';
import TokenSelector from '../../components/predictions/TokenSelector';
import AdminHandleEventButton from '../../components/Admin/AdminHandleEventButton';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const Admin = () => {
  const router = useRouter();
  const {
    isNativeToken,
    adminSelectedDate,
    setAdminSelectedDate,
    categoryInPM,
  } = useChainContext();
  const { chain, } = useNetwork();
  const [currentMainnetOrTestnetAttrs,] = useState(
    process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);
  const [repeatLevel, setRepeatLevel] = useState<number>(2);
  const {
    isOpen: isOpenAddEventModal,
    onOpen: onOpenAddEventModal,
    onClose: onCloseAddEventModal,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
      process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId; let currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == chainId);
    if (currentChainAttrsItem.length == 0) {
      const temporaryChainId = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? 137 : 80001
      currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == temporaryChainId);
    }
  }, [chain, isNativeToken]);

  (window as any).ethereum?.on('networkChanged', async () => {
    location.reload();
  })

  useEffect(() => {
    console.log("category in pm: ", categoryInPM);
  }, [categoryInPM]);

  (window as any).ethereum?.on('accountsChanged', async (accounts: any) => {
    if (accounts[0] !== process.env.ADMIN_WALLET_PUBLIC_KEY?.toLowerCase()) {
      toast.error('You are not an admin');
      router.push('/');
    }
  })

  const CalendarLabel = () => (
    <>
      <Flex
        onClick={onOpen}
        alignItems={'center'}
      >
        <Image
          mr='9px'
          src={calendarImage}
        />
        <Text
          fontFamily={'Nunito'}
          fontWeight={'700'}
          fontSize={'17px'}
          lineHeight={'23px'}
          color={'white'}
          textTransform={'capitalize'}
          cursor={'pointer'}
        >
          Choose Period of time{' '}
        </Text>
      </Flex>
      <CalendarModal
        isOpen={isOpen}
        onClose={onClose}
        selectedDate={adminSelectedDate}
        setSelectedDate={setAdminSelectedDate}
      />
    </>
  )

  return (
    <>
      <Box
      >
        <HomeCarousel />
        <Flex
          className='admin-bottom-component'
        >
          <Flex
            width='90px'
            justifyContent='center'
            marginTop={['135px', '0px']}
          >
            <Sidebar />
          </Flex>
          <Flex
            width='calc(100% - 90px)'
            direction={'column'}
            mt='30px'
            className='admin-bottom-right-component'
            zIndex={0}
          >
            {
              (categoryInPM >= 0) && (categoryInPM <= 11) && (
                <>
                  <>{/* destkop */}
                    <Flex
                      direction={['column']}
                      mx={[
                        '0',
                        '0',
                        'calc(calc(100% - 255px * 2 - 40px * 1) / 2)',
                        'calc(calc(100% - 255px * 3 - 40px * 2) / 2)',
                        'calc(calc(100% - 255px * 4 - 40px * 3) / 2)'
                      ]}
                      display={['none', 'none', 'none', 'flex']}
                    >
                      <TokenSelector />
                      <Flex
                        mt='22px'
                        mb='25px'
                        justifyContent={'space-between'}
                        alignItems='center'
                        width={['100%']}
                      >
                        <Flex
                          justifyContent={'space-between'}
                          width={['100%']}
                        >
                          <CalendarLabel />
                          <AdminHandleEventButton
                            setRepeatLevel={setRepeatLevel}
                            onOpenModal={onOpenAddEventModal}
                            buttonLabel={'Add Event'}
                          />
                        </Flex>
                      </Flex>
                    </Flex>
                  </>

                  <> {/* mobile, tablet */}
                    <Flex
                      display={['flex', 'flex', 'flex', 'none']}
                      ml={['-90px', '0px', '0px', '0px']}
                      justifyContent={'center'}
                      direction={['column']}
                      alignItems={['center']}
                      gap={['25px']}
                    >
                      <TokenSelector />

                      <CalendarLabel />
                    </Flex>

                    <Flex
                      display={['flex', 'flex', 'flex', 'none']}
                      ml={['-90px', '0px', '0px', '0px']}
                      justifyContent={'center'}
                      mb='29px'
                    >
                      <AdminHandleEventButton
                        setRepeatLevel={setRepeatLevel}
                        onOpenModal={onOpenAddEventModal}
                        buttonLabel={'Add Event'}
                      />
                    </Flex>
                  </>
                  <Flex
                    justify={'center'}
                  >
                    <AdminEventCardList />
                  </Flex>
                </>
              )
            }
            {
              (categoryInPM == 12) && (
                <AdminSBCComponent />
              )
            }
          </Flex>
        </Flex>
        <AddEventModalInPM
          isOpen={isOpenAddEventModal}
          onClose={onCloseAddEventModal}
          repeatLevel={repeatLevel}
        />
      </Box>
    </>
  )
}

export default Admin;