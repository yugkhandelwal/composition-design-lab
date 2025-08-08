import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type?: 'organization' | 'localBusiness' | 'service' | 'breadcrumb';
  data?: any;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type = 'organization', data }) => {
  const getStructuredData = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://compositiondesignlab.com';
    
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Composition Design Lab",
          "alternateName": "CDL Architecture",
          "url": baseUrl,
          "logo": `${baseUrl}/logo.png`,
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-123-456-7890",
            "contactType": "customer service",
            "email": "info@compositiondesignlab.com",
            "availableLanguage": "en"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Design Street",
            "addressLocality": "Architecture City",
            "addressRegion": "AC",
            "postalCode": "12345",
            "addressCountry": "US"
          },
          "sameAs": [
            "https://www.facebook.com/compositiondesignlab",
            "https://www.instagram.com/compositiondesignlab",
            "https://www.linkedin.com/company/compositiondesignlab",
            "https://twitter.com/compositiondesignlab"
          ],
          "foundingDate": "2010",
          "numberOfEmployees": "10-50",
          "description": "Composition Design Lab is a forward-thinking architecture studio specializing in innovative design, sustainable building, and urban planning."
        };

      case 'localBusiness':
        return {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${baseUrl}#business`,
          "name": "Composition Design Lab",
          "image": `${baseUrl}/og-image.jpg`,
          "telephone": "+1-123-456-7890",
          "email": "info@compositiondesignlab.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Design Street",
            "addressLocality": "Architecture City",
            "addressRegion": "AC",
            "postalCode": "12345",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 40.7128,
            "longitude": -74.0060
          },
          "url": baseUrl,
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "18:00"
            }
          ],
          "priceRange": "$$$",
          "servedCuisine": "Architecture Services"
        };

      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Architectural Design Services",
          "provider": {
            "@type": "Organization",
            "name": "Composition Design Lab"
          },
          "description": "Professional architectural design services including residential, commercial, and urban planning.",
          "serviceType": "Architecture",
          "areaServed": "United States",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Architecture Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Residential Design"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Commercial Design"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Urban Planning"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Interior Design"
                }
              }
            ]
          }
        };

      case 'breadcrumb':
        return data || {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": baseUrl
            }
          ]
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
