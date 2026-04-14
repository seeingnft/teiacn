import { useEffect, useRef } from 'react'
import { Footer } from '@components/footer'
import { fadeIn } from '@utils/motion'
import styles from '@style'
import { motion } from 'framer-motion'
import { walletPreview } from '@utils/string'
import { useUserStore } from '@context/userStore'
import { useModalStore } from '@context/modalStore'

import { MenuItem } from './MenuItem'
import { Line } from '@atoms/line'
import { ThemeSelection } from '@atoms/select'
import { shallow } from 'zustand/shallow'

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, select, textarea'

export const MainMenu = () => {
  const [address, proxyName, proxyAddress, userInfo] = useUserStore(
    (st) => [st.address, st.proxyName, st.proxyAddress, st.userInfo],
    shallow
  )
  const setCollapsed = useModalStore((st) => st.setCollapsed)

  const menuRef = useRef(null)
  const previousFocusRef = useRef(document.activeElement)

  useEffect(() => {
    const menuEl = menuRef.current
    if (!menuEl) return

    const first = menuEl.querySelector(FOCUSABLE)
    if (first) first.focus()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setCollapsed(true)
        return
      }
      if (e.key === 'Tab') {
        const focusable = menuEl.querySelectorAll(FOCUSABLE)
        if (focusable.length === 0) return
        const firstEl = focusable[0]
        const lastEl = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault()
          lastEl.focus()
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault()
          firstEl.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (previousFocusRef.current?.focus) {
        previousFocusRef.current.focus()
      }
    }
  }, [setCollapsed])

  const currentName = proxyName || userInfo?.name
  const currentAddress = proxyAddress || address

  return (
    <motion.div
      ref={menuRef}
      className={`${styles.menu}`}
      role="dialog"
      aria-modal="true"
      aria-label="\u4e3b\u83dc\u5355"
      {...fadeIn()}
    >
      <nav className={`${styles.content}`}>
        <div className={`${styles.menu_left}`}>
          <MenuItem className={styles.menu_label} route="search" label="\u641c\u7d22" />
          <MenuItem className={styles.menu_label} route="text" label="\u6587\u7ae0" />
          <MenuItem className={styles.menu_label} route="about" label="\u5173\u4e8e" />
          <MenuItem className={styles.menu_label} label="\u5165\u95e8\u6307\u5357" route="faq" />
        </div>
        <Line className={styles.line} vertical />
        <div className={styles.menu_right}>
          <div className={styles.address}>{walletPreview(address)}</div>
          <MenuItem
            className={styles.menu_label}
            label="\u4e2a\u4eba\u4e3b\u9875"
            route={`${currentName || 'tz/' + currentAddress}` || 'tz'}
            need_sync={!currentName || !currentAddress}
          />
          <MenuItem
            className={styles.menu_label}
            label="\u8bbe\u7f6e"
            route="subjkt"
            need_sync
          />
          <MenuItem className={styles.menu_label} label="\u6350\u8d60" route="donate" />
          <div className={styles.state_buttons}>
            <ThemeSelection className={styles.theme_selection} />
          </div>
        </div>
      </nav>
      <Footer pin />
    </motion.div>
  )
}

export default MainMenu
