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
        gap={'30px'}
        direction={'row'}
      >
        <Text
          fontFamily={'Inter'}
          fontStyle={'normal'}
          fontWeight={['bold', 'extrabold']}
          fontSize={['24px', '28px']}
          lineHeight={['30px', '34px']}
          color={'white'}
          textTransform={'capitalize'}
        >
          {/* Atlanta Vs. Sampdoria */}
          {description}{' '}
        </Text>
        <Flex
          gap={'5px'}
          alignItems={['center']}
          justifyContent={'start'}
          display={['flex']}
        >
          <Image
            width={['20px', '25px']}
            height={['20px', '25px']}
            src={logo}
            alt="soccer"
          />
          <Text
            fontFamily={'Nunito'}
            fontWeight={['500', '700']}
            fontSize={['14px', '17px']}
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
