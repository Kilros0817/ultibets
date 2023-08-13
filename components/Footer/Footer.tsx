import {
  Box,
  Flex,
  Grid,
  Image,
  Stack,
} from '@chakra-ui/react'
import React from 'react'
import NavLink from '../Header/Navlink'
import { LinkArry } from '../../utils/config'

const Footer = () => {

  return (
    <>
      <Box
        zIndex='2'>
        <Box
          mt={['0px', '0px', '0px', '10px']}
          display={['block', 'block', 'block', 'block']}
          bgGradient={'linear(to-r, #353535 29.48%, #5A3B2E 75.94%)'}
          borderStyle={'solid'}
          width={'100%'}
          bottom={'0'}
          px={'20px'}
        >
          <Flex
            height={['unset', 'unset', 'unset', '70px']}
            justifyContent={['center', 'center', 'center', 'space-between']}
            alignItems={'center'}
            direction={[
              'column-reverse',
              'column-reverse',
              'column-reverse',
              'row',
            ]}
          >
            <Flex
              display={['none', 'none', 'flex', 'flex']}
              gap={['20px', '20px', '20px', '20px']}
              px='6'
              alignItems='center'
            >
              {LinkArry.map((item, index) => (
                <NavLink key={index} name={item.name} footer href={item.href} />
              ))}
            </Flex>
            <Grid
              display={['grid', 'grid', 'none', 'none']}
              gridTemplateColumns={'repeat(2, 120px)'}
              mb={['10px', '20px', '20px', '0']}
              mx={'auto'}
              columnGap={['15px', '100px']}
            >
              {
                LinkArry.map((item, index) => (
                  <NavLink key={index} name={item.name} footer href={item.href} />
                ))
              }
            </Grid>
            <Stack
              direction={'row'}
              gap={['10px', '40px', '20px']}
            >
              <a href="https://medium.com/@ultibets" target="_new">
                <Image
                  src={'/images/svgs/medium-logo.svg'}
                  alt="Twitter"
                  height={27}
                  width={27}
                />
              </a>
              <a href="http://t.me/ultibets" target="_new">
                <Image
                  src={'/images/svgs/telegram-logo.svg'}
                  alt="Twitter"
                  height={27}
                  width={27}
                />
              </a>
              <a href="http://discord.gg/EsWqNmTcdr" target="_new">
                <Image
                  src={'/images/svgs/discord-logo.svg'}
                  alt="Twitter"
                  height={27}
                  width={27}
                />
              </a>
              <a href="https://twitter.com/ultibets" target="_new">
                <Image
                  src={'/images/svgs/twitter-logo.svg'}
                  alt="Twitter"
                  height={27}
                  width={27}
                />
              </a>

              <a href="https://www.instagram.com/ultibetsofficial/" target="_new"
                style={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                <Image
                  src={'/images/svgs/instagram-logo.svg'}
                  alt="Instagram"
                  height={17}
                  width={27}
                />
              </a>
            </Stack>
          </Flex>
        </Box>
      </Box>
    </>
  )
}

export default Footer
