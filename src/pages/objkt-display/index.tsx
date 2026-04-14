/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useOutletContext, useParams } from 'react-router-dom'
import useSWR from 'swr'
import {
  METADATA_ACCESSIBILITY_HAZARDS_PHOTOSENS,
  METADATA_CONTENT_RATING_MATURE,
} from '@constants'
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

export const useObjktDisplayContext = () => {
  return useOutletContext<ObjktDisplayContext>()
}

const TABS = [
  { title: '\u4f5c\u54c1\u4fe1\u606f', to: '' },
  { title: '\u6536\u85cf\u5217\u8868', to: 'listings' },
  { title: '\u5386\u53f2\u8bb0\u5f55', to: 'history' },
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
        const isNSFW = (nsfwMap.get(objkt.token_id) === 1)
        const isPhotosensitive = (photosensitiveMap.get(objkt.token_id) === 1)
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
  if (loading) return <Page title="loading"><Loading message="\u52a0\u8f7d\u4e2d..." /></Page>
  if (error) throw error
  if (!nft) return

  return (
    <Page className={styles.profile_page} title={nft?.name}>
      <>
        {nft.restricted ? (
          <div className={styles.restricted}>
            \u8be5\u4f5c\u54c1\u5df2\u88ab\u9650\u5236\u3002\u5982\u9700\u89e3\u9664\u9650\u5236\uff0c\u8bf7\u8054\u7cfb Teia \u5ba1\u6838\u5458\uff08{' '}
            <a href="https://discord.gg/TKeybhYhNe" target="_blank" rel="noreferrer">Discord</a>{' '}
            \uff09\u3002\u8bf7\u53c2\u9605{' '}
            <a href="https://github.com/teia-community/teia-docs/wiki/Core-Values-Code-of-Conduct-Terms-and-Conditions#content-moderation" target="_blank" rel="noreferrer">Teia \u6761\u6b3e\u4e0e\u6761\u4ef6</a>\u3002
          </div>
        ) : null}
        {nft.underReview && (
          <div className={styles.restricted}>
            \u8be5\u4f5c\u54c1\u6b63\u5728\u5ba1\u6838\u4e2d\u3002\u5982\u9700\u4e86\u89e3\u5ba1\u6838\u72b6\u6001\uff0c\u8bf7\u8054\u7cfb Teia \u5ba1\u6838\u5458\uff08{' '}
            <a href="https://discord.gg/TKeybhYhNe" target="_blank" rel="noreferrer">Discord</a>{' '}
            \uff09\u3002
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
