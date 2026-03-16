import { NavLink, useLocation } from 'react-router-dom';
import styles from './navbar.module.css';
import { useLanguage } from '../../Contexts/LanguageContext';

const activeClass = ({ isActive }: NavbarProps) =>
  isActive ? styles.active : '';

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const isAwardsActive = location.pathname.startsWith('/awards');

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
                {t('tvShows')}
              </NavLink>
            </li>
            <li className={`${styles.menuItem} ${styles.dropdown}`}>
              <span className={`${styles.dropdownTrigger} ${isAwardsActive ? styles.active : ''}`}>
                {t('awards')} ▾
              </span>
              <ul className={styles.dropdownMenu}>
                <li>
                  <NavLink className={activeClass} to='/awards/popular'>
                    {t('awardsPopular')}
                  </NavLink>
                </li>
                <li>
                  <NavLink className={activeClass} to='/awards/upcoming'>
                    {t('awardsUpcoming')}
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className={styles.languageSelector}>
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="ar-AE">العربية (Arabic)</option>
                <option value="bg-BG">български език (Bulgarian)</option>
                <option value="ca-ES">Català (Catalan)</option>
                <option value="cs-CZ">Český (Czech)</option>
                <option value="da-DK">Dansk (Danish)</option>
                <option value="de-DE">Deutsch (German)</option>
                <option value="el-GR">ελληνικά (Greek)</option>
                <option value="en-US">English (English)</option>
                <option value="es-ES">Español (Spanish)</option>
                <option value="es-MX">Español (Spanish)</option>
                <option value="fa-IR">فارسی (Persian)</option>
                <option value="fi-FI">suomi (Finnish)</option>
                <option value="fr-CA">Français (French)</option>
                <option value="fr-FR">Français (French)</option>
                <option value="he-IL">עִבְרִית (Hebrew)</option>
                <option value="hr-HR">Hrvatski (Croatian)</option>
                <option value="hu-HU">Magyar (Hungarian)</option>
                <option value="id-ID">Bahasa indonesia (Indonesian)</option>
                <option value="it-IT">Italiano (Italian)</option>
                <option value="ja-JP">日本語 (Japanese)</option>
                <option value="ka-GE">ქართული (Georgian)</option>
                <option value="ko-KR">한국어/조선말 (Korean)</option>
                <option value="lt-LT">Lietuvių (Lithuanian)</option>
                <option value="nb-NO">Bokmål (Norwegian Bokmål)</option>
                <option value="nl-NL">Nederlands (Dutch)</option>
                <option value="no-NO">Norsk (Norwegian)</option>
                <option value="pl-PL">Polski (Polish)</option>
                <option value="pt-BR">Português (Portuguese)</option>
                <option value="pt-PT">Português (Portuguese)</option>
                <option value="ro-RO">Română (Romanian)</option>
                <option value="ru-RU">Pусский (Russian)</option>
                <option value="sk-SK">Slovenčina (Slovak)</option>
                <option value="sr-RS">Srpski (Serbian)</option>
                <option value="sv-SE">svenska (Swedish)</option>
                <option value="th-TH">ภาษาไทย (Thai)</option>
                <option value="tr-TR">Türkçe (Turkish)</option>
                <option value="uk-UA">Український (Ukrainian)</option>
                <option value="vi-VN">Tiếng Việt (Vietnamese)</option>
                <option value="zh-CN">普通话 (Mandarin)</option>
                <option value="zh-HK">普通话 (Mandarin)</option>
                <option value="zh-TW">普通话 (Mandarin)</option>
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
