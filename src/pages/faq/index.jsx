import { useState } from 'react'
import { Page } from '@atoms/layout'
import { Button } from '@atoms/button'
import styles from '@style'
import { Line } from '@atoms/line'

export const FAQ = () => {
  const Question = ({ text, answer }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <li className={styles.buttons}>
        <Button onClick={() => setIsOpen(!isOpen)}>{text}</Button>
        {isOpen && (
          <div className={styles.faq__answer} dangerouslySetInnerHTML={{ __html: answer }} />
        )}
      </li>
    )
  }

  return (
    <Page title="入门指南" large>
      <div className={styles.faq__outer__container}>
        <h1 className={styles.faq__title}>Teia 中文画廊 · 入门指南</h1>
        <ul className={styles.faq__container}>
          <Question
            text="什么是 Teia？"
            answer={`<div class="markdown-body"><br/><p>Teia 是一个基于 <strong>Tezos 区块链</strong>的开源数字艺术平台，由艺术家、收藏家和开发者共同维护。平台上的每件作品都以 NFT（OBJKT）形式存储在区块链上，确保作品的真实性和所有权记录。</p><br/><p>Teia 中文画廊是 Teia 的中文版只读展示界面，专注于作品浏览和艺术家发现。</p><br/><p>官方网站：<a href="https://teia.art" target="_blank" rel="noreferrer">teia.art</a></p></div>`}
          />
          <Question
            text="什么是 OBJKT（作品）？"
            answer={`<div class="markdown-body"><br/><p>OBJKT 是 Teia 平台上 NFT 作品的称呼。每个 OBJKT 可以是：</p><ul><li>图片（JPG、PNG、GIF 等）</li><li>视频（MP4 等）</li><li>音频（MP3、WAV 等）</li><li>3D 模型（GLB 格式）</li><li>交互式 HTML/SVG</li><li>PDF 文档</li></ul><br/><p>每件作品都有唯一的 ID，可通过 <code>teia.art/objkt/[ID]</code> 直接访问。</p></div>`}
          />
          <Question
            text="如何浏览画廊？"
            answer={`<div class="markdown-body"><br/><h2>首页信息流</h2><p>首页默认展示最新作品动态，你可以通过顶部工具栏切换不同的浏览模式：</p><ul><li><strong>最新销售</strong> - 查看最近成交的作品</li><li><strong>新作品</strong> - 刚刚发布的新 OBJKT</li><li><strong>随机</strong> - 随机浏览作品</li><li><strong>按媒体类型筛选</strong> - 图片、视频、音频、3D、HTML 等</li></ul><br/><h2>搜索</h2><p>点击菜单中的“搜索”，输入关键词可搜索作品标题、描述，或直接搜索艺术家用户名。</p></div>`}
          />
          <Question
            text="如何查看作品详情？"
            answer={`<div class="markdown-body"><br/><p>点击任意作品缩略图即可进入作品详情页，包含：</p><ul><li><strong>作品信息</strong> - 标题、描述、创作者、版次数量、版税比例、标签、许可证等</li><li><strong>收藏列表</strong> - 当前在售的版次和价格，以及所有持有者</li><li><strong>历史记录</strong> - 作品的所有链上交易记录</li></ul></div>`}
          />
          <Question
            text="什么是 Tezos 钉包？连接钉包有什么用？"
            answer={`<div class="markdown-body"><br/><p>Tezos 钉包是访问 Tezos 区块链的账户，每个钉包有唯一的地址（以 <code>tz1</code> 开头）。</p><br/><p>在 Teia 中文画廊<strong>浏览作品不需要钉包</strong>。但如果你想查看自己的个人主页或收藏，需要连接钉包。</p><br/><h3>推荐钉包</h3><ul><li><a href="https://templewallet.com/" target="_blank" rel="noreferrer">Temple Wallet</a> - 浏览器插件</li><li><a href="https://wallet.kukai.app/" target="_blank" rel="noreferrer">Kukai Wallet</a> - 网页鑉包，支持手机端</li></ul></div>`}
          />
        </ul>
      </div>
      <br />
      <Line />
      <div className={styles.faq__outer__container}>
        <h1>更多资源</h1>
        <ul className={styles.faq__container}>
          <Question
            text="官方文档"
            answer={`<p>访问 <a href="https://github.com/teia-community/teia-docs/wiki" target="_blank" rel="noopener noreferrer">Teia 文档 Wiki</a> 获取完整指南（英文）。</p>`}
          />
          <Question
            text="加入社区"
            answer={`<p>加入 <a href="https://discord.com/invite/7pZrPCcgnG" target="_blank" rel="noopener noreferrer">Teia Discord 社区</a>，与来自全球的艺术家和收藏家交流。</p>`}
          />
          <Question
            text="用户安全提示"
            answer={`<ul><li><strong>永远不要分享你的钉包助记词（私鑰）</strong></li><li>使用官方鑉包和平台</li><li>警惕假冒 Teia 网站的钓鱼攻击</li><li>交易前仔细核对合约地址</li></ul>`}
          />
        </ul>
      </div>
    </Page>
  )
}
