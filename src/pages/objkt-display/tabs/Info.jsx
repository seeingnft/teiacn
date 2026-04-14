import { Container } from '@atoms/layout'
import { Tags } from '@components/tags'
import styles from '@style'
import '../style.css'
import { HashToURL } from '@utils'
import { HEN_CONTRACT_FA2, LANGUAGES, LICENSE_TYPES } from '@constants'
import { getWordDate } from '@utils/time'
import { Line } from '@atoms/line'
import { useObjktDisplayContext } from '..'

const Attribute = ({ label, value }) => (
  <div className={styles.info_attributes}>{label}:<p>{value}</p></div>
)

export const Info = () => {
  const { nft, viewer_address } = useObjktDisplayContext()
  const artifact_ipfs_url = HashToURL(nft.artifact_uri) + `/?creator=${nft.artist_address}&viewer=${viewer_address || ''}&objkt=${nft.token_id}`
  const artifact_anaverse_url = viewer_address
    ? `https://anaver.se/?gallery=1&loadsingle=1&singlecontract=${HEN_CONTRACT_FA2}&singletokenid=${nft.token_id}&wallet=${viewer_address}&partnerPlatform=teia.art`
    : `https://anaver.se/?gallery=1&loadsingle=1&singlecontract=${HEN_CONTRACT_FA2}&singletokenid=${nft.token_id}&partnerPlatform=teia.art`
  const metadata_ipfs_url = HashToURL(nft.metadata_uri)
  const rightsUri = nft.rights === 'custom' && nft.right_uri && nft.right_uri.startsWith('ipfs://')
    ? HashToURL(nft.right_uri) : nft.right_uri

  return (
    <>
      <Container>
        <div className={styles.infos_container}>
          <div className={styles.basic_infos}>
            <h1>{nft.name}</h1>
            <p>{nft.description}</p>
          </div>
          {nft.tags?.length ? <Tags tags={nft.tags.map(({ tag }) => tag)} /> : null}
        </div>
      </Container>
      <Line />
      <Container>
        <div className={styles.infos_attributes_container}>
          <div className={styles.infos_attributes_flex}>
            <Attribute label="\u6587\u4ef6\u7c7b\u578b" value={nft.mime_type} />
            {nft.language && <Attribute label="\u8bed\u8a00" value={LANGUAGES[nft.language]} />}
            {nft.isNSFW && <Attribute label="\u5185\u5bb9\u8bc4\u7ea7" value={'NSFW\uff08\u6210\u4eba\u5185\u5bb9\uff09'} />}
            {nft.isPhotosensitive && <Attribute label="\u65e0\u969c\u788d\u63d0\u793a" value={'\u542b\u5149\u654f\u611f\u5185\u5bb9'} />}
            {nft.isModerated && nft.artist_address === viewer_address && (
              <Attribute label="\u5185\u5bb9\u5ba1\u6838" value={'Teia \u5185\u5bb9\u5ba1\u6838\u56e2\u961f\u5df2\u5bf9\u8be5\u4f5c\u54c1\u7684 NSFW \u6216\u5149\u654f\u5c5e\u6027\u8fdb\u884c\u4e86\u4eba\u5de5\u8986\u76d6'} />
            )}
            <div className={styles.info_attributes}>
              \u7248\u6743\uff1a
              <p>{nft.rights ? (nft.rights === 'custom' ? <a target="_blank" href={rightsUri} rel="noreferrer">\u81ea\u5b9a\u4e49</a> : LICENSE_TYPES[nft.rights]) : LICENSE_TYPES.none}</p>
            </div>
            <div className={styles.info_attributes}>
              \u94f8\u9020\u65e5\u671f\uff1a<p>{getWordDate(nft.minted_at)}</p>
            </div>
          </div>
          <div className={styles.info_ipfs}>
            <a target="_blank" rel="noreferrer" href={metadata_ipfs_url}>\u5143\u6570\u636e</a>
            {' // '}
            <a target="_blank" rel="noreferrer" href={artifact_ipfs_url}>\u5728 IPFS \u67e5\u770b</a>
            {' // '}
            <a target="_blank" rel="noreferrer" href={artifact_anaverse_url}>\u5728 Anaverse \u67e5\u770b</a>
          </div>
        </div>
      </Container>
    </>
  )
}
