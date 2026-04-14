// ! NOTE - Keep the comments.
import { motion } from 'framer-motion'
import styles from '@style'
import { DropDown, DropdownButton } from '@atoms/dropdown'
import { IconToggle } from '@atoms/toggles'
import { SingleViewIcon, MasonryIcon, ChevronIcon } from '@icons'
import { Button } from '@atoms/button'
import { useLocalSettings } from '@context/localSettingsStore'
import { useLocation, useNavigate } from 'react-router'
import { Line } from '@atoms/line'
import { shallow } from 'zustand/shallow'
import { useUserStore } from '@context/userStore'
import { DEFAULT_START_FEED } from '@constants'

const locationMap = new Map([
  ['---sort_feeds', '\u6392\u5e8f\u65b9\u5f0f'],
  ['/feed/sales', '\u6700\u65b0\u9500\u552e'],
  ['/feed/random', '\u968f\u673a\u6d4f\u89c8'],
  ['/feed/newobjkts', '\u6700\u65b0\u4f5c\u54c1'],
  ['---fund_feeds', '\u516c\u76ca\u4e13\u9898'],
  ['/feed/art4artists', 'Art4Artists'],
  ['/feed/tez4pal', '\ud83c\uddf5\ud83c\uddf8 Tez4Pal'],
  ['/feed/morocco-quake-aid', '\ud83c\uddf2\ud83c\udde6 \u6469\u6d1b\u54e5\u8d48\u707e'],
  ['/feed/quake-aid', '\ud83c\uddf9\ud83c\uddf7\ud83c\uddf8\ud83c\uddfe \u5730\u9707\u8d48\u707e'],
  ['/feed/ukraine', '\ud83c\uddfa\ud83c\udde6 \u4e4c\u514b\u5170'],
  ['/feed/pakistan', '\ud83c\uddf5\ud83c\uddf0 \u5df4\u57fa\u65af\u5766'],
  ['/feed/iran', '\ud83c\uddee\ud83c\uddf7 \u4f0a\u6717'],
  ['/feed/tezospride', '\ud83c\udff3\ufe0f\u200d\ud83c\udf08 Tezospride'],
  ['---mime_feeds', '\u6309\u683c\u5f0f\u7b5b\u9009'],
  ['/feed/image', '\u56fe\u7247'],
  ['/feed/video', '\u89c6\u9891'],
  ['/feed/audio', '\u97f3\u9891'],
  ['/feed/glb', '3D \u6a21\u578b'],
  ['/feed/html-svg', 'HTML & SVG'],
  ['/feed/gif', 'GIF'],
  ['/feed/pdf', 'PDF'],
  ['/feed/md', 'Markdown'],
  ['/feed/txt', '\u7eaf\u6587\u672c'],
  ['/feed/midi', 'MIDI'],
])

const locationNeedSync = []

export const FeedToolbar = ({ feeds_menu = false }) => {
  const [viewMode, setViewMode, startFeed] = useLocalSettings(
    (st) => [st.viewMode, st.setViewMode, st.startFeed],
    shallow
  )
  const location = useLocation()
  const feedLabel =
    locationMap.get('/' + location.pathname.split('/').slice(1, 3).join('/')) ||
    startFeed ||
    DEFAULT_START_FEED
  const navigate = useNavigate()
  const walletAddress = useUserStore((st) => [st.address], shallow)

  return (
    <motion.div className={styles.toolbar}>
      {feeds_menu && (
        <div className={styles.feeds_area}>
          <DropdownButton
            alt="feeds selection dropdown"
            menuID="feeds"
            icon={<ChevronIcon />}
            label={feedLabel}
            className={styles.feeds_dropdown}
          >
            <DropDown menuID="feeds">
              <div className={styles.feeds_button}>
                {[...locationMap.keys()].map((k) => {
                  if (k.startsWith('-')) {
                    return (
                      <>
                        <Line className={styles.separator} key={k} />
                        <span className={styles.subtitle}>{locationMap.get(k)}</span>
                      </>
                    )
                  }
                  if (locationNeedSync.includes(k)) {
                    return (
                      <Button key={k} onClick={() => { navigate('/sync', { state: `${k}` }) }}>
                        {locationMap.get(k)}
                      </Button>
                    )
                  }
                  return (
                    <Button key={k} to={k}>{locationMap.get(k)}</Button>
                  )
                })}
              </div>
            </DropDown>
          </DropdownButton>
        </div>
      )}
      <div className={styles.view_mode_area}>
        <IconToggle
          alt={'single view mode'}
          toggled={viewMode === 'single'}
          onClick={() => { setViewMode('single') }}
          icon={<SingleViewIcon />}
        />
        <IconToggle
          alt={'masonry view mode'}
          toggled={viewMode === 'masonry'}
          onClick={() => setViewMode('masonry')}
          icon={<MasonryIcon />}
        />
      </div>
    </motion.div>
  )
}

export default FeedToolbar
