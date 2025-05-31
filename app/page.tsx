import Link from 'next/link'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Profit Leaks Finder | Where\'s the Money Hiding?',
  description: 'Discover hidden profit leaks in your small business operations with our AI-powered analysis tool.',
}

export default function Home() {
  return (
    <main className="py-12 md:py-20">
      <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6">
            Where&apos;s Your Money <span className="text-primary-600">Hiding?</span>
          </h1>
          <p className="text-xl text-secondary-600 mb-8 max-w-2xl">
            Our AI-powered tool helps small business owners identify hidden profit leaks in their operations. 
            Get actionable insights in minutes, not months.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/assessment" className="btn btn-primary text-lg">
              Find Your Profit Leaks
            </Link>
            <Link href="#how-it-works" className="btn btn-secondary text-lg">
              Learn How It Works
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <div className="relative h-[400px] w-full">
            <Image 
              src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg" 
              alt="Business owner analyzing finances"
              fill
              className="object-cover rounded-xl shadow-xl"
              priority
            />
          </div>
        </div>
      </div>

      <section id="how-it-works" className="py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">1</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Answer a Few Questions</h3>
            <p className="text-secondary-600">
              Complete our short, high-leverage assessment about your business operations.
            </p>
          </div>
          <div className="card text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">2</span>
            </div>
            <h3 className="text-xl font-bold mb-3">AI Analysis</h3>
            <p className="text-secondary-600">
              Our AI engine analyzes your responses to identify where money might be leaking from your business.
            </p>
          </div>
          <div className="card text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">3</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Get Actionable Insights</h3>
            <p className="text-secondary-600">
              Receive a custom analysis with 3-5 key areas to optimize for immediate profit improvement.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white rounded-2xl shadow-lg p-8 mb-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Who This Is For</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Small business owners (service-based, local, trades, medical, etc.)</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Entrepreneurs overwhelmed by day-to-day operations</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Business owners without clear visibility into where money is being lost</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Companies with inefficiencies, missed follow-ups, or poor tracking systems</span>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <div className="relative h-[300px] w-full">
              <Image 
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg" 
                alt="Small business team"
                fill
                className="object-cover rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="text-center py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Hidden Profits?</h2>
        <p className="text-xl text-secondary-600 mb-8 max-w-2xl mx-auto">
          It takes just 3 minutes to complete our assessment and get your custom profit leaks analysis.
        </p>
        <Link href="/assessment" className="btn btn-accent text-lg">
          Start Your Free Assessment
        </Link>
      </section>
    </main>
  )
}
