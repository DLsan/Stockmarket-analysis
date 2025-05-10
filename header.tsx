"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigationItems = [
    { label: "Home", href: "/" },
    { label: "Analysis", href: "/analysis" },
    { label: "Recommendations", href: "/recommendations" },
  ]

  const marketOptions = [
    { label: "Indian Markets", href: "/analysis?market=india" },
    { label: "US Markets", href: "/analysis?market=us" },
    { label: "European Markets", href: "/analysis?market=europe" },
    { label: "Asian Markets", href: "/analysis?market=asia" },
  ]

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled ? "bg-black/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link href="/" className="font-bold text-2xl">
          Stock<span className="highlight">Sense</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors ${
                pathname === item.href ? "text-highlight font-medium" : "text-muted-foreground hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 text-sm">
                Markets <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {marketOptions.map((market) => (
                <DropdownMenuItem key={market.href} asChild>
                  <Link href={market.href}>{market.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button size="sm" className="bg-white text-black hover:bg-gray-200">
            Sign In
          </Button>
        </nav>

        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/10 absolute w-full py-4">
          <nav className="container mx-auto px-4 flex flex-col space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`py-2 ${pathname === item.href ? "text-highlight font-medium" : "text-muted-foreground"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="py-2 font-medium">Markets</div>
            {marketOptions.map((market) => (
              <Link
                key={market.href}
                href={market.href}
                className="py-2 pl-4 text-muted-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {market.label}
              </Link>
            ))}

            <Button className="mt-2 bg-white text-black hover:bg-gray-200 w-full">Sign In</Button>
          </nav>
        </div>
      )}
    </header>
  )
}

