import { withSentryConfig } from '@sentry/nextjs'
import type { NextConfig } from 'next'
import { sentryOptions } from './sentry.config'

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  transpilePackages: ['@repo/lib'],

  // Safe App setup
  headers: manifestHeaders,

  // Redirect from root to pools page
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/pools',
        permanent: true,
      },
      {
        source: '/vebal',
        destination: '/pools',
        permanent: true,
      },
      {
        source: '/lbp/create',
        destination: '/pools',
        permanent: true,
      },
    ]
  },
}

// Avoid sentry setup in CI
const config = process.env.CI === 'true' ? nextConfig : withSentryConfig(nextConfig, sentryOptions)

export default config

/**
 * Add specific CORS headers to the manifest.json file
 * This is required to allow the Safe Browser to fetch the manifest file
 * More info: https://help.safe.global/en/articles/40859-add-a-custom-safe-app
 */
async function manifestHeaders() {
  const corsHeaders = [
    {
      key: 'Access-Control-Allow-Origin',
      value: '*',
    },
    {
      key: 'Access-Control-Allow-Methods',
      value: 'GET',
    },
    {
      key: 'Access-Control-Allow-Headers',
      value: 'X-Requested-With, content-type, Authorization',
    },
  ]
  return [
    {
      source: '/manifest.json',
      headers: corsHeaders,
    },
    {
      source: '/pools/manifest.json',
      headers: corsHeaders,
    },
  ]
}
