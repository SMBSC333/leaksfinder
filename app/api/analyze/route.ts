import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Extract the form data
    const {
      businessType,
      businessOffering,
      revenue,
      employees,
      leadSources,
      trackingSystem,
      followUpProcess,
      offerUpsells,
      pricingStrategy,
      biggestImprovement
    } = body
    
    // Validate required fields
    if (!businessType || !businessOffering || !revenue || !trackingSystem || !followUpProcess || !biggestImprovement) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Construct the prompt for OpenAI using the Jumpstart 12 methodology
    const prompt = `
      You are a Profit Acceleration Software-certified consultant, skilled at identifying hidden profit leaks in small businesses using the Jumpstart 12 methodology.

      Analyze the following business information and identify 3–5 profit leaks based on the Jumpstart 12 framework:

      1. Business Type: ${businessType}
      2. Business Offering: ${businessOffering}
      3. Annual Revenue: ${revenue}
      4. Team Size: ${employees}
      5. Lead Sources: ${leadSources ? leadSources.join(', ') : 'Not specified'}
      6. Customer Tracking System: ${trackingSystem}
      7. Follow-up Process with Leads: ${followUpProcess}
      8. Offers Upsells/Add-ons: ${offerUpsells}
      9. Pricing Strategy: ${pricingStrategy}
      10. Biggest Desired Improvement: "${biggestImprovement}"

      For each profit leak:
      1. Give it a clear title
      2. Explain why it's a problem and how it's costing the business money
      3. Rate the potential impact: Low, Medium, High, or Critical
      4. Provide 3 actionable steps to fix it

      Also provide:
      - A brief summary of your findings
      - A recommendation for what the business owner should do next

			Added note for tone:
			- Be personable and friendly in your response. Don't say the business owner when referring to the user.

      Respond in this JSON format:
      {
        "summary": "Brief overview of findings",
        "profitLeaks": [
          {
            "title": "Name of the profit leak",
            "description": "Explanation of the issue and its impact",
            "potentialImpact": "Low | Medium | High | Critical",
            "actionableInsights": [
              "Step 1",
              "Step 2",
              "Step 3"
            ]
          }
        ],
        "recommendation": "Next step for the business owner"
      }
    `
    
    // Call the OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an expert business consultant specializing in identifying profit leaks in small businesses." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    })
    
    // Parse the response
    const analysisText = response.choices[0].message.content
    let analysisJson
    
    try {
      // Fix: Add null check for analysisText
      if (!analysisText) {
        throw new Error('No response content received from OpenAI')
      }
      
      // Extract JSON from the response
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        analysisJson = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (error) {
      console.error('Error parsing OpenAI response:', error)
      return NextResponse.json(
        { error: 'Failed to parse analysis results' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(analysisJson)
    
  } catch (error) {
    console.error('Error in analyze route:', error)
    return NextResponse.json(
      { error: 'Failed to process analysis request' },
      { status: 500 }
    )
  }
}
