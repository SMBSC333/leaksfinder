'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type FormData = {
  businessType: string
  revenue: string
  employees: string
  marketingChannels: string[]
  trackingSystem: string
  followUpProcess: string
  biggestChallenge: string
  jumpstart12Answers: string
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
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  What type of business do you operate?
                </label>
                <select 
                  {...register('businessType', { required: 'Please select your business type' })}
                  className="input-field"
                >
                  <option value="">Select business type</option>
                  <option value="service">Service-based Business</option>
                  <option value="retail">Retail/E-commerce</option>
                  <option value="trades">Trades/Construction</option>
                  <option value="medical">Medical/Healthcare</option>
                  <option value="hospitality">Hospitality/Restaurant</option>
                  <option value="professional">Professional Services</option>
                  <option value="other">Other</option>
                </select>
                {errors.businessType && (
                  <p className="text-red-500 text-sm mt-1">{errors.businessType.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  What is your approximate annual revenue?
                </label>
                <select 
                  {...register('revenue', { required: 'Please select your revenue range' })}
                  className="input-field"
                >
                  <option value="">Select revenue range</option>
                  <option value="under100k">Under $100,000</option>
                  <option value="100k-500k">$100,000 - $500,000</option>
                  <option value="500k-1m">$500,000 - $1 million</option>
                  <option value="1m-5m">$1 million - $5 million</option>
                  <option value="over5m">Over $5 million</option>
                </select>
                {errors.revenue && (
                  <p className="text-red-500 text-sm mt-1">{errors.revenue.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  How many employees do you have?
                </label>
                <select 
                  {...register('employees', { required: 'Please select your team size' })}
                  className="input-field"
                >
                  <option value="">Select team size</option>
                  <option value="solo">Just me (solopreneur)</option>
                  <option value="2-5">2-5 employees</option>
                  <option value="6-15">6-15 employees</option>
                  <option value="16-50">16-50 employees</option>
                  <option value="50+">More than 50 employees</option>
                </select>
                {errors.employees && (
                  <p className="text-red-500 text-sm mt-1">{errors.employees.message}</p>
                )}
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  Which marketing channels do you currently use? (Select all that apply)
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="social-media" 
                      value="social-media"
                      {...register('marketingChannels')}
                      className="h-5 w-5 text-primary-600 rounded"
                    />
                    <label htmlFor="social-media" className="ml-2">Social Media</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="paid-ads" 
                      value="paid-ads"
                      {...register('marketingChannels')}
                      className="h-5 w-5 text-primary-600 rounded"
                    />
                    <label htmlFor="paid-ads" className="ml-2">Paid Advertising</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="email" 
                      value="email"
                      {...register('marketingChannels')}
                      className="h-5 w-5 text-primary-600 rounded"
                    />
                    <label htmlFor="email" className="ml-2">Email Marketing</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="seo" 
                      value="seo"
                      {...register('marketingChannels')}
                      className="h-5 w-5 text-primary-600 rounded"
                    />
                    <label htmlFor="seo" className="ml-2">SEO/Content Marketing</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="word-of-mouth" 
                      value="word-of-mouth"
                      {...register('marketingChannels')}
                      className="h-5 w-5 text-primary-600 rounded"
                    />
                    <label htmlFor="word-of-mouth" className="ml-2">Word of Mouth/Referrals</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="traditional" 
                      value="traditional"
                      {...register('marketingChannels')}
                      className="h-5 w-5 text-primary-600 rounded"
                    />
                    <label htmlFor="traditional" className="ml-2">Traditional Advertising (Print, Radio, TV)</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  How do you currently track leads and customer interactions?
                </label>
                <select 
                  {...register('trackingSystem', { required: 'Please select your tracking method' })}
                  className="input-field"
                >
                  <option value="">Select tracking method</option>
                  <option value="crm">CRM software</option>
                  <option value="spreadsheets">Spreadsheets</option>
                  <option value="email">Email inbox</option>
                  <option value="paper">Paper notes/files</option>
                  <option value="memory">Mental tracking/memory</option>
                  <option value="none">No formal tracking system</option>
                </select>
                {errors.trackingSystem && (
                  <p className="text-red-500 text-sm mt-1">{errors.trackingSystem.message}</p>
                )}
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  How would you describe your follow-up process with leads and customers?
                </label>
                <select 
                  {...register('followUpProcess', { required: 'Please select your follow-up process' })}
                  className="input-field"
                >
                  <option value="">Select follow-up process</option>
                  <option value="automated">Fully automated system</option>
                  <option value="semi-automated">Semi-automated (some manual, some automated)</option>
                  <option value="manual-consistent">Manual but consistent process</option>
                  <option value="manual-inconsistent">Manual and somewhat inconsistent</option>
                  <option value="reactive">Reactive (only when customers reach out)</option>
                  <option value="none">No formal follow-up process</option>
                </select>
                {errors.followUpProcess && (
                  <p className="text-red-500 text-sm mt-1">{errors.followUpProcess.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  What's your biggest business challenge right now?
                </label>
                <textarea 
                  {...register('biggestChallenge', { 
                    required: 'Please share your biggest business challenge',
                    minLength: { value: 10, message: 'Please provide more detail' }
                  })}
                  className="input-field min-h-[120px]"
                  placeholder="E.g., Finding new customers, managing cash flow, scaling operations..."
                ></textarea>
                {errors.biggestChallenge && (
                  <p className="text-red-500 text-sm mt-1">{errors.biggestChallenge.message}</p>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="bg-primary-50 border-l-4 border-primary-500 p-4 mb-6">
                <h3 className="font-bold text-lg mb-2">Jumpstart 12 Framework</h3>
                <p className="text-secondary-700">
                  To help uncover hidden profit leaks in your business and suggest ways to fix them, please answer these 12 quick questions below.
                </p>
              </div>
              
              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  Your Detailed Business Information
                </label>
                <textarea 
                  {...register('jumpstart12Answers', { 
                    required: 'Please answer the Jumpstart 12 questions',
                    minLength: { value: 50, message: 'Please provide more detailed answers' }
                  })}
                  className="input-field min-h-[400px]"
                  placeholder={`Please answer each question below:

1. What type of business do you run?  
2. What is your annual revenue (rough estimate is fine)?  
3. How many people work in your business (including you)?  
4. Where do most of your leads or customers come from?  
5. How do you keep track of leads and customers (CRM, spreadsheet, notebook, etc.)?  
6. Do you follow up with leads who don't buy right away? If yes, how?  
7. What's the biggest challenge your business is facing right now?  
8. What happens after someone buys from you? Do they buy again?  
9. Do you offer any add-ons, upgrades, or other services after the first sale?  
10. Do you get referrals from happy customers? How do you encourage them?  
11. How do you decide what to charge for your products/services?  
12. What's one thing you wish you could improve or automate in your business?`}
                ></textarea>
                {errors.jumpstart12Answers && (
                  <p className="text-red-500 text-sm mt-1">{errors.jumpstart12Answers.message}</p>
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
