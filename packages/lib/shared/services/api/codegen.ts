import { CodegenConfig } from '@graphql-codegen/cli'

const GRAPHQL_API_URL =
  process.env.NEXT_PUBLIC_BALANCER_API_URL ?? 'https://api.hyperchonk.com/graphql'

const config: CodegenConfig = {
  generates: {
    ['./shared/services/api/generated/schema.graphql']: {
      schema: [
        {
          [GRAPHQL_API_URL]: {
            headers: {
              'User-Agent': 'Mozilla/5.0',
            },
          },
        },
      ],
      plugins: ['schema-ast'],
    },
    [`./shared/services/api/generated/`]: {
      schema: [
        {
          [GRAPHQL_API_URL]: {
            headers: {
              'User-Agent': 'Mozilla/5.0',
            },
          },
        },
      ],
      documents: ['./shared/services/api/**/*.graphql'],
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
      config: {
        nonOptionalTypename: true,
        scalars: {
          BigInt: 'string',
          BigDecimal: 'string',
          Bytes: 'string',
          AmountHumanReadable: 'string',
          GqlBigNumber: 'string',
        },
      },
    },
  },
}

export default config
