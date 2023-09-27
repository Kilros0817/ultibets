import { Flex, Image } from '@chakra-ui/react'
import React from 'react'

type CarouselItemProps = {
  id: string
  logo: string
  href?: string
}
const CarouselLink = () => {
  const CarouselItems: Array<CarouselItemProps> = [
    {
      id: 'twitter',
      logo: '/images/svgs/slider/twitter-logo.svg',
      href: 'https://twitter.com/ultibets',
    },
    {
      id: 'instagram',
      logo: '/images/svgs/slider/ig-logo.svg',
      href: 'http://instagram.com/ultibetsofficial',
    },
    {
      id: 'telegram',
      logo: '/images/svgs/slider/telegram-logo.svg',
      href: 'http://t.me/ultibets',
    },
    {
      id: 'discord',
      logo: '/images/svgs/slider/discord-logo.svg',
      href: 'http://discord.gg/EsWqNmTcdr',
    },
  ]
  return (
    <Flex mt={'10px'} justifyContent={'center'} alignItems={'center'}>
      {CarouselItems.map((item) => (
        <a href={item.href} key={item.id} target="_new">
          {' '}
          <Flex
            width={'50px'}
            height={'50px'}
            backgroundSize={'contain'}
            backgroundRepeat={'no-repeat'}
            backgroundPosition={'center'}
            backgroundImage={`url(${item.logo})`}
            cursor={'pointer'}
            _hover={{
              transform: 'scale(1.1)',
            }}
          ></Flex>
        </a>
      ))}
    </Flex>
  )
}

export default CarouselLink
