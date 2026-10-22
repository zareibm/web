import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Heart, Menu, Phone, X } from 'lucide-react'
import Logo from './Logo.jsx'
import Button from '../ui/Button.jsx'
import { CONTACT, NAV_ITEMS } from '../../data/site.js'
import { useFavorites } from '../../context/FavoritesContext.jsx'
import { cn } from '../../lib/cn.js'

export default function Header() {
  const { pathname } = useLocation()
  const { count } = useFavorites()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Any navigation closes the mobile menu.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  // Transparent over the hero, solid as soon as the page scrolls or away from home.
  const transparent = isHome && !scrolled && !menuOpen

  const isActive = (to) => (to === '/' ? pathname === '/' : pathname.startsWith(to))

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ease-editorial',
          transparent
            ? 'border-b border-transparent bg-transparent'
            : 'border-b border-navy-100/80 bg-white/95 shadow-header backdrop-blur-md',
        )}
      >
        {transparent ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-navy-950/60 via-navy-950/20 to-transparent"
          />
        ) : null}

        <div className="container-x relative z-10 flex h-[72px] items-center justify-between gap-6 sm:h-[76px]">
          <Logo tone={transparent ? 'light' : 'dark'} />

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                aria-current={isActive(item.to) ? 'page' : undefined}
                className={cn(
                  'group relative py-1 text-[13.5px] font-medium tracking-[0.005em] transition-colors duration-300',
                  transparent ? 'text-white/85 hover:text-white' : 'text-ink-soft hover:text-navy',
                  isActive(item.to) && (transparent ? 'text-white' : 'text-navy'),
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute -bottom-0.5 left-0 h-px bg-champagne transition-[width] duration-300 ease-editorial',
                    isActive(item.to) ? 'w-full' : 'w-0 group-hover:w-full',
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/saved"
              aria-label={`Saved properties${count ? ` (${count})` : ''}`}
              title="Saved properties"
              className={cn(
                'relative inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300',
                transparent ? 'text-white/85 hover:bg-white/10' : 'text-ink-soft hover:bg-mist',
              )}
            >
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.7} />
              {count > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-champagne px-1 text-[10px] font-bold text-navy-950">
                  {count}
                </span>
              ) : null}
            </Link>

            <Button
              href={CONTACT.phoneHref}
              size="sm"
              variant={transparent ? 'outlineLight' : 'outline'}
              className="hidden sm:inline-flex"
            >
              <Phone className="h-[15px] w-[15px]" strokeWidth={1.9} aria-hidden="true" />
              {CONTACT.phone}
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={cn(
                'inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 lg:hidden',
                transparent ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-mist',
              )}
            >
              {menuOpen ? (
                <X className="h-5 w-5" strokeWidth={1.8} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.8} />
              )}
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div id="mobile-menu" className="fixed inset-0 z-40 bg-navy-950 animate-fade-in lg:hidden">
          <div className="container-x flex h-full flex-col overflow-y-auto pb-10 pt-[104px]">
            <nav aria-label="Mobile" className="border-y border-white/10">
              {NAV_ITEMS.map((item, index) => (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={isActive(item.to) ? 'page' : undefined}
                  style={{ animationDelay: `${index * 45}ms` }}
                  className={cn(
                    'flex items-center justify-between border-b border-white/10 py-4 text-2xl font-medium tracking-[-0.015em] transition-colors animate-fade-up last:border-b-0',
                    isActive(item.to) ? 'text-champagne' : 'text-white/90',
                  )}
                >
                  {item.label}
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-champagne/70">
                    0{index + 1}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto space-y-3 pt-10">
              <Button href={CONTACT.phoneHref} variant="champagne" size="lg" className="w-full">
                <Phone className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
                {CONTACT.phone}
              </Button>
              <Button to="/contact" variant="outlineLight" size="lg" className="w-full">
                Book a consultation
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
