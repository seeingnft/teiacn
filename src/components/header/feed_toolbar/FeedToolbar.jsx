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
  ['---sort_feeds', '排序方式'],
  ['/feed/sales', '最新销售'],
  ['/feed/random', '随机浏览'],
  ['/feed/newobjkts', '最新作品'],
  ['---fund_feeds', '公益专题'],
  ['/feed/art4artists', 'Art4Artists'],
  ['/feed/tez4pal', '🇵🇸 Tez4Pal'],
  ['/feed/morocco-quake-aid', '🇲🇦 摩洛哥赈灾'],
  ['/feed/quake-aid', '🇹🇷🇸🇾 地震赈灾'],
  ['/feed/ukraine', '🇺🇦 乌克兰'],
  ['/feed/pakistan', '🇵🇰 巴基斯坦'],
  ['/feed/iran', '🇮🇷 伊朗'],
  ['/feed/tezospride', '🏳️‍🌈 Tezospride'],
  ['---mime_feeds', '按格式筛选'],
  ['/feed/image', '图片'],
  ['/feed/video', '视频'],
  ['/feed/audio', '音频'],
  ['/feed/glb', '3D 模型'],
  ['/feed/html-svg', 'HTML & SVG'],
  ['/feed/gif', 'GIF'],
  ['/feed/pdf', 'PDF'],
  ['/feed/md', 'Markdown'],
  ['/feed/txt', '纯文本'],
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
                      <Button key={k} onClick={() => navigate('/sync', { state: `${k}` })}>
                        {locationMap.get(k)}
                      </Button>
                    )
                  }
                  return <Button key={k} to={k}>{locationMap.get(k)}</Button>
                })}
              </div>
            </DropDown>
          </DropdownButton>
        </div>
      )}
      <div className={styles.view_mode_area}>
        <IconToggle
          alt="single view mode"
          toggled={viewMode === 'single'}
          onClick={() => setViewMode('single')}
          icon={<SingleViewIcon />}
        />
        <IconToggle
          alt="masonry view mode"
          toggled={viewMode === 'masonry'}
          onClick={() => setViewMode('masonry')}
          icon={<MasonryIcon />}
        />
      </div>
    </motion.div>
  )
}

export default FeedToolbar
