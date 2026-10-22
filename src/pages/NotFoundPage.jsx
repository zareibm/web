import Button from '../components/ui/Button.jsx'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

export default function NotFoundPage() {
  useDocumentTitle('Page not found')

  return (
    <section className="container-x flex min-h-[70svh] flex-col items-center justify-center py-32 text-center">
      <p className="label-eyebrow">Error 404</p>
      <h1 className="mt-4 text-[clamp(1.9rem,4.4vw,2.8rem)] font-semibold tracking-[-0.028em] text-ink text-balance">
        We couldn&rsquo;t find that page
      </h1>
      <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-muted">
        The link may be out of date. Head back to the homepage, or browse the current portfolio.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button to="/" size="lg">
          Back to homepage
        </Button>
        <Button to="/properties" variant="outline" size="lg">
          Browse properties
        </Button>
      </div>
    </section>
  )
}
