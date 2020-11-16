import styles from '../styles/Link.module.css'

function Link({href, children}) {

    const isEmail = RegExp('^mailto:').test(href)
    const isExternal = RegExp('^https?://').test(href)
    
    href = href.replace(/^\.\.\//, '')
    return (
        <a className={styles.link} href={`${isExternal || isEmail? '' : '#'}${href}`} target={isExternal? '_blank' : ''}>{children}</a>
    )
}

export default Link