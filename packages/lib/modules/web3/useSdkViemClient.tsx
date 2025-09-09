import { PublicWalletClient } from '@burrbear/sdk'
import { publicActions, walletActions } from 'viem'
import { useWalletClient } from 'wagmi'

export function useSdkWalletClient() {
  const { data: sdkClient, isLoading } = useWalletClient()

  return {
    sdkClient: sdkClient
      ? (sdkClient.extend(publicActions).extend(walletActions) as PublicWalletClient)
      : undefined,
    isLoading,
  }
}
