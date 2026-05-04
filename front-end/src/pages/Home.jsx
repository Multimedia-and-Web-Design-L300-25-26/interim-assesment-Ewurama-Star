import { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useCryptoData from '../hooks/useCryptoData'
import CryptoRow from '../components/crypto/CryptoRow'

/* ─── Hero Section ──────────────────────────────────────────────── */
function Hero() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) navigate(`/signup?email=${encodeURIComponent(email)}`)
  }

  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 lg:min-h-[780px]">

          {/* Text — top on mobile, right on desktop */}
          <div className="order-1 lg:order-2 flex-1 max-w-full lg:max-w-[560px] pt-5 lg:pt-0">
            <h1 className="text-[50px] sm:text-[68px] lg:text-[80px] leading-[1.05] text-gray-900 mb-5 lg:mb-7 font-normal" style={{ letterSpacing: '-0.02em' }}>
              The future of finance is here.
            </h1>
            <p className="text-[18px] lg:text-[20px] text-gray-700 mb-6 lg:mb-10">
              Trade crypto and more on a platform you can trust.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="satoshi@nakamoto.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 text-[17px] text-gray-900 placeholder-gray-400 border border-gray-300 rounded-2xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
              <button type="submit" className="w-full sm:w-auto px-8 py-4 text-[17px] font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors whitespace-nowrap">
                Sign up
              </button>
            </form>
          </div>

          {/* Image — bottom on mobile, left on desktop */}
          <div className="order-2 lg:order-1 flex-shrink-0 w-full lg:w-[660px] mt-4 lg:mt-12">
            <img src="/hero.avif" alt="Coinbase app" className="w-full h-auto object-contain rounded-[40px] lg:rounded-[60px]" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Crypto Explore Section ────────────────────────────────────── */
const tabs = ['Tradable', 'Top gainers', 'New on Coinbase']

