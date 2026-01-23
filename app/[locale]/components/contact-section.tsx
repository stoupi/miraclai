'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { submitContactForm } from '@/lib/actions/contact';
import { toast } from 'sonner';

type FormData = {
  name: string;
  email: string;
  organization: string;
  role: string;
  projectType: string;
  hasFunding: string;
  fundingStatus: string;
  services: string[];
  modalities: string[];
  subject: string;
  message: string;
};

const initialFormData: FormData = {
  name: '',
  email: '',
  organization: '',
  role: '',
  projectType: '',
  hasFunding: '',
  fundingStatus: '',
  services: [],
  modalities: [],
  subject: '',
  message: '',
};

export function ContactSection({ locale }: { locale: string }) {
  const t = useTranslations('contactSection');
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { execute, isPending: isLoading } = useAction(submitContactForm, {
    onSuccess: () => {
      setIsSubmitted(true);
      toast.success(t('successTitle'));
    },
    onError: (error) => {
      console.error('Contact form error:', error);
      toast.error(t('errorMessage') || 'Une erreur est survenue');
    },
  });

  const roleOptions = [
    { value: 'researcher', label: t('roleResearcher') },
    { value: 'clinician', label: t('roleClinician') },
    { value: 'industry', label: t('roleIndustry') },
    { value: 'other', label: t('roleOther') },
  ];

  const serviceOptions = [
    { value: 'database', label: t('serviceDatabase') },
    { value: 'reading', label: t('serviceReading') },
    { value: 'groundtruth', label: t('serviceGroundTruth') },
    { value: 'ai', label: t('serviceAI') },
    { value: 'valorization', label: t('serviceValorization') },
    { value: 'other', label: t('serviceOther') },
  ];

  const projectTypeOptions = [
    { value: 'academic', label: t('projectAcademic') },
    { value: 'industrial', label: t('projectIndustrial') },
    { value: 'mixed', label: t('projectMixed') },
  ];

  const fundingOptions = [
    { value: 'yes', label: t('fundingYes') },
    { value: 'no', label: t('fundingNo') },
    { value: 'searching', label: t('fundingSearching') },
  ];

  const fundingStatusOptions = [
    { value: 'obtained', label: t('fundingObtained') },
    { value: 'pending', label: t('fundingPending') },
    { value: 'submitted', label: t('fundingSubmitted') },
  ];

  const modalityOptions = [
    { value: 'mri', label: t('modalityMRI') },
    { value: 'ct', label: t('modalityCT') },
    { value: 'echo', label: t('modalityEcho') },
    { value: 'ecg', label: t('modalityECG') },
    { value: 'angio', label: t('modalityAngio') },
    { value: 'nuclear', label: t('modalityNuclear') },
    { value: 'other', label: t('modalityOther') },
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((serviceItem) => serviceItem !== service)
        : [...prev.services, service],
    }));
  };

  const handleModalityToggle = (modality: string) => {
    setFormData((prev) => ({
      ...prev,
      modalities: prev.modalities.includes(modality)
        ? prev.modalities.filter((modalityItem) => modalityItem !== modality)
        : [...prev.modalities, modality],
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    execute(formData);
  };

  if (isSubmitted) {
    return (
      <section className="relative w-full py-16 md:py-24 bg-[#030b1d]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#030b1d]/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-[#00B4D8]" />
            </div>
            <h2
              className="text-3xl md:text-4xl font-medium text-white mb-4"
              style={{ fontFamily: 'var(--font-calistoga), serif' }}
            >
              {t('successTitle')}
            </h2>
            <p className="text-white/80 text-lg">
              {t('successMessage')}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact-section" className="relative w-full py-16 md:py-24 bg-[#030b1d] scroll-mt-28">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-4"
              style={{ fontFamily: 'var(--font-calistoga), serif' }}
            >
              {t('title')}
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto whitespace-pre-line">
              {t('subtitle')}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 md:p-10 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold text-[#0A2540]">
                  {t('labelName')} <span className="text-[#F33349]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(event) => handleInputChange('name', event.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none transition-all"
                  placeholder={t('placeholderName')}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-[#0A2540]">
                  {t('labelEmail')} <span className="text-[#F33349]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(event) => handleInputChange('email', event.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none transition-all"
                  placeholder={t('placeholderEmail')}
                />
              </div>

              {/* Organization */}
              <div className="flex flex-col gap-2">
                <label htmlFor="organization" className="text-sm font-semibold text-[#0A2540]">
                  {t('labelOrganization')} <span className="text-[#F33349]">*</span>
                </label>
                <input
                  type="text"
                  id="organization"
                  required
                  value={formData.organization}
                  onChange={(event) => handleInputChange('organization', event.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none transition-all"
                  placeholder={t('placeholderOrganization')}
                />
              </div>

              {/* Role */}
              <div className="flex flex-col gap-2">
                <label htmlFor="role" className="text-sm font-semibold text-[#0A2540]">
                  {t('labelRole')}
                </label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(event) => handleInputChange('role', event.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none transition-all bg-white cursor-pointer"
                >
                  <option value="">{t('placeholderRole')}</option>
                  {roleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Project Type & Funding */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {/* Project Type */}
              <div className="flex flex-col gap-2">
                <label htmlFor="projectType" className="text-sm font-semibold text-[#0A2540]">
                  {t('labelProjectType')}
                </label>
                <select
                  id="projectType"
                  value={formData.projectType}
                  onChange={(event) => handleInputChange('projectType', event.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none transition-all bg-white cursor-pointer"
                >
                  <option value="">{t('placeholderProjectType')}</option>
                  {projectTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Has Funding */}
              <div className="flex flex-col gap-2">
                <label htmlFor="hasFunding" className="text-sm font-semibold text-[#0A2540]">
                  {t('labelHasFunding')}
                </label>
                <select
                  id="hasFunding"
                  value={formData.hasFunding}
                  onChange={(event) => handleInputChange('hasFunding', event.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none transition-all bg-white cursor-pointer"
                >
                  <option value="">{t('placeholderHasFunding')}</option>
                  {fundingOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Funding Status - only show if hasFunding is 'yes' */}
              {formData.hasFunding === 'yes' && (
                <div className="flex flex-col gap-2">
                  <label htmlFor="fundingStatus" className="text-sm font-semibold text-[#0A2540]">
                    {t('labelFundingStatus')}
                  </label>
                  <select
                    id="fundingStatus"
                    value={formData.fundingStatus}
                    onChange={(event) => handleInputChange('fundingStatus', event.target.value)}
                    className="px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none transition-all bg-white cursor-pointer"
                  >
                    <option value="">{t('placeholderFundingStatus')}</option>
                    {fundingStatusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Services Interest */}
            <div className="mt-6">
              <label className="text-sm font-semibold text-[#0A2540] block mb-3">
                {t('labelServices')}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {serviceOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-all ${
                      formData.services.includes(option.value)
                        ? 'border-[#00B4D8] bg-[#030b1d]/10 text-[#0A2540]'
                        : 'border-gray-200 hover:border-[#00B4D8]/50 text-[#0A2540]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.services.includes(option.value)}
                      onChange={() => handleServiceToggle(option.value)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        formData.services.includes(option.value)
                          ? 'border-[#00B4D8] bg-[#00B4D8]'
                          : 'border-gray-300'
                      }`}
                    >
                      {formData.services.includes(option.value) && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Modalities */}
            <div className="mt-6">
              <label className="text-sm font-semibold text-[#0A2540] block mb-3">
                {t('labelModalities')}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {modalityOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-all ${
                      formData.modalities.includes(option.value)
                        ? 'border-[#00B4D8] bg-[#030b1d]/10 text-[#0A2540]'
                        : 'border-gray-200 hover:border-[#00B4D8]/50 text-[#0A2540]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.modalities.includes(option.value)}
                      onChange={() => handleModalityToggle(option.value)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        formData.modalities.includes(option.value)
                          ? 'border-[#00B4D8] bg-[#00B4D8]'
                          : 'border-gray-300'
                      }`}
                    >
                      {formData.modalities.includes(option.value) && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Subject */}
            <div className="mt-6 flex flex-col gap-2">
              <label htmlFor="subject" className="text-sm font-semibold text-[#0A2540]">
                {t('labelSubject')} <span className="text-[#F33349]">*</span>
              </label>
              <input
                type="text"
                id="subject"
                required
                value={formData.subject}
                onChange={(event) => handleInputChange('subject', event.target.value)}
                className="px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none transition-all"
                placeholder={t('placeholderSubject')}
              />
            </div>

            {/* Message */}
            <div className="mt-6 flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-semibold text-[#0A2540]">
                {t('labelMessage')} <span className="text-[#F33349]">*</span>
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(event) => handleInputChange('message', event.target.value)}
                className="px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none transition-all resize-none"
                placeholder={t('placeholderMessage')}
              />
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex flex-col md:flex-row items-center gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer w-full md:w-auto px-8 py-2.5 bg-[#F33349] text-white font-semibold rounded-full border-2 border-[#F33349] transition-colors duration-200 hover:bg-white hover:text-[#F33349] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('sending')}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t('submit')}
                  </>
                )}
              </button>
              <p className="text-sm text-[#0A2540]/70 italic">
                {t('responsePromise')}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
