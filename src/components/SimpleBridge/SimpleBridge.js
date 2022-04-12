import React, { useEffect, useState } from 'react'
import json from '../../contracts/tutorial.json'
import { ethers } from 'ethers'
import { RPC_URL } from '../../utils/constants'

const ETH_USDC = '0x091107Ff75172330AE048bC30e16906B0a019CE4'
const MATIC_USDC = '0xCc187AeBC22b99B281036d587B7BB8113ddA8722'
const tokenAbi = json[4].rinkeby.contracts.TestToken.abi

// TODO: CSS & Preserve connection on refresh && From/to bug

const SimpleBridge = () => {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState('')
  const [signer, setSigner] = useState('')
  const [provider, setProvider] = useState('')
  const [chainId, setChainId] = useState(0)

  const [sendAmount, setSendAmount] = useState(0)
  const [targetChain, setTargetChain] = useState('')

  const [ethFaucetAmount, setEthFaucetAmount] = useState(0)
  const [maticFaucetAmount, setMaticFaucetAmount] = useState(0)

  const [ethSupply, setEthSupply] = useState(0)
  const [maticSupply, setMaticSupply] = useState(0)
  const [totalSupply, setTotalSupply] = useState(0)

  const [ethUSDCSigner, setEthUSDCSigner] = useState('')
  const [maticUSDCSigner, setMaticUSDCigner] = useState('')

  useEffect(() => {
    const loadData = async () => {
      if (!window.ethereum) {
        alert('Please install MetaMask first!')
        window.open('https://metamask.io', '_blank')
        return
      }

      const currentProvider = new ethers.providers.Web3Provider(window.ethereum)
      setProvider(currentProvider)

      const network = await currentProvider.getNetwork()
      setChainId(network.chainId)

      const ethRpc = new ethers.providers.JsonRpcProvider(RPC_URL)
      const maticRpc = new ethers.providers.JsonRpcProvider(
        'https://rpc-mumbai.maticvigil.com',
      )

      const currentEthUSDC = new ethers.Contract(ETH_USDC, tokenAbi, ethRpc)

      const currentMaticUSDC = new ethers.Contract(
        MATIC_USDC,
        tokenAbi,
        maticRpc,
      )

      const currentEthSupplyRes = await currentEthUSDC.totalSupply()
      const currentEthSupply = ethers.utils.formatEther(currentEthSupplyRes)
      setEthSupply(currentEthSupply)

      const currentMaticSupplyRes = await currentMaticUSDC.totalSupply()
      const currentMaticSupply = ethers.utils.formatEther(currentMaticSupplyRes)
      setMaticSupply(currentMaticSupply)

      setTotalSupply(
        parseFloat(currentEthSupply) + parseFloat(currentMaticSupply),
      )

      if (signer) {
        const currentEthUSDCSigner = new ethers.Contract(
          ETH_USDC,
          tokenAbi,
          signer,
        )
        setEthUSDCSigner(currentEthUSDCSigner)

        const currentMaticUSDCSigner = new ethers.Contract(
          MATIC_USDC,
          tokenAbi,
          signer,
        )
        setMaticUSDCigner(currentMaticUSDCSigner)
      }
    }

    loadData()
  }, [signer])

  const addEthUsdcToMM = async () => {
    try {
      if (signer && chainId === 4) {
        await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: ETH_USDC,
              symbol: 'USDC',
              decimals: 18,
              image:
                'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
            },
          },
        })
      }

      if (!signer) {
        alert('Plase connect wallet first!')
      }
    } catch (err) {
      console.error('addEthUsdcToMM ', err)
    }
  }
  const addMaticUsdcToMM = async () => {
    try {
      if (signer && chainId === 80001) {
        await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: MATIC_USDC,
              symbol: 'USDC',
              decimals: 18,
              image:
                'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
            },
          },
        })
      }

      if (!signer) {
        alert('Plase connect wallet first!')
      }
    } catch (err) {
      console.error('addMaticUsdcToMM ', err)
    }
  }

  const switchToEthereum = async () => {
    try {
      if (signer && chainId !== 4) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [
            {
              chainId: '0x4', // 4
            },
          ],
        })
      }

      if (!signer) {
        alert('Plase connect wallet first!')
      }
    } catch (err) {
      console.error('switchToEthereum ', err)
    }
  }
  const switchToPolygon = async () => {
    try {
      if (signer && chainId !== 80001) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [
            {
              chainId: '0x13881', // 80001
            },
          ],
        })
      }

      if (!signer) {
        alert('Plase connect wallet first!')
      }
    } catch (err) {
      console.error('switchToPolygon ', err)
    }
  }

  const sendTokens = async () => {
    try {
      if (signer && sendAmount !== 0) {
        const amount = ethers.utils.parseEther(sendAmount)
        let tx

        if (JSON.parse(localStorage.getItem('currentTargetChain')) === 'eth') {
          tx = await ethUSDCSigner.burn(address, amount)
          localStorage.setItem('claimAmount', JSON.stringify(sendAmount))
          setSendAmount(0)
          await tx.wait()
          alert(
            'Transaction was successfully confirmed! Please switch to Polygon to claim your bridged tokens.',
          )
          switchToPolygon()
        } else if (
          JSON.parse(localStorage.getItem('currentTargetChain')) === 'matic'
        ) {
          tx = await maticUSDCSigner.burn(address, amount)
          localStorage.setItem('claimAmount', JSON.stringify(sendAmount))
          setSendAmount(0)
          await tx.wait()
          alert(
            'Transaction was successfully confirmed! Please switch to Ethereum to claim your bridged tokens.',
          )
          switchToEthereum()
        } else {
          alert('An error has occured. Please try again!')
        }
      }
    } catch (err) {
      console.error('sendTokens ', err)
    }
  }
  const claimTokens = async () => {
    try {
      const currentClaimAmount = JSON.parse(localStorage.getItem('claimAmount'))

      if (signer && currentClaimAmount !== 0) {
        const amount = ethers.utils.parseEther(currentClaimAmount)
        let tx

        if (JSON.parse(localStorage.getItem('currentTargetChain')) === 'eth') {
          tx = await maticUSDCSigner.mint(address, amount)
          localStorage.setItem('claimAmount', JSON.stringify(0))

          await tx.wait()
        } else if (
          JSON.parse(localStorage.getItem('currentTargetChain')) === 'matic'
        ) {
          tx = await ethUSDCSigner.mint(address, amount)
          localStorage.setItem('claimAmount', JSON.stringify(0))

          await tx.wait()
        } else {
          alert('An error has occured, Please try again!')
        }
      }
    } catch (err) {
      console.error('claimTokens ', err)
    }
  }

  const ethFaucetMint = async () => {
    try {
      if (signer && ethFaucetAmount !== 0) {
        const amount = ethers.utils.parseEther(ethFaucetAmount.toString())
        const tx = await ethUSDCSigner.mint(address, amount)
        setEthFaucetAmount(0)
        await tx.wait()
      }

      if (!signer) {
        alert('Please connect wallet first!')
      }

      if (ethFaucetAmount === 0) {
        alert("Amount can't be zero!")
      }

      if (chainId !== 4) {
        alert('Please switch to Ethereum!')
      }
    } catch (err) {
      console.error('ethFaucetMint ', err)
    }
  }
  const maticFaucetMint = async () => {
    try {
      if (signer && maticFaucetAmount !== 0) {
        const amount = ethers.utils.parseEther(maticFaucetAmount.toString())
        const tx = await maticUSDCSigner.mint(address, amount)
        setMaticFaucetAmount(0)
        await tx.wait()
      }

      if (!signer) {
        alert('Please connect wallet first!')
      }

      if (maticFaucetAmount === 0) {
        alert("Amount can't be zero!")
      }

      if (chainId !== 80001) {
        alert('Please switch to Polygon!')
      }
    } catch (err) {
      console.error('maticFaucetMint ', err)
    }
  }

  const connectWallet = async () => {
    try {
      await provider.send('eth_requestAccounts', [])

      setConnected(true)

      const currentSigner = await provider.getSigner()
      setSigner(currentSigner)

      const currentAddress = await currentSigner.getAddress()
      setAddress(currentAddress)

      const currentEthUSDCSigner = new ethers.Contract(
        ETH_USDC,
        tokenAbi,
        currentSigner,
      )
      setEthUSDCSigner(currentEthUSDCSigner)

      const currentMaticUSDCSigner = new ethers.Contract(
        MATIC_USDC,
        tokenAbi,
        currentSigner,
      )
      setMaticUSDCigner(currentMaticUSDCSigner)
    } catch (err) {
      console.error('connectWallet ', err)
    }
  }
  const disconnectWallet = () => {
    setConnected(false)
    window.location.reload()
  }

  return (
    <div className="bridge-container">
      <h1 className="bridge-title">Simple Bridge</h1>

      <div className="personal-stats">
        {!connected ? (
          <button
            type="button"
            className="connect-wallet btn btn-success bold"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        ) : (
          <button
            type="button"
            className="connect-wallet btn btn-danger bold"
            onClick={disconnectWallet}
          >
            Disconnect Wallet
          </button>
        )}
        <p>
          <strong>Status:</strong> {connected ? 'Connected' : 'Not Connected'}
        </p>
        {connected && (
          <p>
            <strong>Your Address:</strong> {address}
          </p>
        )}
        {connected && (
          <p>
            <strong>Currently Connected Chain:</strong>{' '}
            {chainId === 4
              ? 'Ethereum'
              : chainId === 80001
              ? 'Polygon'
              : 'unknown'}
          </p>
        )}
      </div>

      <div className="bridge-stats">
        <div className="supply-stats">
          <p>
            <strong>Total Supply on Ethereum:</strong> {ethSupply} USDC
          </p>
          <p>
            <strong>Total Supply on Polygon:</strong> {maticSupply} USDC
          </p>
          <p>
            <strong>Total Supply on All Chains:</strong> {totalSupply} USDC
          </p>
        </div>
        <div className="user-actions">
          <div className="add-to-metamask">
            <button
              type="button"
              className="btn btn-primary bold add-eth-usdc-to-mm"
              onClick={addEthUsdcToMM}
              disabled={chainId !== 4}
            >
              Add USDC to MetaMask (Ethereum)
            </button>
            <button
              type="button"
              className="btn btn-primary bold"
              onClick={addMaticUsdcToMM}
              disabled={chainId !== 80001}
            >
              Add USDC to MetaMask (Polygon)
            </button>
          </div>
          <div className="switch-chain">
            <button
              type="button"
              className="btn btn-primary bold switch-to-eth"
              onClick={switchToEthereum}
              disabled={chainId === 4}
            >
              Switch Chain to Ethereum
            </button>
            <button
              type="button"
              className="btn btn-primary bold"
              onClick={switchToPolygon}
              disabled={chainId === 80001}
            >
              Switch Chain to Polygon
            </button>
          </div>
        </div>
      </div>

      <hr />

      <div className="bridge">
        <div className="from">
          <h2 className="bridge-subtitle bold">Source Chain</h2>
          <div className="form-group">
            <select
              name="fromChain"
              className="form-control"
              onChange={(e) => {
                localStorage.setItem(
                  'currentTargetChain',
                  JSON.stringify(e.target.value),
                )
                setTargetChain(
                  JSON.parse(localStorage.getItem('currentTargetChain')),
                )
                if (e.target.value === 'matic' && chainId !== 80001) {
                  switchToPolygon()
                } else if (e.target.value === 'eth' && chainId !== 4) {
                  switchToEthereum()
                }
              }}
            >
              <option value="" disabled selected>
                Select Source Chain
              </option>
              <option value="eth">Ethereum</option>
              <option value="matic">Polygon</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="number"
              name="amount1"
              placeholder="Enter Amount"
              value={sendAmount}
              onChange={(e) => setSendAmount(e.target.value)}
              className="form-control"
            />
          </div>

          <button
            type="button"
            className="btn btn-primary bold"
            onClick={() => {
              if (targetChain === '') {
                alert('Please Select Source Chain First')
              } else {
                sendTokens()
              }
            }}
          >
            Send
          </button>
        </div>
        <div className="target">
          <h2 className="bridge-subtitle bold">Target Chain</h2>
          <p>
            <strong>Target Chain:</strong>{' '}
            {targetChain === 'matic'
              ? 'Ethereum'
              : targetChain === 'eth'
              ? 'Polygon'
              : 'Please Select Source Chain First'}
          </p>
          <p className="claim-amount">
            <strong>Claim Amount:</strong>{' '}
            {JSON.parse(localStorage.getItem('claimAmount'))} USDC
          </p>
          <p className="claim-chain">
            <strong>Claim Chain:</strong>{' '}
            {JSON.parse(localStorage.getItem('currentTargetChain')) === 'matic'
              ? 'Ethereum'
              : JSON.parse(localStorage.getItem('currentTargetChain')) === 'eth'
              ? 'Polygon'
              : 'Please Send Tokens on the Source Chain First'}
          </p>
          <button
            type="button"
            className="btn btn-primary bold"
            disabled={JSON.parse(localStorage.getItem('claimAmount')) === 0}
            onClick={() => {
              claimTokens()
            }}
          >
            Claim
          </button>
        </div>
      </div>

      <h2 className="bridge-subtitle bold">Faucet</h2>

      <div className="faucet">
        <div className="eth-faucet">
          <h3 className="bold faucet-subtitle">Ethereum USDC</h3>
          <div className="form-group">
            <input
              type="number"
              name="ethFaucetAmount"
              value={ethFaucetAmount}
              onChange={(e) => setEthFaucetAmount(e.target.value)}
              placeholder="Enter Amount"
              className="form-control"
            />
          </div>
          <button
            type="button"
            className="btn btn-primary bold"
            onClick={ethFaucetMint}
          >
            Mint
          </button>
        </div>
        <div className="matic-faucet">
          <h3 className="bold faucet-subtitle">Polygon USDC</h3>
          <div className="form-group">
            <input
              type="number"
              name="maticFaucetAmount"
              value={maticFaucetAmount}
              onChange={(e) => setMaticFaucetAmount(e.target.value)}
              placeholder="Enter Amount"
              className="form-control"
            />
          </div>
          <button
            type="button"
            className="btn btn-primary bold"
            onClick={maticFaucetMint}
          >
            Mint
          </button>
        </div>
      </div>
    </div>
  )
}

export default SimpleBridge
