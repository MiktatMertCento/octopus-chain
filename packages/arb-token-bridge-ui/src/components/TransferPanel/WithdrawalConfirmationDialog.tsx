import { useState } from 'react'
import { Tab } from '@headlessui/react'
import dayjs from 'dayjs'
import Image from 'next/image'

import { Dialog, UseDialogProps } from '../common/Dialog'
import { Checkbox } from '../common/Checkbox'
import { ExternalLink } from '../common/ExternalLink'
import { TabButton } from '../common/Tab'
import { BridgesTable } from '../common/BridgesTable'
import { useAppState } from '../../state'
import { trackEvent } from '../../util/AnalyticsUtils'
import { getNetworkName, isNetwork } from '../../util/networks'
import { getFastBridges } from '../../util/fastBridges'
import { CONFIRMATION_PERIOD_ARTICLE_LINK } from '../../constants'
import { useNativeCurrency } from '../../hooks/useNativeCurrency'
import { useNetworks } from '../../hooks/useNetworks'
import { useNetworksRelationship } from '../../hooks/useNetworksRelationship'
import { SecurityGuaranteed, SecurityNotGuaranteed } from './SecurityLabels'
import { getWithdrawalConfirmationDate } from '../../hooks/useTransferDuration'

function getCalendarUrl(
  withdrawalDate: dayjs.Dayjs,
  amount: string,
  token: string,
  networkName: string
) {
  const title = `${amount} ${token} Withdrawal from ${networkName}`

  // Google event date format: YYYYMMDDTHHmmss/YYYYMMDDTHHmmss
  const parsedWithdrawalDate = withdrawalDate.format(
    'YYYYMMDD[T]HHmm[00%2F]YYYYMMDD[T]HHmm[00]'
  )

  return `https://calendar.google.com/calendar/event?action=TEMPLATE&text=${title}&dates=${parsedWithdrawalDate}&details=Withdrawn+on+%3Ca%20href=%22https://bridge.arbitrum.io%22%3Ehttps://bridge.arbitrum.io%3C/a%3E`
}

export function WithdrawalConfirmationDialog(
  props: UseDialogProps & { amount: string }
) {
  const [networks] = useNetworks()
  const { childChain, childChainProvider, parentChain } =
    useNetworksRelationship(networks)

  const [selectedIndex, setSelectedIndex] = useState(0)

  const destinationNetworkName = getNetworkName(parentChain.id)

  const {
    app: { selectedToken }
  } = useAppState()

  const nativeCurrency = useNativeCurrency({
    provider: childChainProvider
  })

  const fastBridges = getFastBridges({
    from: childChain.id,
    to: parentChain.id,
    tokenSymbol: selectedToken?.symbol ?? nativeCurrency.symbol,
    amount: props.amount
  })

  const [checkbox1Checked, setCheckbox1Checked] = useState(false)
  const [checkbox2Checked, setCheckbox2Checked] = useState(false)

  const { isArbitrumOne } = isNetwork(childChain.id)
  const bothCheckboxesChecked = checkbox1Checked && checkbox2Checked

  const estimatedConfirmationDate = getWithdrawalConfirmationDate({
    createdAt: null,
    withdrawalFromChainId: childChain.id
  })

  const confirmationPeriod = estimatedConfirmationDate.fromNow(true)

  const isFastBridgesTab = isArbitrumOne && selectedIndex === 0

  function closeWithReset(confirmed: boolean) {
    props.onClose(confirmed)

    setCheckbox1Checked(false)
    setCheckbox2Checked(false)
    setSelectedIndex(0)
  }

  return (
    <Dialog
      {...props}
      onClose={closeWithReset}
      className="max-w-[700px]"
      title={`Move funds to ${destinationNetworkName}`}
      actionButtonProps={{
        disabled: !bothCheckboxesChecked,
        hidden: isFastBridgesTab
      }}
    >
      <div className="flex flex-col pt-4">
        <Tab.Group onChange={setSelectedIndex}>
          <Tab.Panel className="flex flex-col justify-between">
            <div className="flex flex-col space-y-4 py-4">
              <div className="flex flex-col space-y-4">
                <p className="font-light">
                  Get your funds in ~{confirmationPeriod} and pay a small fee
                  twice.{' '}
                </p>
              </div>

              <div className="flex flex-col space-y-4">
                <Checkbox
                  label={
                    <span className="font-light">
                      I understand that it will take ~{confirmationPeriod}{' '}
                      before I can claim my funds on {destinationNetworkName}
                    </span>
                  }
                  checked={checkbox1Checked}
                  onChange={setCheckbox1Checked}
                />

                <Checkbox
                  label={
                    <span className="font-light">
                      I understand that after claiming my funds, I’ll have to
                      send{' '}
                      <span className="font-medium">
                        another transaction on {destinationNetworkName}
                      </span>{' '}
                      and pay another {destinationNetworkName} fee
                    </span>
                  }
                  checked={checkbox2Checked}
                  onChange={setCheckbox2Checked}
                />
              </div>
            </div>
          </Tab.Panel>
        </Tab.Group>
      </div>
    </Dialog>
  )
}
