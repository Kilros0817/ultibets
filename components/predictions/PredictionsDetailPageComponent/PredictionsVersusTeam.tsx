import {
  Flex,
  Image,
  Text,
} from '@chakra-ui/react'

export type PredictionsVersusTeamProps = {
  description?: string
  logo?: string
  series?: string
}

const PredictionsVersusTeam = ({
  description,
  logo,
  series,
}: PredictionsVersusTeamProps) => {

  return (
    <Flex
      direction='column'
    >
      <Flex
        gap={'5px'}
        alignItems={['start', 'center', 'center', 'center']}
        justifyContent={'start'}
        display={['flex', 'flex', 'none', 'none']}
        mb='3'
      >
        <Image
          width={'25px'}
          height={'25px'}
          src={logo}
          alt="soccer"
        />
        <Text
          fontFamily={'Nunito'}
          fontWeight={'700'}
          fontSize={'17px'}
          lineHeight={'23px'}
        >
          {/* Series A */}
          {series}
        </Text>
      </Flex>

      <Flex
        gap={'30px'}
        direction={['column-reverse', 'column', 'row', 'row']}
      >
        <Text
          fontFamily={'Inter'}
          fontStyle={'normal'}
          fontWeight={'extrabold'}
          fontSize={'28px'}
          lineHeight={'34px'}
          color={'white'}
          textTransform={'capitalize'}
        >
          {/* Atlanta Vs. Sampdoria */}
          {description}{' '}
        </Text>
        <Flex
          gap={'5px'}
          alignItems={['start', 'center', 'center', 'center']}
          justifyContent={'start'}
          display={['none', 'none', 'flex', 'flex']}
        >
          <Image
            width={'25px'}
            height={'25px'}
            src={logo}
            alt="soccer"
          />
          <Text
            fontFamily={'Nunito'}
            fontWeight={'700'}
            fontSize={'17px'}
            lineHeight={'23px'}
          >
            {/* Series A */}
            {series}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default PredictionsVersusTeam
