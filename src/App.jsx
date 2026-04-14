import { Outlet, ScrollRestoration } from 'react-router-dom'
import useSettings from '@hooks/use-settings'
import { AnimatePresence } from 'framer-motion'
import { Debug } from '@atoms/debug'
import { Header } from '@components/header'
import useFool from '@hooks/use-fool'

const App = () => {
  useSettings() // load in background, don't block rendering
  useFool()
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
