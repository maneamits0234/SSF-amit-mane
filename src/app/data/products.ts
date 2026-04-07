import { partners, defaultPartner } from './partners/index';
import productsEn from './common/products-info/en/en.json';
import productsHi from './common/products-info/hi/hi.json';
import productsMr from './common/products-info/mr/mr.json';

export interface Product {
  id: string;
  name: string;
  category: string;
  type: string;
  primary_use: string;
  price: {
    mrp: number;
    discounted_price: number;
    grand_total_including_gst: number;
    currency: string;
  };
  rating: number;
  rating_scale: number;
  key_ingredients: string[];
  shortDescription: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  howToUse: string;
  inStock: boolean;
  featured: boolean;
  isNew?: boolean;
  image: string;
  phoneNumber: string;
  whatsappNumber: string;
  components?: {
    name: string;
    form: string;
    benefits: Record<string, string> | string[];
    key_ingredients?: string[];
  }[];
  usage_instructions?: {
    course_duration_recommended?: string;
    preparation: string;
    mixing: string;
    timing: string;
    additional_requirements?: string;
  };
}

// Select partner based on environment mode
const partnerId = import.meta.env.VITE_PARTNER_ID || 'amit-mane';
const partnerData = partners[partnerId] || defaultPartner;
const partnerInfo = partnerData.company;

const phone = partnerInfo.contact.phone[0];
const whatsapp = "91" + phone;

// Function to map products with common UI fields (images, contact)
const mapProducts = (prods: any[]) => {
  return prods.map((p, index) => {
    // Premium unsplash images for Ayurvedic products
    const images = [
      "https://res.cloudinary.com/dokkp5vkv/image/upload/v1769232774/Ayurveda/products/kjopl73ftgoghpifiifw.jpg",
      "https://res.cloudinary.com/dokkp5vkv/image/upload/v1769868851/Ayurveda/products/r11qaetwwsq3k6yafeu1.jpg",
      "https://res.cloudinary.com/dokkp5vkv/image/upload/v1770731628/ANTOX-X_ANTOX-T_Image_1_cg7pix.webp",
      "https://res.cloudinary.com/dokkp5vkv/image/upload/v1769548362/Ayurveda/products/kolppbropjyp9gqa7whu.jpg",
      "https://res.cloudinary.com/dokkp5vkv/image/upload/v1769547422/Ayurveda/products/xnoeoyznrz4n31in0qwc.jpg",
      "https://res.cloudinary.com/dokkp5vkv/image/upload/v1769885041/Antox-PN_Powder_Oil__Image_2.jpg_qj2o44.jpg"
    ];

    return {
      ...p,
      image: images[index % images.length],
      phoneNumber: phone,
      whatsappNumber: whatsapp,
      inStock: true, // Ensuring stock is true as per new data
      featured: index < 2 // First two as featured
    };
  });
};

export const products = {
  en: mapProducts(productsEn.products),
  hi: mapProducts(productsHi.products),
  mr: mapProducts(productsMr.products)
};

export const contactInfo = {
  phone: partnerInfo.contact.phone[0],
  whatsapp: "91" + partnerInfo.contact.phone[0],
  email: partnerInfo.contact.email,
  address: partnerInfo.contact.address,
  addressMarathi: partnerInfo.contact.addressMarathi || "ए/पी शिरोळ, जि. कोल्हापूर, महाराष्ट्र, भारत - ४१६१०३",
  social: partnerInfo.contact.social
};

export const foundationInfo = {
  name: partnerInfo.name,
  nameMarathi: partnerInfo.nameMarathi || "राजलक्ष्मी आयुर्वेद",
  tagline: partnerInfo.tagline || "Nature's Wisdom",
  taglineMarathi: partnerInfo.taglineMarathi || "निसर्गाचे ज्ञान",
  description: partnerInfo.description,
  descriptionMarathi: partnerInfo.descriptionMarathi || "ही कंपनी चयापचय आरोग्यामध्ये विशेषज्ञ आहे कारण मधुमेह पचन, ऊर्जा पातळी आणि विषहरण यासह अनेक शरीर प्रणालींवर परिणाम करतो. त्यांची उत्पादने निर्धारित वैद्यकीय काळजीला पूरक (बदल नाही) म्हणून आयुर्वेदिक पोषण आधार म्हणून डिझाइन केली आहेत."
};

export const companyInfo = partnerInfo;

export const aboutInfo = partnerData.about;
