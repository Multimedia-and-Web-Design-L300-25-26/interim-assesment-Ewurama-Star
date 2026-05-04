import { Link } from 'react-router-dom'

/* Card-style display for a cryptocurrency — used in grid layouts */
export default function CryptoCard({ coin, ghsRate }) {
  const change = coin.price_change_percentage_24h ?? 0
  const up = change >= 0

  const formatPrice = (usdPrice) => {
    if (!ghsRate) return '—'
    const price = usdPrice * ghsRate
    if (price >= 1000) return 'GHS ' + price.toLocaleString('en-US', { maximumFractionDigits: 2 })
    if (price >= 1) return 'GHS ' + price.toFixed(2)
    return 'GHS ' + price.toFixed(4)
  }

  return (
    <Link
      to={`/asset/${coin.id}`}
      className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all"
    >
      <div className="flex items-center gap-3">
        <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
        <div>
          <p className="text-gray-900 text-[15px] font-semibold">{coin.name}</p>
          <p className="text-gray-400 text-[13px] uppercase">{coin.symbol}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-gray-900 text-[15px] font-semibold">{formatPrice(coin.current_price)}</p>
        <p className={`text-[13px] font-medium ${up ? 'text-green-600' : 'text-red-500'}`}>
          {up ? '+' : ''}{change.toFixed(2)}%
        </p>
      </div>
    </Link>
  )
}
