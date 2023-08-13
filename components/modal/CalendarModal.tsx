import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/react'
import { useState, useEffect, } from 'react';
// @ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type CalendarModalProps = {
  isOpen: boolean,
  onClose: () => void,
  selectedDate: Date,
  setSelectedDate: (selectedDate: Date) => void,
}

const CalendarModal = ({
  isOpen,
  onClose,
  selectedDate,
  setSelectedDate,
}: CalendarModalProps) => {
  const [shouldRender, setShouldRender] = useState(true);
  const handleApply = () => {
    onClose();
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
      className='calendar-modal-wrapper'
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
          className='calendar-modal-content'
          width={'auto'}
        >
          <ModalBody
            px={'20px'}
            pb='0'
            className='calendar-modal-body'
          >
            <DatePicker
              selected={selectedDate}
              onMonthChange={() => setShouldRender(!shouldRender)}
              onChange={(date: Date) => {
                setSelectedDate(date);
                setShouldRender(!shouldRender);
              }}
              inline
            />
          </ModalBody>
          <ModalFooter
            pt='0'
          >
            <Flex
              border={'1px solid #FC541C'}
              borderRadius={'45px'}
              px={'28px'}
              py={'7px'}
              onClick={() => handleApply()}
              fontFamily={'Nunito'}
              fontSize={'14px'}
              lineHeight={'19px'}
              cursor={'pointer'}
            >
              Apply
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex >
  )
}

export default CalendarModal
