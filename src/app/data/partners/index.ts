import amitMane from './amit-mane/partner-info.json';
import amitManeAbout from './amit-mane/about-info.json';
import diksha from './diksha/partner-info.json';
import dikshaAbout from './diksha/about-info.json';

export const partners: Record<string, any> = {
  'amit-mane': {
    company: amitMane.company,
    about: amitManeAbout
  },
  'diksha': {
    company: diksha.company,
    about: dikshaAbout
  }
};

export const defaultPartner = partners['amit-mane'];
