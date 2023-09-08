import {
  Flex,
  Heading,
  Text,
  Image,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import '@fontsource/nunito'
import {
  AddIcon,
  CloseIcon,
} from '@chakra-ui/icons'

const FAQS = () => {
  const [activeOne, setActiveOne] = useState(false)
  const [activeTwo, setActiveTwo] = useState(false)
  const [activeThree, setActiveThree] = useState(false)
  const [activeFour, setActiveFour] = useState(false)
  const [activeFive, setActiveFive] = useState(false)

  const toggleAccordionOne = () => {
    setActiveOne(!activeOne)
  }
  const toggleAccordionTwo = () => {
    setActiveTwo(!activeTwo)
  }
  const toggleAccordionThree = () => {
    setActiveThree(!activeThree)
  }
  const toggleAccordionFour = () => {
    setActiveFour(!activeFour)
  }
  const toggleAccordionFive = () => {
    setActiveFive(!activeFive)
  }
  return (
    <Flex
      direction={'column'}
      justifyContent={'start'}
      alignItems={'center'}
      gap={'20px'}
      mb={'30px'}
    >
      <Flex justifyContent={'center'} alignItems={'center'}>
        <Heading fontSize={'30px'} mt={'50px'}>
          Frequently Asked Questions
        </Heading>
      </Flex>
      <Flex
        mt={'20px'}
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={'30px'}
      >
        <Flex
          width={['370px', '350px', '650px', '650px']}
          height={activeOne ? 'auto' : '50px'}
          borderRadius={'5px'}
          border={'1px solid #FFFFFF'}
          justifyContent={'center'}
          alignItems={'center'}
          direction={'column'}
          gap={'20px'}
          px={['0px', '20px', '40px', '40px']}
          onClick={toggleAccordionOne}
          cursor={'pointer'}
        >
          <Flex
            width={['340px', '300px', '500px', '500px']}
            onClick={toggleAccordionOne}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Text
              fontFamily={'Nunito'}
              fontStyle={'normal'}
              fontWeight={'700'}
              fontSize={['14px', '14px', '22px', '22px']}
              lineHeight={'30px'}
              color={'white'}
              mt={activeOne ? '15px' : '0px'}
            >
              What is UltiBets?
            </Text>
            {
              activeOne ? (
                <CloseIcon cursor={'pointer'} fontSize={'15px'} />
              ) : (
                <AddIcon cursor={'pointer'} fontSize={'15px'} />
              )
            }
          </Flex>
          {
            activeOne && (
              <Flex direction={'column'} gap={'10px'} mb={'20px'}>
                <Text
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                  color={'#BDBDBD'}
                >
                  UltiBets is aiming to become the leader and a pioneer into the blockchain industry by being the First Multichain Prediction Markets and GameFi Crypto Platform.<br /><br />
                  By bringing various and exciting features with intuitive ease-of-use for UltiBettors (the members of the UltiBets Community) no matter which blockchain they prefer to use, we are offering the ultimate prediction experience on blockchain, join us and try it now!<br /><br />
                  We offer the following features on our platform:
                </Text>
                <Text
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                  color={'#BDBDBD'}
                >
                  Core Features:
                  <ul
                    style={{
                      listStyleType: 'none',
                      paddingLeft: '0px',
                      width: '100%',
                    }}
                  >
                    <li> - Prediction Markets in 11 Categories</li>
                    <li> - Weekly tournament of Squid Bet Competitions (SBC)</li>
                  </ul>
                </Text>
                <Text
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                  color={'#BDBDBD'}
                >
                  Social Features:
                  <ul
                    style={{
                      listStyleType: 'none',
                      paddingLeft: '0px',
                      width: '100%',
                    }}
                  >
                    <li> - UTBETS Leaderboard</li>
                    <li> - Referral System</li>
                    <li> - Reward System</li>
                  </ul>
                </Text>
                <Text
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                  color={'#BDBDBD'}
                >
                  UTBETS Features:
                  <ul
                    style={{
                      listStyleType: 'none',
                      paddingLeft: '0px',
                      width: '100%',
                    }}
                  >
                    <li> - Governance (UTBETS holders)</li>
                    <li> - Buy UTBETS Token</li>
                    <li> - UTBETS LP Pairs</li>
                    <li> - Bridge UTBETS Token</li>
                  </ul>
                </Text>
                <Text
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                  color={'#BDBDBD'}
                >
                  UltiBets Metaverse
                </Text>
                <Text
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                  color={'#BDBDBD'}
                >
                  UltiBets Merch' Store
                </Text>
                <Text
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                  color={'#BDBDBD'}
                  mt={'10px'}
                >
                  As a Multichain platform, UltiBets will be launched on the following 4 EVM-compatible blockchains :
                  <ul
                    style={{
                      listStyleType: 'none',
                      paddingLeft: '0px',
                      width: '100%',
                    }}
                  >
                    <li> - Arbitrum</li>
                    <li> - Avalanche</li>
                    <li> - Binance Smart Chain</li>
                    <li> - Polygon</li>
                  </ul>
                </Text>
                <Text
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                  color={'#BDBDBD'}
                >
                  5 Choice of Cryptocurrencies to use on the platform:
                </Text>
                <Text
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                  color={'#BDBDBD'}
                >
                  <ul
                    style={{
                      listStyleType: 'none',
                      paddingLeft: '0px',
                      width: '100%',
                    }}
                  >
                    <li> - AVAX</li>
                    <li> - BNB</li>
                    <li> - ETH (Arbitrum)</li>
                    <li> - MATIC</li>
                    <li> - UTBETS</li>
                  </ul>
                </Text>
                <Text
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                  color={'#BDBDBD'}
                  mt={'10px'}
                >
                  UTBETS is the only official UltiBets Token, being the cornerstone of our Ecosystem, available on each of the 4 chains we will be launched on listed above.<br /><br />
                  You can learn more about the UTBETS Tokenomics here and find the addresses of the contracts deployed for each chain inside the UTBETS Token Page.<br /><br />
                  To start learning about using the UltiBets platform, you can follow our various Tutorials, they will guide you step-by-step to use every feature available on the website.<br /><br />
                  For more experienced users or developers, you can check our Github as well as our documentation about our front-end forking process and the addresses to all our smart contracts.
                </Text>
              </Flex>
            )
          }
        </Flex>
        <Flex
          width={['370px', '350px', '650px', '650px']}
          height={activeTwo ? 'auto' : '50px'}
          borderRadius={'5px'}
          border={'1px solid #FFFFFF'}
          justifyContent={'center'}
          alignItems={'center'}
          direction={'column'}
          gap={'20px'}
          px={['0px', '20px', '40px', '40px']}
          onClick={toggleAccordionTwo}
          cursor={'pointer'}
        >
          <Flex
            width={['340px', '300px', '500px', '500px']}
            onClick={toggleAccordionTwo}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Text
              fontFamily={'Nunito'}
              fontStyle={'normal'}
              fontWeight={'700'}
              fontSize={['14px', '14px', '22px', '22px']}
              lineHeight={'30px'}
              color={'white'}
              mt={activeTwo ? '15px' : '0px'}
            >
              How do you place a bet on UltiBets?{' '}
            </Text>
            {
              activeTwo ? (
                <CloseIcon cursor={'pointer'} fontSize={'15px'} />
              ) : (
                <AddIcon cursor={'pointer'} fontSize={'15px'} />
              )
            }
          </Flex>
          {
            activeTwo && (
              <Flex m={'10px'} direction={'column'} gap={'10px'} mb={'20px'}>
                <Text
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                  color={'#BDBDBD'}
                >
                  Prediction markets offer an exciting way to engage with real-world events and make predictions on their outcomes. This guide will walk you through the key steps of placing predictions, checking your predictions, claiming gains for winning predictions, leaderboard registration, and using the referral system.<br /><br /><br />
                </Text>
                <Text
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                >
                  How to Place Predictions
                </Text>
                <Text
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                  color={'#BDBDBD'}
                >
                  To place predictions on UltiBets, follow these steps:
                  <ul
                    style={{
                      listStyleType: 'none',
                      paddingLeft: '0px',
                      width: '100%',
                    }}
                  >
                    <li> 1. Log in to UltiBets.com with your wallet.</li>
                    <li> 2. Visit the "Prediction Markets" section at  https://ultibets.com/prediction-markets and browse any available predictions across our 11 categories, and select one that interests you. You can also move forward in time to find a future prediction using the Calendar. </li>
                    <li> 3. Read the market details and available predictions choices. </li>
                    <li> 4. Pick a side and allocate the desired amount of tokens to the prediction. </li>
                    <li> 5. Confirm your prediction on your wallet, once confirmed, this it it!</li>
                  </ul>
                </Text>
                <Text
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                  mt={'20px'}
                >
                  Congratulations UltiBettor, you've just placed your first prediction on UltiBets!
                </Text>
                <Text
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                  mt={'25px'}
                >
                  Checking Predictions and Claiming Gains
                </Text>
                <Text
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                  color={'#BDBDBD'}
                >
                  Before, during and after the event concludes, you can check the status of your predictions:
                  <ul
                    style={{
                      listStyleType: 'none',
                      paddingLeft: '0px',
                      width: '100%',
                    }}
                  >
                    <li> 1. Visit the "My Predictions" section on your account.</li>
                    <li> 2. Find the corresponding prediction and view the outcome. </li>
                    <li> 3. If your prediction is correct, you can claim your gains directly from this section by clicking the "Claim Gain" Button</li>
                  </ul>
                </Text>
                <Text mt={`20px`}>
                  {' '}
                  Congratulations! You just place your first bet on UltiBets!
                </Text>
              </Flex>
            )
          }
        </Flex>
        <Flex
          width={['370px', '350px', '650px', '650px']}
          height={activeThree ? 'auto' : '50px'}
          borderRadius={'5px'}
          border={'1px solid #FFFFFF'}
          justifyContent={'center'}
          alignItems={'center'}
          direction={'column'}
          gap={'20px'}
          px={['0px', '20px', '40px', '40px']}
          onClick={toggleAccordionThree}
          cursor={'pointer'}
        >
          <Flex
            width={['340px', '300px', '500px', '500px']}
            onClick={toggleAccordionThree}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Text
              fontFamily={'Nunito'}
              fontStyle={'normal'}
              fontWeight={'700'}
              fontSize={['14px', '14px', '22px', '22px']}
              lineHeight={'30px'}
              color={'white'}
              mt={activeThree ? '15px' : '0px'}
            >
              What is Squid Bet Competition (SBC)?{' '}
            </Text>
            {activeThree ? (
              <CloseIcon cursor={'pointer'} fontSize={'15px'} />
            ) : (
              <AddIcon cursor={'pointer'} fontSize={'15px'} />
            )}
          </Flex>
          {
            activeThree && (
              <Flex direction={'column'} gap={'10px'} mb={'20px'}>
                <Text
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                  color={'#BDBDBD'}
                >
                  Our GameFi feature, Squid Bet Competitions (SBC) offers a unique way to showcase your predictions skills during this weekly tournament. <br /><br />
                  This tutorial will walk you through the steps of participating in SBC, from registration to final voting, and how to claim SBC NFTs along with their associated perks.
                </Text>
                <Text
                  mt={'20px'}
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                >
                  Participating in the SBC involves several stages:
                </Text>
                <Text
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                  color={'#BDBDBD'}
                >
                  <Text color={'white'}>
                    SBC Registration:
                  </Text>
                  <ul
                    style={{
                      listStyleType: 'none',
                      paddingLeft: '0px',
                      width: '100%',
                    }}
                  >
                    <li> 1. Log in to your UltiBets account with your wallet and navigate to the SBC section at https://ultibets.com/sbc</li>
                    <li> 2. Access to the current opened SBC by clicking the "Access Register Page" button. Both the Entry fee (to register) and Round Fees (to participate into the rounds, to increase the total prize pool) are explicitly stated on this page. </li>
                    <li> 3. Register by simply clicking "Register Now" on the SBC registration page, this will launch a transaction into your wallet, confirm it, and wait from the blockchain confirmation. </li>
                    <li> 4. That's it! Congratulations! You are officially registered for a weekly SBC. </li>
                  </ul>
                </Text>
                <Text
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                  color={'#BDBDBD'}
                  mt={'30px'}
                >
                  <Text color={'white'}>
                    SBC Rounds Participation:
                  </Text>
                  <ul
                    style={{
                      listStyleType: 'none',
                      paddingLeft: '0px',
                      width: '100%',
                    }}
                  >
                    <li> 1. Access to the current opened SBC by clicking the "Access Round (1 to 5)" button.</li>
                    <li> 2. Place your round prediction by selecting your side, then simply click the "Predict Now" button on the round page, this will launch a transaction into your wallet, confirm it, and wait from the blockchain confirmation. </li>
                    <li> 3. That's it! Congratulations! You have officially participated into a SBC Round!  </li>
                    <li> 4. At the end of the real-world event, the final result is announced, and the losing side is eliminated while the winning side is moving onto the next round. </li>
                  </ul>
                </Text>
                <Text
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                  color={'#BDBDBD'}
                  mt={'5px'}
                >
                  Like on the Prediction Markets feature, you have a deadline to place your prediction for the round, not doing so will eliminate you immediately from the SBC.
                </Text>
                <Text
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                  color={'#BDBDBD'}
                  mt={'30px'}
                >
                  <Text color={'white'}>
                    SBC Final Voting System:
                  </Text>
                  <Text mt={'5px'}>
                    At the end of the 5th and final round, if more than one UltiBettor is remaining, a voting with take place between these finalists.<br /><br />
                    2 voting choices are available (you can pick only one): <br />
                    - Spilt Equally the Prize Pool<br />
                    - Random Solo Winner* of the Prize Pool<br /><br />
                    Based on these 2 choices, the 3 following scenarios can appear:<br />
                  </Text>
                  <ul
                    style={{
                      listStyleType: 'none',
                      paddingLeft: '0px',
                      width: '100%',
                    }}
                  >
                    <li> 1. Split Equally wins: meaning the prize pool will be equally split between each remaining player.</li>
                    <li> 2. Random Solo Winner wins: meaning the prize pool will be attributed randomly to a unique winner among the finalists. </li>
                    <li> 3. Equality (Lack of consensus): if this happens, the Random Solo Winner choice will be picked by default to let the fate decide a unique winner among the finalists. </li>
                  </ul>
                </Text>
                <Text
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                  mt={'20px'}
                >
                  Winner(s) can then claim his/her/their prize pool on the last section of each SBC ('SBC  Winner Page')
                </Text>
                <Text
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                  color={'#BDBDBD'}
                  mt={'10px'}
                >
                  *UltiBets is using the Chainlink VRF feature inside the SBC contracts on the 4 chains we are deployed on, in order to generate true randomness on the blockchain.
                </Text>
              </Flex>
            )
          }
        </Flex>
        <Flex
          width={['370px', '350px', '650px', '650px']}
          height={activeFour ? 'auto' : '50px'}
          borderRadius={'5px'}
          border={'1px solid #FFFFFF'}
          justifyContent={'center'}
          alignItems={'center'}
          direction={'column'}
          gap={'20px'}
          px={['0px', '20px', '40px', '40px']}
          cursor={'pointer'}
        >
          <Flex
            width={['340px', '300px', '500px', '500px']}
            onClick={toggleAccordionFour}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Text
              fontFamily={'Nunito'}
              fontStyle={'normal'}
              fontWeight={'700'}
              fontSize={['14px', '14px', '22px', '22px']}
              lineHeight={'30px'}
              color={'white'}
              mt={activeFour ? '15px' : '0px'}
            >
              How to purchase UTBETS Tokens ($UTBETS){' '}
            </Text>
            {
              activeFour ? (
                <CloseIcon cursor={'pointer'} fontSize={'15px'} />
              ) : (
                <AddIcon cursor={'pointer'} fontSize={'15px'} />
              )
            }
          </Flex>
          {
            activeFour && (
              <Flex direction={'column'} gap={'20px'} mb={`20px`}>
                <Text
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                  color={'#BDBDBD'}
                >
                  The UTBETS token is the cornerstone of UltiBets ecosystem. This tutorial will help you navigate the process of buying UTBETS tokens and providing liquidity to the UTBETS token on Uniswap.
                </Text>
                <Text
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                  color={'#BDBDBD'}
                >
                  <Text color={'white'}>
                    How to Buy UTBETS on Uniswap:
                  </Text>
                  <ul
                    style={{
                      listStyleType: 'none',
                      paddingLeft: '0px',
                      width: '100%',
                    }}
                  >
                    <li> 1. Visit the Uniswap platform at
                      <Text as={'span'} color={'#FFD700'}>
                        {' '}
                        <a
                          href="https://app.uniswap.org/#/swap"
                          target="_blank"
                          rel="noreferrer"
                        >
                          https://app.uniswap.org/#/swap
                        </a>
                      </Text>
                      {' '}and connect your compatible wallet.</li>
                    <li> 2. Select Tokens: Choose the token pair (e.g., ETH-UTBETS) to trade. Set Amount: Enter the amount of ETH you wish to trade for UTBETS. </li>
                    <li> 3. Swap Tokens: Confirm the transaction and approve the swap. </li>
                    <li> 4. That's it! Congratulations! You have officially bought UTBETS Tokens. </li>
                  </ul>
                </Text>
                <Text
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                  color={'#BDBDBD'}
                >
                  <Text color={'white'}>
                    How to Provide Liquidity to UTBETS Token on Uniswap:
                  </Text>
                  <ul
                    style={{
                      listStyleType: 'none',
                      paddingLeft: '0px',
                      width: '100%',
                    }}
                  >
                    <li> 1. Visit the Uniswap platform at:
                      <ul
                        style={{
                          listStyleType: 'none',
                          paddingLeft: '10px',
                          width: '100%',
                        }}
                      >
                        <li>- UTBETS-AVAX LP: <br />
                          <Text as={'span'} color={'#FFD700'}>
                            {' '}
                            <a
                              href="https://app.uniswap.org/#/add/ETH/0x11CD8f66Fe38eBc9eA2bfAD4b7927fE4035657eE"
                              target="_blank"
                              rel="noreferrer"
                            >
                              https://app.uniswap.org/#/add/ETH/0x11CD8f66Fe38eBc9eA2bfAD4b7927fE4035657eE
                            </a>
                          </Text>
                        </li>
                        <li>- UTBETS-BNB LP:  <br />
                          <Text as={'span'} color={'#FFD700'}>
                            {' '}
                            <a
                              href="https://app.uniswap.org/#/add/ETH/0x11CD8f66Fe38eBc9eA2bfAD4b7927fE4035657eE"
                              target="_blank"
                              rel="noreferrer"
                            >
                              https://app.uniswap.org/#/add/ETH/0x11CD8f66Fe38eBc9eA2bfAD4b7927fE4035657eE
                            </a>
                          </Text>
                        </li>
                        <li>- UTBETS-ETH LP: <br />
                          <Text as={'span'} color={'#FFD700'}>
                            {' '}
                            <a
                              href="https://app.uniswap.org/#/add/ETH/0x11CD8f66Fe38eBc9eA2bfAD4b7927fE4035657eE"
                              target="_blank"
                              rel="noreferrer"
                            >
                              https://app.uniswap.org/#/add/ETH/0x11CD8f66Fe38eBc9eA2bfAD4b7927fE4035657eE
                            </a>
                          </Text>
                        </li>
                        <li>- UTBETS-MATIC LP: <br />
                          <Text as={'span'} color={'#FFD700'}>
                            {' '}
                            <a
                              href="https://app.uniswap.org/#/add/ETH/0x11CD8f66Fe38eBc9eA2bfAD4b7927fE4035657eE"
                              target="_blank"
                              rel="noreferrer"
                            >
                              https://app.uniswap.org/#/add/ETH/0x11CD8f66Fe38eBc9eA2bfAD4b7927fE4035657eE
                            </a>
                          </Text>
                        </li>
                        <li><br />and establish a connection with your wallet.</li>
                      </ul>
                    </li>
                    <li> 2. Unlike Uniswap V2, Uniswap V3 allows you to provide liquidity by directly creating a liquidity pool with the UTBETS token and another compatible token. </li>
                    <li> 3. Choose the UTBETS token and the other token you wish to pair it with (AVAX/BNB/ETH/MATC). </li>
                    <li> 4. Define a concentration range, which narrows down the price range where your liquidity will be concentrated. This innovative approach offers more control over your exposure to price fluctuations. </li>
                    <li> 5. Specify the amounts of both tokens you want to add to the pool within the defined price range. </li>
                    <li> 6. Double-check all the details of your LP pair creation, including the concentration range and token allocations. </li>
                    <li> 7. Approve the transaction, and in return, you'll receive liquidity provider (LP) tokens. These tokens represent your ownership in the pool and the fees you'll earn from trading activity. </li>
                    <li> 8. That's it! Congratulations! You have officially bought UTBETS Tokens. </li>
                  </ul>
                </Text>
                <Text
                  width={['300px', '300px', '500px', '500px']}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={'500'}
                  lineHeight={'25px'}
                  color={'#BDBDBD'}
                  mt={'20px'}
                >
                  By using Uniswap V3's LP pair system for UTBETS Tokens, you can seamlessly provide liquidity and participate in the platform's dynamic trading environment. <br /><br />
                  Keep in mind that while liquidity provision can be rewarding, it also comes with inherent risks that you should consider.
                </Text>
              </Flex>
            )
          }
        </Flex>
        <Flex
          width={['370px', '350px', '650px', '650px']}
          height={activeFive ? 'auto' : '50px'}
          borderRadius={'5px'}
          border={'1px solid #FFFFFF'}
          justifyContent={'center'}
          alignItems={'center'}
          direction={'column'}
          gap={'20px'}
          px={['0px', '20px', '40px', '40px']}
          onClick={toggleAccordionFive}
          cursor={'pointer'}
        >
          <Flex
            width={['340px', '300px', '500px', '500px']}
            onClick={toggleAccordionFive}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Text
              fontFamily={'Nunito'}
              fontStyle={'normal'}
              fontWeight={'700'}
              fontSize={['14px', '14px', '22px', '22px']}
              lineHeight={'30px'}
              color={'white'}
              mt={activeFive ? '15px' : '0px'}
            >
              How to bridge my UTBETS Tokens?{' '}
            </Text>
            {
              activeFive ? (
                <CloseIcon cursor={'pointer'} fontSize={'15px'} />
              ) : (
                <AddIcon cursor={'pointer'} fontSize={'15px'} />
              )
            }
          </Flex>
          {
            activeFive && (
              <Text
                mb={`20px`}
                width={['300px', '300px', '500px', '500px']}
                fontFamily={'Nunito'}
                fontStyle={'normal'}
                fontWeight={'500'}
                lineHeight={'25px'}
                color={'#BDBDBD'}
              >
                <Text color={'white'} mb={'15px'}>
                  How to Bridge Your UTBETS Tokens using Bungee:
                </Text>
                <ul
                  style={{
                    listStyleType: 'none',
                    paddingLeft: '0px',
                    width: '100%',
                  }}
                >
                  <li>1. Visit the Bungee network's interface at
                    <Text as={'span'} color={'#FFD700'}>
                      {' '}
                      <a
                        href="https://www.bungee.exchange/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        https://www.bungee.exchange/
                      </a>
                    </Text>
                    {' '}and connect your wallet that holds UTBETS tokens. </li>
                  <li>2. Initiate the UTBETS token bridging process, specifying the source and destination networks between:
                  <ul
                    style={{
                      listStyleType: 'none',
                      paddingLeft: '10px',
                      width: '100%',
                    }}
                  >
                    <li>- Avalanche</li>
                    <li>- BSC</li>
                    <li>- Optimism</li>
                    <li>- Polygon</li>
                  </ul>
                  </li>
                  <li>3. Complete the transaction and wait for the bridging process to complete.</li>
                  <li>4. That's it! Congratulations! You have officially bridge your UTBETS Tokens.</li>
                </ul>
              </Text>
            )}
        </Flex>
      </Flex>
      <Image
        src='/images/pngs/left-white-gradient-2.svg'
        alt='left-white-gradient'
        position='absolute'
        bottom='0'
        left='0'
        zIndex='1'
      />
    </Flex>
  )
}

export default FAQS
