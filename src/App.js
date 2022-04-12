import React, { useState, useContext, useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import EthersIntro from './components/EthersIntro'
import EthersFull from './components/EthersFull'
import Web3jsIntro from './components/Web3jsIntro'
import Web3jsFull from './components/Web3jsFull'
import { SignerContext, SignerProvider } from './state/SignerContext'
import {
  TestContractsContext,
  TestContractsProvider,
} from './state/TestContractsContext'
import { ThemeProvider } from './state/ThemeContext'
import { Web3ModalContext } from './state/Web3ModalContext'
import { ethers } from 'ethers'
import { CHAIN_ID, WETH_ADDRESS } from './utils/constants'
import contractsJson from './contracts/tutorial.json'
import wethJson from './contracts/WETH.json'
import SimpleBridge from './components/SimpleBridge'
import Navbar from './components/Navbar'

const App = () => {
  const web3Modal = useContext(Web3ModalContext)
  const signer = useContext(SignerContext)
  const testContracts = useContext(TestContractsContext)

  const [loading, setLoading] = useState(false)
  const [invalidNetwork, setInvalidNetwork] = useState(false)
  const [currentSignerAddr, setCurrentSignerAddr] = useState('')

  const setContracts = async (currentSigner) => {
    const contracts = contractsJson[4].rinkeby.contracts

    const currentTestContractRead = new ethers.Contract(
      contracts.TestContract.address,
      contracts.TestContract.abi,
    )
    testContracts.setTestContractRead(currentTestContractRead)

    const currentTestContract = new ethers.Contract(
      contracts.TestContract.address,
      contracts.TestContract.abi,
      currentSigner,
    )
    testContracts.setTestContract(currentTestContract)

    const currentTestTokenRead = new ethers.Contract(
      contracts.TestToken.address,
      contracts.TestToken.abi,
    )
    testContracts.setTestTokenRead(currentTestTokenRead)

    const currentTestToken = new ethers.Contract(
      contracts.TestToken.address,
      contracts.TestToken.abi,
      currentSigner,
    )
    testContracts.setTestToken(currentTestToken)

    const currentWethTokenRead = new ethers.Contract(WETH_ADDRESS, wethJson.abi)
    testContracts.setWethTokenRead(currentWethTokenRead)

    const currentWethToken = new ethers.Contract(
      WETH_ADDRESS,
      wethJson.abi,
      currentSigner,
    )
    testContracts.setWethToken(currentWethToken)
  }

  // web3Modal.on('connect', async (networkProvider) => {
  //   setLoading(true)

  //   const currentProvider = new ethers.providers.Web3Provider(networkProvider)
  //   // const network = await currentProvider.getNetwork()

  //   // if (network.chainId !== parseInt(CHAIN_ID)) {
  //   //   setInvalidNetwork(true)
  //   // }

  //   const currentSigner = currentProvider.getSigner()
  //   signer.setSigner(currentSigner)

  //   // await setContracts(currentSigner)

  //   const cAddress = await currentSigner.getAddress()
  //   setCurrentSignerAddr(cAddress)

  //   setLoading(false)
  // })

  window.ethereum.on('chainChanged', () => window.location.reload())

  useEffect(() => {
    const loadProvider = async () => {
      const currentProvider = new ethers.providers.Web3Provider(window.ethereum)
      // const network = await currentProvider.getNetwork()

      // if (network.chainId !== parseInt(CHAIN_ID)) {
      //   setInvalidNetwork(true)
      // }

      const currentSigner = currentProvider.getSigner()
      signer.setSigner(currentSigner)

      const cAddress = await currentSigner.getAddress()
      setCurrentSignerAddr(cAddress)

      if (web3Modal.cachedProvider && !signer.signer) {
        if (!loading) {
          await web3Modal.connect()
        }
      }
    }

    loadProvider()
    // eslint-disable-next-line
  }, [web3Modal])

  if (loading) {
    return (
      <SignerProvider>
        <TestContractsProvider>
          <ThemeProvider>
            <div className="App">
              <h1>Loading...</h1>
            </div>
          </ThemeProvider>
        </TestContractsProvider>
      </SignerProvider>
    )
  }

  if (invalidNetwork) {
    return (
      <SignerProvider>
        <TestContractsProvider>
          <ThemeProvider>
            <div className="App">
              <h1>Invalid Network</h1>
              <p>
                Please switch to the{' '}
                <span
                  style={{
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                  onClick={async () => {
                    try {
                      await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                          {
                            chainId: '0x4',
                            chainName: 'Rinkeby Testnet',
                            nativeCurrency: {
                              name: 'Ether',
                              symbol: 'ETH',
                              decimals: 18,
                            },
                            rpcUrls: ['https://rinkeby.infura.io/v3'],
                            blockExplorerUrls: ['https://rinkeby.etherscan.io'],
                            iconUrls: [''],
                          },
                        ],
                      })
                    } catch (error) {
                      console.error(error)
                    }
                  }}
                >
                  Rinkeby
                </span>{' '}
                network.
              </p>
            </div>
          </ThemeProvider>
        </TestContractsProvider>
      </SignerProvider>
    )
  }

  return (
    <SignerProvider>
      <TestContractsProvider>
        <ThemeProvider>
          <div className="App">
            {/* <Navbar signerAddress={currentSignerAddr} /> */}
            <Routes>
              <Route path="/" element={<SimpleBridge />} />
            </Routes>
          </div>
        </ThemeProvider>
      </TestContractsProvider>
    </SignerProvider>
  )
}

export default App
