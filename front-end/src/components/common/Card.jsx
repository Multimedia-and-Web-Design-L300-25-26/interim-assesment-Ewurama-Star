/* Reusable Card component */
export default function Card({ children, className = '', dark = false }) {
  const base = dark
    ? 'bg-[#0a0b0d] rounded-3xl overflow-hidden'
    : 'bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100'

  return (
    <div className={`${base} ${className}`}>
      {children}
    </div>
  )
}
