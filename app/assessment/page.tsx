'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type FormData = {
  // Section 1: Business Snapshot
  businessType: string
  businessOffering: string
  revenue: string
  employees: string
  growthPlan: string
  
  // Section 2: Lead Flow & Sales Systems
  leadSources: string[]
  trackingSystem: string
  followUpProcess: string
  
  // Section 3: Pricing, Profit & Value Leaks
  pricingStrategy: string
  profitAwareness: string
  valueAwareness: string
  expenseReview: string
  automationPotential: string
  
  // Section 4: Financial Habits & Exit Awareness
  financialReviewFrequency: string
  cashFlowTracking: string
  businessValuation: string
}

export default function Assessment() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>()
  const [step, setStep] = useState(1)
  const router = useRouter()
  
  const totalSteps = 4
  
  const onSubmit = async (data: FormData) => {
    try {
      // Store the form data in localStorage to use on the results page
      localStorage.setItem('assessmentData', JSON.stringify(data))
      
      // Navigate to the results page
      router.push('/assessment/results')
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }
  
  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))
  
  return (
    <main className="py-12 max-w-3xl mx-auto">
      <Link href="/" className="inline-flex items-center text-primary-600 mb-6 hover:text-primary-700">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>
      
      <div className="card">
        <h1 className="text-3xl font-bold mb-6">Profit Leaks Assessment</h1>
        
        <div className="mb-8">
          <div className="w-full bg-secondary-100 rounded-full h-2.5">
            <div 
              className="bg-primary-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
          <div className="text-right text-sm text-secondary-500 mt-2">Step {step} of {totalSteps}</div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* SECTION 1: Business Snapshot */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-primary-50 border-l-4 border-primary-500 p-4 mb-6">
                <h3 className="font-bold text-lg mb-1">🧩 Business Snapshot</h3>
                <p className="text-secondary-700">
                  Let's start with some fundamental information about your business.
                </p>
              </div>
              
              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  What kind of business do you run?
                </label>
                <select 
                  {...register('businessType', { required: 'Please select your business type' })}
                  className="input-field"
                >
                  <option value="">Select business type</option>
                  <option value="service">Service-based</option>
                  <option value="product">Product-based</option>
                  <option value="brick-mortar">Brick & mortar</option>
                  <option value="online">Online store</option>
                  <option value="consulting">Consulting/Coaching</option>
                  <option value="other">Other</option>
                </select>
                {errors.businessType && (
                  <p className="text-red-500 text-sm mt-1">{errors.businessType.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  What do you sell or offer?
                </label>
                <input 
                  type="text"
                  {...register('businessOffering', { 
                    required: 'Please describe what you sell or offer',
                    minLength: { value: 3, message: 'Please provide more detail' }
                  })}
                  className="input-field"
                  placeholder="E.g., Web design services, handmade jewelry, business coaching..."
                />
                {errors.businessOffering && (
                  <p className="text-red-500 text-sm mt-1">{errors.businessOffering.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  What is your annual revenue?
                </label>
                <select 
                  {...register('revenue', { required: 'Please select your revenue range' })}
                  className="input-field"
                >
                  <option value="">Select revenue range</option>
                  <option value="under100k">Less than $100K</option>
                  <option value="100k-250k">$100K–$250K</option>
                  <option value="250k-500k">$250K–$500K</option>
                  <option value="500k-1m">$500K–$1M</option>
                  <option value="1m-3m">$1M–$3M</option>
                  <option value="3m+">$3M+</option>
                </select>
                {errors.revenue && (
                  <p className="text-red-500 text-sm mt-1">{errors.revenue.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  How many people work in your business (including you)?
                </label>
                <select 
                  {...register('employees', { required: 'Please select your team size' })}
                  className="input-field"
                >
                  <option value="">Select team size</option>
                  <option value="solo">Just me</option>
                  <option value="2-5">2–5</option>
                  <option value="6-10">6–10</option>
                  <option value="11-20">11–20</option>
                  <option value="20+">20+</option>
                </select>
                {errors.employees && (
                  <p className="text-red-500 text-sm mt-1">{errors.employees.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  Are you planning to grow, maintain, or exit your business in the next 2–3 years?
                </label>
                <select 
                  {...register('growthPlan', { required: 'Please select your business plan' })}
                  className="input-field"
                >
                  <option value="">Select your plan</option>
                  <option value="grow">Grow</option>
                  <option value="maintain">Maintain</option>
                  <option value="exit">Exit</option>
                  <option value="unsure">Not sure</option>
                </select>
                {errors.growthPlan && (
                  <p className="text-red-500 text-sm mt-1">{errors.growthPlan.message}</p>
                )}
              </div>
            </div>
          )}
          
          {/* SECTION 2: Lead Flow & Sales Systems */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-primary-50 border-l-4 border-primary-500 p-4 mb-6">
                <h3 className="font-bold text-lg mb-1">📈 Lead Flow & Sales Systems</h3>
                <p className="text-secondary-700">
                  Let's look at how you attract and convert potential customers.
                </p>
              </div>
              
              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  Where do most of your leads/customers come from? (Select all that apply)
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="referrals" 
                      value="referrals"
                      {...register('leadSources')}
                      className="h-5 w-5 text-primary-600 rounded"
                    />
                    <label htmlFor="referrals" className="ml-2">Referrals</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="walk-ins" 
                      value="walk-ins"
                      {...register('leadSources')}
                      className="h-5 w-5 text-primary-600 rounded"
                    />
                    <label htmlFor="walk-ins" className="ml-2">Walk-ins</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="social-media" 
                      value="social-media"
                      {...register('leadSources')}
                      className="h-5 w-5 text-primary-600 rounded"
                    />
                    <label htmlFor="social-media" className="ml-2">Social media</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="paid-ads" 
                      value="paid-ads"
                      {...register('leadSources')}
                      className="h-5 w-5 text-primary-600 rounded"
                    />
                    <label htmlFor="paid-ads" className="ml-2">Paid ads</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="google-search" 
                      value="google-search"
                      {...register('leadSources')}
                      className="h-5 w-5 text-primary-600 rounded"
                    />
                    <label htmlFor="google-search" className="ml-2">Google search</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="networking" 
                      value="networking"
                      {...register('leadSources')}
                      className="h-5 w-5 text-primary-600 rounded"
                    />
                    <label htmlFor="networking" className="ml-2">Networking</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="email-marketing" 
                      value="email-marketing"
                      {...register('leadSources')}
                      className="h-5 w-5 text-primary-600 rounded"
                    />
                    <label htmlFor="email-marketing" className="ml-2">Email marketing</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="other-source" 
                      value="other-source"
                      {...register('leadSources')}
                      className="h-5 w-5 text-primary-600 rounded"
                    />
                    <label htmlFor="other-source" className="ml-2">Other</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  How do you track leads and customers?
                </label>
                <select 
                  {...register('trackingSystem', { required: 'Please select your tracking method' })}
                  className="input-field"
                >
                  <option value="">Select tracking method</option>
                  <option value="crm">CRM</option>
                  <option value="spreadsheet">Spreadsheet</option>
                  <option value="paper">Paper/Notebook</option>
                  <option value="none">I don't track them</option>
                  <option value="other">Other</option>
                </select>
                {errors.trackingSystem && (
                  <p className="text-red-500 text-sm mt-1">{errors.trackingSystem.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  Do you follow up with leads who don't buy right away?
                </label>
                <select 
                  {...register('followUpProcess', { required: 'Please select your follow-up approach' })}
                  className="input-field"
                >
                  <option value="">Select follow-up approach</option>
                  <option value="manual">Yes – manually</option>
                  <option value="automated">Yes – automated</option>
                  <option value="no">No</option>
                  <option value="unsure">Not sure</option>
                </select>
                {errors.followUpProcess && (
                  <p className="text-red-500 text-sm mt-1">{errors.followUpProcess.message}</p>
                )}
              </div>
            </div>
          )}
          
          {/* SECTION 3: Pricing, Profit & Value Leaks */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-primary-50 border-l-4 border-primary-500 p-4 mb-6">
                <h3 className="font-bold text-lg mb-1">💰 Pricing, Profit & Value Leaks</h3>
                <p className="text-secondary-700">
                  Let's explore how you price your offerings and manage profitability.
                </p>
              </div>
              
              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  How do you decide what to charge for your products or services?
                </label>
                <select 
                  {...register('pricingStrategy', { required: 'Please select your pricing approach' })}
                  className="input-field"
                >
                  <option value="">Select pricing approach</option>
                  <option value="match-competitors">Match competitors</option>
                  <option value="cost-plus">Cost + margin</option>
                  <option value="value-based">Value-based pricing</option>
                  <option value="unsure">I'm not sure</option>
                </select>
                {errors.pricingStrategy && (
                  <p className="text-red-500 text-sm mt-1">{errors.pricingStrategy.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  Do you know which products or services bring in the most profit (not just revenue)?
                </label>
                <select 
                  {...register('profitAwareness', { required: 'Please select an option' })}
                  className="input-field"
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="kind-of">Kind of</option>
                  <option value="no">No</option>
                </select>
                {errors.profitAwareness && (
                  <p className="text-red-500 text-sm mt-1">{errors.profitAwareness.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  Do you know the real value your product or service creates for your customer?
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="value-yes" 
                      value="yes"
                      {...register('valueAwareness', { required: 'Please select an option' })}
                      className="h-5 w-5 text-primary-600"
                    />
                    <label htmlFor="value-yes" className="ml-2">Yes — I can clearly describe it</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="value-somewhat" 
                      value="somewhat"
                      {...register('valueAwareness', { required: 'Please select an option' })}
                      className="h-5 w-5 text-primary-600"
                    />
                    <label htmlFor="value-somewhat" className="ml-2">Somewhat — I focus more on features or deliverables</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="value-not-really" 
                      value="not-really"
                      {...register('valueAwareness', { required: 'Please select an option' })}
                      className="h-5 w-5 text-primary-600"
                    />
                    <label htmlFor="value-not-really" className="ml-2">Not really — I think we're undercharging</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="value-never" 
                      value="never"
                      {...register('valueAwareness', { required: 'Please select an option' })}
                      className="h-5 w-5 text-primary-600"
                    />
                    <label htmlFor="value-never" className="ml-2">I've never thought about it</label>
                  </div>
                </div>
                {errors.valueAwareness && (
                  <p className="text-red-500 text-sm mt-1">{errors.valueAwareness.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  When was the last time you reviewed or cut unnecessary expenses?
                </label>
                <select 
                  {...register('expenseReview', { required: 'Please select an option' })}
                  className="input-field"
                >
                  <option value="">Select an option</option>
                  <option value="this-month">This month</option>
                  <option value="last-6-months">Last 6 months</option>
                  <option value="over-6-months">Over 6 months ago</option>
                  <option value="never">I don't really do that</option>
                </select>
                {errors.expenseReview && (
                  <p className="text-red-500 text-sm mt-1">{errors.expenseReview.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  Are there tasks or roles in your business that could be outsourced or automated to save time or payroll?
                </label>
                <select 
                  {...register('automationPotential', { required: 'Please select an option' })}
                  className="input-field"
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="maybe">Maybe</option>
                  <option value="no">No</option>
                  <option value="unsure">Not sure</option>
                </select>
                {errors.automationPotential && (
                  <p className="text-red-500 text-sm mt-1">{errors.automationPotential.message}</p>
                )}
              </div>
            </div>
          )}

          {/* SECTION 4: Financial Habits & Exit Awareness */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="bg-primary-50 border-l-4 border-primary-500 p-4 mb-6">
                <h3 className="font-bold text-lg mb-1">📉 Financial Habits & Exit Awareness</h3>
                <p className="text-secondary-700">
                  Let's explore your financial management practices and long-term planning.
                </p>
              </div>
              
              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  How often do you review your financial reports (P&L, cash flow, balance sheet)?
                </label>
                <select 
                  {...register('financialReviewFrequency', { required: 'Please select an option' })}
                  className="input-field"
                >
                  <option value="">Select an option</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="rarely">Rarely or never</option>
                </select>
                {errors.financialReviewFrequency && (
                  <p className="text-red-500 text-sm mt-1">{errors.financialReviewFrequency.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  Do you currently track cash flow separately from your profit or revenue?
                </label>
                <select 
                  {...register('cashFlowTracking', { required: 'Please select an option' })}
                  className="input-field"
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="unsure">I don't know the difference</option>
                </select>
                {errors.cashFlowTracking && (
                  <p className="text-red-500 text-sm mt-1">{errors.cashFlowTracking.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  If someone offered to buy your business today, would you know what it's worth?
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="valuation-yes" 
                      value="yes"
                      {...register('businessValuation', { required: 'Please select an option' })}
                      className="h-5 w-5 text-primary-600"
                    />
                    <label htmlFor="valuation-yes" className="ml-2">Yes, I have a strong idea</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="valuation-kind-of" 
                      value="kind-of"
                      {...register('businessValuation', { required: 'Please select an option' })}
                      className="h-5 w-5 text-primary-600"
                    />
                    <label htmlFor="valuation-kind-of" className="ml-2">Kind of, but I'd need help</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="valuation-no" 
                      value="no"
                      {...register('businessValuation', { required: 'Please select an option' })}
                      className="h-5 w-5 text-primary-600"
                    />
                    <label htmlFor="valuation-no" className="ml-2">No clue</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="valuation-never" 
                      value="never"
                      {...register('businessValuation', { required: 'Please select an option' })}
                      className="h-5 w-5 text-primary-600"
                    />
                    <label htmlFor="valuation-never" className="ml-2">I've never thought about it</label>
                  </div>
                </div>
                {errors.businessValuation && (
                  <p className="text-red-500 text-sm mt-1">{errors.businessValuation.message}</p>
                )}
              </div>
            </div>
          )}
          
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button 
                type="button" 
                onClick={prevStep}
                className="btn btn-secondary"
              >
                Previous
              </button>
            ) : (
              <div></div>
            )}
            
            {step < totalSteps ? (
              <button 
                type="button" 
                onClick={nextStep}
                className="btn btn-primary"
              >
                Next
              </button>
            ) : (
              <button 
                type="submit" 
                className="btn btn-accent"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Analyzing...' : 'Get Your Results'}
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  )
}
