import { NavLink } from 'react-router-dom';
import styles from './navbar.module.css';
import { useLanguage } from '../../Contexts/LanguageContext';

const activeClass = ({ isActive }: NavbarProps) =>
  isActive ? styles.active : '';

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <>
      <header className={styles.navbarHeader}>
        <nav className={styles.navbar}>
          <ul>
            <li className={styles.logo}>MovieFlix</li>
            <li className={styles.toggle}>
              <input type='checkbox' className={styles.menuBtn} id='menuBtn' />
              <label htmlFor='menuBtn' className={styles.menuIcon}>
                <span className={styles.navIcon}></span>
              </label>
            </li>
            <li className={styles.menuItem}>
              <NavLink className={activeClass} to='/'>
                {t('home')}
              </NavLink>
            </li>
            <li className={styles.menuItem}>
              <NavLink className={activeClass} to='/movies'>
                {t('movies')}
              </NavLink>
            </li>
            <li id='orders' className={styles.menuItem}>
              <NavLink className={activeClass} to='/shows'>
                {t('shows')}
              </NavLink>
            </li>
            <li className={styles.languageSelector}>
              <select value={language} onChange={(e) => setLanguage(e.target.value as 'en-US' | 'es-ES' | 'sv-SE')}>
                <option value="en-US">English</option>
                <option value="es-ES">Español</option>
                <option value="sv-SE">Svenska</option>
              </select>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
export default Navbar;

type NavbarProps = {
  isActive: boolean;
};
