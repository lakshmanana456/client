import { createContext, useState } from "react";

export const SearchContext = createContext()

import React from 'react'

const SearchProvider = ({ children }) => {
  const [searchDoc, setSearchDoc] = useState("")
  return (
    <SearchContext.Provider value={{ searchDoc, setSearchDoc }}>
      {children}
    </SearchContext.Provider>
  )
}

export default SearchProvider