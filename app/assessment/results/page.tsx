'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

type FormData = {
  businessType: string
  revenue: string
  employees: string
  marketingChannels: string[]
  trackingSystem: string
  followUpProcess: string
  biggestChallenge: string
  jumpstart12Answers?: string
}

type ProfitLeak = {
  title: string
  description: string
  potentialImpact: string
  actionableInsights?: string[]
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
    
    // Simulate API call to OpenAI
    const analyzeData = async () => {
      try {
        setLoading(true)
        
        // In a real implementation, this would be an API call to your backend
        // which would then call the OpenAI API
        // For demo purposes, we'll simulate a response after a delay
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Generate a simulated analysis based on the form data
        const analysis = generateAnalysis(parsedData)
        setResults(analysis)
      } catch (error) {
        console.error('Error analyzing data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    analyzeData()
  }, [router])
  
  // This function simulates what would normally be done by the OpenAI API
  const generateAnalysis = (data: FormData): AnalysisResult => {
    // Map business type to readable format
    const businessTypeMap: Record<string, string> = {
      'service': 'service-based business',
      'retail': 'retail/e-commerce business',
      'trades': 'trades/construction business',
      'medical': 'medical/healthcare practice',
      'hospitality': 'hospitality/restaurant business',
      'professional': 'professional services firm',
      'other': 'business'
    }
    
    const businessTypeReadable = businessTypeMap[data.businessType] || 'business'
    
    // Generate profit leaks based on form data
    const profitLeaks: ProfitLeak[] = []
    
    // Check if we have Jumpstart 12 answers
    const hasDetailedAnswers = data.jumpstart12Answers && data.jumpstart12Answers.length > 50
    
    // Check tracking system
    if (['spreadsheets', 'email', 'paper', 'memory', 'none'].includes(data.trackingSystem)) {
      const leak: ProfitLeak = {
        title: 'Inadequate Lead & Customer Tracking',
        description: `Your ${data.trackingSystem === 'none' ? 'lack of a' : data.trackingSystem} tracking system is likely causing leads to fall through the cracks. Without a robust CRM, you're probably missing follow-up opportunities and losing potential revenue.`,
        potentialImpact: 'High'
      }
      
      // Add actionable insights if we have detailed answers
      if (hasDetailedAnswers) {
        leak.actionableInsights = [
          'Implement a simple CRM system designed for your business size and type',
          'Create a standardized process for entering all new leads and contacts',
          'Schedule weekly time to review your pipeline and identify stalled opportunities'
        ]
      }
      
      profitLeaks.push(leak)
    }
    
    // Check follow-up process
    if (['manual-inconsistent', 'reactive', 'none'].includes(data.followUpProcess)) {
      const leak: ProfitLeak = {
        title: 'Inconsistent Follow-Up Process',
        description: 'Your current follow-up approach is reactive or inconsistent, which typically results in lost sales opportunities. Systematic follow-up can increase conversion rates by 30-50%.',
        potentialImpact: 'High'
      }
      
      if (hasDetailedAnswers) {
        leak.actionableInsights = [
          'Create a standardized follow-up sequence with specific timing',
          'Develop email or message templates for common follow-up scenarios',
          'Set up automated reminders to ensure consistent follow-up execution'
        ]
      }
      
      profitLeaks.push(leak)
    }
    
    // Check marketing channels
    if (!data.marketingChannels || data.marketingChannels.length < 3) {
      const leak: ProfitLeak = {
        title: 'Limited Marketing Channels',
        description: 'You\'re relying on too few marketing channels, which limits your reach and makes your business vulnerable to changes in any single platform or method.',
        potentialImpact: 'Medium'
      }
      
      if (hasDetailedAnswers) {
        leak.actionableInsights = [
          'Identify 2-3 new marketing channels that align with your target audience',
          'Start with small tests on each new channel before scaling investment',
          'Create a simple tracking system to measure which channels produce the best ROI'
        ]
      }
      
      profitLeaks.push(leak)
    }
    
    // Check team size vs. revenue for efficiency
    if (
      (data.revenue === 'under100k' && data.employees === '6-15') ||
      (data.revenue === '100k-500k' && data.employees === '16-50') ||
      (data.revenue === '500k-1m' && data.employees === '50+')
    ) {
      const leak: ProfitLeak = {
        title: 'Operational Inefficiency',
        description: 'Your employee count seems high relative to your revenue, suggesting possible operational inefficiencies or underutilization of staff resources.',
        potentialImpact: 'High'
      }
      
      if (hasDetailedAnswers) {
        leak.actionableInsights = [
          'Conduct a workflow audit to identify bottlenecks and redundancies',
          'Implement time tracking to understand where employee hours are being spent',
          'Consider automation tools for repetitive administrative tasks'
        ]
      }
      
      profitLeaks.push(leak)
    }
    
    // Add a leak based on their biggest challenge
    if (data.biggestChallenge.toLowerCase().includes('customer') || data.biggestChallenge.toLowerCase().includes('lead')) {
      const leak: ProfitLeak = {
        title: 'Customer Acquisition Challenges',
        description: 'Your biggest challenge involves finding or converting customers, which often indicates issues with your marketing messaging, targeting, or sales process.',
        potentialImpact: 'High'
      }
      
      if (hasDetailedAnswers) {
        leak.actionableInsights = [
          'Revisit your ideal customer profile and ensure your messaging speaks directly to their needs',
          'Analyze your sales conversion process to identify where prospects are dropping off',
          'Test different value propositions to see which resonates most with your target market'
        ]
      }
      
      profitLeaks.push(leak)
    } else if (data.biggestChallenge.toLowerCase().includes('cash') || data.biggestChallenge.toLowerCase().includes('finance')) {
      const leak: ProfitLeak = {
        title: 'Cash Flow Management Issues',
        description: 'Your cash flow challenges may be stemming from inconsistent invoicing, lack of financial forecasting, or insufficient profit margins on your products/services.',
        potentialImpact: 'Critical'
      }
      
      if (hasDetailedAnswers) {
        leak.actionableInsights = [
          'Implement a weekly cash flow forecasting process',
          'Review your pricing strategy and consider increases where value justifies it',
          'Analyze payment terms and consider incentives for early payment'
        ]
      }
      
      profitLeaks.push(leak)
    } else if (data.biggestChallenge.toLowerCase().includes('time') || data.biggestChallenge.toLowerCase().includes('busy')) {
      const leak: ProfitLeak = {
        title: 'Time Management & Delegation Gaps',
        description: 'You\'re likely spending too much time on low-value activities that could be automated, delegated, or eliminated, preventing you from focusing on growth.',
        potentialImpact: 'Medium'
      }
      
      if (hasDetailedAnswers) {
        leak.actionableInsights = [
          'Track your time for one week to identify where your hours are going',
          'Create standard operating procedures (SOPs) for recurring tasks',
          'Identify your highest-value activities and block time for them first'
        ]
      }
      
      profitLeaks.push(leak)
    }
    
    // If we don't have enough leaks yet, add some general ones
    if (profitLeaks.length < 3) {
      const leak: ProfitLeak = {
        title: 'Untapped Customer Value',
        description: 'Most businesses fail to maximize revenue from existing customers. You may be missing opportunities for upsells, cross-sells, or implementing a systematic referral program.',
        potentialImpact: 'Medium'
      }
      
      if (hasDetailedAnswers) {
        leak.actionableInsights = [
          'Map your customer journey to identify natural upsell/cross-sell opportunities',
          'Create a formal referral program with incentives for both parties',
          'Segment your customer base and develop targeted offers for each segment'
        ]
      }
      
      profitLeaks.push(leak)
      
      if (profitLeaks.length < 3) {
        const pricingLeak: ProfitLeak = {
          title: 'Pricing Strategy Weaknesses',
          description: 'Many small businesses underprice their offerings or fail to communicate value effectively, leaving significant profit on the table with each transaction.',
          potentialImpact: 'Medium'
        }
        
        if (hasDetailedAnswers) {
          pricingLeak.actionableInsights = [
            'Conduct a competitive pricing analysis in your market',
            'Test a 10-15% price increase on select offerings and measure the response',
            'Enhance your value communication to justify premium pricing'
          ]
        }
        
        profitLeaks.push(pricingLeak)
      }
    }
    
    // Limit to 3-5 leaks
    const finalProfitLeaks = profitLeaks.slice(0, Math.min(5, Math.max(3, profitLeaks.length)))
    
    return {
      summary: `Based on your assessment, we've identified ${finalProfitLeaks.length} key areas where your ${businessTypeReadable} is likely leaving money on the table. Addressing these profit leaks could significantly improve your bottom line.`,
      profitLeaks: finalProfitLeaks,
      recommendation: 'To dive deeper into these profit leaks and develop a customized action plan, we recommend scheduling a free strategy session with our business optimization experts.'
    }
  }
  
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
  
  if (!results) {
    return (
      <main className="py-12 max-w-3xl mx-auto">
        <div className="card text-center py-16">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold mb-4">Something Went Wrong</h2>
          <p className="text-secondary-600 mb-8">
            We couldn't generate your analysis. Please try again.
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
