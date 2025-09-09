'use client'

import { isDev, isStaging } from '@repo/lib/config/app.config'
import { PROJECT_CONFIG } from '@repo/lib/config/getProjectConfig'
import { MobileNav } from '@repo/lib/shared/components/navs/MobileNav'
import { NavBar } from '@repo/lib/shared/components/navs/NavBar'
import { useNav } from '@repo/lib/shared/components/navs/useNav'
import { AnimatePresence, motion } from 'framer-motion'
import { HyperChonkLogoType } from '../imgs/HyperChonkLogoType'
import { NavLogo } from './NavLogo'

export function NavBarContainer() {
  const {
    links: { ecosystemLinks, socialLinks },
    options: { allowCreateWallet },
  } = PROJECT_CONFIG
  const { defaultAppLinks } = useNav()

  // TODO: (votes) move vebal link to config when live
  const appLinks = []
  if (isDev || isStaging) {
    appLinks.push({
      label: 'veBAL (wip)',
      href: '/vebal',
    })
    appLinks.push({
      label: 'LBP',
      href: '/lbp/create',
    })
  }

  const allAppLinks = [...defaultAppLinks /*, ...appLinks*/]

  return (
    <AnimatePresence>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <NavBar
          allowCreateWallet={allowCreateWallet}
          appLinks={allAppLinks}
          // customLinks={
          //   <Box as={motion.div} variants={fadeIn}>
          //     <VeBalLink />
          //   </Box>
          // }
          mobileNav={
            <MobileNav
              LogoType={HyperChonkLogoType}
              appLinks={allAppLinks}
              // customLinks={<VeBalLink fontSize="xl" />}
              ecosystemLinks={ecosystemLinks}
              socialLinks={socialLinks}
            />
          }
          navLogo={<NavLogo />}
          disableBlur
          borderBottom="1px solid"
          borderColor="hyperTeal"
        />
      </motion.div>
    </AnimatePresence>
  )
}
