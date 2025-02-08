'use client'
import { rpcURLs, explorerUrls, ChainId } from './networks'

export async function addOctopus() {
  try {
    if (typeof window.ethereum !== 'undefined') {
      const permissions = await window.ethereum.request({
        //@ts-ignore : unknown warning , following official docs from metamask https://docs.metamask.io/wallet/reference/json-rpc-methods/wallet_getpermissions/
        method: 'wallet_getPermissions',
        //@ts-ignore: unknown warning
        params: []
      })
      console.log('permissions ', permissions)
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0xC794716BC',
            rpcUrls: ['https://testnet.rpc.o3layer.com'],
            chainName: 'octopus-testnet',
            nativeCurrency: {
              name: 'O3',
              symbol: 'O3',
              decimals: 18
            },
            blockExplorerUrls: ['https://testnet.explorer.o3layer.com']
          }
        ]
      })
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: '0xC794716BC'
          }
        ]
      })
      console.log('Metamask is installed')
    } else {
      console.log('Metamask is not installed')
    }
  } catch (error) {
    console.log(error)
  }
}

export async function addArbitrumSepolia() {
  try {
    if (typeof window.ethereum !== 'undefined') {
      const permissions = await window.ethereum.request({
        //@ts-ignore : unknown warning , following official docs from metamask https://docs.metamask.io/wallet/reference/json-rpc-methods/wallet_getpermissions/
        method: 'wallet_getPermissions',
        //@ts-ignore: unknown warning
        params: []
      })
      console.log('permissions ', permissions)
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x66EEE',
            rpcUrls: ['https://sepolia-rollup.arbitrum.io/rpc'],
            chainName: 'Arbitrum Sepolia',
            nativeCurrency: {
              name: 'Sepolia Ether',
              symbol: 'ETH',
              decimals: 18
            },
            blockExplorerUrls: ['https://sepolia.arbiscan.io']
          }
        ]
      })
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: '0x66EEE'
          }
        ]
      })
      console.log('Metamask is installed')
      console.log('Metamask is installed')
    } else {
      console.log('Metamask is not installed')
    }
  } catch (error) {
    console.log(error)
  }
}
