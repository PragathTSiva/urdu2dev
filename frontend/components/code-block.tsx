"use client"

import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CodeBlock() {
  const { toast } = useToast()

  const embedCode = `<!-- Urdu to Devanagari Translator Widget -->
<div id="urdu-devanagari-translator"></div>
<script src="https://cdn.example.com/urdu-devanagari-translator.js"></script>
<script>
  new UrduDevanagariTranslator({
    container: document.getElementById('urdu-devanagari-translator'),
    apiKey: 'YOUR_API_KEY' // Get your API key at example.com/register
  });
</script>`

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode)
    toast({
      title: "Code copied to clipboard",
      description: "You can now paste the code into your website.",
    })
  }

  return (
    <div className="relative">
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{embedCode}</code>
      </pre>
      <Button variant="ghost" size="sm" className="absolute top-2 right-2" onClick={handleCopy}>
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  )
}
