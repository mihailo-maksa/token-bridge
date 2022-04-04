import React, { useState } from 'react'

export const TestContractsContext = React.createContext({
  testContractRead: '',
  setTestContractRead: () => {},
  testContract: '',
  setTestContract: () => {},
  testTokenRead: '',
  setTestTokenRead: () => {},
  testToken: '',
  setTestToken: () => {},
  wethTokenRead: '',
  setWethTokenRead: () => {},
  wethToken: '',
  setWethToken: () => {},
})

export const TestContractsProvider = ({ children }) => {
  const [testContractRead, setTestContractRead] = useState('')
  const [testContract, setTestContract] = useState('')

  const [testTokenRead, setTestTokenRead] = useState('')
  const [testToken, setTestToken] = useState('')

  const [wethTokenRead, setWethTokenRead] = useState('')
  const [wethToken, setWethToken] = useState('')

  return (
    <TestContractsContext.Provider
      value={{
        testContractRead,
        setTestContractRead,
        testContract,
        setTestContract,
        testTokenRead,
        setTestTokenRead,
        testToken,
        setTestToken,
        wethTokenRead,
        setWethTokenRead,
        wethToken,
        setWethToken,
      }}
    >
      {children}
    </TestContractsContext.Provider>
  )
}
