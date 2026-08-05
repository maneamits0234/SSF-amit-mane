import { useEffect } from 'react';

const SITE_URL = 'https://www.aaryudaayurveda.com';
const SITE_NAME = 'Aaryuda Ayurveda';
const DEFAULT_IMAGE = 'https://res.cloudinary.com/dokkp5vkv/image/upload/f_webp,q_auto,w_1200,h_630,c_fill/v1769232774/Ayurveda/products/kjopl73ftgoghpifiifw.jpg';

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'product' | 'article' | 'profile';
  noindex?: boolean;
  structuredData?: object | object[];
}

/**
 * useSEO — Dynamic per-page SEO hook
 * Sets <title>, meta description, OG tags, Twitter cards, canonical URL,
 * and optionally injects page-specific JSON-LD structured data.
 */
export function useSEO({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
  structuredData,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const canonicalUrl = `${SITE_URL}${path}`;

    // --- Document Title ---
    document.title = fullTitle;

    // --- Helper: upsert a <meta> tag ---
    const setMeta = (selector: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        // Extract name or property from selector
        if (selector.includes('property=')) {
          el.setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] || '');
        } else if (selector.includes('name=')) {
          el.setAttribute('name', selector.match(/name="([^"]+)"/)?.[1] || '');
        }
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    // --- Helper: upsert a <link> tag ---
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // --- Meta Description ---
    setMeta('meta[name="description"]', description);

    // --- Robots ---
    setMeta('meta[name="robots"]', noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    // --- Canonical ---
    setLink('canonical', canonicalUrl);

    // --- Open Graph ---
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', canonicalUrl);
    setMeta('meta[property="og:type"]', type);
    setMeta('meta[property="og:image"]', image);
    setMeta('meta[property="og:image:alt"]', `${SITE_NAME} - ${description.substring(0, 60)}`);

    // --- Twitter Card ---
    setMeta('meta[name="twitter:title"]', fullTitle);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="twitter:url"]', canonicalUrl);
    setMeta('meta[name="twitter:image"]', image);
    setMeta('meta[name="twitter:image:alt"]', `${SITE_NAME} - Ayurvedic Products`);

    // --- Structured Data (JSON-LD) ---
    if (structuredData) {
      const existingScript = document.querySelector('script[data-seo-page]');
      if (existingScript) existingScript.remove();

      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-seo-page', 'true');
      script.textContent = JSON.stringify(
        Array.isArray(structuredData)
          ? { '@context': 'https://schema.org', '@graph': structuredData }
          : structuredData
      );
      document.head.appendChild(script);
    }

    // Cleanup on unmount
    return () => {
      const pageScript = document.querySelector('script[data-seo-page]');
      if (pageScript) pageScript.remove();
    };
  }, [title, description, path, image, type, noindex, structuredData]);
}
