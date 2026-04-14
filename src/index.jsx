import { RootErrorBoundary } from '@atoms/error/RootErrorBoundary'
import { Tags } from '@pages/tags/index'
import { About } from '@pages/about'
import { Donate } from '@pages/donate'
import { CollabDisplay } from '@pages/collaborate'
import Text from '@pages/text'
import Community from '@pages/text/Community'
import OfficialPosts from '@pages/text/OfficialPosts'
import { Settings } from '@pages/config/Settings'
import { Subjkt } from '@pages/config/Subjkt'
import { FAQ } from '@pages/faq'
import { Home } from '@pages/home'
import FriendsFeed from '@pages/home/feeds/friends-feed'
import {
  IranFeed, PakistanFeed, UkraineFeed, AudioFeed, GifFeed, GlbFeed,
  HtmlSvgFeed, ImageFeed, VideoFeed, NewObjktsFeed, RandomFeed,
  RecentSalesFeed, TagFeed, PdfFeed, MarkdownFeed, TextFeed,
  QuakeFeed, MoroccoQuakeFeed, Tez4PalFeed, Art4ArtistsFeed,
} from '@pages/home/feeds'
import { ObjktDisplay } from '@pages/objkt-display'
import { Info, Collectors, History } from '@pages/objkt-display/tabs'
import Display from '@pages/profile'
import Collections from '@pages/profile/collections'
import Creations from '@pages/profile/creations'
import Collabs from '@pages/profile/collabs'
import Curation from '@pages/profile/curation'
import TextPosts from '@pages/profile/text-posts'
import { Terms } from '@pages/terms'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import './styles/index.scss'
import { IconCache } from '@utils/with-icon'
import { ListsFeed } from '@pages/home/feeds/lists-feed'
import { MidiFeed } from '@pages/home/feeds/mime-type-feed'
import { CodeOfConduct } from '@pages/codeofconduct'
import { CoreValues } from '@pages/corevalues'
import { PrivacyPolicy } from '@pages/privacypolicy'

const display_routes = (
  <>
    <Route index element={<Creations />} />
    <Route exact path="collection" element={<Collections />} />
    <Route exact path="curation" element={<Curation />} />
    <Route exact path="collabs" element={<Collabs />} />
    <Route exact path="text" element={<TextPosts />} />
  </>
)

// Always use /teiacn as the router basename (site is deployed at /teiacn/)
const basename = '/teiacn'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="*" errorElement={<RootErrorBoundary />} element={<App />}>
      <Route path="/*" index element={<Home />} />
      <Route path="feed/*" element={<Home />}>
        <Route path="sales" element={<RecentSalesFeed />} />
        <Route path="lists" element={<ListsFeed />} />
        <Route path="tezospride" element={<TagFeed tag="tezospride" namespace="tezospride" />} />
        <Route path="iran" element={<IranFeed />} />
        <Route path="tez4pal" element={<Tez4PalFeed />} />
        <Route path="art4artists" element={<Art4ArtistsFeed />} />
        <Route path="morocco-quake-aid" element={<MoroccoQuakeFeed />} />
        <Route path="quake-aid" element={<QuakeFeed />} />
        <Route path="pakistan" element={<PakistanFeed />} />
        <Route path="ukraine" element={<UkraineFeed />} />
        <Route path="random" element={<RandomFeed />} />
        <Route path="newobjkts" element={<NewObjktsFeed />} />
        <Route path="glb" element={<GlbFeed />} />
        <Route path="video" element={<VideoFeed />} />
        <Route path="image" element={<ImageFeed />} />
        <Route path="audio" element={<AudioFeed />} />
        <Route path="html-svg" element={<HtmlSvgFeed />} />
        <Route path="pdf" element={<PdfFeed />} />
        <Route path="md" element={<MarkdownFeed />} />
        <Route path="txt" element={<TextFeed />} />
        <Route path="midi" element={<MidiFeed />} />
        <Route path="gif" element={<GifFeed />} />
        <Route path="friends/:address" element={<FriendsFeed />} />
      </Route>
      <Route path="search/*" element={<Home isSearch />} />
      <Route path="kt/:address" element={<Display />}>
        <Route index element={<CollabDisplay />} />
      </Route>
      <Route path="collab/:name" element={<Display />}>
        <Route index element={<CollabDisplay />} />
      </Route>
      <Route exact path="about" element={<About />} />
      <Route path="donate/*" element={<Donate />} />
      <Route exact path="terms" element={<Terms />} />
      <Route exact path="faq" element={<FAQ />} />
      <Route exact path="codeofconduct" element={<CodeOfConduct />} />
      <Route exact path="corevalues" element={<CoreValues />} />
      <Route exact path="privacypolicy" element={<PrivacyPolicy />} />
      <Route path="text/*" element={<Text />}>
        <Route index element={<Community />} />
        <Route path="bulletin" element={<OfficialPosts />} />
      </Route>
      <Route path="objkt/:id/*" element={<ObjktDisplay />}>
        <Route index element={<Info />} />
        <Route path="listings" element={<Collectors />} />
        <Route path="history" element={<History />} />
      </Route>
      <Route path="subjkt/*" element={<Subjkt />} />
      <Route path="settings/*" element={<Settings />} />
      <Route path="tags/:tag" element={<Tags />} />
      <Route path="tz/:address/*" element={<Display />}>{display_routes}</Route>
      <Route path=":name/*" element={<Display />}>{display_routes}</Route>
    </Route>
  ),
  { basename }
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <IconCache.Provider value={{}}>
    <RouterProvider router={router} />
  </IconCache.Provider>
)

serviceWorker.unregister()
