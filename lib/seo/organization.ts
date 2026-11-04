import type { Organization, WithContext } from "schema-dts";
const BASE_URL = "https://www.codewithajoydas.in";
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "Codewithajoydas",
  alternateName: [
    "Code With Ajoy Das",
    "codewithajoydas.in"
  ],
  url: BASE_URL,
  description:
    "Codewithajoydas is a software development brand focused on building web applications, developer tools, open-source projects, software utilities and technical experiments.",
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/icons/apple-touch-icon.png`
  },
  image: `${BASE_URL}/opengraph-image`,
  sameAs: [
    "https://github.com/Codewithajoydas",
    "https://instagram.com/codewithajoydas",
    "https://youtube.com/@codewithajoydas"
  ],
  email: "ajoydas@codewithajoydas.in",
  telephone: "+91 6900611920",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "ajoydas@codewithajoydas.in"
  },
  founder: {
    "@id": `${BASE_URL}/#person`
  }
} satisfies WithContext<Organization>;
