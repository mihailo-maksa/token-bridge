import React, { useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { SignerContext } from '../../state/SignerContext'
import { Web3ModalContext } from '../../state/Web3ModalContext'
import { TestContractsContext } from '../../state/TestContractsContext'
import { TEST_TOKEN_ADDRESS, WETH_ADDRESS } from '../../utils/constants'
import { ThemeContext } from '../../state/ThemeContext'

const Navbar = ({ signerAddress }) => {
  const web3Modal = useContext(Web3ModalContext)
  const signer = useContext(SignerContext)
  const testContracts = useContext(TestContractsContext)
  const { switchMode, isDarkMode } = useContext(ThemeContext)
  const [etherBalance, setEtherBalance] = useState(0)
  const [testTokenBalance, setTestTokenBalance] = useState(0)

  useEffect(() => {
    const loadAddress = async () => {
      if (signerAddress !== '' && signer.signer) {
        const currentEtherBalance = await signer.signer.getBalance(
          signerAddress,
        )
        setEtherBalance(
          ethers.utils.formatEther(currentEtherBalance.toString()),
        )

        const currentTestTokenBalance = await testContracts.testTokenRead.balanceOf(
          signerAddress,
        )
        setTestTokenBalance(
          ethers.utils.formatEther(currentTestTokenBalance.toString()),
        )
      }
    }

    window.addEventListener('load', async () => {
      if (web3Modal.cachedProvider) {
        await web3Modal.connect()
      }
    })

    loadAddress()

    return () => {
      window.addEventListener('load', async () => {
        if (web3Modal.cachedProvider) {
          await web3Modal.clearCachedProvider()
        }
      })
    }
    // eslint-disable-next-line
  }, [signerAddress, testContracts.testTokenRead, signer.signer, web3Modal])

  console.log({ signer: signer.signer })

  const addWethToWallet = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: WETH_ADDRESS,
            symbol: 'WETH',
            decimals: 18,
            image: '',
          },
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const addTestTokenToWallet = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: TEST_TOKEN_ADDRESS,
            symbol: 'TEST',
            decimals: 18,
            image: '',
          },
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: isDarkMode ? '#000' : '#fff',
        color: isDarkMode ? '#fff' : '#000',
      }}
    >
      <span>Web3 Practice</span>
      <div>
        <button type="button" onClick={addWethToWallet}>
          Add WETH to Wallet
        </button>
        <button type="button" onClick={addTestTokenToWallet}>
          Add TEST to Wallet
        </button>
        <button type="button" onClick={switchMode}>
          Switch Mode
        </button>
        {signer.signer ? (
          <>
            <br />
            <span>
              <strong>Ether Balance: </strong>
              {etherBalance}
            </span>
            <br />
            <span>
              <strong>TEST Balance: </strong>
              {testTokenBalance}
            </span>
            <br />
            <span>
              <strong>
                Your Address:{' '}
                {signerAddress.slice(0, 5) +
                  '...' +
                  signerAddress.slice(
                    signerAddress.at(-4),
                    signerAddress.at(-1),
                  )}
              </strong>
            </span>
            <br />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                web3Modal.clearCachedProvider()
                window.location.reload()
              }}
            >
              Disconnect
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => {
              web3Modal.toggleModal()
            }}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
