import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [gifs, setGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchGifs = () => {
    
    }
    setLoading(true);
    setError("");
    
    setTimeout(() => {
      setGifs(mockGifs.slice(0, 6));
      setLoading(false);
    }, 500);
  };

  const getTrending = () => {
    setLoading(true);
    setError("");
    data=fetch("https://api.giphy.com/v1/gifs/trending?api_key=VaAVtLcJcnpvF7KPI7vMdGbg1UJ04sK4")
    setTimeout(() => {
      setGifs(mockGifs);
      setLoading(false);
    }, 500);
  };

  const getRandom = () => {
    setLoading(true);
    setError("");
    randomdata=fetch("https://api.giphy.com/v1/gifs/random?api_key=VaAVtLcJcnpvF7KPI7vMdGbg1UJ04sK4")
    setTimeout(() => {
      const randomGif = mockGifs[Math.floor(Math.random() * mockGifs.length)];
      setGifs([randomGif]);
      setLoading(false);
    }, 500);
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">GIF Generator</h1>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && searchGifs()}
              placeholder="Search GIFs..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={searchGifs}
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              Search
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={getTrending}
              disabled={loading}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
            >
              Trending
            </button>
            <button
              onClick={getRandom}
              disabled={loading}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:bg-gray-400"
            >
              Random
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-500"></div>
            <p className="text-gray-600 mt-4">Loading...</p>
          </div>
        )}

        {!loading && gifs.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gifs.map((gif) => (
              <div key={gif.id} className="bg-white rounded shadow overflow-hidden">
                <div
                  className={`w-full h-48 ${gif.color} flex items-center justify-center text-white text-2xl font-bold`}
                >
                  GIF
                </div>
                <div className="p-3">
                  <p className="text-sm text-gray-700 font-medium">{gif.title}</p>
                  <p className="text-xs text-gray-500 mt-1">Mock GIF - API ready</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && gifs.length === 0 && !error && (
          <div className="text-center py-8 bg-white rounded-lg shadow">
            <p className="text-gray-600">Search for GIFs or try Trending/Random</p>
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default App
