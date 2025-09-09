import { isProd } from '@repo/lib/config/app.config'
import { ProjectConfig } from '@repo/lib/config/config.types'
import { PoolDisplayType } from '@repo/lib/modules/pool/pool.types'
import { GqlChain, GqlPoolType } from '@repo/lib/shared/services/api/generated/graphql'

export const ProjectConfigHyperChonk: ProjectConfig = {
  projectId: 'hyperchonk',
  projectName: 'HyperChonk',
  projectUrl: 'https://app.hyperchonk.com',
  projectLogo: 'https://app.hyperchonk.com/images/icons/hyperchonk.svg',
  walletConnectProjectId: '93fbaa17c66a90015f6666b71abc795f',
  fathomSiteId: 'MWYWOXRA',
  openWidgetOrganizationId: '8809745c-e840-4928-8e17-b5611c6aa2df',
  supportedNetworks: [
    GqlChain.Berachain,
    GqlChain.Hyperevm,
    // GqlChain.Polygon,

    // // testnets only in dev mode
    // ...(isProd ? [] : [GqlChain.Sepolia]),
  ],
  variantConfig: undefined,
  corePoolId: '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014', // veBAL BAL8020 (HyperChonk 80 BAL 20 WETH) pool on Ethereum
  defaultNetwork: GqlChain.Hyperevm,
  ensNetwork: GqlChain.Hyperevm,
  delegateOwner: '0xba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1b',
  externalLinks: {
    poolComposerUrl: isProd
      ? 'https://pool-creator.hyperchonk.com'
      : 'https://beta.pool-creator.hyperchonk.com',
  },
  merklRewardsChains: [],
  options: {
    poolDisplayType: PoolDisplayType.TokenPills,
    hidePoolTags: ['INCENTIVIZED', 'VE8020', 'POINTS', 'RWA'],
    hidePoolTypes: [
      GqlPoolType.CowAmm,
      GqlPoolType.LiquidityBootstrapping,
      GqlPoolType.Gyro,
      GqlPoolType.Gyro3,
      GqlPoolType.Gyroe,
      GqlPoolType.Investment,
      GqlPoolType.LiquidityBootstrapping,
      GqlPoolType.MetaStable,
      GqlPoolType.PhantomStable,
      GqlPoolType.QuantAmmWeighted,
      GqlPoolType.Reclamm,
      GqlPoolType.Unknown,
    ],
    testPoolIds: [
      '0x5beca20dca2761f454b96535e6d64874098dc27e',
      '0x8f58838c218966bca7d17125a536491994dd0957',
      '0x68f435ccb98318987a6aa87e92a0a0af3d9ccf98',
      '0x2c2b924a261d98a9b9dd90e884ca52e5545e4f6c',
    ],
    hideProtocolVersion: [],
    showPoolName: true,
    showVeBal: false,
    showMaBeets: false,
    allowCreateWallet: false,
    showPoolHooksFilter: true,
    isOnSafeAppList: false,
  },
  links: {
    appLinks: [],
    ecosystemLinks: [
      // { label: 'DefiLlama', href: 'https://defillama.com/protocol/burrbear', isExternal: true },
    ],
    socialLinks: [
      {
        iconType: 'x',
        href: 'https://x.com/hyperchonk',
      },
      // {
      //   iconType: 'discord',
      //   href: 'https://discord.gg/aVfd8zhCWD',
      // },
      {
        iconType: 'medium',
        href: 'https://medium.com/@hyperchonk',
      },
      {
        iconType: 'github',
        href: 'https://github.com/HyperChonk',
      },
    ],
    legalLinks: [
      { label: 'Terms of use', href: '/terms-of-use' },
      { label: 'Privacy policy', href: '/privacy-policy' },
      { label: 'Cookies policy', href: '/cookies-policy' },
      { label: '3rd party services', href: '/3rd-party-services' },
      { label: 'Risks', href: '/risks' },
    ],
  },
  footer: {
    linkSections: [
      {
        title: 'Build on HyperChonk',
        links: [
          { label: 'Home', href: '/' },
          { label: 'Docs', href: 'https://docs.hyperchonk.com', isExternal: true },
        ],
      },
      {
        title: 'Ecosystem',
        links: [
          // { label: 'DefiLlama', href: 'https://defillama.com/protocol/burrbear', isExternal: true },
        ],
      },
    ],
  },
  cowSupportedNetworks: [],
  partnerCards: [],
  promoItems: [],
  showReviewIcon: false,
}
