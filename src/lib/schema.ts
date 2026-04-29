export function getLocalBusinessSchema(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'VEGAS Барбершоп',
    description: 'Мужские стрижки, бритьё и уход за бородой в Энгельсе',
    url: 'https://vkrasnovid.github.io/vegas-barbershop',
    telephone: '+7 (8453) 56-78-90',
    email: 'info@vegas-barbershop.ru',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Энгельс',
      addressRegion: 'Саратовская область',
      streetAddress: 'ул. Московская, д. 15',
      addressCountry: 'RU',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '10:00',
        closes: '18:00',
      },
    ],
    priceRange: '₽₽',
    image: 'https://vkrasnovid.github.io/vegas-barbershop/images/hero.webp',
    sameAs: [
      'https://vk.com/vegasbarbershop',
      'https://instagram.com/vegas.barbershop',
    ],
  };

  return JSON.stringify(schema);
}
