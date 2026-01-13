import { getTranslations } from 'next-intl/server';
import { ModalitiesClient } from './modalities-client';

export async function ModalitiesSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'modalitiesSection' });

  const labels = {
    title: t.rich('title', {
      highlight: (chunks) => (
        <span className="text-[#00B4D8]">{chunks}</span>
      )
    }),
    mri: t('mri'),
    ct: t('ct'),
    echo: t('echo'),
    angio: t('angio'),
    oct: t('oct'),
    ecg: t('ecg'),
    nuclear: t('nuclear'),
  };

  return <ModalitiesClient labels={labels} />;
}
