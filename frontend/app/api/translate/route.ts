import { type NextRequest, NextResponse } from "next/server"
import { translateText } from "@/app/actions"

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    const translatedText = await translateText(text)

    return NextResponse.json({
      success: true,
      result: translatedText,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to process translation" }, { status: 500 })
  }
}
