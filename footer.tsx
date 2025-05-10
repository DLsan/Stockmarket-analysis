import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">
              Stock<span className="highlight">Sense</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              Intelligent stock analysis and recommendations for smarter investments
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/analysis" className="hover:text-white">
                  Market Analysis
                </Link>
              </li>
              <li>
                <Link href="/recommendations" className="hover:text-white">
                  Recommendations
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Portfolio Tracker
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Watchlists
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Markets</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-white">
                  Indian Markets
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  US Markets
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  European Markets
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Asian Markets
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-10 pt-6 border-t border-white/10 text-sm">
          <p className="text-muted-foreground">&copy; {new Date().getFullYear()} StockSense. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-white">
              Terms
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-white">
              Privacy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

