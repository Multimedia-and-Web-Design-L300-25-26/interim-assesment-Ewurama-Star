import { Link } from 'react-router-dom'

/* A single row displaying a cryptocurrency's info */
export default function CryptoRow({ coin, ghsRate, showBorder = true }) {
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
      className={`flex items-center justify-between py-4 hover:bg-white/5 transition-colors px-2 -mx-2 rounded-xl ${showBorder ? 'border-b border-white/5' : ''}`}
    >
      <div className="flex items-center gap-4">
        <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full shrink-0" />
        <div>
          <p className="text-white text-[17px] font-medium">{coin.name}</p>
          <p className="text-gray-400 text-[13px] uppercase">{coin.symbol}</p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-white text-[16px] font-medium">{formatPrice(coin.current_price)}</p>
        <p className={`text-[14px] font-medium ${up ? 'text-green-400' : 'text-red-400'}`}>
          {up ? '↗' : '↙'} {Math.abs(change).toFixed(2)}%
        </p>
      </div>
    </Link>
  )
}
