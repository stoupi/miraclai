'use client';

import { useState } from 'react';
import { Database, Eye, PenTool, Brain, FileText } from 'lucide-react';

type CircuitStep = {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  details: string;
};

const circuitSteps: CircuitStep[] = [
  {
    id: 'collecte',
    icon: <Database className="w-7 h-7" />,
    label: 'Collecte',
    description: 'Constitution de bases de données d\'imagerie cardiovasculaire.',
    details: 'Collecte multicentrique, anonymisation, harmonisation, structuration...',
  },
  {
    id: 'relecture',
    icon: <Eye className="w-7 h-7" />,
    label: 'Relecture',
    description: 'Analyse experte et standardisée des images.',
    details: 'Protocoles validés, gestion des divergences, traçabilité, contrôle qualité...',
  },
  {
    id: 'annotations',
    icon: <PenTool className="w-7 h-7" />,
    label: 'Annotations',
    description: 'Production de vérités terrain fiables.',
    details: 'Segmentations, scorings, extractions de variables, ground truth...',
  },
  {
    id: 'ia',
    icon: <Brain className="w-7 h-7" />,
    label: 'IA',
    description: 'Développement et validation d\'algorithmes.',
    details: 'Entraînement, évaluation, validation de modèles...',
  },
  {
    id: 'valorisation',
    icon: <FileText className="w-7 h-7" />,
    label: 'Valorisation',
    description: 'Valorisation scientifique et collaborative.',
    details: 'Publications, communications, projets collaboratifs...',
  },
];

function CurvedArrow({ mirrored = false }: { mirrored?: boolean }) {
  const arrowId = mirrored ? 'arrowhead-mirrored' : 'arrowhead';
  return (
    <svg
      className={`w-40 h-8 flex-shrink-0 -mx-14 ${mirrored ? 'scale-y-[-1]' : ''}`}
      viewBox="0 0 100 32"
      fill="none"
    >
      <defs>
        <marker
          id={arrowId}
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <polygon
            points="0 0, 8 3, 0 6"
            fill="#0A2540"
          />
        </marker>
      </defs>
      <path
        d="M 2 12 Q 50 28, 98 12"
        stroke="#0A2540"
        strokeWidth="1"
        fill="none"
        markerEnd={`url(#${arrowId})`}
      />
    </svg>
  );
}

function StepNode({ step, isActive, onHover, onLeave }: {
  step: CircuitStep;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center text-center max-w-[180px] cursor-pointer group"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Circle with icon */}
      <div
        className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
          isActive
            ? 'bg-[#00B4D8] scale-110 shadow-lg shadow-[#00B4D8]/30'
            : 'bg-[#0A2540] group-hover:bg-[#00B4D8] group-hover:scale-105'
        }`}
      >
        <div className="text-white">{step.icon}</div>
      </div>

      {/* Label */}
      <h3
        className={`mt-4 text-lg md:text-xl font-bold transition-colors duration-300 ${
          isActive ? 'text-[#00B4D8]' : 'text-[#0A2540]'
        }`}
      >
        {step.label}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm text-[#0A2540]/80 leading-relaxed">
        {step.description}
      </p>

      {/* Details (shown on hover) */}
      <p
        className={`mt-2 text-xs text-[#0A2540]/60 italic transition-all duration-300 ${
          isActive ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'
        }`}
      >
        {step.details}
      </p>
    </div>
  );
}

export function DataCircuitClient({ title }: { title: string }) {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="relative w-full py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[#00B4D8] font-medium mb-2">
            👉 MIRACL.ai vous accompagne de la donnée à la publication
          </p>
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-medium text-[#0A2540]"
            style={{ fontFamily: 'var(--font-calistoga), serif' }}
          >
            {title}
          </h2>
        </div>

        {/* Desktop: Horizontal flow with curved arrows */}
        <div className="hidden lg:flex items-start justify-center">
          {circuitSteps.map((step, index) => (
            <div key={step.id} className="flex items-start">
              <StepNode
                step={step}
                isActive={activeStep === index}
                onHover={() => setActiveStep(index)}
                onLeave={() => setActiveStep(null)}
              />
              {index < circuitSteps.length - 1 && (
                <div className={index === 0 || index === 2 ? 'mt-10' : 'mt-4'}>
                  <CurvedArrow mirrored={index === 1 || index === 3} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tablet: Grid */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-8">
            {circuitSteps.slice(0, 3).map((step, index) => (
              <StepNode
                key={step.id}
                step={step}
                isActive={activeStep === index}
                onHover={() => setActiveStep(index)}
                onLeave={() => setActiveStep(null)}
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-8 max-w-xl mx-auto">
            {circuitSteps.slice(3).map((step, index) => (
              <StepNode
                key={step.id}
                step={step}
                isActive={activeStep === index + 3}
                onHover={() => setActiveStep(index + 3)}
                onLeave={() => setActiveStep(null)}
              />
            ))}
          </div>
        </div>

        {/* Mobile: Vertical with connecting lines */}
        <div className="md:hidden flex flex-col items-center">
          {circuitSteps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <StepNode
                step={step}
                isActive={activeStep === index}
                onHover={() => setActiveStep(index)}
                onLeave={() => setActiveStep(null)}
              />
              {index < circuitSteps.length - 1 && (
                <div className="w-0.5 h-8 bg-[#00B4D8]/30 my-4" />
              )}
            </div>
          ))}
        </div>

        {/* Hint */}
        <p className="text-center text-[#0A2540]/40 text-sm mt-12">
          Survolez les étapes pour plus de détails
        </p>
      </div>
    </section>
  );
}
