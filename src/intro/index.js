const testTokenAbi = {
  TestToken: {
    address: '0x6C1D0b2bC240B70c0DB3192D06acA6A888a93573',
    abi: [
      {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
        ],
        name: 'allowance',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_account',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_amount',
            type: 'uint256',
          },
        ],
        name: 'burn',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'decimals',
        outputs: [
          {
            internalType: 'uint8',
            name: '',
            type: 'uint8',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'subtractedValue',
            type: 'uint256',
          },
        ],
        name: 'decreaseAllowance',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'addedValue',
            type: 'uint256',
          },
        ],
        name: 'increaseAllowance',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_account',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_amount',
            type: 'uint256',
          },
        ],
        name: 'mint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'name',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'symbol',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transfer',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'sender',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transferFrom',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
  },
}

const testContractAbi = {
  address: '0xA305933d7EFfBaaFc03B9c54E78ce1CF9558Dd67',
  abi: [
    {
      inputs: [],
      name: 'data',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_data',
          type: 'uint256',
        },
      ],
      name: 'setData',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
}

let provider = new ethers.providers.Web3Provider(window.ethereum)
let signer, address, balance

async function connectWallet() {
  await provider.send('eth_requestAccounts', [])

  signer = await provider.getSigner()

  console.log({ signer })

  address = await signer.getAddress()

  document.getElementById('address').innerText = `Your Address ${address}`
}

async function getBalance() {
  balance = await signer.getBalance()

  document.getElementById(
    'balance',
  ).innerText = `Ether Balance: ${ethers.utils.formatEther(
    balance.toString(),
  )} ${ethers.constants.EtherSymbol}`
}

const testToken = new ethers.Contract(
  testTokenAbi.TestToken.address,
  testTokenAbi.TestToken.abi,
  provider,
)

async function readContractData() {
  const name = await testToken.name()
  const symbol = await testToken.symbol()
  const decimals = await testToken.decimals()
  const myBalance = await testToken.balanceOf(address)
  const totalSupply = await testToken.totalSupply()

  console.log({
    name,
    symbol,
    decimals,
    myBalance: ethers.utils.formatEther(myBalance.toString()),
    totalSupply: ethers.utils.formatEther(totalSupply.toString()),
  })
}

const account = '0x2E7b6533641b120E88Bd9d97Aa2D7Fd0091Cf32e'

async function sendEtherToAccount() {
  const value = ethers.utils.parseEther('0.01')

  await signer.sendTransaction({
    to: account,
    value,
  })
}

async function sendTokenToAccount() {
  const value = ethers.utils.parseEther('1000')

  const tx = await testToken.connect(signer).transfer(account, value)
  await tx.wait()
}

