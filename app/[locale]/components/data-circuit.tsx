import { getTranslations } from 'next-intl/server';
import { DataCircuitClient } from './data-circuit-client';

export async function DataCircuitSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'dataCircuit' });

  return <DataCircuitClient title={t('title')} />;
}
