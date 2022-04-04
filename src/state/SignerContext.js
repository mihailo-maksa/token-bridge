import React, { useState } from 'react'

export const SignerContext = React.createContext({
  signer: '',
  setSigner: () => {},
})

export const SignerProvider = ({ children }) => {
  const [signer, setSigner] = useState('')

  return (
    <SignerContext.Provider
      value={{
        signer,
        setSigner,
      }}
    >
      {children}
    </SignerContext.Provider>
  )
}
