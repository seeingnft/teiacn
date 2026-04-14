import useSWR from 'swr'
import axios from 'axios'
import flatten from 'lodash/flatten'

const TIMEOUT = 8000 // 8 second timeout for API calls

function shuffleLogos(logos) {
  const shuffledLogos = [...logos]
  let currentIndex = shuffledLogos.length
  let temporaryValue
  let randomIndex
  const date = new Date(Date.now())
  let day =
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(date.getFullYear(), 0, 0)) /
    24 /
    60 /
    60 /
    1000
  const random = () => {
    const x = Math.sin(day++) * 1e4
    return x - Math.floor(x)
  }
  while (0 !== currentIndex) {
    randomIndex = Math.floor(random() * currentIndex)
    currentIndex--
    temporaryValue = shuffledLogos[currentIndex]
    shuffledLogos[currentIndex] = shuffledLogos[randomIndex]
    shuffledLogos[randomIndex] = temporaryValue
  }
  return shuffledLogos
}

function filterWalletBlockList(restrictedLists, permittedLists) {
  const walletAllowList = flatten(permittedLists)
  const overiddenList = flatten(restrictedLists).filter(
    (account) => !walletAllowList.includes(account)
  )
  return mapFromList(overiddenList)
}

const mapFromList = (input_list) => {
  const out_map = new Map()
  input_list.forEach((element) => {
    out_map.set(element, 1)
  })
  return out_map
}

const report_url = (name) => `${import.meta.env.VITE_TEIA_REPORT}/${name}`

const emptySettings = {
  logos: [],
  walletBlockMap: new Map(),
  nsfwMap: new Map(),
  photosensitiveMap: new Map(),
  underReviewMap: new Map(),
  ignoreUriMap: new Map(),
  objktBlockMap: new Map(),
  feedIgnoreUriMap: new Map(),
}

async function fetchSettings() {
  const opts = { timeout: TIMEOUT }
  try {
    const [
      objktBlockMapResponse,
      logosResponse,
      logosPrideResponse,
      teiaRestrictedListResponse,
      teiaPermittedListResponse,
      nsfwResponse,
      photosensitiveResponse,
      underReviewResponse,
      ignoreUriResponse,
      feedIgnoreUriResponse,
    ] = await Promise.all([
      axios.get(report_url('restricted_objkt.json'), opts),
      axios.get(`${import.meta.env.VITE_LOGOS}/logos.json`, opts),
      axios.get(`${import.meta.env.VITE_LOGOS}/logos_pride.json`, opts),
      axios.get(report_url('restricted.json'), opts),
      axios.get(report_url('permitted.json'), opts),
      axios.get(report_url('nsfw.json'), opts),
      axios.get(report_url('photosensitive.json'), opts),
      axios.get(report_url('under_review.json'), opts),
      axios.get(report_url('ignore_uri.json'), opts),
      axios.get(report_url('fund_feed_ignored_addresses.json'), opts),
    ])

    const logoPacks = [logosResponse, logosPrideResponse]
    const logos = logoPacks.flatMap((logoPack) =>
      logoPack.data.logos.map((logo) => ({
        name: logo,
        themable: logoPack.data.themable,
        collection: logoPack.data.collection,
      }))
    )
    const objktBlockMap = mapFromList(
      objktBlockMapResponse.data.map((n) => n.toString())
    )
    const nsfwMap = mapFromList(nsfwResponse.data.map((n) => n.toString()))
    const photosensitiveMap = mapFromList(
      photosensitiveResponse.data.map((n) => n.toString())
    )
    const underReviewMap = mapFromList(underReviewResponse.data)
    const ignoreUriMap = mapFromList(ignoreUriResponse.data)
    const feedIgnoreUriMap = mapFromList(feedIgnoreUriResponse.data)
    const walletBlockMap = filterWalletBlockList(
      [teiaRestrictedListResponse.data],
      [teiaPermittedListResponse.data]
    )
    return {
      logos: shuffleLogos(logos),
      walletBlockMap,
      nsfwMap,
      photosensitiveMap,
      underReviewMap,
      ignoreUriMap,
      objktBlockMap,
      feedIgnoreUriMap,
    }
  } catch (e) {
    // Return empty settings on failure so the app still renders
    return emptySettings
  }
}

export default function useSettings() {
  const { data, error, isValidating } = useSWR('/settings', fetchSettings, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  })

  return {
    ...(data ? data : emptySettings),
    error,
    isLoading: isValidating,
  }
}
