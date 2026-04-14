/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useOutletContext, useParams } from 'react-router-dom'
import useSWR from 'swr'
import { METADATA_ACCESSIBILITY_HAZARDS_PHOTOSENS, METADATA_CONTENT_RATING_MATURE } from '@constants'
import { fetchObjktDetails } from '@data/api'
import { Loading } from '@atoms/loading'
import { Page } from '@atoms/layout'
import { RenderMediaType } from '@components/media-types'
import { ItemInfo } from '@components/item-info'
import styles from '@style'
import './style.css'
import useSettings from '@hooks/use-settings'
import { TabOptions, Tabs } from '@atoms/tab/Tabs'
import { useUserStore } from '@context/userStore'
import { NFT } from '@types'

type ObjktDisplayContext = { nft: NFT; viewer_address: string }

export const useObjktDisplayContext = () => useOutletContext<ObjktDisplayContext>()

const TABS = [
  { title: '作品信息', to: '' },
  { title: '收藏列表', to: 'listings' },
  { title: '历史记录', to: 'history' },
]

export const ObjktDisplay = () => {
  const { id } = useParams()
  const address = useUserStore((st) => st.address)
  const proxy = useUserStore((st) => st.proxyAddress)
  const { walletBlockMap, nsfwMap, photosensitiveMap, underReviewMap } = useSettings()

  const { data: nft, error }: { data?: NFT; error?: Error } = useSWR(
    ['/token', id],
    async () => {
      if (id) {
        const objkt = (await fetchObjktDetails(id)) as NFT
        if (!objkt) {
          const isNum = /^\d+$/.test(id)
          if (isNum) throw new Error(`Cannot find an OBJKT with id: ${id}`, { cause: 'Unknown OBJKT' })
          throw new Error(`Received a non numeric token_id: ${id}.`, { cause: 'Conflicting route' })
        }
        const isNSFW = nsfwMap.get(objkt.token_id) === 1
        const isPhotosensitive = photosensitiveMap.get(objkt.token_id) === 1
        if (isNSFW || objkt.teia_meta?.content_rating === METADATA_CONTENT_RATING_MATURE) objkt.isNSFW = true
        if (isPhotosensitive || objkt.teia_meta?.accessibility?.hazards.includes(METADATA_ACCESSIBILITY_HAZARDS_PHOTOSENS)) objkt.isPhotosensitive = true
        if (isNSFW || isPhotosensitive) objkt.isModerated = true
        objkt.restricted = walletBlockMap.get(objkt.artist_address) === 1
        objkt.underReview = underReviewMap.get(objkt.artist_address) === 1
        return objkt
      }
    },
    { revalidateIfStale: false, revalidateOnFocus: false }
  )

  const loading = !nft && !error
  if (loading) return <Page title="loading">{loading && <Loading message="加载中..." />}</Page>
  if (error) throw error
  if (!nft) return

  return (
    <Page className={styles.profile_page} title={nft?.name}>
      <>
        {nft.restricted ? (
          <div className={styles.restricted}>
            该作品已被限制。如需解除限制，请联系 Teia 审核员（{' '}
            <a href="https://discord.gg/TKeybhYhNe" target="_blank" rel="noreferrer">Discord</a>{' '}
            ）。请参阅{' '}
            <a href="https://github.com/teia-community/teia-docs/wiki/Core-Values-Code-of-Conduct-Terms-and-Conditions#content-moderation" target="_blank" rel="noreferrer">Teia 条款与条件</a>。
          </div>
        ) : null}
        {nft.underReview && (
          <div className={styles.restricted}>
            该作品正在审核中。如需了解审核状态，请联系 Teia 审核员（{' '}
            <a href="https://discord.gg/TKeybhYhNe" target="_blank" rel="noreferrer">Discord</a>{' '}
            ）。
          </div>
        )}
        <div style={{ position: 'relative', display: 'block', width: '100%' }} className="objkt-display">
          <div><RenderMediaType nft={nft} displayView /></div>
          <ItemInfo nft={nft} />
        </div>
        <Tabs
          tabs={TABS}
          className={styles.profile_tabs}
          filter={(tab: TabOptions) => {
            if (nft?.restricted && tab.restricted) return null
            if (nft?.holdings && tab.private) {
              const holders_arr = nft.holdings.map((e) => e.holder_address)
              if (holders_arr.includes(address || 'UNSYNCED') === false && nft.artist_address !== address && nft.artist_address !== proxy) return null
            }
            return tab
          }}
        />
        <div className={styles.tab_area}>
          <Outlet context={{ nft, viewer_address: address }} />
        </div>
      </>
    </Page>
  )
}
