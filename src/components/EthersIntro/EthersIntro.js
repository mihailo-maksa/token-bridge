import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { RPC_URL } from '../../utils/constants'
import tutorialJson from '../../contracts/tutorial.json'

const contractsJson = tutorialJson[4].rinkeby.contracts
const TO_ADDRESS = '0x2E7b6533641b120E88Bd9d97Aa2D7Fd0091Cf32e'

const EthersIntro = () => {
  const [address, setAddress] = useState('')
  const [connected, setConnected] = useState(false)
  const [value, setValue] = useState('')
  const [amount, setAmount] = useState(0)
  const [data, setData] = useState(0)
  const [message, setMessage] = useState('')
  const [signatures, setSignatures] = useState([])
  const [signer, setSigner] = useState('')
  const [sigStatus, setSigStatus] = useState(null)
  const [verifyMsg, setVerifyMsg] = useState('')
  const [verifyAddr, setVerifyAddr] = useState('')
  const [verifySig, setVerifySig] = useState('')

  useEffect(() => {}, [])

  // 0.) Connect to the MetaMask
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert('Please install MetaMask first!')
        window.open('https://metamask.io', '_blank')
      }

      await window.ethereum.request({ method: 'eth_requestAccounts' })

      const web3Provider = new ethers.providers.Web3Provider(window.ethereum)
      setConnected(web3Provider && true)

      const currentSigner = web3Provider.getSigner()
      setSigner(currentSigner)
      const currentAddress = await currentSigner.getAddress()
      setAddress(currentAddress)
    } catch (err) {
      console.error(err)
    }
  }

  // 1.) Connecting to the blockchain:

  // Default (recommended) way
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL)

  // For MetaMask & other web3 wallets
  // const provider = new ethers.providers.Web3Provider(window.ethereum)

  // For the mainnet
  // const provider = new ethers.providers.getDefaultProvider() --> ethers.js maintainer's API keys
  // const provider = new ethers.providers.getDefaultProvider({
  //   infura: process.env.REACT_APP_INFURA_KEY,
  //   alchemy: process.env.REACT_APP_ALCHEMY_KEY
  // }) --> with your own API keys, can support multiple node providers

  // For the ethereum's public testnets
  // const provider = new ethers.providers.getDefaultProvider('rinkeby')

  // With specific services
  // const provider = new ethers.providers.InfuraProvider(
  //   'rinkeby',
  //   process.env.REACT_APP_INFURA_ID,
  // )
  // const provider = new ethers.providers.AlchemyProvider(
  //   "rinkeby",
  //   process.env.REACT_APP_ALCHEMY_ID
  // )

  // 2.) Reac smart contract data
  const readOnlyContract = new ethers.Contract(
    contractsJson.TestContract.address,
    contractsJson.TestContract.abi,
    provider,
  )
  const readBlockChainData = async () => {
    try {
      const currentValue = await readOnlyContract.data()
      setValue(currentValue.toString())
    } catch (err) {
      console.error(err.message)
    }
  }

  // 3.) Send transactions
  const sendEther = async () => {
    try {
      await signer.sendTransaction({
        to: TO_ADDRESS,
        value: ethers.utils.parseEther(amount),
      })

      setAmount(0)
    } catch (err) {
      console.error(err.message)
    }
  }

  let contract
  if (signer !== '') {
    contract = new ethers.Contract(
      contractsJson.TestContract.address,
      contractsJson.TestContract.abi,
      signer,
    )
  }
  const writeBlockchainData = async () => {
    try {
      const tx = await contract.setData(data)
      await tx.wait()

      setData(0)
    } catch (err) {
      console.error(err.message)
    }
  }

  // 4.) Utils & constants
  // console.log('wei -> ether: ', ethers.utils.formatEther('10000000000000000'))
  // console.log('ether -> wei: ', ethers.utils.parseEther('1.2'))
  // console.log(
  //   'format into bigger unit, e.g. 9: ',
  //   ethers.utils.formatUnits('10000000000', 9),
  // )
  // console.log(
  //   'parse into smaller unit, e.g. 9: ',
  //   ethers.utils.parseUnits('2.3', 9),
  // )
  // console.log('Zero address: ', ethers.constants.AddressZero)
  // console.log('Zero hash: ', ethers.constants.HashZero)
  // console.log('Wei per ether: ', ethers.constants.WeiPerEther)
  // console.log('One: ', ethers.constants.One)
  // console.log('Negative One: ', ethers.constants.NegativeOne)
  // console.log('Zero: ', ethers.constants.Zero)
  // console.log('Two: ', ethers.constants.Two)
  // console.log('Ether Symbol: ', ethers.constants.EtherSymbol)
  // console.log('Max int 256: ', ethers.constants.MaxInt256)
  // console.log('Max uint 256: ', ethers.constants.MaxUint256)
  // console.log('Min int 256: ', ethers.constants.MinInt256)

  // 5.) Sign and verify messages on the blockchain
  const signMessage = async () => {
    try {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = web3Provider.getSigner()
      const signature = await signer.signMessage(message)
      const address = await signer.getAddress()

      setSignatures([...signatures, { signature, address, message }])
      setMessage('')
    } catch (err) {
      console.error(err.message)
    }
  }

  const verifySignature = async (msg, addr, sig) => {
    try {
      const signerAddr = await ethers.utils.verifyMessage(msg, sig)

      if (signerAddr !== addr) {
        setSigStatus(false)
        alert('Signature is invalid!')
      }

      setSigStatus(true)
      alert('Signature is valid!')
    } catch (err) {
      console.error(err.message)
      setSigStatus(false)
      alert('Signature is invalid!')
    }
  }

  return (
    <div className="ethers-intro">
      <h1>Ethers.js Intro Tutorial</h1>

      <h2>Connect Wallet</h2>
      {connected ? (
        <button
          type="button"
          onClick={() => {
            setConnected(false)
          }}
        >
          Logout
        </button>
      ) : (
        <button type="button" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
      {connected && (
        <p>
          <strong>Your Address: </strong>
          {address}
        </p>
      )}

      <h2>Read Blockchain Data</h2>
      <p>
        <strong>Data: </strong>
        {value}
      </p>
      <button type="button" onClick={readBlockChainData}>
        Fetch
      </button>

      <h2>Send Ether</h2>
      <input
        type="number"
        name="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="button" onClick={sendEther}>
        Send {ethers.constants.EtherSymbol}
      </button>

      <h2>Write Blockchain Data</h2>
      <input
        type="number"
        name="data"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button type="button" onClick={writeBlockchainData}>
        Update Data
      </button>

      <h2>Sign Message</h2>
      <input
        type="text"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
      />
      <button type="button" onClick={signMessage}>
        Sign Message
      </button>

      <h2>Signatures</h2>

      {signatures.length !== 0 &&
        signatures.map((sig, i) => (
          <div key={i}>
            {i !== 0 && <br />}
            <span>
              <strong>Message:</strong> {sig.message}
            </span>
            <br />
            <span>
              <strong>Signer:</strong> {sig.address}
            </span>
            <br />
            <span>
              <strong>Signature:</strong> {sig.signature}
            </span>
          </div>
        ))}

      <h2>Verify Signature</h2>

      <input
        type="text"
        name="verifyMsg"
        placeholder="Message"
        value={verifyMsg}
        onChange={(e) => setVerifyMsg(e.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        name="verifyAddr"
        placeholder="Address"
        value={verifyAddr}
        onChange={(e) => setVerifyAddr(e.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        name="verifySig"
        placeholder="Signature"
        value={verifySig}
        onChange={(e) => setVerifySig(e.target.value)}
      />
      <br />
      <br />
      <button
        type="button"
        onClick={() => verifySignature(verifyMsg, verifyAddr, verifySig)}
      >
        Verify
      </button>

      {sigStatus !== null && (
        <p>
          <strong>Result: </strong>
          {sigStatus ? 'Signature is valid.' : 'Signature is invalid'}
        </p>
      )}
    </div>
  )
}

export default EthersIntro
