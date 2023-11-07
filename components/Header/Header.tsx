import { useState, useEffect } from 'react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Flex,
  Image,
  Link,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import '@fontsource/nunito'
import { useRouter } from 'next/router';
import { CgProfile, } from 'react-icons/cg'
import { useNetwork, useSwitchNetwork, } from 'wagmi';
import NavLink from './Navlink'
import Account from '../Account'
import {
  AppTitle,
  LinkArry1,
  LinkArry2,
  bannedCountries,
  bannedCountriesCodes,
  chainAttrs,
  mumbaiChainId,
  newChainAttrs,
  polygonChainId,
  profileContext,
  snapshotURL,
} from '../../utils/config';
import axios from 'axios';
import GeoBlockModal from '../modal/startup/GeoBlockModal';
//@ts-ignore
import { detectAnyAdblocker, } from "just-detect-adblock";
import AdBlockDetectModal from '../modal/startup/AdBlockDetectModal';
import { ChainAttrItemType } from '../../utils/types';
import ExLink from './ExLink';
import Head from 'next/head';

const Header = () => {
  const router = useRouter();
  const { chain, } = useNetwork();
  const { switchNetwork, } = useSwitchNetwork();
  const [chainAttrItem, setChainAttrItem] = useState<ChainAttrItemType>(
    (newChainAttrs as any)[process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId]
  );
  const [currentMainnetOrTestnetAttrs,] = useState(
    process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenGeoBlockModal,
    onOpen: onOpenGeoBlockModal,
    onClose: onCloseGeoBlockModal,
  } = useDisclosure();
  const {
    isOpen: isOpenAdBlockDetectModal,
    onOpen: onOpenAdBlockDetectModal,
    onClose: onCloseAdBlockDetectModal,
  } = useDisclosure();
  const [ip, setIp] = useState('');
  const [country, setCountry] = useState('');

  const handleToggle = () => (isOpen ? onClose() : onOpen())
  const [width, setWidth] = useState(0);
  const [title, setTitle] = useState('Home');
  const limitSizeBetweenDesktopandMobile = 1170;
  const desktopDisplay = ['none', 'none', 'none', width <= limitSizeBetweenDesktopandMobile ? 'none' : 'flex'];
  const mobileDisplay = ['flex', 'flex', 'flex', width <= limitSizeBetweenDesktopandMobile ? 'flex' : 'none'];
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
      process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId; setChainAttrItem((newChainAttrs as any)[chainId]);
  }, [chain]);

  const getData = async () => {
    const res = await axios.get('https://json.geoiplookup.io/')
    return {
      ip: res?.data?.ip,
      country_name: res?.data?.country_name,
      country_code: res?.data?.country_code,
    }
  }

  useEffect(() => {
    const pathName = router.asPath;
    (async () => {
      // adblock 
      let isAdblock = await detectAnyAdblocker();
      if (!isAdblock) {
        isAdblock = await detectAnyAdblocker();
      }

      if (process.env.NEXT_PUBLIC_IS_GEOBLOCK == "true") {
        if (pathName.includes('prediction-markets') || pathName.includes('sbc')) {
          // adblock 
          const isAdblock = await detectAnyAdblocker();
          if (isAdblock) {
            // an adblocker is detected 
            onOpenAdBlockDetectModal();
            router.push('/');
            return;
          } else {
            const info = await getData();
            if (bannedCountries.includes(info.country_name) || bannedCountriesCodes.includes(info.country_code)) {
              if (pathName == '/') {
                return;
              } else {
                router.push('/');
              }
              setIp(info.ip);
              setCountry(info.country_name);
              onOpenGeoBlockModal();
              router.push('/');
            }
          }
        }
      }

      if (pathName == '/') {
        router.push('/home');
      }

      const slug = pathName.split('/')
      if (slug.length >= 2) {
        //@ts-ignore
        setTitle(AppTitle[slug[1]])
      }

      setTimeout(() => {
        if (localStorage.getItem('disclaimer') === null) {
          localStorage.setItem('disclaimer', 'true')
          router.push('/disclaimer')
        }
      }, 7000);

    })()
  }, [router])

  const ChainIcon = () => (
    <Flex
      alignItems='center'
      className='chain-logo-menu-wrapper header-chain-icon'
      zIndex={'100'}
    >
      <Menu
      >
        <MenuButton
          as={Button}
          px='0'
          backgroundColor='transparent'
          _hover={{
            backgroundColor: 'transparent',
          }}
          _focus={{
            backgroundColor: 'transparent',
          }}
          _active={{
            backgroundColor: 'transparent',
          }}
        >
          <Flex
            direction='row'
            alignSelf='center'
            alignItems='center'
          >
            <Image
              width={'26px'}
              height={'26px'}
              src={chainAttrItem?.logo}
              alt={chainAttrItem?.alt}
              mr='3'
            />
          </Flex>
        </MenuButton>
        <MenuList
          backgroundColor={'#1F1F1F'}
          minWidth='min-content'
          width='195px'
          zIndex={'3'}
        >
          {
            currentMainnetOrTestnetAttrs.map((item, index) => (
              <MenuItem
                backgroundColor={'#1F1F1F'}
                _hover={{
                  backgroundColor: '#E18833;',
                }}
                _focus={{
                  backgroundColor: '#E18833;',
                }}
                onClick={() => {
                  if (currentMainnetOrTestnetAttrs[index].chainId != chain?.id) {
                    switchNetwork?.(currentMainnetOrTestnetAttrs[index].chainId);
                  }
                }}
                key={index}
                fontFamily='Nunito'
                fontStyle='normal'
                fontWeight='700'
                fontSize='16px'
                lineHeight='16px'
                paddingLeft='15px'
              >
                <Image
                  width={'26px'}
                  height={'26px'}
                  src={item.logo}
                  alt={item.alt}
                  mr='4'
                />
                <Text
                  textTransform='capitalize'
                >
                  {item.name}
                </Text>
              </MenuItem>
            ))
          }
          {
            chainAttrs.soonnet.map((item, index) => (
              <MenuItem
                backgroundColor={'#1F1F1F'}
                _hover={{
                  backgroundColor: '#E18833;',
                }}

                key={index}
                fontFamily='Nunito'
                fontStyle='normal'
                fontWeight='700'
                fontSize='16px'
                lineHeight='16px'
                paddingLeft='15px'
              >
                <Image
                  width={'26px'}
                  height={'26px'}
                  src={item.logo}
                  alt={item.alt}
                  mr='4'
                />
                <Text
                  textTransform='capitalize'
                  color={'gray'}
                >
                  {item.name}
                </Text>
              </MenuItem>
            ))
          }
        </MenuList>
      </Menu>
    </Flex >
  )

  const ProfileIcon = () => (
    <Flex
      alignItems={'center'}
      className='profile-wrapper'
      zIndex={'100'}
    >
      <Menu
      >
        <MenuButton
          as={Button}
          px='0'
          backgroundColor='transparent'
          _hover={{
            backgroundColor: 'transparent',
          }}
          _focus={{
            backgroundColor: 'transparent',
          }}
          _active={{
            backgroundColor: 'transparent',
          }}
        >
          <Flex
            direction='row'
            alignSelf='center'
            alignItems='center'
          >
            <CgProfile color='white' />
          </Flex>
        </MenuButton>
        <MenuList
          backgroundColor={'#1F1F1F'}
          minWidth='min-content'
          width='170px'
          zIndex={'3'}
        >
          {
            profileContext.map((item, index) => (
              <MenuItem
                backgroundColor={'#1F1F1F'}
                _hover={{
                  backgroundColor: '#E18833;',
                }}
                _focus={{
                  backgroundColor: '#E18833;',
                }}
                onClick={() => {
                  router.push(item.href);
                }}
                key={index}
                fontFamily='Nunito'
                fontStyle='normal'
                fontWeight='700'
                fontSize='12px'
                lineHeight='16px'
                paddingLeft='15px'
              >
                <Image
                  width={'16px'}
                  height={'16px'}
                  src={item.logo}
                  mr='4'
                />
                <Text
                  textTransform='capitalize'
                >
                  {item.title}
                </Text>
              </MenuItem>
            ))
          }
        </MenuList>
      </Menu>
    </Flex >
  )

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/logo-final.svg" />
        <title>UltiBets | {title}</title>
      </Head>
      <Flex
        direction='column'
      >
        <Flex
          bg="#1F1F1F"
          py='3'
          justifyContent='space-between'
          px={['15px', '15px', '15px', '15px', '30px']}
        >
          {/* logo icon */}
          <Flex
            justifyContent={'center'}
            alignItems="center"
            zIndex='999'
            className='logo-icon-wrapper'
            mr='20px'
          >
            <Link
              href="/"
              width={['60px', '60px', '60px', width <= limitSizeBetweenDesktopandMobile ? '60px' : '150px', '150px']}
            >
              {' '}
              <Image
                src="/images/ultibets-logo.svg"
                alt="logo"
                width='60px'
                height='60px'
              />
            </Link>
          </Flex>

          {/* navbar links(shows in desktop size) */}
          <Flex
            display={desktopDisplay}
            gap={['unset', 'unset', 'none', '15px', width < 1330 ? '20px' : '40px']}
            alignItems={['unset', 'unset', 'center', 'center']}
            py='2'
            px='2'
          >
            {
              LinkArry1.map((item, index) => (
                <NavLink
                  key={index}
                  name={item.name}
                  href={item.href}
                />
              ))
            }
            <ExLink
              name="Governance"
              href={snapshotURL}
            />
            {
              LinkArry2.map((item, index) => (
                <NavLink
                  key={index}
                  name={item.name}
                  href={item.href}
                />
              ))
            }

          </Flex>

          <Flex
            display={desktopDisplay}
            ml='15px'
          >
            <ProfileIcon />
            <ChainIcon />

            {/* account info (only shows in desktop size) */}
            <Flex
              alignItems='center'
            >
              <Account />
            </Flex>
          </Flex>

          <Flex
            display={mobileDisplay}
            ml='20px'
          >
            <ProfileIcon />

            <ChainIcon />
            <Flex
              alignItems='center'
              mr={'20px'}
            >
              <Account />
            </Flex>
            {/* hamburger icon(only shows in the mobile size) */}
            <Flex
              alignItems="center"
            >
              {
                isOpen ? (
                  <CloseIcon
                    color={'white'}
                    fontSize="28px"
                    onClick={handleToggle}
                  />
                ) : (
                  <HamburgerIcon
                    color={'white'}
                    fontSize="30px"
                    onClick={handleToggle}
                  />
                )
              }
            </Flex>
          </Flex>
        </Flex>

        {/* mobile navbar */}
        <Flex
          display={[
            isOpen ? 'flex' : 'none',
            isOpen ? 'flex' : 'none',
            isOpen ? 'flex' : 'none',
            isOpen && width <= limitSizeBetweenDesktopandMobile ? 'flex' : 'none',
            'none'
          ]}
          gap={'10px'}
        >
          <Flex
            direction={'column'}
            mx={'30px'}
            my={'15px'}
            gap='10px'
            zIndex={'2'}
          >
            {
              LinkArry1.map((item, index) => (
                <NavLink
                  key={index}
                  href={item.href}
                  name={item.name}
                  onClose={onClose}
                />
              ))
            }
            <ExLink
              name="Governance"
              href={snapshotURL}
              onClose={onClose}
            />
            {
              LinkArry2.map((item, index) => (
                <NavLink
                  key={index}
                  href={item.href}
                  name={item.name}
                  onClose={onClose}
                />
              ))
            }
          </Flex>
        </Flex>

        <Image
          src='/images/pngs/left-top-orange-gradient.svg'
          alt='left-top-orange-gradient'
          position='absolute'
          top='0'
          left='0'
          zIndex='0'
        />
        <GeoBlockModal
          isOpenGeoBlockModal={isOpenGeoBlockModal}
          onCloseGeoBlockModal={onCloseGeoBlockModal}
          ip={ip}
          country={country}
        />
        <AdBlockDetectModal
          isOpenAdBlockDetectModal={isOpenAdBlockDetectModal}
          onCloseAdBlockDetectModal={onCloseAdBlockDetectModal}
        />
      </Flex >
    </>

  )
}

export default Header;