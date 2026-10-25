import { portfolio, portfolioHubs } from './portfolio';
import { url, type Locale } from './site';

// Public page context only. Contact text is never put in a URL.
export function portfolioTopics(locale: Locale) {
  const entries = { ...portfolio[locale], ...portfolioHubs[locale] };
  return Object.fromEntries(Object.entries(entries).map(([id, entry]) => [id, {
    title: entry.title,
    href: url((locale === 'fr' ? '/portfolio/' : '/en/portfolio/') + id + '/'),
  }]));
}

export function portfolioContactHref(locale: Locale, topic: string) {
  const topics = portfolioTopics(locale);
  const contact = url(locale === 'fr' ? '/contact/' : '/en/contact/');
  return contact + (Object.hasOwn(topics, topic) ? '?sujet=' + encodeURIComponent(topic) : '');
}
