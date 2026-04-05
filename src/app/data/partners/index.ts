import amitMane from './amit-mane/partner-info.json';
import namdev from './namdev/partner-info.json';

export const partners: Record<string, any> = {
  'amit-mane': amitMane,
  'namdev': namdev
};

export const defaultPartner = amitMane;
