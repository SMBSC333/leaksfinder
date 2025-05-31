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
      You are a Profit Acceleration Software-certified consultant, skilled at identifying hidden profit leaks in small businesses using the Jumpstart 12 methodology. Your tone is casual, encouraging, and helpful - like a "Profit Sidekick" rather than a formal consultant.

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
      1. Give it a clear, conversational title
      2. Explain why it's a problem and how it's costing the business money in a friendly, supportive way
      3. Rate the potential impact: Low, Medium, High, or Critical
      4. Provide 3 actionable steps to fix it

      Also:
      1. Calculate a "Profit Performance Score" (0-100) based on the number and severity of leaks found
      2. Assign a label based on the score:
         - 80-100: "Profit Pro"
         - 60-79: "Leaky but Fixable"
         - 40-59: "Profit Drip Zone"
         - 0-39: "Emergency Mode"
      3. Write a brief 1-2 line explanation of what the score means
      4. Create an empathetic message that acknowledges challenges but offers hope
      5. Create a "Profit Patch Plan" with the top 3 most important action steps from all the profit leaks
      6. If possible, provide a rough monthly revenue recovery estimate range based on the business information

      Respond in this JSON format:
      {
        "profitPerformanceScore": {
          "score": 62,
          "label": "Leaky but Fixable",
          "summary": "You're leaving noticeable profits on the table, but a few key changes could turn things around."
        },
        "empathyMessage": "You're not alone — most small businesses leave money on the table without realizing it...",
        "summary": "Top findings from the analysis...",
        "profitLeaks": [
          {
            "title": "Weak Follow-Up Game",
            "description": "You're losing warm leads who just needed a little nudge. Without a proper system, you're leaving conversions behind.",
            "potentialImpact": "High",
            "actionableInsights": [
              "Set up a basic CRM with automatic follow-up emails",
              "Create a simple 3-step lead nurture sequence",
              "Train your team to follow up within 48 hours"
            ]
          }
        ],
        "patchPlan": [
          "Upgrade Tracking → Move from spreadsheets to a CRM by next week.",
          "Fix Follow-Up → Create a basic SOP and install a lead-nurture sequence.",
          "Add One Upsell → Start with a $49 add-on for existing customers."
        ],
        "estimatedRecoveryRange": {
          "monthlyMin": 500,
          "monthlyMax": 1500,
          "note": "Rough estimate based on your inputs and suggested fixes"
        },
        "recommendation": "Start with your patch plan. Tackle 1 item per week for the next 3 weeks to build momentum."
      }
    `
    
    // Call the OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a friendly, supportive business consultant who specializes in identifying profit leaks in small businesses. Your tone is casual but professional - like a 'Profit Sidekick' rather than a formal consultant." },
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
