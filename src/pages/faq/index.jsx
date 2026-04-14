import styles from '@style'
import { Page } from '@atoms/layout'

const faqs = [
  {
    q: '什么是 Teia？',
    a: 'Teia 是一个建立在 Tezos 区块链上的去中心化数字艺术平台。艺术家可以在此展示和交易数字艺术作品（NFT），收藏家可以发现并收藏感兴趣的作品。'
  },
  {
    q: '什么是 OBJKT？',
    a: 'OBJKT 是 Teia 平台上 NFT 作品的称呼。每件作品都有唯一的编号（如 OBJKT#12345），代表在 Tezos 区块链上铸造的数字资产。'
  },
  {
    q: '如何浏览画廊？',
    a: '首页展示最新和精选作品，你可以使用顶部工具栏切换排序方式（最新销售、随机浏览、最新作品等），也可以通过搜索或标签页筛选感兴趣的内容。'
  },
  {
    q: '如何查看作品详情？',
    a: '点击任意作品缩略图即可进入详情页。详情页包含三个标签：「作品信息」（文件类型、版权、铸造时间等）、「收藏列表」（当前出售信息）和「历史记录」（交易历史）。'
  },
  {
    q: '如何查看艺术家主页？',
    a: '在作品详情页点击艺术家名称，即可进入其个人主页，查看该艺术家的全部作品。'
  },
  {
    q: '我需要 Tezos 钱包吗？',
    a: '仅浏览作品无需钱包。若要购买作品，需要连接 Tezos 钱包（如 Temple、Kukai 或 Umami）。点击右上角「同步」按钮即可连接。'
  },
  {
    q: '如何购买作品？',
    a: '在作品详情页，若作品有出售信息，页面右侧会显示价格和「收藏」按钮。连接钱包后点击该按钮，确认交易即可完成购买。'
  }
]

const resources = [
  { label: '官方文档', href: 'https://github.com/teia-community/teia-docs/wiki' },
  { label: '加入社区 (Discord)', href: 'https://discord.gg/TKeybhYhNe' },
  { label: '用户安全提示', href: 'https://github.com/teia-community/teia-docs/wiki/User-safety' }
]

export const FAQ = () => {
  return (
    <Page title="入门指南">
      <div className={styles.page}>
        <h1>入门指南</h1>
        <p className={styles.subtitle}>欢迎来到 Teia 中文画廊。以下是常见问题解答，帮助你快速上手。</p>

        <section>
          <h2>常见问题</h2>
          {faqs.map(({ q, a }) => (
            <div key={q} className={styles.faq_item}>
              <h3>{q}</h3>
              <p>{a}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>更多资源</h2>
          <ul>
            {resources.map(({ label, href }) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noreferrer">{label}</a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Page>
  )
}
