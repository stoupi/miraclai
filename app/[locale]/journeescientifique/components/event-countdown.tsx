'use client';

import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import type { EventCountdownContent } from '../types';

type EventCountdownProps = {
  content: EventCountdownContent;
  targetDate: Date;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const difference = targetDate.getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
}

export function EventCountdown({ content, targetDate }: EventCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 text-[#00B4D8] font-medium mb-6">
            <Calendar className="w-5 h-5" />
            <span className="uppercase tracking-wider text-sm">{content.title}</span>
          </div>
          <div className="flex justify-center gap-4 md:gap-8">
            {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
              <div key={unit} className="flex flex-col items-center">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-[#00B4D8]/5 to-[#00B4D8]/10 flex items-center justify-center">
                  <span className="text-3xl md:text-5xl font-bold text-[#061024]">--</span>
                </div>
                <span className="mt-2 text-sm text-[#061024]/60 capitalize">
                  {content[`${unit}Label` as keyof EventCountdownContent]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const timeUnits = [
    { value: timeLeft.days, label: content.daysLabel },
    { value: timeLeft.hours, label: content.hoursLabel },
    { value: timeLeft.minutes, label: content.minutesLabel },
    { value: timeLeft.seconds, label: content.secondsLabel }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 text-[#00B4D8] font-medium mb-6">
          <Calendar className="w-5 h-5" />
          <span className="uppercase tracking-wider text-sm">{content.title}</span>
        </div>

        <div className="flex justify-center gap-4 md:gap-8 mb-8">
          {timeUnits.map((unit, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-[#00B4D8]/5 to-[#00B4D8]/15 border border-[#00B4D8]/20 flex items-center justify-center shadow-lg"
                style={{
                  boxShadow: '0 10px 40px -10px rgba(0, 180, 216, 0.2)'
                }}
              >
                <span
                  className="text-3xl md:text-5xl font-bold text-[#061024]"
                  style={{ fontFamily: 'var(--font-geist-sans)' }}
                >
                  {String(unit.value).padStart(2, '0')}
                </span>
              </div>
              <span className="mt-3 text-sm text-[#061024]/60 font-medium">{unit.label}</span>
            </div>
          ))}
        </div>

        <p className="text-[#061024]/70 max-w-xl mx-auto">{content.subtitle}</p>
      </div>
    </section>
  );
}
