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
  <div className={styles.info_attributes}>
    {label}:<p>{value}</p>
  </div>
)

export const Info = () => {
  const { nft, viewer_address } = useObjktDisplayContext()
  const artifact_ipfs_url =
    HashToURL(nft.artifact_uri) +
    `/?creator=${nft.artist_address}&viewer=${viewer_address || ''}&objkt=${nft.token_id}`
  const artifact_anaverse_url = viewer_address
    ? `https://anaver.se/?gallery=1&loadsingle=1&singlecontract=${HEN_CONTRACT_FA2}&singletokenid=${nft.token_id}&wallet=${viewer_address}&partnerPlatform=teia.art`
    : `https://anaver.se/?gallery=1&loadsingle=1&singlecontract=${HEN_CONTRACT_FA2}&singletokenid=${nft.token_id}&partnerPlatform=teia.art`
  const metadata_ipfs_url = HashToURL(nft.metadata_uri)
  const rightsUri =
    nft.rights === 'custom' && nft.right_uri && nft.right_uri.startsWith('ipfs://')
      ? HashToURL(nft.right_uri)
      : nft.right_uri
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
            <Attribute label="文件类型" value={nft.mime_type} />
            {nft.language && <Attribute label="语言" value={LANGUAGES[nft.language]} />}
            {nft.isNSFW && <Attribute label="内容评级" value="NSFW（成人内容）" />}
            {nft.isPhotosensitive && <Attribute label="无障碍提示" value="含光敏感内容" />}
            {nft.isModerated && nft.artist_address === viewer_address && (
              <Attribute label="内容审核" value="Teia 内容审核团队已对该作品的 NSFW 或光敏属性进行了人工覆盖" />
            )}
            <div className={styles.info_attributes}>
              版权：
              <p>
                {nft.rights ? (
                  nft.rights === 'custom' ? (
                    <a target="_blank" href={rightsUri} rel="noreferrer">自定义</a>
                  ) : (
                    LICENSE_TYPES[nft.rights]
                  )
                ) : (
                  LICENSE_TYPES.none
                )}
              </p>
            </div>
            <div className={styles.info_attributes}>
              铸造日期：
              <p>{getWordDate(nft.minted_at)}</p>
            </div>
          </div>
          <div className={styles.info_ipfs}>
            <a target="_blank" rel="noreferrer" href={metadata_ipfs_url}>元数据</a>
            {' // '}
            <a target="_blank" rel="noreferrer" href={artifact_ipfs_url}>在 IPFS 查看</a>
            {' // '}
            <a target="_blank" rel="noreferrer" href={artifact_anaverse_url}>在 Anaverse 查看</a>
          </div>
        </div>
      </Container>
    </>
  )
}
