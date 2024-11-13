import { twMerge } from 'tailwind-merge'

import { useNetworks } from '../../hooks/useNetworks'
import { getBridgeUiConfigForChain } from '../../util/bridgeUiConfig'
import { useAppContextState } from '../App/AppContext'
import { Button } from '../common/Button'
import { useTransferReadiness } from './useTransferReadiness'
import { useAccountType } from '../../hooks/useAccountType'
import { useNetworksRelationship } from '../../hooks/useNetworksRelationship'
import { getNetworkName } from '../../util/networks'

export function MoveFundsButton({
  onClick
}: Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>) {
  const { layout } = useAppContextState()
  const { isTransferring } = layout

  const [networks] = useNetworks()
  const { isDepositMode } = useNetworksRelationship(networks)
  const { color: destinationChainUIcolor } = getBridgeUiConfigForChain(
    networks.destinationChain.id
  )
  const { isSmartContractWallet } = useAccountType()
  const { transferReady } = useTransferReadiness()

  return (
    <Button
      variant="primary"
      loading={isTransferring}
      disabled={
        isDepositMode ? !transferReady.deposit : !transferReady.withdrawal
      }
      onClick={onClick}
      style={{
        borderColor: destinationChainUIcolor,
        backgroundColor: `${destinationChainUIcolor}66`
      }}
      className={twMerge(
        'w-full border bg-eth-dark py-2 text-base',
        'disabled:!border-white/10 disabled:!bg-white/10',
        'lg:text-base'
      )}
    >
      {isSmartContractWallet && isTransferring
        ? 'Sending request...'
        : `Move funds to ${getNetworkName(networks.destinationChain.id)}`}
    </Button>
  )
}
