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
      revenue,
      employees,
      marketingChannels,
      trackingSystem,
      followUpProcess,
      biggestChallenge,
      jumpstart12Answers
    } = body
    
    // Validate required fields
    if (!businessType || !revenue || !trackingSystem || !followUpProcess || !biggestChallenge) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Determine which prompt to use based on whether we have Jumpstart 12 answers
    let prompt = ''
    
    if (jumpstart12Answers && jumpstart12Answers.length > 50) {
      // Use the enhanced Jumpstart 12 prompt
      prompt = `
        You are a Profit Acceleration Software-certified consultant, skilled at identifying hidden profit leaks in small businesses using the Jumpstart 12 methodology.

        Analyze the following business information and identify 3–5 profit leaks based on the Jumpstart 12 framework:

        ${jumpstart12Answers}

        For each profit leak:
        1. Give it a clear title
        2. Explain why it's a problem and how it's costing the business money
        3. Rate the potential impact: Low, Medium, High, or Critical
        4. Provide 3 actionable steps to fix it

        Also provide:
        - A brief summary of your findings
        - A recommendation for what the business owner should do next

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
    } else {
      // Use the original prompt
      prompt = `
        You are an expert business consultant specializing in identifying profit leaks in small businesses with the Profit Accelerator Software framework.
        Right now, I want you to think about their Jumpstart 12 and focus your responses on how they can address these profit leaks.
        
        Analyze the following business information and identify 3-5 key areas where this business is likely losing money or missing profit opportunities:
        
        Business Type: ${businessType}
        Annual Revenue: ${revenue}
        Number of Employees: ${employees}
        Marketing Channels Used: ${marketingChannels ? marketingChannels.join(', ') : 'None specified'}
        Lead/Customer Tracking System: ${trackingSystem}
        Follow-up Process: ${followUpProcess}
        Biggest Business Challenge: "${biggestChallenge}"
        
        For each profit leak identified:
        1. Provide a clear title
        2. Explain why it's a problem and how it's likely affecting their business
        3. Rate the potential impact as Low, Medium, High, or Critical
        
        Also provide:
        - A brief summary of your findings
        - A recommendation for next steps
        
        Format your response as JSON with the following structure:
        {
          "summary": "Brief overview of findings",
          "profitLeaks": [
            {
              "title": "Name of the profit leak",
              "description": "Detailed explanation",
              "potentialImpact": "Impact level"
            }
          ],
          "recommendation": "Suggested next steps"
        }
      `
    }
    
    // In a real implementation, you would call the OpenAI API here
    // For this example, we'll simulate the response in the client
    // to avoid requiring an actual API key
    
    return NextResponse.json({ 
      success: true,
      message: 'Analysis request received. In a production environment, this would call the OpenAI API.'
    })
    
    /* Commented out actual OpenAI implementation:
    
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
    */
    
  } catch (error) {
    console.error('Error in analyze route:', error)
    return NextResponse.json(
      { error: 'Failed to process analysis request' },
      { status: 500 }
    )
  }
}
