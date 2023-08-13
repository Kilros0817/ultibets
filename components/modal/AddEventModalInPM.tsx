import {
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  useDisclosure,
} from '@chakra-ui/react'
import axios from 'axios';
import React, { useState, useEffect, } from 'react';
// @ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import { useNetwork } from 'wagmi';
import { checkIconInGreenBg } from '../../utils/assets';
import { secondsInHalfHour, sidebarItems, subCategoriesInPredictionMarkets } from '../../utils/config';
import { useAddEvent } from '../../utils/interact/sc/prediction-markets';
import AllChainTxAnnounceModal from './AllChainTxAnnounceModal';
import AnnounceModal from './AnnounceModal';

type AddEventModalProps = {
  isOpen: boolean,
  onClose: () => void,
  repeatLevel: number,
}

const AddEventModalInPM = ({
  isOpen,
  onClose,
  repeatLevel,
}: AddEventModalProps) => {
  const { chain, } = useNetwork();
  const [shouldRender, setShouldRender] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<number>(0);
  const [subcategory, setSubcategory] = useState<number>(0);
  const [filteredCategories, setFilteredCategories] = useState<any[]>();
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

  const checkIfIsInputValid = () => {
    if (category == 0) {
      toast.warn("Please select category at first");
      return false;
    }

    if (category >= 1 && (sidebarItems as any)[category].isSubCategoryExist && subcategory == 0) {
      toast.warn("Please select subcategory at first");
      return false;
    }

    if (selectedDate.getTime() <= Date.now() + secondsInHalfHour * 1000) {
      toast.warn("Event start time should be at least 30 mins after");
      return false;
    }

    if (description == '') {
      toast.warn("Please type description at first");
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
        category: category,
        subcategory: Number(subcategory > 0 ? subcategory : 1),
        eventStartTime: Math.round(selectedDate.getTime() / 1000),
        repeatLevel: repeatLevel,
        chainId: chain?.id ?? 0,
      };

      console.log("data: ", data);

      const response = (await axios.post(
        '/api/addEventAllInPM',
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 600000, // 10 min
        }
      )).data;

      console.log("**********   response: ", response);
      if (response.isSuccess) {
        setAllChainTxAnnounceResult(response.result);
        onOpenAllChainTxAnnounceModal();
      }

      onClose();
      setDescription('');
      setCategory(0);
      setSubcategory(0);
      setSelectedDate(new Date());
    } catch (err) {
      console.log('error in add daily event in repeat level 1_2 ', err);
    }
    setIsProcessing(false);
  }

  const addEvent = useAddEvent(
    description,
    category,
    subcategory > 0 ? subcategory : 1,
    Math.round(selectedDate.getTime() / 1000),
  )

  const handleAddEventInRepeatLevel0 = () => {
    if (!checkIfIsInputValid()) return;

    if (addEvent.isLoading) return;
    try {
      addEvent.addEventFunction?.();
      onOpenAddEventSuccessAnnounceModal();
      onClose();
      setDescription('');
      setCategory(0);
      setSubcategory(0);
      setSelectedDate(new Date());
    } catch (err) {
      console.log('error in add daily event in repeat level 0 ', err);
    }
  }

  useEffect(() => {
    const filteredCategories = Object.entries(sidebarItems).slice(0, -1);
    // //@ts-ignore
    // .sort(([key1, value1], [key2, value2]) => value1.subMenuIndex - value2.subMenuIndex);
    setFilteredCategories(filteredCategories);
  }, [sidebarItems])

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
      className='add-event-modal-wrapper'
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
          className='add-event-modal-content'
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
              className='category-select-wrapper-in-admin-page'
              mt={'32px'}
            >
              <Select
                placeholder='Select Category'
                border={'2px solid #739AF0 !important'}
                fontFamily={'Nunito'}
                fontWeight={700}
                fontSize={'18px'}
                lineHeight={'25px'}
                width={'252px'}
                height={'41px'}
                borderRadius={'5px'}
                onChange={(e) => {
                  setCategory(isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value));
                  setSubcategory(0);
                }}
                value={category}
              >
                {
                  filteredCategories?.map(([key, value]) => (
                    <option
                      value={value.menuIndex}
                      //@ts-ignore
                      background={'#1F1F1F !important'}
                      cursor={'pointer'}
                      key={key}
                    >
                      {(value as any).name}
                    </option>
                  ))
                }
              </Select>
            </Flex>

            <Flex
              className='subcategory-select-wrapper-in-admin-page'
              mt={'21px'}
            >
              <Select
                placeholder='subcategory'
                border={'2px solid #739AF0 !important'}
                fontFamily={'Nunito'}
                fontWeight={700}
                fontSize={'18px'}
                lineHeight={'25px'}
                width={'224px'}
                height={'41px'}
                borderRadius={'5px'}
                // @ts-ignore
                onChange={(e) => setSubcategory(e.target.value)}
                value={subcategory}
                textTransform={'capitalize'}
              >
                {
                  (category >= 1) && ((sidebarItems as any)[category].isSubCategoryExist) && Object.entries((subCategoriesInPredictionMarkets as any)[category])
                    .sort(([_, value1], [__, value2]) => (value1 as any).subMenuIndex - (value2 as any).subMenuIndex)
                    .map(([key, value]) => (
                      <option key={key} value={(value as any).subMenuIndex}>
                        {(value as any).name}
                      </option>
                    ))
                }
              </Select>
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
              className='event-description-wrapper'
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
              border={'1px solid #FC541C'}
              borderRadius={'45px'}
              px={'28px'}
              py={'7px'}
              mt={'67px'}
              onClick={() => repeatLevel >= 1 ? handleAddEventInRepeatLevel_1_2(repeatLevel) :
                handleAddEventInRepeatLevel0()
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
        isOpenAnnounceModal={isOpenAddEventSuccessAnnounceModal && addEvent.isSuccess}
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
        isOpenAnnounceModal={isProcessing || (isOpenAddEventSuccessAnnounceModal && addEvent.isLoading)}
        onCloseAnnounceModal={onCloseAddEventSuccessAnnounceModal}
        announceText={'Your transaction is currently processing on the blockchain'}
        announceGif={true}
        announceModalButtonText={'Close'}
      />
    </Flex >
  )
}

export default AddEventModalInPM
