import { Page } from '@atoms/layout'
import styles from '@style'
import { ReactComponent as AboutMD } from '../../lang/zh/about.md'

export function About() {
  return (
    <Page title="关于">
      <div className={styles.about}>
        <AboutMD />
      </div>
    </Page>
  )
}
