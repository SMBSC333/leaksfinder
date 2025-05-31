'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

type FormData = {
  // Section 1: Business Basics
  businessType: string
  businessOffering: string
  revenue: string
  employees: string
  
  // Section 2: Marketing & Lead Flow
  leadSources: string[]
  trackingSystem: string
  
  // Section 3: Sales & Follow-Up
  followUpProcess: string
  offerUpsells: string
  
  // Section 4: Profit Potential & Bottlenecks
  pricingStrategy: string
  biggestImprovement: string
}

type ProfitLeak = {
  title: string
  description: string
  potentialImpact: string
  actionableInsights: string[]
}

type AnalysisResult = {
  summary: string
  profitLeaks: ProfitLeak[]
  recommendation: string
}

export default function Results() {
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<FormData | null>(null)
  const [results, setResults] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Get the form data from localStorage
    const storedData = localStorage.getItem('assessmentData')
    
    if (!storedData) {
      // If no data is found, redirect back to the assessment
      router.push('/assessment')
      return
    }
    
    const parsedData = JSON.parse(storedData) as FormData
    setFormData(parsedData)
    
    // Call the API to analyze the data
    const analyzeData = async () => {
      try {
        setLoading(true)
        
        // Call our API route
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(parsedData),
        })
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to analyze data')
        }
        
        const data = await response.json()
        setResults(data)
      } catch (error) {
        console.error('Error analyzing data:', error)
        setError(error instanceof Error ? error.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }
    
    analyzeData()
  }, [router])
  
  if (loading) {
    return (
      <main className="py-12 max-w-3xl mx-auto">
        <div className="card text-center py-16">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-8"></div>
          <h2 className="text-2xl font-bold mb-4">Analyzing Your Business...</h2>
          <p className="text-secondary-600">
            Our AI is identifying potential profit leaks based on your responses.
            This will only take a moment.
          </p>
        </div>
      </main>
    )
  }
  
  if (error || !results) {
    return (
      <main className="py-12 max-w-3xl mx-auto">
        <div className="card text-center py-16">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold mb-4">Something Went Wrong</h2>
          <p className="text-secondary-600 mb-8">
            {error || "We couldn't generate your analysis. Please try again."}
          </p>
          <Link href="/assessment" className="btn btn-primary">
            Restart Assessment
          </Link>
        </div>
      </main>
    )
  }
  
  return (
    <main className="py-12 max-w-3xl mx-auto">
      <Link href="/" className="inline-flex items-center text-primary-600 mb-6 hover:text-primary-700">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card mb-8"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="bg-primary-100 rounded-full p-3">
            <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mb-6">Your Profit Leaks Analysis</h1>
        <div className="bg-primary-50 border-l-4 border-primary-500 p-4 mb-6">
          <p className="text-lg">{results.summary}</p>
        </div>
      </motion.div>
      
      <h2 className="text-2xl font-bold mb-4">Key Profit Leaks Identified:</h2>
      
      <div className="space-y-6 mb-8">
        {results.profitLeaks.map((leak, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="card border-l-4 border-accent-500"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold">{leak.title}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                leak.potentialImpact === 'High' || leak.potentialImpact === 'Critical' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {leak.potentialImpact} Impact
              </span>
            </div>
            <p className="text-secondary-700 mb-4">{leak.description}</p>
            
            {leak.actionableInsights && (
              <div className="mt-4">
                <h4 className="font-semibold text-secondary-800 mb-2">How to Fix This:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {leak.actionableInsights.map((insight, i) => (
                    <li key={i} className="text-secondary-700">{insight}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-accent-50 rounded-xl p-8 border border-accent-200 text-center mb-8"
      >
        <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
        <p className="text-lg mb-6">{results.recommendation}</p>
        <a 
          href="https://calendly.com/your-booking-link" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-accent text-lg"
        >
          Book Your Free Strategy Session
        </a>
      </motion.div>
      
      <div className="text-center">
        <p className="text-secondary-500 mb-4">Want to share this analysis with a colleague?</p>
        <button 
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'My Profit Leaks Analysis',
                text: 'Check out the profit leaks identified in my business',
                url: window.location.href,
              })
            } else {
              // Fallback - copy to clipboard
              navigator.clipboard.writeText(window.location.href)
              alert('Link copied to clipboard!')
            }
          }}
          className="btn btn-secondary"
        >
          Share Results
        </button>
      </div>
    </main>
  )
}
