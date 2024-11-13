import { rpcURLs, explorerUrls, ChainId } from './networks'
export async function addOctopus() {
  try {
    if (typeof window.ethereum !== 'undefined') {
      const result = await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x12826',
            rpcUrls: ['https://testnet.rpc.o3layer.com'],
            chainName: 'octopus-devnet',
            nativeCurrency: {
              name: '03',
              symbol: 'ETH',
              decimals: 18
            },
            blockExplorerUrls: ['https://testnet.rpc.o3layer.com']
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
      const result = await window.ethereum.request({
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
      console.log('Metamask is installed')
    } else {
      console.log('Metamask is not installed')
    }
  } catch (error) {
    console.log(error)
  }
}
