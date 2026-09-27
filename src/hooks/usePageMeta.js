import { useEffect } from 'react';
import { defaultSeo } from '@/data/seo';

export default function usePageMeta({ title, description, path }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${defaultSeo.title}` : defaultSeo.title;
    document.title = fullTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || defaultSeo.description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `${window.location.origin}${path || ''}`);
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = `${window.location.origin}${path || ''}`;
      document.head.appendChild(link);
    }
  }, [title, description, path]);
}
