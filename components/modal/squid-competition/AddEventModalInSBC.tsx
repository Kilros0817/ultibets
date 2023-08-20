import {
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useState, useEffect, } from 'react';
// @ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import { newChainAttrs, polygonChainId, secondsInHalfHour, } from '../../../utils/config';
import { checkIconInGreenBg } from '../../../utils/assets';
import { useCreateNewEvent } from '../../../utils/interact/sc/squid-competition';
import AnnounceModal from '../AnnounceModal';
import { useChainContext } from '../../../utils/Context';
import { useNetwork } from 'wagmi';
import axios from 'axios';
import AllChainTxAnnounceModal from '../AllChainTxAnnounceModal';

type AddSBCEventModalProps = {
  isOpen: boolean,
  onClose: () => void,
  repeatLevel: number,
}

const AddEventModalInSBC = ({
  isOpen,
  onClose,
  repeatLevel,
}: AddSBCEventModalProps) => {
  const { chain, } = useNetwork();
  const { isNativeToken, } = useChainContext();
  const [shouldRender, setShouldRender] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [description, setDescription] = useState<string>('');
  const [totalRound, setTotalRound] = useState<number | null>(5);
  const [maxPlayers, setMaxPlayers] = useState<number | null>(500);
  const [registrationCost, setRegistrationCost] = useState<number | null>(10);
  const [roundBetCost, setRoundBetCost] = useState<number | null>(5);
  const [orgFeePercent, setOrgFeePercent] = useState<number | null>(10);
  const [isWarrior, setIsWarrior] = useState<string>('false');
  const [tokenSymbol, setTokenSymbol] = useState<string>(isNativeToken ? 'MATIC' : 'Utbets');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [allChainTxAnnounceResult, setAllChainTxAnnounceResult] = useState<any>([]);
  const {
    isOpen: isOpenAddEventSuccessAnnounceModal,
    onOpen: onOpenAddEventSuccessAnnounceModal,
    onClose: onCloseAddEventSuccessAnnounceModal,
  } = useDisclosure();
  const {
    isOpen: isOpenAllChainTxAnnounceModal,
    onOpen: onOpenAllChainTxAnnounceModal,
    onClose: onCloseAllChainTxAnnounceModal,
  } = useDisclosure();

  useEffect(() => {
    setTokenSymbol(isNativeToken ? (newChainAttrs as any)[chain?.id ?? polygonChainId].nativeToken : 'UTBETS');
  }, [
    isNativeToken,
    chain
  ])

  const createNewEvent = useCreateNewEvent(
    description,
    maxPlayers ?? 0,
    registrationCost ?? 0,
    Math.round(selectedDate.getTime() / 1000),
    totalRound ?? 0,
    roundBetCost ?? 0,
    (orgFeePercent ?? 0),
    isNativeToken,
    isWarrior == 'true' ? true : false,
  )

  const checkIfIsInputValid = () => {
    if (selectedDate.getTime() <= Date.now() + secondsInHalfHour * 1000) {
      toast.warn("Event start time should be at least 30 mins after");
      return false;
    }

    if (description == '' || (maxPlayers ?? 0) == 0 || (registrationCost ?? 0) == 0 ||
      (totalRound ?? 0) == 0 || (roundBetCost ?? 0) == 0 || (orgFeePercent ?? 0) == 0
    ) {
      toast.warn("Please type in the form");
      return false;
    }
    return true;
  }

  const handleAddEventInRepeatLevel_1_2 = async (repeatLevel: number) => {
    if (!checkIfIsInputValid()) return;

    try {
      setIsProcessing(true);
      const data = {
        description: description,
        maxPlayers: maxPlayers,
        registrationCost: registrationCost,
        registerDeadline: Math.round(selectedDate.getTime() / 1000),
        totalRound: totalRound,
        roundBetCost: roundBetCost,
        orgFeePercent: orgFeePercent,
        isWarrior: isWarrior == 'true' ? true : false,
        repeatLevel: repeatLevel,
        chainId: chain?.id ?? 0,
      };

      console.log("data: ", data);

      const response = (await axios.post(
        '/api/addEventAllInSBC',
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        })).data;

      console.log("**********   response: ", response);
      if (response.isSuccess) {
        setAllChainTxAnnounceResult(response.result);
        onOpenAllChainTxAnnounceModal();
      }

      onOpenAddEventSuccessAnnounceModal();
      onClose();
      setDescription('');
      setSelectedDate(new Date());
    } catch (err) {
      console.log('error in add sbc event in repeat level 2 ', err);
    }
    setIsProcessing(false);
  }

  const handleAddEventInRepeatLevel0 = () => {
    if (!checkIfIsInputValid()) return;

    if (createNewEvent.isLoading) return;
    try {
      createNewEvent.createNewEventFunction?.();
      onOpenAddEventSuccessAnnounceModal();
      onClose();
      setDescription('');
      setSelectedDate(new Date());
    } catch (err) {
      console.log('error in add sbc event in current categories: ', err);
    }
  }

  useEffect(() => {
    if (isOpen == true) {
      let weeks = document.getElementsByClassName('react-datepicker__week');
      setTimeout(() => {
        let oldWeek = true;
        let oldDate = true;

        if (document.getElementsByClassName('react-datepicker__day--today').length) {
          for (let weekIndex = 0; weekIndex < weeks.length - 1, oldWeek; weekIndex++) {
            const today = weeks[weekIndex].getElementsByClassName('react-datepicker__day--today')[0];
            const currentWeek = weeks[weekIndex];
            const weekDays = currentWeek.getElementsByClassName('react-datepicker__day');

            for (let weekDayIndex = 0; weekDayIndex < 7 && oldDate; weekDayIndex++) {
              if (weekDays[weekDayIndex] == today) {
                oldDate = false;
                oldWeek = false
              } else {
                weekDays[weekDayIndex].setAttribute('style', 'color: #B7B7B7 !important');
              }
            }
          }
        }
      }, 10);
    }
  }, [isOpen, shouldRender])

  return (
    <Flex
      className='add-sbc-event-modal-wrapper-in-sbc'
      bg={'#1F1F1F'}
      borderRadius={'15px'}
    >
      <Modal isOpen={isOpen} onClose={onClose}>
        {' '}
        <ModalOverlay
          bg='blackAlpha.10'
          backdropFilter='blur(10px) hue-rotate(10deg)'
        />
        <ModalContent
          className='add-sbc-event-modal-content'
          width={'auto'}
          border={'1px solid white'}
        >
          <ModalCloseButton />
          <ModalBody
            py={'60px'}
            px={['20px', '60px']}
            className='add-event-modal-body'
          >
            <Flex
              fontFamily={'Nunito'}
              fontWeight={'700'}
              fontSize={'22px'}
              lineHeight={'30px'}
              color={'white'}
              textTransform={'capitalize'}
              className='title'
            >
              Set the Event Details
            </Flex>

            <Flex
              className='sbc-event-description-wrapper'
              direction={'column'}
              mt={'32px'}
            >
              <Flex
                fontFamily={'Nunito'}
                fontWeight={'700'}
                fontSize={'22px'}
                lineHeight={'30px'}
                color={'white'}
                textTransform={'capitalize'}
              >
                Event Description
              </Flex>
              <Input
                value={description}
                variant="flushed"
                borderBottom={'2px solid #739AF0 !important'}
                onChange={(e) => setDescription(e.target.value)}
                fontFamily={'Nunito'}
              />
            </Flex>

            <Flex
              className='event-start-time-picker-wrapper-in-admin-page'
              direction={'column'}
              mt={'46px'}
            >
              <Flex
                fontFamily={'Nunito'}
                fontWeight={'700'}
                fontSize={'22px'}
                lineHeight={'30px'}
                color={'white'}
                textTransform={'capitalize'}
                mb={'20px'}
              >
                Event start time
              </Flex>
              <DatePicker
                selected={selectedDate}
                onMonthChange={() => setShouldRender(!shouldRender)}
                onChange={(date: Date) => {
                  setSelectedDate(date);
                  setShouldRender(!shouldRender);
                }}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
                showPopperArrow={false}
              />
            </Flex>

            <Flex
              className='sbc-event-total-rounds-wrapper'
              direction={'column'}
              mt={'32px'}
            >
              <Flex
                fontFamily={'Nunito'}
                fontWeight={'700'}
                fontSize={'22px'}
                lineHeight={'30px'}
                color={'white'}
                textTransform={'capitalize'}
              >
                Total Rounds
              </Flex>
              <Input
                value={totalRound == null ? '' : totalRound}
                placeholder={'0'}
                type={'number'}
                variant="flushed"
                borderBottom={'2px solid #739AF0 !important'}
                onChange={(e) => setTotalRound(e?.target?.value == '' ? null : Number(e?.target?.value))}
                fontFamily={'Nunito'}
              />
            </Flex>

            <Flex
              className='sbc-event-max-players-wrapper'
              direction={'column'}
              mt={'32px'}
            >
              <Flex
                fontFamily={'Nunito'}
                fontWeight={'700'}
                fontSize={'22px'}
                lineHeight={'30px'}
                color={'white'}
                textTransform={'capitalize'}
              >
                Max Players
              </Flex>
              <Input
                value={maxPlayers == null ? '' : maxPlayers}
                placeholder={'0'}
                type={'number'}
                variant="flushed"
                borderBottom={'2px solid #739AF0 !important'}
                onChange={(e) => setMaxPlayers(e?.target?.value == '' ? null : Number(e?.target?.value))}
                fontFamily={'Nunito'}
              />
            </Flex>

            <Flex
              className='sbc-event-organization-fee-percent-wrapper'
              direction={'column'}
              mt={'32px'}
            >
              <Flex
                fontFamily={'Nunito'}
                fontWeight={'700'}
                fontSize={'22px'}
                lineHeight={'30px'}
                color={'white'}
                textTransform={'capitalize'}
              >
                Organization Fee Percent
              </Flex>
              <Flex
                alignItems={'flex-end'}
              >
                <Input
                  value={orgFeePercent == null ? '' : orgFeePercent}
                  placeholder={'0'}
                  type={'number'}
                  variant="flushed"
                  borderBottom={'2px solid #739AF0 !important'}
                  onChange={(e) => setOrgFeePercent(e?.target?.value == '' ? null : Number(e?.target?.value))}
                  fontFamily={'Nunito'}
                />
                %
              </Flex>
            </Flex>

            {
              !isNativeToken && (
                <Flex
                  className='event-organization-fee-percent-wrapper'
                  direction={'column'}
                  mt={'32px'}
                >
                  <Flex
                    fontFamily={'Nunito'}
                    fontWeight={'700'}
                    fontSize={'22px'}
                    lineHeight={'30px'}
                    color={'white'}
                    textTransform={'capitalize'}
                  >
                    Is Warrior
                  </Flex>
                  <RadioGroup onChange={setIsWarrior} value={isWarrior}>
                    <Stack direction='row'>
                      <Radio value='true' fontFamily={'Nunito'}>True</Radio>
                      <Radio value='false' fontFamily={'Nunito'}>False</Radio>
                    </Stack>
                  </RadioGroup>
                </Flex>
              )
            }

            <Flex
              border={'1px solid #FC541C'}
              borderRadius={'45px'}
              px={'28px'}
              py={'7px'}
              mt={'67px'}
              onClick={() => repeatLevel >= 1 ?
                handleAddEventInRepeatLevel_1_2(repeatLevel)
                : handleAddEventInRepeatLevel0()
              }
              fontFamily={'Nunito'}
              fontSize={'14px'}
              lineHeight={'19px'}
              cursor={'pointer'}
              width={'fit-content'}
            >
              Create Event
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <AnnounceModal
        isOpenAnnounceModal={isOpenAddEventSuccessAnnounceModal && createNewEvent.isSuccess}
        onCloseAnnounceModal={onCloseAddEventSuccessAnnounceModal}
        announceText={'Event has been successfully added'}
        announceLogo={checkIconInGreenBg}
        announceModalButtonText={'Close'}
      />
      <AllChainTxAnnounceModal
        isOpenAllChainTxAnnounceModal={isOpenAllChainTxAnnounceModal}
        onCloseAllChainTxAnnounceModal={onCloseAllChainTxAnnounceModal}
        allChainTxAnnounceResult={allChainTxAnnounceResult}
      />
      <AnnounceModal
        isOpenAnnounceModal={
          isProcessing || (isOpenAddEventSuccessAnnounceModal && createNewEvent.isLoading)
        }
        onCloseAnnounceModal={onCloseAddEventSuccessAnnounceModal}
        announceText={'Your transaction is currently processing on the blockchain'}
        announceGif={true}
        announceModalButtonText={'Close'}
      />
    </Flex >
  )
}

export default AddEventModalInSBC
