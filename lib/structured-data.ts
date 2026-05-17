export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': 'TODO_WEBSITE_URL',
    name: 'Roan Merluccio Automotive Photography',
    alternateName: ['Roan Merluccio', 'Roan Merluccio Photography'],
    url: 'TODO_WEBSITE_URL',
    image: 'TODO_IMAGE_URL',
    logo: 'TODO_LOGO_URL',
    description:
      'Motorsport and automotive photography, rolling shots, dealership media, car listing photos, videography, and aerial content for car owners, teams, dealerships, and brands in Westchester, NYC, Connecticut, and Rochester.',
    founder: { '@type': 'Person', name: 'Roan Merluccio' },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Westchester County', containedInPlace: { '@type': 'State', name: 'New York' } },
      { '@type': 'City', name: 'Bronxville', containedInPlace: { '@type': 'State', name: 'New York' } },
      { '@type': 'City', name: 'New Rochelle', containedInPlace: { '@type': 'State', name: 'New York' } },
      { '@type': 'City', name: 'White Plains', containedInPlace: { '@type': 'State', name: 'New York' } },
      { '@type': 'City', name: 'Yonkers', containedInPlace: { '@type': 'State', name: 'New York' } },
      { '@type': 'City', name: 'Scarsdale', containedInPlace: { '@type': 'State', name: 'New York' } },
      { '@type': 'City', name: 'Eastchester', containedInPlace: { '@type': 'State', name: 'New York' } },
      { '@type': 'City', name: 'Mount Vernon', containedInPlace: { '@type': 'State', name: 'New York' } },
      { '@type': 'City', name: 'Rye', containedInPlace: { '@type': 'State', name: 'New York' } },
      { '@type': 'City', name: 'Greenwich', containedInPlace: { '@type': 'State', name: 'Connecticut' } },
      { '@type': 'City', name: 'New York City', containedInPlace: { '@type': 'State', name: 'New York' } },
      { '@type': 'State', name: 'Connecticut' },
      { '@type': 'City', name: 'Rochester', containedInPlace: { '@type': 'State', name: 'New York' } },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bronxville',
      addressRegion: 'NY',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.9387,
      longitude: -73.8334,
    },
    priceRange: '$$',
    makesOffer: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Motorsport Photography' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Automotive Photography' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Car Photography' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Rolling Shots' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Vehicle Listing Photos' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dealership Photography' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Automotive Videography' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Drone and Aerial Media' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Formula SAE Motorsport Media' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Content' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Event Coverage' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand and Sponsor Content' } },
    ],
    sameAs: [
      'TODO_INSTAGRAM_URL',
      'TODO_TIKTOK_URL',
      'TODO_LINKEDIN_URL',
    ],
    keywords:
      'car photographer Westchester NY, automotive photographer, motorsport photographer, rolling shots photographer, dealership photography, vehicle listing photos, Formula SAE photographer, car photography NYC, automotive photographer near me',
    knowsAbout: [
      'motorsport photography',
      'automotive photography',
      'car photography',
      'rolling shots',
      'dealership vehicle photography',
      'Formula SAE photography',
      'aerial photography',
      'automotive videography',
    ],
  }
}

export function getFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do you offer car photography in Westchester?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Roan Merluccio offers automotive photography across Westchester County, including Bronxville, New Rochelle, White Plains, Yonkers, and nearby areas.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you work with dealerships and automotive brands?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. I provide vehicle listing photos, dealership media, social media content, and automotive video for dealerships, brands, and local automotive businesses.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer rolling shots?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Rolling shots and automotive action content are available depending on the vehicle, location, and shoot details.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you cover motorsport and Formula SAE?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. I create motorsport-style photo and video content for teams, events, builds, sponsors, and Formula SAE projects.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you travel for shoots?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. I serve Westchester County, NYC, Connecticut, Rochester, and nearby areas.',
        },
      },
    ],
  }
}
