/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { walletPreview } from '@utils/string'
import { useLocation, useNavigate } from 'react-router'
import { AnimatePresence } from 'framer-motion'
import { Button } from '@atoms/button'
import styles from '@style'
import { DropDown, DropdownButton } from '@atoms/dropdown'
import { Menu } from '../icons'
import { EventIcon } from '@icons'
import { MainMenu } from './main_menu/MainMenu'
import { EventBanner } from '@components/banners'
import RotatingLogo from '@atoms/logo'
import { sample_events } from './sample_events'
import { useMedia } from 'react-use'
import EventCard from './events/EventCard'
import { Line } from '@atoms/line'
import { ConfigIcon } from '@icons'
import classNames from 'classnames'
import { PATH } from '@constants'
import { useLocalSettings } from '@context/localSettingsStore'
import { useUserStore } from '@context/userStore'
import { useModalStore } from '@context/modalStore'
import { shallow } from 'zustand/shallow'

export const Header = () => {
  const [address, setAccount, proxyName, proxyAddress, userInfo, unsync, sync, resetProxy] =
    useUserStore(
      (st) => [st.address, st.setAccount, st.proxyName, st.proxyAddress, st.userInfo, st.unsync, st.sync, st.resetProxy],
      shallow
    )
  const [collapsed, setCollapsed, toggleMenu] = useModalStore(
    (st) => [st.collapsed, st.setCollapsed, st.toggleMenu],
    shallow
  )

  useEffect(() => {
    const applyTheme = useLocalSettings.getState().applyTheme
    const unsub = useLocalSettings.subscribe((st) => st.theme, applyTheme, { fireImmediately: true })
    return unsub
  }, [])

  useEffect(() => {
    const item = document.body.parentElement
    if (item) {
      item.style.overflowY = collapsed ? '' : 'scroll'
      item.style.position = collapsed ? '' : 'fixed'
    }
  }, [collapsed])

  const navigate = useNavigate()
  const location = useLocation()
  const isWide = useMedia('(min-width: 600px)')
  const [logoSeed, setLogoSeed] = useState()
  const [onHome, setOnHome] = useState()
  const [syncLabel, setSyncLabel] = useState('同步')
  const [walletLabel, setWalletLabel] = useState('')
  const [accountPreview, setAccountPreview] = useState('')

  useEffect(() => {
    setAccount()
    setLogoSeed(Math.floor(Math.random() * 150))
  }, [])

  useEffect(() => {
    setOnHome(location.pathname === '/')
  }, [location.pathname])

  useEffect(() => {
    const updateTitle = ([address, proxyAddress, proxyName, userInfo]) => {
      setSyncLabel(address ? '断开' : '同步')
      if (address) {
        if (collapsed) {
          const proxy = proxyAddress ? ` (${proxyName || walletPreview(proxyAddress)})` : ''
          const userName = userInfo?.name ? `(${userInfo.name})` : ''
          setWalletLabel(() => walletPreview(address) + (proxy || userName))
          setAccountPreview(() =>
            syncLabel.slice(syncLabel.length - 5, syncLabel.length).split('').join(' ')
          )
        }
      }
    }
    return useUserStore.subscribe(
      (st) => [st.address, st.proxyAddress, st.proxyName, st.userInfo],
      updateTitle
    )
  }, [])

  const handleRoute = (path, data) => {
    setCollapsed(true)
    navigate(path, { state: data })
  }

  const handleSyncUnsync = () => {
    if (address) {
      if (collapsed) {
        const name = proxyName || userInfo?.name
        const current_address = proxyAddress || address
        if (name) handleRoute(`/${name}`)
        else handleRoute(`${PATH.ISSUER}/${current_address}`)
      } else {
        unsync()
      }
    } else {
      sync()
    }
  }

  const container_classes = classNames({ [styles.grid]: true, [styles.fill_bg]: !collapsed })

  return (
    <>
      <EventBanner />
      <AnimatePresence>{!collapsed && <MainMenu />}</AnimatePresence>
      <header className={`${styles.container}`}>
        <div className={container_classes}>
          <div className={styles.left}>
            <DropdownButton
              alt="events dropdown"
              className={styles.events_button}
              icon={<EventIcon />}
              menuID="events"
              label={isWide ? '活动' : ''}
              id={`events-${location.pathname}`}
            >
              <DropDown menuID="events" vertical>
                {sample_events?.map((evt) => (
                  <EventCard event={evt} key={`${evt.title} - ${evt.subtitle}`} />
                ))}
              </DropDown>
            </DropdownButton>
          </div>
          <Button
            alt="teia logo"
            to={!onHome ? '/' : null}
            onTo={() => { setCollapsed(true); setOnHome(onHome) }}
            onClick={() => setLogoSeed(Math.random() * 100)}
          >
            <RotatingLogo seed={logoSeed} className={styles.logo} />
          </Button>
          <div className={styles.right}>
            {!collapsed && (
              <>
                <Button alt="local settings" to="/settings" onTo={() => setCollapsed(true)} className={styles.config_button}>
                  <ConfigIcon fill="var(--text-color)" width={16} height={16} />
                  {isWide && '配置'}
                </Button>
              </>
            )}
            {!collapsed && proxyAddress && (
              <>
                <Line className={styles.separator} vertical />
                <Button alt="exit collab" small onClick={() => resetProxy()} secondary>退出协作</Button>
                <Line className={styles.separator} vertical />
              </>
            )}
            <Button
              onClick={handleSyncUnsync}
              className={styles.sync_label}
              secondary
              alt={!collapsed ? (accountPreview ? 'unsync' : 'sync') : (accountPreview ? `wallet account ending in ${accountPreview}` : 'sync wallet')}
            >
              {!collapsed || !address ? (
                <span key="synclabel">{syncLabel}</span>
              ) : (
                <span key="">{walletLabel}</span>
              )}
            </Button>
            <Button alt={`${collapsed ? 'show' : 'hide'} menu`} onClick={toggleMenu} secondary>
              <Menu isOpen={!collapsed} />
            </Button>
          </div>
        </div>
        <Line />
      </header>
    </>
  )
}
