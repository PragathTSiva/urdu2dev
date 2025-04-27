"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Copy, RotateCcw } from "lucide-react"
import { translateText } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"

export function Translator() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [isTranslating, setIsTranslating] = useState(false)
  const { toast } = useToast()

  const handleTranslate = async () => {
    if (!inputText.trim()) return

    setIsTranslating(true)
    try {
      const result = await translateText(inputText)
      setOutputText(result)
    } catch (error) {
      toast({
        title: "Translation failed",
        description: "There was an error translating your text. Please try again.",
        variant: "destructive",
      })
      console.error("Translation error:", error)
    } finally {
      setIsTranslating(false)
    }
  }

  const handleCopy = () => {
    if (!outputText) return

    navigator.clipboard.writeText(outputText)
    toast({
      title: "Copied to clipboard",
      description: "The translated text has been copied to your clipboard.",
    })
  }

  const handleReset = () => {
    setInputText("")
    setOutputText("")
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Urdu to Devanagari Translator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="urdu-input" className="text-sm font-medium">
              Urdu Text
            </label>
            <span className="text-xs text-muted-foreground">{inputText.length} characters</span>
          </div>
          <Textarea
            id="urdu-input"
            placeholder="Enter Urdu text here..."
            className="min-h-[120px] font-urdu text-right"
            dir="rtl"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        <div className="flex justify-center">
          <Button onClick={handleTranslate} disabled={!inputText.trim() || isTranslating} className="gap-2">
            <ArrowRight className="h-4 w-4" />
            Transliterate
          </Button>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="devanagari-output" className="text-sm font-medium">
              Devanagari Text
            </label>
            <span className="text-xs text-muted-foreground">{outputText.length} characters</span>
          </div>
          <Textarea
            id="devanagari-output"
            placeholder="Devanagari output will appear here..."
            className="min-h-[120px] font-devanagari"
            readOnly
            value={outputText}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleReset} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
        <Button variant="secondary" onClick={handleCopy} disabled={!outputText} className="gap-2">
          <Copy className="h-4 w-4" />
          Copy
        </Button>
      </CardFooter>
    </Card>
  )
}
