import { GoogleGenAI } from "@google/genai";

export async function POST ( req ) {
    try {
        // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
        // const model = genAI.getGenerativeModel({ model: "gemini-pro" })
        const { prompt } = await req.json()
        
        // const result = await model.generateContent(prompt)
        // const response = await result.response
        // const output = await response.text()

        // return Response.json({ prompt: output })
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
        });
        return Response.json({ res: response.text })

    } catch (error) {
        console.error('Error in Gemini API:', error);
        return Response.json({ error: 'Failed to get AI response' }, { status: 500 })
    }
    
}