import amitMane from './amit-mane/partner-info.json';
import amitManeAbout from './amit-mane/about-info.json';
import namdev from './namdev/partner-info.json';
import namdevAbout from './namdev/about-info.json';

export const partners: Record<string, any> = {
  'amit-mane': {
    company: amitMane.company,
    about: amitManeAbout
  },
  'namdev': {
    company: namdev.company,
    about: namdevAbout
  }
};

export const defaultPartner = partners['amit-mane'];
