import { useEffect, useRef } from 'react'
import { Footer } from '@components/footer'
import { fadeIn } from '@utils/motion'
import styles from '@style'
import { motion } from 'framer-motion'
import { walletPreview } from '@utils/string'
import { useUserStore } from '@context/userStore'
import { useModalStore } from '@context/modalStore'

import { MenuItem } from './MenuItem'
import { Toggle } from '@atoms/toggles'
import { Line } from '@atoms/line'
import { ThemeSelection } from '@atoms/select'
import { shallow } from 'zustand/shallow'
import { useLocalSettings } from '@context/localSettingsStore'

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, select, textarea'

export const MainMenu = () => {
  const [address, proxyName, proxyAddress, userInfo] = useUserStore(
    (st) => [st.address, st.proxyName, st.proxyAddress, st.userInfo],
    shallow
  )
  const [zen, setZen] = useLocalSettings((st) => [st.zen, st.setZen])
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
      if (previousFocusRef.current?.focus) previousFocusRef.current.focus()
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
      aria-label="主菜单"
      {...fadeIn()}
    >
      <nav className={`${styles.content}`}>
        <div className={`${styles.menu_left}`}>
          <MenuItem className={styles.menu_label} route="search" label="搜索" />
          <MenuItem className={styles.menu_label} route="text" label="文章" />
          <MenuItem className={styles.menu_label} route="about" label="关于" />
          <MenuItem className={styles.menu_label} label="入门指南" route="faq" />
        </div>
        <Line className={styles.line} vertical />
        <div className={styles.menu_right}>
          <div className={styles.address}>{walletPreview(address)}</div>
          <MenuItem
            className={styles.menu_label}
            label="个人主页"
            route={`${currentName || 'tz/' + currentAddress}` || 'tz'}
            need_sync={!currentName || !currentAddress}
          />
          <MenuItem className={styles.menu_label} label="设置" route="subjkt" need_sync />
          <MenuItem className={styles.menu_label} label="捐赠" route="donate" />
          <div className={styles.state_buttons}>
            <Toggle box label="禅模式" onToggle={setZen} toggled={zen} />
            <ThemeSelection className={styles.theme_selection} />
          </div>
        </div>
      </nav>
      <Footer pin />
    </motion.div>
  )
}

export default MainMenu
