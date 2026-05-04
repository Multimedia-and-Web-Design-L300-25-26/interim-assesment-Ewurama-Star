/* Reusable Button component with multiple variants */
export default function Button({ children, variant = 'primary', size = 'md', onClick, type = 'button', className = '', disabled = false }) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-full transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'text-white bg-blue-600 hover:bg-blue-700',
    dark: 'text-white bg-gray-900 hover:bg-gray-800',
    outline: 'text-gray-900 border border-gray-300 bg-white hover:bg-gray-50',
    ghost: 'text-gray-700 hover:bg-gray-100',
  }

  const sizes = {
    sm: 'px-4 py-2 text-[14px]',
    md: 'px-6 py-3 text-[16px]',
    lg: 'px-8 py-4 text-[17px]',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  )
}
