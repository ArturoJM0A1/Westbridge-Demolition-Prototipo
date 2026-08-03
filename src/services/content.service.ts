/* ============================================================
   Content service — the frontend's data contract.
   Pages never read JSON directly; they call these functions,
   which will be swapped for real API calls in a future stage.
   ============================================================ */

import { get } from '@/services/http';
import statsData from '@/services/data/stats.json';
import servicesData from '@/services/data/services.json';
import projectsData from '@/services/data/projects.json';
import categoriesData from '@/services/data/project-categories.json';
import testimonialsData from '@/services/data/testimonials.json';
import certificationsData from '@/services/data/certifications.json';
import valuesData from '@/services/data/values.json';
import safetyData from '@/services/data/safety.json';
import faqsData from '@/services/data/faqs.json';
import companyData from '@/services/data/company.json';

import advantagesData from '@/services/data/advantages.json';
import whyData from '@/services/data/why.json';

import type {
  Statistic,
  Service,
  Project,
  ProjectCategory,
  Testimonial,
  Certification,
  Value,
  Faq,
  ContactInfo,
} from '@/types';
import { CONTACT } from '@/constants/site';

const asArray = <T>(value: T[]): T[] => value;

export const contentService = {
  async getStats(): Promise<Statistic[]> {
    const { data } = await get(() => asArray(statsData));
    return data;
  },

  async getServices(): Promise<Service[]> {
    const { data } = await get(() => asArray(servicesData));
    return data;
  },

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    const services = await this.getServices();
    return services.find((service) => service.slug === slug);
  },

  async getProjects(): Promise<Project[]> {
    const { data } = await get(() => asArray(projectsData));
    return data;
  },

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    const projects = await this.getProjects();
    return projects.find((project) => project.slug === slug);
  },

  async getProjectCategories(): Promise<ProjectCategory[]> {
    const { data } = await get(() => asArray(categoriesData));
    return data;
  },

  async getTestimonials(): Promise<Testimonial[]> {
    const { data } = await get(() => asArray(testimonialsData));
    return data;
  },

  async getCertifications(): Promise<Certification[]> {
    const { data } = await get(() => asArray(certificationsData));
    return data;
  },

  async getValues(): Promise<Value[]> {
    const { data } = await get(() => asArray(valuesData));
    return data;
  },

  async getSafety() {
    const { data } = await get(() => safetyData);
    return {
      stats: asArray(data.safetyStats),
      pillars: asArray(data.pillars),
      process: asArray(data.process),
      standards: asArray(data.standards),
    };
  },

  async getFaqs(): Promise<Faq[]> {
    const { data } = await get(() => asArray(faqsData));
    return data;
  },

  async getCompany() {
    const { data } = await get(() => companyData);
    return {
      history: data.history,
      philosophy: data.philosophy,
      capacity: data.capacity,
    };
  },

  async getContact(): Promise<ContactInfo> {
    const { data } = await get(() => CONTACT);
    return data;
  },

  async getAdvantages() {
    const { data } = await get(() => asArray(advantagesData));
    return data;
  },

  async getWhy() {
    const { data } = await get(() => whyData);
    return {
      differentiators: asArray(data.differentiators),
      commitments: asArray(data.commitments),
    };
  },
};
