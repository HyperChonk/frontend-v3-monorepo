import type { SentryBuildOptions } from '@sentry/nextjs/build/types/config/types'

const isProd = process.env.NEXT_PUBLIC_APP_ENV === 'prod'

// Source map generation and upload makes the build much slower so we only enable it for vercel production builds from main branch
const shouldEnableSourceMaps = isProd && process.env.VERCEL_GIT_COMMIT_REF === 'main'

/** @type {import('@sentry/nextjs/build/types/config/types').SentryBuildOptions} */
export const sentryOptions: SentryBuildOptions = {
  // Suppresses source map uploading logs during build
  silent: true,
  org: 'hyperchonk',
  project: isProd ? 'hyperchonk-v3-prod' : 'hyperchonk-v3-dev',

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
  tunnelRoute: '/monitoring',

  // Hides source maps from generated client bundles
  hideSourceMaps: false,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors.
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,

  sourcemaps: {
    disable: !shouldEnableSourceMaps,
  },
  telemetry: shouldEnableSourceMaps,
}

const productionSentryDSN =
  'https://936bfececcd6fe00400a255494802523@o4507564484591616.ingest.us.sentry.io/4509479248986112'
const developmentSentryDSN =
  'https://86d011014c4905516cabb02659aa3cf0@o4507564484591616.ingest.us.sentry.io/4509479259996160'
export const sentryDSN = isProd ? productionSentryDSN : developmentSentryDSN
