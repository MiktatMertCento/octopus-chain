import React from 'react'
import { addArbitrumSepolia, addOctopus } from '../../util/metamask'
import { Button } from '@mui/material'
import { useNetworks } from '../../hooks/useNetworks'
import { useNetworksRelationship } from '../../hooks/useNetworksRelationship'
import { isNetwork } from '../../util/networks'
import MetamaskLogo from '@/icons/MetamaskLogo.svg'
import Image from 'next/image'
export const AddChainButton = () => {
  const [networks] = useNetworks()
  const { parentChain, childChain } = useNetworksRelationship(networks)

  const {
    isArbitrum: isConnectedToArbitrum,
    isOrbitChain: isConnectedToOrbitChain
  } = isNetwork(networks.sourceChain.id)
  const isParentChainEthereum = isNetwork(
    parentChain.id
  ).isEthereumMainnetOrTestnet
  console.log('parentChain.id', parentChain.id)
  console.log('childChain.id', childChain.id)

  return (
    <div>
      {(isParentChainEthereum && isConnectedToArbitrum) ||
      isConnectedToOrbitChain ? (
        <AddOctupus />
      ) : (
        <AddArbitrumSepoliaButton />
      )}
    </div>
  )
}

export const AddArbitrumSepoliaButton = () => {
  return (
    <div>
      <button
        className="   flex  rounded-lg border-2 border-[#44356a] px-2  py-1 text-base   font-medium text-[#6c55a6] transition-all duration-300 ease-in-out hover:border-2 hover:border-[#7F64C2]       "
        title="add testnet Arbitrum sepolia chain to your metamask"
        onClick={addArbitrumSepolia}
      >
        <Image
          src={MetamaskLogo}
          width={25}
          height={25}
          alt="metamask logo"
          className="mr-2"
        />
        Add Arbitrum Sepolia
      </button>
    </div>
  )
}
export const AddOctupus = () => {
  return (
    <div>
      <button
        className=" flex  rounded-lg border-2 border-[#7F64C2] px-2  py-2 text-base   font-medium text-[#6c55a6] transition-all duration-300 ease-in-out hover:border-2 hover:border-[#4c4c6e]       "
        title="add testnet Arbitrum sepolia chain to your metamask"
        onClick={addOctopus}
      >
        <Image
          src={MetamaskLogo}
          width={25}
          height={25}
          alt="metamask logo"
          className="mr-2"
        />
        Add Octopus
      </button>
    </div>
  )
}