function CryptoExploreSection() {
  const [activeTab, setActiveTab] = useState('Tradable')
  const { coins, ghsRate, loading, error } = useCryptoData(20)

  const getTabCoins = useCallback(() => {
    if (!coins.length) return []
    if (activeTab === 'Tradable') return coins.slice(0, 6)
    if (activeTab === 'Top gainers')
      return [...coins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0, 6)
    return coins.slice(14, 20)
  }, [coins, activeTab])

  const displayCoins = getTabCoins()

  return (
    <section className="w-full bg-[#f2f2f2]">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-10 lg:py-28">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">

          <div className="flex-1 max-w-[520px]">
            <h2 className="text-[40px] sm:text-[48px] lg:text-[52px] leading-[1.08] text-gray-900 mb-5 font-normal" style={{ letterSpacing: '-0.02em' }}>
              Explore crypto like Bitcoin, Ethereum, and Dogecoin.
            </h2>
            <p className="text-[17px] text-gray-500 mb-8">
              Simply and securely buy, sell, and manage hundreds of cryptocurrencies.
            </p>
            <Link to="/explore" className="inline-block px-7 py-4 text-[17px] font-semibold text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors">
              See more assets
            </Link>
          </div>

          {/* Dark card with live data */}
          <div className="flex-1 bg-[#0a0b0d] rounded-3xl overflow-hidden lg:max-w-2xl lg:ml-auto">
            <div className="flex items-center gap-2 p-6 pb-3">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-full text-[15px] font-medium transition-colors ${activeTab === tab ? 'bg-[#2a2b2f] text-white' : 'text-gray-400 hover:text-gray-200'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="px-6 pb-6">
              {loading && <div className="py-10 text-center text-gray-500">Loading...</div>}
              {error && <div className="py-10 text-center text-gray-500">Failed to load data.</div>}
              {!loading && !error && displayCoins.map((coin, i) => (
                <CryptoRow key={coin.id} coin={coin} ghsRate={ghsRate} showBorder={i < displayCoins.length - 1} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Advanced Trader Section ───────────────────────────────────── */
function AdvancedTrader() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-10 lg:py-28">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-20">
          <div className="flex-1">
            <div className="bg-[#0d0d0f] rounded-[50px] overflow-hidden aspect-[4/3] pt-6 px-6 pb-0 flex items-end justify-center">
              <img src="/advanced.avif" alt="Advanced trading tools" className="w-full h-auto object-contain" />
            </div>
          </div>
          <div className="flex-1 max-w-[520px]">
            <h2 className="text-[40px] sm:text-[48px] lg:text-[52px] leading-[1.08] text-gray-900 mb-6 font-normal" style={{ letterSpacing: '-0.02em' }}>
              Powerful tools, designed for the advanced trader.
            </h2>
            <p className="text-[17px] text-gray-500 leading-relaxed mb-8">
              Powerful analytical tools with the safety and security of Coinbase deliver the ultimate trading experience. Tap into sophisticated charting capabilities, real-time order books, and deep liquidity across hundreds of markets.
            </p>
            <button className="px-7 py-4 text-[17px] font-semibold text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors">
              Start trading
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Zero Fees Section ─────────────────────────────────────────── */
function ZeroFees() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-10 lg:py-28">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-20">
          <div className="flex-1 max-w-[520px] order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 mb-5 lg:mb-8">
              <img src="/logo.svg" alt="Coinbase" className="w-4 h-4" />
              <span className="text-[13px] font-semibold text-gray-900 tracking-widest uppercase">Coinbase One</span>
            </div>
            <h2 className="text-[40px] sm:text-[48px] lg:text-[56px] leading-[1.06] text-gray-900 mb-6 font-normal" style={{ letterSpacing: '-0.02em' }}>
              Zero trading fees, more rewards.
            </h2>
            <p className="text-[17px] text-gray-500 leading-relaxed mb-8">
              Get more out of crypto with one membership: zero trading fees, boosted rewards, priority support, and more.
            </p>
            <button className="px-7 py-4 text-[17px] font-semibold text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors">
              Claim free trial
            </button>
          </div>
          <div className="flex-1 order-1 lg:order-2">
            <div className="bg-[#f2f2f2] rounded-[50px] overflow-hidden aspect-[4/3] pt-6 px-8 pb-0 flex items-end justify-center">
              <img src="/zero_fees_us.avif" alt="Zero trading fees with Coinbase One" className="w-3/4 h-auto object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Countless Ways (Base App) ─────────────────────────────────── */
function Countless() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-10 lg:py-28">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-20">
          <div className="flex-1">
            <div className="bg-[#f2f2f2] rounded-[50px] overflow-hidden aspect-[4/3] pt-6 px-8 pb-0 flex items-end justify-center">
              <img src="/countless.avif" alt="Base App" className="w-3/4 h-auto object-contain" />
            </div>
          </div>
          <div className="flex-1 max-w-[520px]">
            <div className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 mb-5 lg:mb-8">
              <img src="/logo.svg" alt="Coinbase" className="w-4 h-4" />
              <span className="text-[13px] font-semibold text-gray-900 tracking-widest uppercase">Base App</span>
            </div>
            <h2 className="text-[40px] sm:text-[48px] lg:text-[56px] leading-[1.06] text-gray-900 mb-6 font-normal" style={{ letterSpacing: '-0.02em' }}>
              Countless ways to earn crypto with the Base App.
            </h2>
            <p className="text-[17px] text-gray-500 leading-relaxed mb-8">
              An everything app to trade, create, discover, and chat, all in one place.
            </p>
            <button className="px-7 py-4 text-[17px] font-semibold text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Crypto Basics Section ─────────────────────────────────────── */
const learnArticles = [
  {
    img: '/1.png',
    title: 'USDC: The digital dollar for the global crypto economy',
    excerpt: 'Coinbase believes crypto will be part of the solution for creating an open financial system that is more efficient...',
  },
  {
    img: '/2.png',
    title: 'Can crypto really replace your bank account?',
    excerpt: "If you're a big enough fan of crypto, you've probably heard the phrase \"be your own bank\" or the term \"bankless\"...",
  },
  {
    img: '/3.png',
    title: 'When is the best time to invest in crypto?',
    excerpt: 'Cryptocurrencies like Bitcoin can experience daily price volatility. As with any investment, volatility may cause...',
  },
]

function CryptoBasics() {
  return (
    <section className="w-full bg-[#f2f2f2]">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-10 lg:py-28">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8 lg:mb-14">
          <h2 className="text-[40px] sm:text-[52px] lg:text-[60px] leading-[1.06] text-gray-900 max-w-[480px] font-normal" style={{ letterSpacing: '-0.02em' }}>
            New to crypto? Learn some crypto basics
          </h2>
          <div className="flex flex-col items-start gap-6 lg:max-w-[420px] lg:pt-3">
            <p className="text-[17px] text-gray-500 leading-relaxed">
              Beginner guides, practical tips, and market updates for first-timers, experienced investors, and everyone in between
            </p>
            <Link to="/learn" className="inline-block px-7 py-4 text-[17px] font-semibold text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors">
              Read More
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {learnArticles.map((article) => (
            <Link to="/learn" key={article.title} className="group flex flex-col gap-5 cursor-pointer">
              <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden">
                <img src={article.img} alt={article.title} className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-300" />
              </div>
              <h3 className="text-[22px] leading-[1.3] text-gray-900 font-normal group-hover:underline">
                {article.title}
              </h3>
              <p className="text-[15px] text-gray-500 leading-relaxed">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Take Control CTA ──────────────────────────────────────────── */
function TakeControl() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) navigate(`/signup?email=${encodeURIComponent(email)}`)
  }

  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-10 lg:py-28">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-20">
          <div className="flex-1 max-w-[520px]">
            <h2 className="text-[56px] sm:text-[68px] lg:text-[80px] leading-[1.04] text-gray-900 mb-6 font-normal" style={{ letterSpacing: '-0.02em' }}>
              Take control of your money
            </h2>
            <p className="text-[18px] text-gray-700 mb-8">
              Start your portfolio today and discover crypto
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="satoshi@nakamoto.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 text-[16px] text-gray-900 placeholder-gray-400 border border-gray-300 rounded-2xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
              <button type="submit" className="w-full sm:w-auto px-7 py-4 text-[16px] font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors whitespace-nowrap">
                Sign up
              </button>
            </form>
          </div>
          <div className="flex-1 flex justify-center lg:justify-end">
            <img src="/cryptos.avif" alt="Crypto currencies" className="w-full max-w-[560px] h-auto object-contain self-end" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Home Page ─────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Hero />
      <CryptoExploreSection />
      <AdvancedTrader />
      <ZeroFees />
      <Countless />
      <CryptoBasics />
      <TakeControl />
    </>
  )
}
