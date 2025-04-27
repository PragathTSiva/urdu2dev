import { Translator } from "@/components/translator"

export default function WidgetPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">Urdu to Devanagari Widget</h1>
      <p className="text-center text-muted-foreground mb-8">
        This is a standalone widget that can be embedded in any website.
      </p>

      <Translator />

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>This widget can be embedded in any website using the integration code.</p>
      </div>
    </div>
  )
}
