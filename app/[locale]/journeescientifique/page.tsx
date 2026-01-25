import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

import { EventNavbar } from './components/event-navbar';
import { EventHero } from './components/event-hero';
import { EventCountdown } from './components/event-countdown';
import { EventAbout } from './components/event-about';
import { EventProgram } from './components/event-program';
import { EventRegistration } from './components/event-registration';
import { Footer } from '../components/footer';
import type {
  JourneeScientifiquePageContent,
  EventFeature,
  EventTheme,
  ProgramBlock
} from './types';

type Params = {
  params: Promise<{ locale: string }>;
};

export default async function JourneeScientifiquePage({ params }: Params) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'journeeScientifique' });

  const featureKeys = ['corelabExpertise', 'dataManagement', 'collaboration', 'innovation'] as const;
  const features: EventFeature[] = featureKeys.map((key, index) => ({
    icon: (['heart', 'brain', 'users', 'target'] as const)[index],
    title: t(`about.features.${key}.title`),
    description: t(`about.features.${key}.description`)
  }));

  const themeKeys = [
    'mri',
    'ct',
    'echo',
    'nuclear',
    'ecg',
    'angio',
    'ai',
    'dataManagement'
  ] as const;
  const themes: EventTheme[] = themeKeys.map((key) => ({
    label: t(`themes.items.${key}`)
  }));

  const programBlocks: ProgramBlock[] = [
    {
      blockTitle: t('program.blocks.welcome.title'),
      sessions: [
        {
          time: '9h30 – 10h00',
          title: t('program.blocks.welcome.sessions.coffee'),
          isBreak: true,
          breakIcon: 'coffee'
        }
      ]
    },
    {
      blockTitle: t('program.blocks.session1.title'),
      blockSubtitle: t('program.blocks.session1.subtitle'),
      sessions: [
        {
          time: '10h00 – 11h00',
          title: t('program.blocks.session1.sessions.whoAreWe.title'),
          speakers: [
            {
              name: 'Gilles Soulat & Théo Pezel',
              affiliation: 'HEGP, CHU Lariboisière, AP-HP',
              topic: t('program.blocks.session1.sessions.whoAreWe.topics.presentation')
            },
            {
              name: 'Solenn Toupin & Marine Beaumont',
              affiliation: 'CHU Lariboisière, CHRU Nancy',
              topic: t('program.blocks.session1.sessions.whoAreWe.topics.dataManagement')
            },
            {
              name: 'Éric Vicaut',
              affiliation: 'URC AP-HP Nord',
              topic: t('program.blocks.session1.sessions.whoAreWe.topics.methodology')
            },
            {
              name: 'Gabriel Steg, Milan Lazarevic, Quentin Demanet',
              affiliation: 'AP-HP',
              topic: t('program.blocks.session1.sessions.whoAreWe.topics.carnot')
            }
          ]
        },
        {
          time: '11h00 – 11h15',
          title: t('program.blocks.session1.sessions.break'),
          isBreak: true,
          breakIcon: 'coffee'
        },
        {
          time: '11h15 – 12h30',
          title: t('program.blocks.session1.sessions.services.title'),
          speakers: [
            {
              name: 'François Pontana',
              affiliation: 'CHU de Lille',
              topic: t('program.blocks.session1.sessions.services.topics.ct')
            },
            {
              name: 'Jérôme Garot',
              affiliation: 'ICPS, Massy',
              topic: t('program.blocks.session1.sessions.services.topics.mri')
            },
            {
              name: 'Yohann Bohbot, Augustin Coisne, Olivier Huttin',
              affiliation: 'CHU Amiens, Lille, Nancy',
              topic: t('program.blocks.session1.sessions.services.topics.echo')
            },
            {
              name: 'Fabien Hyafil',
              affiliation: 'HEGP, AP-HP',
              topic: t('program.blocks.session1.sessions.services.topics.nuclear')
            },
            {
              name: 'Christian De Chillou',
              affiliation: 'CHRU Nancy',
              topic: t('program.blocks.session1.sessions.services.topics.ecg')
            },
            {
              name: 'Jean-Guillaume Dillinger',
              affiliation: 'CHU Lariboisière, AP-HP',
              topic: t('program.blocks.session1.sessions.services.topics.angio')
            },
            {
              name: 'Jean-Nicolas Dacher',
              affiliation: 'CHU de Rouen',
              topic: t('program.blocks.session1.sessions.services.topics.multimodal')
            },
            {
              name: 'Allyre Lohier',
              affiliation: 'DRCI, AP-HP',
              topic: t('program.blocks.session1.sessions.services.topics.regulatory')
            }
          ]
        }
      ]
    },
    {
      blockTitle: t('program.blocks.lunch.title'),
      sessions: [
        {
          time: '12h30 – 13h30',
          title: t('program.blocks.lunch.session'),
          isBreak: true,
          breakIcon: 'lunch'
        }
      ]
    },
    {
      blockTitle: t('program.blocks.session2.title'),
      blockSubtitle: t('program.blocks.session2.subtitle'),
      sessions: [
        {
          time: '13h30 – 15h00',
          title: t('program.blocks.session2.sessions.collaborations.title'),
          speakers: [
            {
              name: 'Karim Wahbi',
              affiliation: 'CHU Cochin, AP-HP',
              topic: t('program.blocks.session2.sessions.collaborations.topics.fhu')
            },
            {
              name: 'Mathieu Kerneis',
              affiliation: 'CHU Pitié Salpétrière, AP-HP',
              topic: t('program.blocks.session2.sessions.collaborations.topics.myocarditis')
            },
            {
              name: 'Charles Fauvel & Léa Cymes',
              affiliation: 'CHU de Rouen, BMS',
              topic: t('program.blocks.session2.sessions.collaborations.topics.hcm')
            },
            {
              name: 'Jean-Sebastien Hulot',
              affiliation: 'HEGP, AP-HP',
              topic: t('program.blocks.session2.sessions.collaborations.topics.impulsion')
            },
            {
              name: 'Théo Pezel',
              affiliation: 'CHU Lariboisière, AP-HP',
              topic: t('program.blocks.session2.sessions.collaborations.topics.esc')
            },
            {
              name: 'Gilles Soulat',
              affiliation: 'HEGP, AP-HP',
              topic: t('program.blocks.session2.sessions.collaborations.topics.phrc')
            }
          ]
        },
        {
          time: '15h00 – 15h15',
          title: t('program.blocks.session2.sessions.break'),
          isBreak: true,
          breakIcon: 'coffee'
        },
        {
          time: '15h15 – 16h00',
          title: t('program.blocks.session2.sessions.phd.title'),
          speakers: [
            {
              name: 'Jeremy Florence',
              affiliation: 'PhD MIRACL.ai, Clermont-Ferrand',
              topic: t('program.blocks.session2.sessions.phd.topics.lge')
            },
            {
              name: 'Sofiane Sifaoui',
              affiliation: 'PhD MIRACL.ai, Télécom/Polytechnique Paris',
              topic: t('program.blocks.session2.sessions.phd.topics.deepLearning')
            },
            {
              name: 'Alex Unger',
              affiliation: 'PhD MIRACL.ai, Bruxelles',
              topic: t('program.blocks.session2.sessions.phd.topics.derivate')
            },
            {
              name: 'Julien Hudelo',
              affiliation: 'PhD MIRACL.ai, Amiens',
              topic: t('program.blocks.session2.sessions.phd.topics.cesar')
            }
          ]
        }
      ]
    }
  ];

  const professionOptions = [
    t('registration.fields.professionOptions.cardiologist'),
    t('registration.fields.professionOptions.radiologist'),
    t('registration.fields.professionOptions.researcher'),
    t('registration.fields.professionOptions.engineer'),
    t('registration.fields.professionOptions.industry'),
    t('registration.fields.professionOptions.other')
  ];

  const content: JourneeScientifiquePageContent = {
    hero: {
      badge: t.rich('hero.badge', {
        sup: (chunks: ReactNode) => <sup>{chunks}</sup>
      }),
      title: t('hero.title'),
      subtitle: t('hero.subtitle'),
      date: t('hero.date'),
      time: t('hero.time'),
      location: t('hero.location'),
      locationSubtitle: t('hero.locationSubtitle'),
      locationDetail: t('hero.locationDetail'),
      maxParticipants: t('hero.maxParticipants'),
      ctaRegister: t('hero.ctaRegister'),
      ctaProgram: t('hero.ctaProgram')
    },
    countdown: {
      title: t('countdown.title'),
      daysLabel: t('countdown.daysLabel'),
      hoursLabel: t('countdown.hoursLabel'),
      minutesLabel: t('countdown.minutesLabel'),
      secondsLabel: t('countdown.secondsLabel'),
      subtitle: t('countdown.subtitle')
    },
    about: {
      title: t('about.title'),
      description: t('about.description'),
      features
    },
    themes: {
      title: t('themes.title'),
      themes
    },
    program: {
      title: t('program.title'),
      date: t('program.date'),
      blocks: programBlocks
    },
    registration: {
      title: t('registration.title'),
      subtitle: t('registration.subtitle'),
      maxParticipants: t('registration.maxParticipants'),
      fields: {
        firstName: t('registration.fields.firstName'),
        firstNamePlaceholder: t('registration.fields.firstNamePlaceholder'),
        lastName: t('registration.fields.lastName'),
        lastNamePlaceholder: t('registration.fields.lastNamePlaceholder'),
        email: t('registration.fields.email'),
        emailPlaceholder: t('registration.fields.emailPlaceholder'),
        profession: t('registration.fields.profession'),
        professionPlaceholder: t('registration.fields.professionPlaceholder'),
        professionOptions,
        institution: t('registration.fields.institution'),
        institutionPlaceholder: t('registration.fields.institutionPlaceholder')
      },
      submitButton: t('registration.submitButton'),
      consent: t('registration.consent'),
      successMessage: t('registration.successMessage'),
      errorMessage: t('registration.errorMessage')
    }
  };

  const targetDate = new Date('2026-04-08T10:00:00');

  return (
    <main className="min-h-screen">
      <EventNavbar />
      <EventHero content={content.hero} />
      <EventCountdown content={content.countdown} targetDate={targetDate} />
      <EventAbout about={content.about} themes={content.themes} />
      <EventProgram content={content.program} />
      <EventRegistration content={content.registration} />
      <Footer locale={locale} />
    </main>
  );
}
