import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const AdvertContext = createContext()

export const AdvertProvider = ({ children }) => {
  const [adverts, setAdverts] = useState([])
  const [deletedAdvertId, setDeletedAdvertId] = useState(null)

  const markAdvertAsDeleted = id => {
    setDeletedAdvertId(id)
    setAdverts(prevAdverts => prevAdverts.filter(advert => advert.id !== id))
  }

  const addAdverts = newAdverts => {
    setAdverts(newAdverts)
  }

  return (
    <AdvertContext.Provider
      value={{ adverts, markAdvertAsDeleted, addAdverts, deletedAdvertId }}
    >
      {children}
    </AdvertContext.Provider>
  )
}

AdvertProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useAdverts = () => useContext(AdvertContext)
