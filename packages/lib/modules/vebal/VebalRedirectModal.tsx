import {
  Button,
  HStack,
  Link,
  LinkProps,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { ReactNode } from 'react'
import { ArrowUpRight } from 'react-feather'

interface VebalRedirectModalProps extends LinkProps {
  triggerEl?: ReactNode
}

export function VeBalLink({ triggerEl, ...props }: VebalRedirectModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Link color="font.primary" onClick={onOpen} variant="nav" {...props}>
        {triggerEl || 'veBAL'}
      </Link>

      <VebalRedirectModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export function VebalRedirectModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} preserveScrollBarGap>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>veBAL redirect</ModalHeader>
        <ModalCloseButton />
        <ModalBody color="grayText">
          <Text color="font.secondary">
            A new and improved veBAL experience is currently being crafted. In the meantime, go to
            the old app to manage your veBAL:
          </Text>

          <UnorderedList>
            <ListItem>
              <Text color="font.secondary">Vote on gauges</Text>
            </ListItem>
            <ListItem>
              <Text color="font.secondary">Lock and unlock veBAL</Text>
            </ListItem>
            <ListItem>
              <Text color="font.secondary">View your balance and expiry date</Text>
            </ListItem>
            <ListItem>
              <Text color="font.secondary">Sync veBAL to other networks</Text>
            </ListItem>
          </UnorderedList>
        </ModalBody>

        <ModalFooter>
          <Button
            as={NextLink}
            href="https://app.hyperchonk.com/#/ethereum/vebal"
            target="_blank"
            variant="primary"
            w="full"
          >
            <HStack>
              <span>Manage your veBAL</span>
              <ArrowUpRight size={16} />
            </HStack>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
