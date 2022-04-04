import React from 'react'
import Web3Modal from 'web3modal'
import { RPC_URL } from '../utils/constants'
// import WalletConnectProvider from '@walletconnect/web3-provider'
// import WalletLink from 'walletlink'
// import Portis from '@portis/web3'
// import Fortmatic from 'fortmatic'
// import Authereum from 'authereum'

export const Web3ModalContext = React.createContext(
  new Web3Modal({
    network: 'rinkeby',
    cacheProvider: true,
    providerOptions: {
      // MetaMask config
      injected: {
        display: {
          logo: '../assets/metamask.svg',
          name: 'MetaMask',
          description: 'Connect with the MetaMask wallet in your browser',
        },
        package: null,
        options: {
          rpc: {
            4: RPC_URL,
          },
        },
      },
      // WalletConnect config
      // walletconnect: {
      //   package: WalletConnectProvider,
      //   options: {
      //     infuraId: process.env.REACT_APP_INFURA_ID,
      //   },
      // },
      // // Coinbase Wallet config
      // walletlink: {
      //   package: WalletLink,
      //   options: {
      //     appName: 'Web3 Practice',
      //     infuraId: process.env.REACT_APP_INFURA_ID,
      //   },
      // },
      // Portis config
      // portis: {
      //   package: Portis,
      //   options: {
      //     id: process.env.REACT_APP_PORTIS_ID,
      //   },
      // },
      // // Fortmatic config
      // fortmatic: {
      //   package: Fortmatic,
      //   options: {
      //     key: process.env.REACT_APP_FORTMATIC_KEY,
      //     network: {
      //       chainId: process.env.REACT_APP_CHAIN_ID,
      //       rpcUrl: RPC_URL,
      //     },
      //   },
      // },
      // Binance Chain Wallet config
      'custom-binancechainwallet': {
        display: {
          logo: '../assets/binance.svg',
          name: 'Binance Chain Wallet',
          description: 'Connect to your Binance Chain Wallet',
        },
        package: true,
        connector: async () => {
          let provider = null

          if (window.BinanceChain) {
            provider = window.BinanceChain

            try {
              await provider.request({ method: 'eth_requestAccounts' })
            } catch (error) {
              throw new Error('User Rejected')
            }
          } else {
            throw new Error('No Binance Chain Wallet found')
          }

          return provider
        },
      },
      // Authereum config
      // authereum: {
      //   package: Authereum,
      // },
      // torus: {},
      // frame: {},
      // lattice: {},
      // opera: {},
      // liquality: {},
      // gnosissafe: {},
      // trezor: {},
      // ledger: {},
    },
    disableInjectedProvider: false,
    theme: {
      background: 'white',
      main: 'white',
      secondary: '#f5f5f5',
      border: 'black',
      hover: '#0f0f0f',
    },
  }),
)
