'use client';

import { Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { EventHeroContent } from '../types';

type EventHeroProps = {
  content: EventHeroContent;
};

const baselineY = 80;
const baseCyclePath =
  'M0 80 L120 80 L140 70 L160 80 L200 80 L220 130 L240 20 L260 130 L280 80 L320 80 L340 60 L360 80';

const ecgPathSegments = [0, 360, 720].map((offset) =>
  baseCyclePath.replace(/(M|L)(\d+)/g, (match, command, value) => {
    const numericValue = Number(value) + offset;
    return `${command}${numericValue}`;
  })
);

const ecgPathD = ecgPathSegments
  .map((segment, index) => (index === 0 ? segment : segment.replace(/^M/, 'L')))
  .join(' ');

const horizontalScale = 1440 / 1080;
const verticalScale = 1.5;
const ecgTransform = `translate(0, ${baselineY}) scale(${horizontalScale}, ${verticalScale}) translate(0, -${baselineY})`;
const waveformOffsetY = 12;

export function EventHero({ content }: EventHeroProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, #FAFBFC 0%, #F0F9FA 50%, #E8F6F7 100%)'
        }}
      />

      <svg
        aria-hidden
        className="hidden md:block absolute left-0 right-0 top-16 md:top-20 w-full h-28 opacity-60 z-0"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="ecgGlowGradientEvent"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="200"
            y2="0"
          >
            <stop offset="0" stopColor="#00B4D8" stopOpacity="0" />
            <stop offset="0.5" stopColor="#00B4D8" stopOpacity="1" />
            <stop offset="1" stopColor="#00B4D8" stopOpacity="0" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="-200 0"
              to="1440 0"
              dur="5s"
              repeatCount="indefinite"
            />
          </linearGradient>
          <filter id="ecgGlowEvent" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g transform={`translate(0, ${waveformOffsetY}) ${ecgTransform}`}>
          <path
            d={ecgPathD}
            fill="none"
            stroke="#00B4D8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.25"
          />
          <path
            d={ecgPathD}
            fill="none"
            stroke="url(#ecgGlowGradientEvent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            filter="url(#ecgGlowEvent)"
          />
        </g>
      </svg>

      <div className="container mx-auto px-4 py-16 md:py-24 text-center relative z-10">
        <div
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00B4D8]/10 border border-[#00B4D8]/30 text-[#00B4D8] text-base font-semibold mb-6 animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#00B4D8] animate-pulse" />
          {content.badge}
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-[#061024] mb-4 tracking-tight animate-fade-in-up"
          style={{
            fontFamily: 'var(--font-calistoga), serif',
            animationDelay: '0.2s'
          }}
        >
          {content.title}
        </h1>

        <p
          className="text-xl sm:text-2xl md:text-3xl text-[#061024] max-w-4xl mx-auto mb-10 animate-fade-in-up"
          style={{
            fontFamily: 'var(--font-calistoga), serif',
            animationDelay: '0.25s'
          }}
        >
          Le <span className="hero-highlight">Core Lab académique</span> de référence en imagerie cardiovasculaire multimodale
        </p>


        <div
          className="flex flex-wrap justify-center gap-5 mb-12 animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#061024]/10 text-[#061024] shadow-sm">
            <Calendar className="w-6 h-6 text-[#00B4D8]" />
            <div className="flex flex-col text-left">
              <span className="font-semibold text-lg">{content.date}</span>
              <span className="text-base text-[#061024]/70">{content.time}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#061024]/10 text-[#061024] shadow-sm">
            <MapPin className="w-6 h-6 text-[#00B4D8]" />
            <div className="flex flex-col text-left">
              <span className="text-lg">{content.location}</span>
              <span className="text-base font-semibold text-[#061024]">{content.locationSubtitle}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#061024]/10 text-[#061024] shadow-sm">
            <Users className="w-6 h-6 text-[#00B4D8]" />
            <span className="text-lg">{content.maxParticipants}</span>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
          style={{ animationDelay: '0.5s' }}
        >
          <Button
            size="lg"
            className="cursor-pointer rounded-full border-2 border-[#F33349] bg-[#F33349] px-8 py-6 text-lg font-semibold text-white transition-colors hover:bg-white hover:text-[#F33349] shadow-lg hover:shadow-xl"
            onClick={() => scrollToSection('registration-section')}
          >
            {content.ctaRegister}
          </Button>

          <Button
            size="lg"
            className="cursor-pointer rounded-full border-2 border-[#061024] bg-transparent px-8 py-6 text-lg font-semibold text-[#061024] transition-colors hover:bg-[#061024] hover:text-white"
            onClick={() => scrollToSection('program-section')}
          >
            {content.ctaProgram}
          </Button>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
