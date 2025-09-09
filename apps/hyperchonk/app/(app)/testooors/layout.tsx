import { isProd } from '@repo/lib/config/app.config'
import { DefaultPageContainer } from '@repo/lib/shared/components/containers/DefaultPageContainer'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

export default function DebugLayout({ children }: PropsWithChildren) {
  if (isProd) redirect('/')

  return (
    <DefaultPageContainer maxW="90%" width="90%">
      {children}
    </DefaultPageContainer>
  )
}
