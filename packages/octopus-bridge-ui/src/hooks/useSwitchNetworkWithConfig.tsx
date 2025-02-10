import { useSwitchNetwork } from 'wagmi'
import { SwitchNetworkArgs } from '@wagmi/core'

import { getNetworkName, isNetwork } from '../util/networks'
import { isUserRejectedError } from '../util/isUserRejectedError'
import { warningToast } from '../components/common/atoms/Toast'
import { captureSentryErrorWithExtraData } from '../util/SentryUtils'

type SwitchNetworkConfig = {
  isSwitchingNetworkBeforeTx?: boolean
}

const handleSwitchNetworkNotSupported = (
  attemptedChainId: number,
  isSwitchingNetworkBeforeTx: boolean
) => {
  const isDeposit = isNetwork(attemptedChainId).isEthereumMainnetOrTestnet
  const targetTxName = isDeposit ? 'deposit' : 'withdraw'
  const networkName = getNetworkName(attemptedChainId)

  const message = isSwitchingNetworkBeforeTx
    ? `Please connect to ${networkName} on your wallet before signing your ${targetTxName} transaction.`
    : `Please connect to ${networkName} on your wallet.`

  warningToast(message)
}

/**
 * Function to invoke when an error is thrown while attempting to switch network.
 * https://wagmi.sh/react/hooks/useSwitchNetwork#onerror-optional
 * @param error
 * @param param1 - `{ chainId: number }`
 * @param context - default value `{ isSwitchingNetworkBeforeTx: false }`
 */
function handleSwitchNetworkError(
  error: any,
  { chainId }: SwitchNetworkArgs,
  context: unknown = { isSwitchingNetworkBeforeTx: false }
) {
  const { isSwitchingNetworkBeforeTx } = context as {
    isSwitchingNetworkBeforeTx: boolean
  }

  console.log('error:', error)
  if (isUserRejectedError(error)) {
    return
  }

  if (error.name === 'SwitchChainNotSupportedError') {
    console.log(' error log 1')
    handleSwitchNetworkNotSupported(chainId, isSwitchingNetworkBeforeTx)
  } else {
    console.log('error log 2')
    handleSwitchNetworkNotSupported(chainId, isSwitchingNetworkBeforeTx)
    captureSentryErrorWithExtraData({
      error,
      originFunction: 'handleSwitchNetworkError'
    })
  }
}

export function useSwitchNetworkWithConfig({
  isSwitchingNetworkBeforeTx = false
}: SwitchNetworkConfig = {}) {
  const config = {
    throwForSwitchChainNotSupported: true,
    /**
     * onMutate:
     * The return value will be the `context` param received by the error
     * handler of `switchNetwork`.
     *
     * Function fires before switch network function and is passed same
     * variables switch network function would receive.
     * Value returned from this function will be passed to both `onError` and
     * `onSettled` functions in event of a switch network failure.
     * https://wagmi.sh/react/hooks/useSwitchNetwork#onmutate-optional
     *
     * @returns `{ isSwitchingNetworkBeforeTx: boolean }`
     */
    onMutate: () => ({ isSwitchingNetworkBeforeTx }),
    onError: handleSwitchNetworkError
  }
  // console.log('config', config)
  return useSwitchNetwork(config)
}
