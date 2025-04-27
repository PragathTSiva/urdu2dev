import { Translator } from "@/components/translator"

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-2">Urdu to Devanagari Translator</h1>
      <p className="text-center text-muted-foreground mb-8">Powered by AI4Bharat IndicXlit model</p>

      <div className="grid gap-8 md:grid-cols-1">
        <Translator />
      </div>
    </div>
  )
}
