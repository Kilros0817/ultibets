import {
  Box,
  Flex,
  Text,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import '@fontsource/inter'
import '@fontsource/nunito'
import Welcome from '../Welcome'
import TotalCurrentPrizePool from './TotalCurrentPrizePool'
import SquidGrid from '../SquidGrid'

export type RegisterComponentProps = {
  eventID: number
  totalAmount?: number
  maxPlayers: number
  totalPlayers: number
  registerAmount?: number
  roundBetAmount?: number
  currentLevel?: number
  orgFeePercent?: number
  registerID?: number
  currentToken: string
  registerDeadline: number
  shouldRender: boolean
  category: number // 0: native, 1: utbets, 2: warrior
}

const RegisterComponent = ({
  eventID,
  totalAmount,
  maxPlayers,
  totalPlayers,
  registerAmount,
  roundBetAmount,
  currentLevel,
  orgFeePercent,
  registerID,
  currentToken,
  registerDeadline,
  shouldRender,
  category,
}: RegisterComponentProps) => {
  useEffect(() => {
    document.title = 'Squid Competitions | UltiBets'
  }, [shouldRender])


  return (
    <>
      <Welcome
        title={`Welcome to Squid Bet #${eventID}`}
      />
      <Flex
        mt={'25px'}
        direction={'column'}
        gap={'25px'}
      >
        <Flex
          fontFamily={'Nunito'}
          fontWeight={'700'}
          fontSize={'20px'}
          lineHeight={'27px'}
          color={'#E18933'}
          textTransform={'capitalize'}
          width={['100%', '100%', '100%', '592px']}
        >
          The betting competition where only 1 player will win-it-all !<br />
          {`base prize pool is ${totalAmount} ${currentToken} MINIMUM*! ${' '}`}
        </Flex>
        <Text
          fontFamily={'Nunito'}
          fontWeight={'700'}
          fontSize={['13px', '13px', '13px', '17px']}
          lineHeight={['17px', '17px', '17px', '23px']}
        >
          *( {maxPlayers} Players x {registerAmount} {currentToken}) / {orgFeePercent}% organisator fee
          + {roundBetAmount} {currentToken} for the first Bet )
        </Text>
      </Flex>

      <SquidGrid
        limit={maxPlayers ?? 0}
        current={totalPlayers ?? 0}
      />

      <Box display={['none', 'none', 'none', 'block']}>
        <Flex
          mt={'10px'}
          alignItems={'center'}
          justifyContent={'space-between'}
          width={'650px'}
        >
          <Box>
            <Text
              fontFamily={'Nunito'}
              fontWeight={'700'}
              fontSize={'13px'}
              lineHeight={'15px'}
              color={'white'}
              textTransform={'capitalize'}
            >
              {' '}
              <Text as={'span'} color={'#FF9100'}>
                {totalPlayers}{'  '}
              </Text>
              Player(s) Registered for the Squid Bet Competition
            </Text>
          </Box>
          <Flex justifyContent={'center'} alignItems={'center'}>
            <Box
              width={'14px'}
              height={'14px'}
              background={'#FF9100'}
              borderRadius={'50%'}
              margin={'6px'}
            />
            <Text
              fontFamily={'Nunito'}
              fontWeight={'700'}
              fontSize={'13px'}
              lineHeight={'15px'}
              color={'white'}
              textTransform={'capitalize'}
            >
              Registered Players
            </Text>
          </Flex>
          <Flex justifyContent={'center'} alignItems={'center'}>
            <Box
              width={'14px'}
              height={'14px'}
              background={'#3D3D3D'}
              borderRadius={'50%'}
              margin={'6px'}
            />
            <Text
              fontFamily={'Nunito'}
              fontWeight={'700'}
              fontSize={'13px'}
              lineHeight={'15px'}
              color={'white'}
              textTransform={'capitalize'}
            >
              Remaining spots
            </Text>
          </Flex>
        </Flex>
      </Box>

      <Flex
        mt={'20px'}
        display={['flex', 'flex', 'flex', 'none']}
        border={'1px solid #FFFFFF'}
        borderRadius={'10px'}
        height={'100px'}
        direction='column'
        justifyContent='center'
        alignItems='center'
        width={['calc(100vw - 150px)', 'calc(100vw - 150px)', '600px']}
      >
        <Flex
          justifyContent={'center'}
          alignItems={'center'}
          gap={'30px'}
        >
          <Flex
            direction={'column'}
            justifyContent='center'
            alignItems='center'
          >
            <Text
              fontFamily={'Nunito'}
              fontWeight={'700'}
              fontSize={'41px'}
              lineHeight={'56px'}
              color={'#E18933'}
              textTransform={'capitalize'}
            >
              {totalPlayers}
            </Text>
            <Text
              fontFamily={'Nunito'}
              fontWeight={'700'}
              fontSize={'11px'}
              lineHeight={'15px'}
              // color={'#E18933'}
              textTransform={'capitalize'}
            >
              Player(s) Registered{' '}
            </Text>
          </Flex>
          <Flex direction={'column'}>
            <Text
              fontFamily={'Nunito'}
              fontWeight={'700'}
              fontSize={'41px'}
              lineHeight={'56px'}
              color={'#E18933'}
              textTransform={'capitalize'}
            >
              {maxPlayers - totalPlayers}
            </Text>
            <Text
              fontFamily={'Nunito'}
              fontWeight={'700'}
              fontSize={'11px'}
              lineHeight={'15px'}
              // color={'#E18933'}
              textTransform={'capitalize'}
            >
              Spots remains
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <TotalCurrentPrizePool
        eventID={eventID}
        registerAmount={registerAmount}
        roundBetAmount={roundBetAmount}
        orgFeePercent={orgFeePercent}
        totalAmount={totalAmount}
        registerID={registerID ?? 0}
        category={category}
        currentLevel={currentLevel ?? 0}
        maxPlayers={maxPlayers}
        totalPlayers={totalPlayers}
        registerDeadline={registerDeadline}
      />
    </>
  )
}

export default RegisterComponent
