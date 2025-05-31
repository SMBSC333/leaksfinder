import Link from 'next/link'

export default function Header() {
  return (
    <header className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-600">Profit Leaks Finder</span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-secondary-600 hover:text-secondary-900">
              Home
            </Link>
            <Link href="/assessment" className="text-secondary-600 hover:text-secondary-900">
              Assessment
            </Link>
            <a 
              href="https://calendly.com/your-booking-link" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-secondary-600 hover:text-secondary-900"
            >
              Book a Call
            </a>
          </nav>
          <div className="md:hidden">
            <button className="text-secondary-500 hover:text-secondary-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
