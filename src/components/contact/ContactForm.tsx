/* ============================================================
   ContactForm — fully validated form. Submit is simulated
   with a Promise; swap the handler for a real API call later.
   ============================================================ */

import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Field, Input, Textarea, Select } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import { Banner } from '@/components/ui/Banner';
import { FORM_MAX_LENGTH } from '@/constants/site';
import type { Service } from '@/types';

interface ContactFormValues {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceId: string;
  message: string;
}

interface ContactFormProps {
  services: Service[];
}

type SubmitStatus =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error' };

/** Simulated backend submission. Swap with a real POST later. */
function submitEstimate(values: ContactFormValues): Promise<{ reference: string }> {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      const ok = values.email.toLowerCase().indexOf('fail@') === -1;
      if (ok) {
        resolve({ reference: `WB-${Math.floor(1000 + Math.random() * 9000)}` });
      } else {
        reject(new Error('Servicio temporalmente no disponible. Intenta nuevamente.'));
      }
    }, 1400);
  });
}

export const ContactForm = memo(function ContactForm({ services }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      serviceId: '',
      message: '',
    },
  });

  const [status, setStatus] = useState<SubmitStatus>({ kind: 'idle' });
  const [reference, setReference] = useState<string>('');

  const onSubmit = async (values: ContactFormValues) => {
    setStatus({ kind: 'submitting' });
    try {
      const result = await submitEstimate(values);
      setReference(result.reference);
      setStatus({ kind: 'success' });
      reset();
    } catch (err) {
      setStatus({
        kind: 'error',
      });
    }
  };

  return (
    <div className="contact-form">
      {status.kind === 'success' && (
        <Banner tone="success" title="Solicitud enviada" dismissible>
          Recibimos tu estimado con referencia <strong>{reference}</strong>. Un ingeniero de
          demolición te contactará dentro de las próximas 48 horas.
        </Banner>
      )}
      {status.kind === 'error' && (
        <Banner tone="error" title="No pudimos enviar tu solicitud" dismissible>
          Ocurrió un error simulado en el envío. Intenta nuevamente o escríbenos directamente a
          nuestro correo.
        </Banner>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="contact-form__grid">
          <Field
            label="Nombre completo"
            htmlFor="contact-name"
            required
            error={errors.name?.message}
          >
            <Input
              id="contact-name"
              placeholder="Ej: Laura Méndez"
              maxLength={FORM_MAX_LENGTH.name}
              invalid={Boolean(errors.name)}
              autoComplete="name"
              {...register('name', {
                required: 'El nombre es obligatorio.',
                minLength: { value: 2, message: 'Escribe al menos 2 caracteres.' },
              })}
            />
          </Field>

          <Field
            label="Correo electrónico"
            htmlFor="contact-email"
            required
            error={errors.email?.message}
          >
            <Input
              id="contact-email"
              type="email"
              placeholder="ej: nombre@empresa.com"
              maxLength={FORM_MAX_LENGTH.email}
              invalid={Boolean(errors.email)}
              autoComplete="email"
              {...register('email', {
                required: 'El correo es obligatorio.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                  message: 'Ingresa un correo válido, por ejemplo nombre@empresa.com.',
                },
              })}
            />
          </Field>

          <Field
            label="Teléfono"
            htmlFor="contact-phone"
            hint="Opcional, pero agiliza tu estimado."
            error={errors.phone?.message}
          >
            <Input
              id="contact-phone"
              type="tel"
              placeholder="(305) 555-0000"
              maxLength={FORM_MAX_LENGTH.phone}
              invalid={Boolean(errors.phone)}
              autoComplete="tel"
              {...register('phone', {
                minLength: {
                  value: 7,
                  message: 'El teléfono debe tener al menos 7 dígitos.',
                },
              })}
            />
          </Field>

          <Field label="Empresa" htmlFor="contact-company" error={errors.company?.message}>
            <Input
              id="contact-company"
              placeholder="Nombre de tu empresa"
              invalid={Boolean(errors.company)}
              autoComplete="organization"
              {...register('company', {})}
            />
          </Field>

          <Field
            label="Servicio de interés"
            htmlFor="contact-service"
            required
            error={errors.serviceId?.message}
            className="contact-form__span-2"
          >
            <Select
              id="contact-service"
              invalid={Boolean(errors.serviceId)}
              {...register('serviceId', {
                required: 'Selecciona un servicio para orientar tu cotización.',
              })}
            >
              <option value="" disabled>
                Selecciona un servicio…
              </option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
            </Select>
          </Field>

          <Field
            label="Cuéntanos sobre tu proyecto"
            htmlFor="contact-message"
            required
            error={errors.message?.message}
            className="contact-form__span-2"
          >
            <Textarea
              id="contact-message"
              placeholder="Ubicación, tipo de estructura, plazos estimados, requisitos especiales…"
              maxLength={FORM_MAX_LENGTH.message}
              invalid={Boolean(errors.message)}
              {...register('message', {
                required: 'Describe brevemente tu proyecto.',
                minLength: {
                  value: 20,
                  message: 'Escribe al menos 20 caracteres para que podamos ayudarte mejor.',
                },
              })}
            />
          </Field>
        </div>

        <div className="contact-form__actions">
          <Button
            type="submit"
            variant="accent"
            size="lg"
            icon={status.kind === 'submitting' ? undefined : 'send'}
            disabled={status.kind === 'submitting'}
            fullWidth
          >
            {status.kind === 'submitting' ? 'Enviando solicitud…' : 'Enviar solicitud de estimado'}
          </Button>
          <p className="contact-form__note">
            Al enviar aceptas nuestro compromiso de confidencialidad. Nunca compartiremos tus
            datos.
          </p>
        </div>
      </form>
    </div>
  );
});
