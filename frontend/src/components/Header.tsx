import { AnimatePresence, motion } from 'motion/react'
import logoWhite from '../assets/brand/logo-white.png'
import { navItems } from '../content'
import { ArrowIcon } from './Icons'

type HeaderProps = {
  menuOpen: boolean
  navSolid: boolean
  onToggleMenu: () => void
  onCloseMenu: () => void
}

export function Header({ menuOpen, navSolid, onToggleMenu, onCloseMenu }: HeaderProps) {
  return (
    <header className={`site-header ${navSolid || menuOpen ? 'site-header--solid' : ''} ${menuOpen ? 'site-header--menu' : ''}`}>
      <a className="nav-logo" href="#top" aria-label="Ascend Trade Commercial home">
        <img src={logoWhite} alt="Ascend Trade Commercial Pvt Ltd" />
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
      </nav>

      <a className="nav-cta" href="#contact">
        <span>Start a project</span>
        <ArrowIcon />
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={onToggleMenu}
      >
        <span className={menuOpen ? 'menu-line menu-line--one' : 'menu-line'} />
        <span className={menuOpen ? 'menu-line menu-line--two' : 'menu-line'} />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav aria-label="Mobile navigation">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMenu}
                  initial={{ y: 26, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.12 + index * 0.06 }}
                >
                  <span>0{index + 1}</span>{item.label}
                </motion.a>
              ))}
            </nav>
            <div className="mobile-menu-contact">
              <span>Trade desk</span>
              <a href="tel:+919242391574">+91 92423 91574</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
