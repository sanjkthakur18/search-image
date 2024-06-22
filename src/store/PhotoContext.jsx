import React, { createContext, useState } from 'react'
import axios from 'axios'

export const PhotoContext = createContext()

const PhotoContextProvider = ({ children }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const API_KEY = 'Gtm8Af5dgTo9oHxfz3nb9FaH1znv412kAXSoA1dNQ3WkEhhdUycbmFlR'

  const getPhotos = async (searchQuery) => {
    setLoading(true)
    try {
      const res = await axios.get(`https://api.pexels.com/v1/search?query=${searchQuery}`, {
        headers: {
          Authorization: API_KEY,
        },
      })
      console.log(res.data.photos)
      setData(res.data.photos)
      setLoading(false)
    } catch (error) {
      console.log('Error:', error)
      setLoading(false)
    }
  }

  return (
    <PhotoContext.Provider value={{ data, loading, getPhotos }}>
      {children}
    </PhotoContext.Provider>
  )
}

export default PhotoContextProvider