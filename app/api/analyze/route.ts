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
      biggestChallenge
    } = body
    
    // Validate required fields
    if (!businessType || !revenue || !trackingSystem || !followUpProcess || !biggestChallenge) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Construct the prompt for OpenAI
    const prompt = `
      You are an expert business consultant specializing in identifying profit leaks in small businesses.
			You're following the Profit Acceleration Software method here, so make sure that you tailor your responses to the Jumpstart 12.
      
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
