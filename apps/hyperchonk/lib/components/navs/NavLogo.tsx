'use client'

import { Box, Link } from '@chakra-ui/react'
import { fadeIn } from '@repo/lib/shared/utils/animations'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
import { HyperChonkLogo } from '../imgs/HyperChonkLogo'
import { HyperChonkLogoType } from '../imgs/HyperChonkLogoType'

export function NavLogo() {
  return (
    <Box as={motion.div} variants={fadeIn}>
      <Link as={NextLink} href="/" prefetch>
        <Box>
          <Box display={{ base: 'block', md: 'none' }}>
            <HyperChonkLogo width="32px" />
          </Box>
          <Box display={{ base: 'none', md: 'block' }}>
            <HyperChonkLogoType />
          </Box>
        </Box>
      </Link>
    </Box>
  )
}
