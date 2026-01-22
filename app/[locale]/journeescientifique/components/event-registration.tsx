'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Building2, Briefcase, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toast } from 'sonner';
import type { EventRegistrationContent } from '../types';

type EventRegistrationProps = {
  content: EventRegistrationContent;
};

const registrationSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  profession: z.string().min(1),
  institution: z.string().min(2)
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export function EventRegistration({ content }: EventRegistrationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema)
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Registration data:', data);
      setIsSubmitted(true);
      toast.success(content.successMessage);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(content.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="registration-section" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#00B4D8]/10 border border-[#00B4D8]/20 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-[#00B4D8]" />
            </div>
            <h2
              className="text-3xl font-bold text-[#061024] mb-4"
              style={{ fontFamily: 'var(--font-calistoga), serif' }}
            >
              {content.successMessage}
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="registration-section" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#061024] mb-4"
            style={{ fontFamily: 'var(--font-calistoga), serif' }}
          >
            {content.title}
          </h2>
          <p className="text-lg text-[#061024]/70 max-w-xl mx-auto">
            {content.subtitle}{' '}
            <span className="font-semibold text-[#00B4D8]">{content.maxParticipants}</span>
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-xl mx-auto p-8 bg-gradient-to-br from-[#F0F9FA]/50 to-white rounded-3xl border border-[#061024]/10 shadow-xl"
        >
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="flex items-center gap-2 text-[#061024] font-medium"
                >
                  <User className="w-4 h-4 text-[#00B4D8]" />
                  {content.fields.firstName}
                </Label>
                <Input
                  id="firstName"
                  placeholder={content.fields.firstNamePlaceholder}
                  className={`h-12 rounded-xl border-[#061024]/20 focus:border-[#00B4D8] focus:ring-[#00B4D8]/20 ${
                    errors.firstName ? 'border-[#F33349]' : ''
                  }`}
                  {...register('firstName')}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="flex items-center gap-2 text-[#061024] font-medium"
                >
                  <User className="w-4 h-4 text-[#00B4D8]" />
                  {content.fields.lastName}
                </Label>
                <Input
                  id="lastName"
                  placeholder={content.fields.lastNamePlaceholder}
                  className={`h-12 rounded-xl border-[#061024]/20 focus:border-[#00B4D8] focus:ring-[#00B4D8]/20 ${
                    errors.lastName ? 'border-[#F33349]' : ''
                  }`}
                  {...register('lastName')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="flex items-center gap-2 text-[#061024] font-medium"
              >
                <Mail className="w-4 h-4 text-[#00B4D8]" />
                {content.fields.email}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={content.fields.emailPlaceholder}
                className={`h-12 rounded-xl border-[#061024]/20 focus:border-[#00B4D8] focus:ring-[#00B4D8]/20 ${
                  errors.email ? 'border-[#F33349]' : ''
                }`}
                {...register('email')}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="profession"
                className="flex items-center gap-2 text-[#061024] font-medium"
              >
                <Briefcase className="w-4 h-4 text-[#00B4D8]" />
                {content.fields.profession}
              </Label>
              <Select onValueChange={(value: string) => setValue('profession', value)}>
                <SelectTrigger
                  className={`h-12 rounded-xl border-[#061024]/20 focus:border-[#00B4D8] focus:ring-[#00B4D8]/20 ${
                    errors.profession ? 'border-[#F33349]' : ''
                  }`}
                >
                  <SelectValue placeholder={content.fields.professionPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {content.fields.professionOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="institution"
                className="flex items-center gap-2 text-[#061024] font-medium"
              >
                <Building2 className="w-4 h-4 text-[#00B4D8]" />
                {content.fields.institution}
              </Label>
              <Input
                id="institution"
                placeholder={content.fields.institutionPlaceholder}
                className={`h-12 rounded-xl border-[#061024]/20 focus:border-[#00B4D8] focus:ring-[#00B4D8]/20 ${
                  errors.institution ? 'border-[#F33349]' : ''
                }`}
                {...register('institution')}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-8 h-14 text-lg font-semibold rounded-xl border-2 border-[#F33349] bg-[#F33349] text-white hover:bg-white hover:text-[#F33349] transition-colors shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Inscription en cours...
              </>
            ) : (
              content.submitButton
            )}
          </Button>

          <p className="mt-4 text-xs text-[#061024]/50 text-center">{content.consent}</p>
        </form>
      </div>
    </section>
  );
}
