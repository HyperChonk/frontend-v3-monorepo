import { AlertProps, Text } from '@chakra-ui/react'
import { getDiscordLink } from '../../utils/links'
import { BalAlertLink } from '../alerts/BalAlertLink'
import { ErrorAlert } from './ErrorAlert'

type Props = AlertProps & {
  error: Error
  isProportionalSupported?: boolean
}

export function UnbalancedNestedAddError({ error }: Props) {
  console.log('Nested pool add error: ', error)

  /*
    Possible errors include:

    - MaxRatio error due to add liquidity amounts being too unbalanced
    - MaxRatio error due to add liquidity amounts being too large
    - MinRatio error due to removeLiquidity amounts being too unbalanced
    - MinRatio error due to removeLiquidity amounts being too large
    - Pi calculation error (several possible reasons, but most often happens with near proportional amounts)
    - Query tx reverted due arithmetic overflow

    We can't always differentiate between these errors, so we'll show a generic message until we have more info/ user feedback.
  */
  const discordUrl = getDiscordLink()

  return (
    <ErrorAlert title="Unbalanced amounts">
      <Text color="black" variant="secondary">
        Your input(s) are either too large or would excessively unbalance the pool, please try
        smaller/more proportional amounts or report the issue in{' '}
        <BalAlertLink href={discordUrl ?? '#'}>our discord</BalAlertLink>.
      </Text>
    </ErrorAlert>
  )
}
