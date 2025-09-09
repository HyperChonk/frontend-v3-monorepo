'use client'

import {
  Box,
  Button,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Text,
  UseDisclosureProps,
  VStack,
} from '@chakra-ui/react'
import { SuccessOverlay } from '@repo/lib/shared/components/modals/SuccessOverlay'
import { Picture } from '@repo/lib/shared/components/other/Picture'
import { openIcalEvent } from '@repo/lib/shared/utils/calendar'

function setCalendarEvent(deadline: Date) {
  const event = {
    title: 'veBAL voting deadline (HyperChonk)',
    start: deadline,
    url: 'https://hyperchonk.com/vebal/vote',
  }

  openIcalEvent({ event, makeItWeekly: true })
}

export function CalendarReminderModal({
  isOpen = false,
  onClose,
  deadline,
}: UseDisclosureProps & { deadline: Date }) {
  const closeModal = () => onClose && onClose()

  function setReminder() {
    setCalendarEvent(deadline)
    closeModal()
  }

  return (
    <Modal isCentered isOpen={isOpen} onClose={closeModal} size="lg">
      <SuccessOverlay />
      <ModalContent>
        <ModalHeader>Get calendar reminders</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="lg">
          <VStack gap="lg">
            <Box overflow="hidden" rounded="md">
              <Picture
                altText="Set a calendar reminder"
                defaultImgType="jpg"
                directory="/images/vebal/"
                height="240"
                imgAvif
                imgJpg
                imgName="calendar-modal-banner"
                width="800"
              />
            </Box>

            <List color="font.primary" listStylePosition="outside" listStyleType="disc" pl="md">
              <ListItem mb="xs">
                <Text>
                  For people deep into veBAL voting incentives, it can be advantageous to vote as
                  late as possible in order to see exactly which pool gauges offer the best
                  incentives per veBAL vote before the deadline.
                </Text>
              </ListItem>
              <ListItem mb="xs">
                <Text>
                  You can download an “.ics” file which can be used to add a recurring weekly
                  Thursday calendar reminder to vote.
                </Text>
              </ListItem>
              <ListItem mb="xs">
                <Text>
                  An “.ics” file is a calendar file saved in a universal calendar format used by
                  several email and calendar programs, including Microsoft Outlook, Google Calendar,
                  and Apple Calendar.
                </Text>
              </ListItem>
            </List>
            <Button onClick={setReminder} variant="secondary" w="full">
              Download .ics calendar reminders
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
