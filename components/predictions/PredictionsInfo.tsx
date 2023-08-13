import {
  Flex,
} from '@chakra-ui/react'
import PredictionsVersusTeam from './PredictionsDetailPageComponent/PredictionsVersusTeam';
import PredictionsCoreComponent3 from './PredictionsDetailPageComponent/PredictionsCoreComponent3';
import PredictionsCoreComponent2 from './PredictionsDetailPageComponent/PredictionsCoreComponent2';
import { EventType } from '../../utils/config';

export type PredictionsInfoProps = {
  description?: string
  logo?: string
  series?: string
  betType?: EventType
  sidePoolVolumes: string[]
}

const PredictionsInfo = ({
  description,
  logo,
  series,
  betType,
  sidePoolVolumes,
}: PredictionsInfoProps) => {

  return (
    <Flex
      direction='column'
      mt='70px'
      className='predictions-info'
    >
      <PredictionsVersusTeam
        description={description}
        logo={logo}
        series={series}
      />

      {
        betType == EventType.Triple ? (
          <PredictionsCoreComponent3
            sidePoolVolumes={sidePoolVolumes}
          />
        ) : (
          <PredictionsCoreComponent2
            sidePoolVolumes={sidePoolVolumes}
          />
        )
      }
    </Flex>
  )
}

export default PredictionsInfo
