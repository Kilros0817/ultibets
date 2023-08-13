import {
  Text,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect, } from 'react';
import { exclamationIconInRedBg } from '../utils/assets';
import AnnounceModal from './modal/AnnounceModal';

const Account = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const {
    isOpen: isOpenAnnounceModal,
    onOpen: onOpenAnnounceModal,
    onClose: onCloseAnnounceModal,
  } = useDisclosure();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    variant={'solid'}
                    width={['80px', '150px', '150x', '180px']}
                    height={['35px', '35px', '35px', '41px']}
                    borderRadius={['35px', '35px', '35px', '35px']}
                    border="1px solid #FC541C"
                    backgroundColor={'#1F1F1F'}
                    color={'white'}
                    _hover={{
                      backgroundColor: '#E18833',
                    }}
                    _selected={{
                      backgroundColor: '#E18833',
                    }}
                  >
                    <Text
                      fontSize={['14px', '14px', '16px', '18px']}
                      fontFamily={'Nunito'}
                      fontWeight="700px"
                      lineHeight={'25px'}
                    >
                      {
                        width < 480 ? 'Connect' : 'Connect Wallet'
                      }
                    </Text>
                  </Button>
                );
              } else if (chain.unsupported) {
                onOpenAnnounceModal();

                return (
                  <>
                    <Button
                      onClick={openChainModal}
                      variant={'solid'}
                      width={['80px', '150px', '150x', '180px']}
                      height={['35px', '35px', '35px', '41px']}
                      borderRadius={['35px', '35px', '35px', '35px']}
                      border="1px solid #FC541C"
                      backgroundColor={'red'}
                      color={'white'}
                      _hover={{
                        backgroundColor: '#E18833',
                      }}
                      _selected={{
                        backgroundColor: '#E18833',
                      }}
                    >
                      <Text
                        fontSize={['14px', '14px', '16px', '18px']}
                        fontFamily={'Nunito'}
                        fontWeight="700px"
                        lineHeight={'25px'}
                      >
                        {
                          width < 480 ? 'Wrong' : 'Wrong network'
                        }
                      </Text>
                    </Button>
                    <AnnounceModal
                      isOpenAnnounceModal={isOpenAnnounceModal}
                      onCloseAnnounceModal={() => onCloseAnnounceModal()}
                      announceText={'This chain is not supported currently. Please switch chain'}
                      announceLogo={exclamationIconInRedBg}
                      announceModalButtonText={'Switch Chain'}
                      announceModalButtonAction={() => openChainModal()}
                      announceModalCloseButtonShow={false}
                    />
                  </>
                );
              } else {
                return (
                  <Button
                    onClick={openAccountModal}
                    variant={'solid'}
                    width={['80px', '150px', '150x', '180px']}
                    height={['35px', '35px', '35px', '41px']}
                    borderRadius={['35px', '35px', '35px', '35px']}
                    border="1px solid #FC541C"
                    backgroundColor={'#1F1F1F'}
                    color={'white'}
                    _hover={{
                      backgroundColor: '#E18833',
                    }}
                    _selected={{
                      backgroundColor: '#E18833',
                    }}
                  >
                    <Text
                      fontSize={['14px', '14px', '16px', '18px']}
                      fontFamily={'Nunito'}
                      fontWeight="700px"
                      lineHeight={'25px'}
                    >
                      {
                        width < 480 ? '0x...' : account.displayName
                      }
                    </Text>
                  </Button>
                );
              }

            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default Account;