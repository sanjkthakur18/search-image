import React, { useState, useContext } from 'react'
import { PhotoContext } from '../store/PhotoContext'
import axios from 'axios'

const SearchPage = () => {
  const { data, loading, getPhotos } = useContext(PhotoContext)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [error, setError] = useState(null)

  const API_KEY = 'Gtm8Af5dgTo9oHxfz3nb9FaH1znv412kAXSoA1dNQ3WkEhhdUycbmFlR'

  const getSuggestions = async (searchQuery) => {
    try {
      const res = await axios.get(`https://api.pexels.com/v1/search?query=${searchQuery}`, {
        headers: {
          Authorization: API_KEY,
        },
      })
      if (!res.data.photos) {
        setError('Photo not found')
      }
      setSuggestions(res.data.photos.map(photo => photo.alt))
    } catch (error) {
      setError('Failed to fetch images')
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      getPhotos(query)
    } else {
      setError('Photo not found')
    }
  }

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    if (value.trim()) {
      getSuggestions(value)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion)
    setShowSuggestions(false)
    getPhotos(suggestion)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <form onSubmit={handleSearch} className="relative mb-4">
          <input
            type="text"
            placeholder="Search Photos"
            value={query}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-[0.4rem] px-4 rounded focus:outline-none focus:shadow-outline absolute right-0 top-0"
          >
            Search
          </button>
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute bg-white border border-gray-300 rounded mt-1 w-full max-h-40 overflow-y-auto z-10">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 w-full p-8">
        {loading ? (
          <div className="col-span-full text-center">Loading...</div>
        ) : (
          data.map((photo) => (
            <div key={photo.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="w-full h-64 sm:h-48 md:h-56 lg:h-64">
                <img src={photo.src.medium} alt={photo.alt} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 text-center">
                <button
                  onClick={() => window.location.href = `/edit/${photo.id}`}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add Caption
                </button>
              </div>
              {error && <p className="text-red-600">{error}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default SearchPage
