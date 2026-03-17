export default function Footer(): JSX.Element {
  const shopLinks = ['All Products', 'New Drops', 'Tees', 'Hoodies', 'Cargo', 'Accessories'];
  const companyLinks = ['About Us', 'Contact', 'Shipping', 'Returns', 'FAQ'];
  const socialLinks = [
    { name: 'X', href: 'https://x.com' },
    { name: 'Instagram', href: 'https://instagram.com' },
  ];

  return (
    <footer className="bg-brand-zinc-900 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="/" className="font-display font-black text-2xl tracking-tighter text-white">
              HP<span className="text-brand-acid">X</span>
            </a>
            <p className="mt-4 text-zinc-400 text-sm">Wear the culture.</p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-display font-bold text-white text-sm tracking-wider uppercase mb-4">
              Shop
            </h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`/${link.toLowerCase().replace(' ', '-')}`}
                    className="text-zinc-400 text-sm hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-display font-bold text-white text-sm tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`/${link.toLowerCase().replace(' ', '-')}`}
                    className="text-zinc-400 text-sm hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-display font-bold text-white text-sm tracking-wider uppercase mb-4">
              Follow
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  {social.name === 'X' && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )}
                  {social.name === 'Instagram' && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-xs">
            © {new Date().getFullYear()} HPX Drips. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {['VISA', 'UPI', 'COD'].map((payment) => (
              <span
                key={payment}
                className="text-xs border border-zinc-700 text-zinc-400 px-2 py-0.5 rounded"
              >
                {payment}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
