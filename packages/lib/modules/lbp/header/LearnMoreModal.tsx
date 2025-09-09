'use client'

import {
  Button,
  HStack,
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
import { getDiscordLink } from '@repo/lib/shared/utils/links'
import NextLink from 'next/link'
import { ArrowUpRight } from 'react-feather'

export function LearnMoreModal({ isOpen = false, onClose = () => {} }: UseDisclosureProps) {
  const discordLink = getDiscordLink()

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="lg">
      <SuccessOverlay />
      <ModalContent>
        <ModalHeader>Learn more about LBPs</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="lg">
          <VStack gap="lg">
            <List color="font.primary" listStylePosition="outside" listStyleType="disc" pl="md">
              <ListItem mb="xs">
                <Text>
                  LBPs typically start with an uneven ratio (like 90:10) heavily weighted toward the
                  project token, with a high initial price, and gradually shift over a predetermined
                  time period.
                </Text>
              </ListItem>
              <ListItem mb="xs">
                <Text>
                  The pool automatically adjusts token weights over time, causing the price to
                  decrease until there is sufficient buying pressure, which helps establish natural
                  price discovery.
                </Text>
              </ListItem>
              <ListItem mb="xs">
                <Text>
                  Projects only need to provide their token and a small portion (typically 10-20%)
                  of a collateral asset (like ETH or USDC) to start the pool, making it capital
                  efficient.
                </Text>
              </ListItem>
              <ListItem mb="xs">
                <Text>
                  The dynamic weight mechanism forces large buyers to split their trades into
                  smaller amounts over time, preventing price manipulation and enabling fairer
                  distribution.
                </Text>
              </ListItem>
            </List>
            <HStack>
              <Button
                as={NextLink}
                href="https://docs.hyperchonk.com/concepts/explore-available-balancer-pools/liquidity-bootstrapping-pool.html"
                minWidth={{ base: '94px', md: '110px' }}
                size="md"
                variant="secondary"
                target="_blank"
              >
                View LBP docs
                <ArrowUpRight size={14} />
              </Button>
              {discordLink && (
                <Button
                  as={NextLink}
                  href={discordLink}
                  minWidth={{ base: '94px', md: '110px' }}
                  size="md"
                  variant="tertiary"
                  target="_blank"
                >
                  Get help on Discord
                  <ArrowUpRight size={14} />
                </Button>
              )}
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
