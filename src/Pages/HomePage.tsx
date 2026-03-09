import { useLanguage } from '../Contexts/LanguageContext';

export const HomePage = () => {
  const { t } = useLanguage();

  return (
    <section>
      <div className='landing'></div>
      <div className='overlay'></div>
      <h1 className='page-title'>MovieFlix</h1>
      <article className='bread-text'>
        {t('welcomeText')}
      </article>
    </section>
  );
};
