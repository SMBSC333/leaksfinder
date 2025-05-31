'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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
          {/* SECTION 1: Business Basics */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-primary-50 border-l-4 border-primary-500 p-4 mb-6">
                <h3 className="font-bold text-lg mb-1">🧩 Business Basics</h3>
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
            </div>
          )}
          
          {/* SECTION 2: Marketing & Lead Flow */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-primary-50 border-l-4 border-primary-500 p-4 mb-6">
                <h3 className="font-bold text-lg mb-1">📈 Marketing & Lead Flow</h3>
                <p className="text-secondary-700">
                  Let's look at how you attract and track potential customers.
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
            </div>
          )}
          
          {/* SECTION 3: Sales & Follow-Up */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-primary-50 border-l-4 border-primary-500 p-4 mb-6">
                <h3 className="font-bold text-lg mb-1">💬 Sales & Follow-Up</h3>
                <p className="text-secondary-700">
                  Let's explore how you convert leads and maximize customer value.
                </p>
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
              
              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  Do you offer upgrades, add-ons, or upsells after the first sale?
                </label>
                <select 
                  {...register('offerUpsells', { required: 'Please select an option' })}
                  className="input-field"
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="unsure">I'm not sure</option>
                </select>
                {errors.offerUpsells && (
                  <p className="text-red-500 text-sm mt-1">{errors.offerUpsells.message}</p>
                )}
              </div>
            </div>
          )}

          {/* SECTION 4: Profit Potential & Bottlenecks */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="bg-primary-50 border-l-4 border-primary-500 p-4 mb-6">
                <h3 className="font-bold text-lg mb-1">💡 Profit Potential & Bottlenecks</h3>
                <p className="text-secondary-700">
                  Let's identify your biggest opportunities for improvement.
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
                  <option value="match-competitors">I match competitors</option>
                  <option value="cost-plus">I price based on cost + margin</option>
                  <option value="value-based">I base it on value</option>
                  <option value="unsure">I'm not sure</option>
                </select>
                {errors.pricingStrategy && (
                  <p className="text-red-500 text-sm mt-1">{errors.pricingStrategy.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  If you could fix or improve one part of your business right now, what would it be?
                </label>
                <textarea 
                  {...register('biggestImprovement', { 
                    required: 'Please share what you would improve',
                    minLength: { value: 10, message: 'Please provide more detail' }
                  })}
                  className="input-field min-h-[120px]"
                  placeholder="E.g., Getting more leads, improving cash flow, automating follow-ups..."
                ></textarea>
                {errors.biggestImprovement && (
                  <p className="text-red-500 text-sm mt-1">{errors.biggestImprovement.message}</p>
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
