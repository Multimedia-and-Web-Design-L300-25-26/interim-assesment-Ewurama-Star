import { useState } from 'react'
import { articles, categories } from '../data/learnArticles'

export default function Learn() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? articles
    : articles.filter((a) => a.category === activeCategory)

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="bg-[#f2f2f2]">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-20 lg:py-28">
          <h1 className="text-[48px] sm:text-[64px] lg:text-[80px] leading-[1.05] text-gray-900 font-normal mb-5" style={{ letterSpacing: '-0.02em' }}>
            Learn crypto
          </h1>
          <p className="text-[18px] text-gray-500 max-w-[560px]">
            Beginner guides, practical tips, and market updates for first-timers, experienced investors, and everyone in between.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-16">

        {/* Category tabs */}
        <div className="flex items-center gap-3 mb-12 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-[15px] font-medium transition-colors whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((article) => (
            <article key={article.id} className="flex flex-col gap-4 cursor-pointer group">
              <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={article.img}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[12px] font-semibold text-blue-600 bg-blue-50 rounded-full px-3 py-1 uppercase tracking-wide">
                  {article.category}
                </span>
                <span className="text-[13px] text-gray-400">{article.readTime}</span>
              </div>

              <h2 className="text-[22px] leading-[1.3] text-gray-900 font-normal group-hover:underline underline-offset-4">
                {article.title}
              </h2>

              <p className="text-[15px] text-gray-500 leading-relaxed">
                {article.excerpt}
              </p>

              <span className="text-[15px] font-semibold text-blue-600 hover:text-blue-700 mt-auto">
                Read article →
              </span>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