async function deployContract() {
  const abi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'currentNumber',
          type: 'uint256',
        },
      ],
      name: 'MyEvent',
      type: 'event',
    },
    {
      inputs: [],
      name: 'deposit',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'emitAnEvent',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getBalance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'incrementNumber',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'number',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ]
  const numberContractByteCode = {
    functionDebugData: {},
    generatedSources: [],
    linkReferences: {},
    object:
      '6080604052600160005534801561001557600080fd5b5061023f806100256000396000f3fe60806040526004361061004a5760003560e01c806312065fe01461004f578063273ea3e31461007a5780638381f58a14610091578063910220cf146100bc578063d0e30db0146100d3575b600080fd5b34801561005b57600080fd5b506100646100dd565b604051610071919061015f565b60405180910390f35b34801561008657600080fd5b5061008f6100e5565b005b34801561009d57600080fd5b506100a6610100565b6040516100b3919061015f565b60405180910390f35b3480156100c857600080fd5b506100d1610106565b005b6100db61014e565b005b600047905090565b60016000808282546100f7919061017a565b92505081905550565b60005481565b6000543373ffffffffffffffffffffffffffffffffffffffff167fdf50c7bb3b25f812aedef81bc334454040e7b27e27de95a79451d663013b7e1760405160405180910390a3565b565b610159816101d0565b82525050565b60006020820190506101746000830184610150565b92915050565b6000610185826101d0565b9150610190836101d0565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156101c5576101c46101da565b5b828201905092915050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea26469706673582212200977fa76d2b8f1b564a9b63e8d4287b2456043969175ea3a96dab85d95a1196c64736f6c63430008070033',
    opcodes:
      'PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x1 PUSH1 0x0 SSTORE CALLVALUE DUP1 ISZERO PUSH2 0x15 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x23F DUP1 PUSH2 0x25 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH2 0x4A JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x12065FE0 EQ PUSH2 0x4F JUMPI DUP1 PUSH4 0x273EA3E3 EQ PUSH2 0x7A JUMPI DUP1 PUSH4 0x8381F58A EQ PUSH2 0x91 JUMPI DUP1 PUSH4 0x910220CF EQ PUSH2 0xBC JUMPI DUP1 PUSH4 0xD0E30DB0 EQ PUSH2 0xD3 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x5B JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x64 PUSH2 0xDD JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x71 SWAP2 SWAP1 PUSH2 0x15F JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x86 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x8F PUSH2 0xE5 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x9D JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0xA6 PUSH2 0x100 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0xB3 SWAP2 SWAP1 PUSH2 0x15F JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0xC8 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0xD1 PUSH2 0x106 JUMP JUMPDEST STOP JUMPDEST PUSH2 0xDB PUSH2 0x14E JUMP JUMPDEST STOP JUMPDEST PUSH1 0x0 SELFBALANCE SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x0 DUP1 DUP3 DUP3 SLOAD PUSH2 0xF7 SWAP2 SWAP1 PUSH2 0x17A JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE POP JUMP JUMPDEST PUSH1 0x0 SLOAD DUP2 JUMP JUMPDEST PUSH1 0x0 SLOAD CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0xDF50C7BB3B25F812AEDEF81BC334454040E7B27E27DE95A79451D663013B7E17 PUSH1 0x40 MLOAD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 JUMP JUMPDEST JUMP JUMPDEST PUSH2 0x159 DUP2 PUSH2 0x1D0 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0x174 PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0x150 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x185 DUP3 PUSH2 0x1D0 JUMP JUMPDEST SWAP2 POP PUSH2 0x190 DUP4 PUSH2 0x1D0 JUMP JUMPDEST SWAP3 POP DUP3 PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SUB DUP3 GT ISZERO PUSH2 0x1C5 JUMPI PUSH2 0x1C4 PUSH2 0x1DA JUMP JUMPDEST JUMPDEST DUP3 DUP3 ADD SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 MULMOD PUSH24 0xFA76D2B8F1B564A9B63E8D4287B2456043969175EA3A96DA 0xB8 0x5D SWAP6 LOG1 NOT PUSH13 0x64736F6C634300080700330000 ',
    sourceMap: '60:416:0:-:0;;;110:1;89:22;;60:416;;;;;;;;;;;;;;;;',
  }

  const factory = new ethers.ContractFactory(
    abi,
    numberContractByteCode.object,
    signer,
  )
  const numberContract = await factory.deploy()
  const txReceipt = await numberContract.deployTransaction.wait()

  console.log({
    txReceipt,
  })
}

const numberContractAddress = '0x9331A51Cdc421d57e556CFcc7176662A8A99BC0E'

async function incrementNumber() {
  const numberContractAbi = [
    'function number() view returns (uint)',
    'function incrementNumber() external',
  ]

  const numberContract = new ethers.Contract(
    numberContractAddress,
    numberContractAbi,
    signer,
  )

  const oldNumber = await numberContract.number()
  console.log(`Old number: ${oldNumber}`)

  const tx = await numberContract.incrementNumber()
  await tx.wait()

  const newNumber = await numberContract.number()
  console.log(`New number: ${newNumber}`)
}

async function emitAnEvent() {
  const numberContractAbi = ['function emitAnEvent() external']

  const numberContract = new ethers.Contract(
    numberContractAddress,
    numberContractAbi,
    signer,
  )

  const tx = await numberContract.emitAnEvent()
  const txResponse = await tx.wait()

  console.log(`An event was emmited: `)
  console.log(txResponse.events[0])
}

async function listenToEvents() {
  const abi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'currentNumber',
          type: 'uint256',
        },
      ],
      name: 'MyEvent',
      type: 'event',
    },
    {
      inputs: [],
      name: 'deposit',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'emitAnEvent',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getBalance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'incrementNumber',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'number',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ]

  const numberContract = new ethers.Contract(
    numberContractAddress,
    abi,
    provider,
  )

  numberContract.on('MyEvent', (from, currentNumber) => {
    console.log(`Address emitting the event: ${from}`)
    console.log(`Current number from event: ${currentNumber}`)
  })
}

async function sendEtherWhenCallingFunction() {
  const abi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'currentNumber',
          type: 'uint256',
        },
      ],
      name: 'MyEvent',
      type: 'event',
    },
    {
      inputs: [],
      name: 'deposit',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'emitAnEvent',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getBalance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'incrementNumber',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'number',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ]

  const numberContract = new ethers.Contract(numberContractAddress, abi, signer)

  const options = {
    value: ethers.utils.parseEther('0.012'),
  }

  const tx = await numberContract.deposit(options)
  await tx.wait()

  const contractBalance = await numberContract.getBalance()
  console.log(
    `NumberContract ETH balance: ${ethers.utils.formatEther(
      contractBalance.toString(),
    )}`,
  )
}

async function addStMatic() {
  await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: '0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4',
        symbol: 'stMATIC',
        decimals: 18,
        image:
          'https://assets.coingecko.com/coins/images/24185/small/stMATIC.png',
      },
    },
  })
}
