import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function AssetDetail() {
  const { id } = useParams()
  const [coin, setCoin] = useState(null)
  const [ghsRate, setGhsRate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [buyAmount, setBuyAmount] = useState('')

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const [coinRes, rateRes] = await Promise.all([
          fetch(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`),
          fetch('https://open.er-api.com/v6/latest/USD'),
        ])

        if (!coinRes.ok) throw new Error('Not found')

        const coinData = await coinRes.json()
        const rateData = await rateRes.json()

        setCoin(coinData)
        setGhsRate(rateData.rates.GHS)
        setLoading(false)
      } catch {
        setError(true)
        setLoading(false)
      }
    }
    fetchCoin()
  }, [id])

  const formatGHS = (usd) => {
    if (!ghsRate || !usd) return '—'
    const price = usd * ghsRate
    if (price >= 1000) return 'GHS ' + price.toLocaleString('en-US', { maximumFractionDigits: 2 })
    if (price >= 1) return 'GHS ' + price.toFixed(2)
    return 'GHS ' + price.toFixed(6)
  }

  const formatLargeNum = (n) => {
    if (!n) return '—'
    if (n >= 1e12) return (n / 1e12).toFixed(2) + 'T'
    if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B'
    if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M'
    return n.toLocaleString()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center">
        <div className="text-gray-500 text-[17px]">Loading...</div>
      </div>
    )
  }

  if (error || !coin) {
    return (
      <div className="min-h-screen bg-[#f2f2f2] flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-[17px]">Asset not found.</p>
        <Link to="/explore" className="text-blue-600 hover:underline">Back to Explore</Link>
      </div>
    )
  }

  const price = coin.market_data.current_price.usd
  const change24h = coin.market_data.price_change_percentage_24h
  const change7d = coin.market_data.price_change_percentage_7d
  const up24h = change24h >= 0
  const up7d = change7d >= 0

  const stats = [
    { label: 'Market cap', value: '$' + formatLargeNum(coin.market_data.market_cap.usd) },
    { label: '24h volume', value: '$' + formatLargeNum(coin.market_data.total_volume.usd) },
    { label: 'Circulating supply', value: formatLargeNum(coin.market_data.circulating_supply) + ' ' + coin.symbol.toUpperCase() },
    { label: 'All-time high', value: '$' + coin.market_data.ath.usd?.toLocaleString('en-US', { maximumFractionDigits: 2 }) },
    { label: 'All-time low', value: '$' + coin.market_data.atl.usd?.toFixed(4) },
    { label: '7d change', value: (up7d ? '+' : '') + change7d?.toFixed(2) + '%' },
  ]

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[14px] text-gray-500 mb-8">
          <Link to="/explore" className="hover:text-gray-800 transition-colors">Explore</Link>
          <span>›</span>
          <span className="text-gray-800">{coin.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left — main info */}
          <div className="lg:col-span-2 space-y-6">

            {/* Price header */}
            <div className="bg-white rounded-3xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <img src={coin.image.large} alt={coin.name} className="w-16 h-16 rounded-full" />
                <div>
                  <h1 className="text-[28px] font-semibold text-gray-900">{coin.name}</h1>
                  <p className="text-[15px] text-gray-400 uppercase">{coin.symbol}</p>
                </div>
                <span className="ml-auto text-[13px] text-gray-500 bg-gray-100 rounded-full px-3 py-1">
                  #{coin.market_cap_rank}
                </span>
              </div>

              <div className="flex items-end gap-4 mb-2">
                <p className="text-[42px] font-semibold text-gray-900">{formatGHS(price)}</p>
                <span className={`text-[18px] font-semibold mb-1 ${up24h ? 'text-green-600' : 'text-red-500'}`}>
                  {up24h ? '▲' : '▼'} {Math.abs(change24h).toFixed(2)}%
                </span>
              </div>
              <p className="text-[14px] text-gray-400">USD price: ${price?.toLocaleString('en-US', { maximumFractionDigits: 4 })} · 24h change</p>
            </div>

            {/* Stats grid */}
            <div className="bg-white rounded-3xl p-8">
              <h2 className="text-[18px] font-semibold text-gray-900 mb-6">{coin.name} statistics</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-[13px] text-gray-400 mb-1">{s.label}</p>
                    <p className="text-[16px] font-semibold text-gray-900">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            {coin.description?.en && (
              <div className="bg-white rounded-3xl p-8">
                <h2 className="text-[18px] font-semibold text-gray-900 mb-4">About {coin.name}</h2>
                <p
                  className="text-[15px] text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: coin.description.en.split('.').slice(0, 5).join('.') + '.',
                  }}
                />
              </div>
            )}
          </div>

          {/* Right — buy panel */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 sticky top-24">
              <h3 className="text-[18px] font-semibold text-gray-900 mb-6">Buy {coin.name}</h3>

              <div className="mb-4">
                <label className="text-[13px] text-gray-500 mb-2 block">Amount (GHS)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  className="w-full px-4 py-3 text-[16px] border border-gray-200 rounded-2xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {buyAmount && ghsRate && (
                <div className="bg-gray-50 rounded-2xl p-4 mb-4 text-[14px] text-gray-600">
                  <div className="flex justify-between mb-2">
                    <span>You get</span>
                    <span className="font-semibold text-gray-900">
                      {(parseFloat(buyAmount) / (price * ghsRate)).toFixed(6)} {coin.symbol.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Fee (1.49%)</span>
                    <span>GHS {(parseFloat(buyAmount) * 0.0149).toFixed(2)}</span>
                  </div>
                </div>
              )}

              <Link
                to="/signup"
                className="block w-full text-center py-4 text-[16px] font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
              >
                Buy {coin.symbol.toUpperCase()}
              </Link>
              <p className="text-[12px] text-gray-400 text-center mt-3">
                Sign up to start trading
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
