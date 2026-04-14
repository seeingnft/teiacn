import { Outlet, ScrollRestoration } from 'react-router-dom'
import useSettings from '@hooks/use-settings'
import { AnimatePresence } from 'framer-motion'
import { Debug } from '@atoms/debug'
import { Header } from '@components/header'
import useFool from '@hooks/use-fool'
import { useEffect } from 'react'
import { useLocalSettings } from '@context/localSettingsStore'

const App = () => {
  useSettings()
  useFool()
  const setZen = useLocalSettings((st) => st.setZen)
  // Force zen mode off permanently
  useEffect(() => { setZen(false) }, [])
  return (
    <>
      {process.env.NODE_ENV === 'development' && <Debug />}
      <ScrollRestoration getKey={(location) => location.key} />
      <AnimatePresence mode="wait" initial={false}>
        <Header key="header" />
        <Outlet />
      </AnimatePresence>
    </>
  )
}

export default App
