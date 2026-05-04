import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useCryptoData from '../hooks/useCryptoData'

function Sparkline({ up }) {
  const color = up ? '#22c55e' : '#ef4444'
  const points = up
    ? '0,22 10,19 20,16 30,18 40,13 50,15 60,10 70,8 80,5'
    : '0,5 10,8 20,11 30,8 40,15 50,13 60,17 70,19 80,22'
  return (
    <svg width="80" height="28" viewBox="0 0 80 28">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

function NavArrows({ onPrev, onNext }) {
  return (
    <div className="flex gap-2">
      <button onClick={onPrev} className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      <button onClick={onNext} className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
      </button>
    </div>
  )
}

export default function Explore() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [starred, setStarred] = useState(new Set())
  const [topPage, setTopPage] = useState(0)
  const [newPage, setNewPage] = useState(0)
  const { coins, ghsRate, loading } = useCryptoData(50)

  const fmt = (usd) => {
    if (!ghsRate || usd == null) return '—'
    const v = usd * ghsRate
    if (v >= 1e12) return `GHS ${(v / 1e12).toFixed(2)}T`
    if (v >= 1e9)  return `GHS ${(v / 1e9).toFixed(1)}B`
    if (v >= 1e6)  return `GHS ${(v / 1e6).toFixed(1)}M`
    if (v >= 1000) return `GHS ${v.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
    if (v >= 1)    return `GHS ${v.toFixed(2)}`
    return `GHS ${v.toFixed(4)}`
  }

  const filtered = coins.filter((c) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q)
  })

  const ROWS = 10
  const pageCoins = filtered.slice((page - 1) * ROWS, page * ROWS)

  const totalMktCap = coins.reduce((s, c) => s + (c.market_cap || 0), 0)
  const totalVolume = coins.reduce((s, c) => s + (c.total_volume || 0), 0)

  const marketStats = [
    { label: 'Total market cap', value: fmt(totalMktCap), rawChange: 0.91, up: true },
    { label: 'Trade volume',     value: fmt(totalVolume), rawChange: 64.21, up: true },
    { label: 'Buy-sell ratio',   value: 'GHS 0.76',       rawChange: 2.36,  up: true },
    { label: 'BTC dominance',    value: '60.09%',          rawChange: 0.02,  up: true },
  ]

  const topMovers = [...coins]
    .sort((a, b) => Math.abs(b.price_change_percentage_24h) - Math.abs(a.price_change_percentage_24h))
    .slice(0, 6)

  const newCoins = coins.slice(40, 50)
  const addedDates = ['Feb 5', 'Dec 9', 'Jan 12', 'Mar 1', 'Nov 20', 'Oct 5', 'Sep 15', 'Aug 22', 'Jul 8', 'Jun 3']

  const toggleStar = (id) =>
    setStarred((prev) => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
        <div className="flex gap-8 py-10">

          {/* ── Main column ── */}
          <div className="flex-1 min-w-0">

            {/* Header + search */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
              <div>
                <h1 className="text-[48px] font-normal text-gray-900 leading-tight mb-1" style={{ letterSpacing: '-0.02em' }}>
                  Explore crypto
                </h1>
                <p className="text-[14px] text-gray-500 flex items-center gap-1.5">
                  Coinbase 50 Index is up
                  <span className="text-green-500 font-semibold flex items-center gap-0.5">↗ 0.47%</span>
                  (24hrs)
                  <span className="w-4 h-4 rounded-full border border-gray-400 text-gray-400 text-[11px] flex items-center justify-center cursor-help" title="Coinbase 50 Index">i</span>
                </p>
              </div>
              <div className="relative w-full sm:max-w-[500px]">
                <svg className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search for an asset"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                  className="w-full pl-12 pr-5 py-4 text-[16px] bg-gray-100 rounded-full outline-none focus:bg-gray-200 transition-all placeholder-gray-400"
                />
              </div>
            </div>

            <div className="border-t border-gray-200 mb-8" />

            {/* Market stats */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[22px] font-bold text-gray-900">Market stats</h2>
                <NavArrows onPrev={() => {}} onNext={() => {}} />
              </div>
              <p className="text-[14px] text-gray-600 leading-relaxed mb-1">
                The overall crypto market is growing this week. As of today, the total crypto market capitalization is 24.34 trillion, representing a 2.15% increase from last week.
              </p>
              <button className="text-[14px] text-blue-600 hover:underline mb-5">Read more</button>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 overflow-x-auto">
                {marketStats.map((s) => (
                  <div key={s.label} className="bg-gray-100 rounded-2xl p-4 min-w-[160px]">
                    <p className="text-[12px] text-gray-500 mb-1">{s.label}</p>
                    <p className="text-[15px] font-bold text-gray-900">
                      {s.value}{' '}
                      <span className="text-green-500 font-medium text-[12px]">↗ {s.rawChange}%</span>
                    </p>
                    <div className="mt-2">
                      <Sparkline up={s.up} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Crypto market prices */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-[22px] font-bold text-gray-900">Crypto market prices</h2>
                <span className="text-[14px] text-gray-500">18,530 assets</span>
              </div>
              <p className="text-[14px] text-gray-600 leading-relaxed mb-1">
                The overall crypto market is growing this week. As of today, the total crypto market capitalization is 24.34 trillion, representing a 2.15% increase from last week.
              </p>
              <button className="text-[14px] text-blue-600 hover:underline mb-5">Read more</button>

              {/* Filter pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { label: 'All assets', icon: true },
                  { label: '1D' },
                  { label: 'GHS' },
                  { label: '10 rows' },
                ].map((f) => (
                  <button key={f.label} className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-full text-[13px] font-medium text-gray-700 hover:bg-gray-50">
                    {f.icon && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    )}
                    {f.label}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
                  </button>
                ))}
              </div>

              {/* Table */}
              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="w-8 pb-3" />
                          <th className="text-left pb-3 pr-4 text-[13px] font-medium text-gray-500">
                            Asset <span className="text-[10px]">⇅</span>
                          </th>
                          <th className="text-left pb-3 pr-4 text-[13px] font-medium text-gray-500">
                            Market price <span className="text-[10px]">⇅</span>
                          </th>
                          <th className="text-left pb-3 pr-4 text-[13px] font-medium text-gray-500">Chart</th>
                          <th className="text-left pb-3 pr-4 text-[13px] font-medium text-gray-500">
                            Change <span className="text-[10px]">⇅</span>
                          </th>
                          <th className="text-left pb-3 pr-4 text-[13px] font-bold text-blue-600">
                            Mkt cap <span className="text-[10px]">⇅</span>
                          </th>
                          <th className="text-left pb-3 pr-4 text-[13px] font-medium text-gray-500">
                            Volume <span className="text-[10px]">⇅</span>
                          </th>
                          <th className="text-left pb-3 text-[13px] font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pageCoins.map((coin) => {
                          const change = coin.price_change_percentage_24h ?? 0
                          const up = change >= 0
                          return (
                            <tr key={coin.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                              <td className="py-4 pr-2">
                                <button
                                  onClick={() => toggleStar(coin.id)}
                                  className={`text-[18px] leading-none ${starred.has(coin.id) ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}
                                >☆</button>
                              </td>
                              <td className="py-4 pr-4">
                                <Link to={`/asset/${coin.id}`} className="flex items-center gap-3">
                                  <img src={coin.image} alt={coin.name} className="w-9 h-9 rounded-full shrink-0" />
                                  <div>
                                    <p className="text-[14px] font-bold text-gray-900">{coin.name}</p>
                                    <p className="text-[12px] text-gray-400 uppercase">{coin.symbol}</p>
                                  </div>
                                </Link>
                              </td>
                              <td className="py-4 pr-4 text-[14px] text-gray-900 whitespace-nowrap">{fmt(coin.current_price)}</td>
                              <td className="py-4 pr-4"><Sparkline up={up} /></td>
                              <td className={`py-4 pr-4 text-[14px] font-medium whitespace-nowrap ${up ? 'text-green-500' : 'text-red-500'}`}>
                                {up ? '↗' : '↙'} {Math.abs(change).toFixed(2)}%
                              </td>
                              <td className="py-4 pr-4 text-[14px] text-gray-900 whitespace-nowrap">{fmt(coin.market_cap)}</td>
                              <td className="py-4 pr-4 text-[14px] text-gray-900 whitespace-nowrap">{fmt(coin.total_volume)}</td>
                              <td className="py-4">
                                <button
                                  onClick={() => navigate(`/asset/${coin.id}`)}
                                  className="px-5 py-2 bg-blue-600 text-white text-[13px] font-semibold rounded-full hover:bg-blue-700 transition-colors"
                                >
                                  Trade
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="flex flex-col items-center gap-2 mt-8 mb-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map((n) => (
                        <button
                          key={n}
                          onClick={() => setPage(n)}
                          className={`w-9 h-9 rounded-full text-[14px] font-medium transition-colors ${page === n ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                        >{n}</button>
                      ))}
                      <span className="px-2 text-gray-400 text-[14px]">...</span>
                      <button className="px-3 h-9 rounded-full text-[14px] font-medium text-gray-700 hover:bg-gray-100">1,853</button>
                      <button className="w-9 h-9 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
                      </button>
                    </div>
                    <p className="text-[13px] text-gray-500">1-10 of 18,530 assets</p>
                  </div>
                </>
              )}
            </div>

            {/* Blue CTA banner */}
            <div className="mt-10 bg-blue-600 rounded-3xl p-10 flex items-center justify-between overflow-hidden">
              <div>
                <h3 className="text-[26px] font-bold text-white leading-tight mb-6 max-w-[380px]">
                  Create a Coinbase account to trade crypto. It's quick, easy, and secure.
                </h3>
                <button
                  onClick={() => navigate('/signup')}
                  className="flex items-center gap-3 px-7 py-4 bg-white text-gray-900 font-semibold text-[15px] rounded-full hover:bg-gray-100 transition-colors"
                >
                  Start Trading <span>→</span>
                </button>
              </div>
              <div className="hidden sm:block">
                <svg width="180" height="130" viewBox="0 0 180 130" fill="none">
                  <rect x="20" y="80" width="140" height="8" rx="4" fill="#93c5fd" opacity="0.4" />
                  <line x1="45" y1="20" x2="45" y2="80" stroke="#93c5fd" strokeWidth="1.5" opacity="0.6" />
                  <rect x="35" y="45" width="20" height="35" rx="2" fill="#3b82f6" />
                  <line x1="85" y1="15" x2="85" y2="80" stroke="#93c5fd" strokeWidth="1.5" opacity="0.6" />
                  <rect x="75" y="50" width="20" height="30" rx="2" fill="#ef4444" />
                  <line x1="125" y1="10" x2="125" y2="80" stroke="#93c5fd" strokeWidth="1.5" opacity="0.6" />
                  <rect x="115" y="20" width="20" height="42" rx="2" fill="#22c55e" />
                  <line x1="155" y1="5" x2="155" y2="80" stroke="#93c5fd" strokeWidth="1.5" opacity="0.6" />
                  <rect x="145" y="15" width="20" height="38" rx="2" fill="#22c55e" />
                  <line x1="25" y1="90" x2="170" y2="30" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="18" y1="20" x2="18" y2="88" stroke="#93c5fd" strokeWidth="1.5" opacity="0.5" />
                  {[20, 54, 88].map(y => <line key={y} x1="15" y1={y} x2="22" y2={y} stroke="#93c5fd" strokeWidth="1.5" opacity="0.5" />)}
                </svg>
              </div>
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <div className="hidden lg:flex flex-col gap-6 w-[300px] shrink-0">

            {/* Get started card */}
            <div className="bg-blue-600 rounded-3xl p-6 relative overflow-hidden min-h-[160px]">
              <div className="relative z-10">
                <p className="text-white font-bold text-[20px] mb-1">Get started</p>
                <p className="text-blue-200 text-[14px] mb-5">Create your account today</p>
                <button onClick={() => navigate('/signup')} className="px-5 py-2.5 bg-white text-gray-900 font-semibold text-[14px] rounded-full hover:bg-gray-100 transition-colors">
                  Sign up
                </button>
              </div>
              <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-blue-500 opacity-40" />
              <div className="absolute right-5 top-3 z-10">
                <div className="w-16 h-16 rounded-full bg-gray-900 border-2 border-yellow-400 flex items-center justify-center shadow-lg">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M16 4 L19 11 L26 11 L20.5 15.5 L22.5 23 L16 19 L9.5 23 L11.5 15.5 L6 11 L13 11 Z" fill="#fbbf24" />
                  </svg>
                </div>
                <div className="w-7 h-7 rounded-full bg-green-400 absolute -bottom-2 -left-2" />
                <div className="w-5 h-5 rounded-full bg-gray-300 absolute -top-1 -right-2 opacity-60" />
              </div>
            </div>

            {/* Top movers */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[17px] font-bold text-gray-900">Top movers</h3>
                <NavArrows
                  onPrev={() => setTopPage(p => Math.max(0, p - 1))}
                  onNext={() => setTopPage(p => Math.min(2, p + 1))}
                />
              </div>
              <p className="text-[12px] text-gray-400 mb-3">24hr change</p>
              <div className="grid grid-cols-2 gap-3">
                {topMovers.slice(topPage * 2, topPage * 2 + 2).map((coin) => {
                  const change = coin.price_change_percentage_24h ?? 0
                  const up = change >= 0
                  return (
                    <Link key={coin.id} to={`/asset/${coin.id}`} className="bg-gray-100 rounded-2xl p-4 hover:bg-gray-200 transition-colors">
                      <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full mb-3" />
                      <p className="text-[11px] text-gray-500 uppercase font-semibold mb-0.5">{coin.symbol}</p>
                      <p className={`text-[18px] font-bold ${up ? 'text-green-500' : 'text-red-500'}`}>
                        {up ? '↗' : '↙'} {Math.abs(change).toFixed(2)}%
                      </p>
                      <p className="text-[12px] text-gray-500 mt-0.5">{fmt(coin.current_price)}</p>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* New on Coinbase */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[17px] font-bold text-gray-900">New on Coinbase</h3>
                <NavArrows
                  onPrev={() => setNewPage(p => Math.max(0, p - 1))}
                  onNext={() => setNewPage(p => Math.min(4, p + 1))}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {newCoins.slice(newPage * 2, newPage * 2 + 2).map((coin, i) => (
                  <Link key={coin.id} to={`/asset/${coin.id}`} className="bg-gray-100 rounded-2xl p-4 hover:bg-gray-200 transition-colors">
                    <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full mb-3" />
                    <p className="text-[11px] text-gray-500 uppercase font-semibold mb-0.5">{coin.symbol}</p>
                    <p className="text-[14px] font-bold text-gray-900">{coin.name}</p>
                    <p className="text-[12px] text-gray-400 mt-0.5">Added {addedDates[newPage * 2 + i] ?? 'Jan 1'}</p>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
