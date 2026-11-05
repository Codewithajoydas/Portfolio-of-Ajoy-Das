import type { WebSite, WithContext } from "schema-dts";
const BASE_URL = "https://www.codewithajoydas.in";
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Codewithajoydas",
  alternateName: [
    "Code With Ajoy Das",
    "codewithajoydas.in"
  ],
  url: BASE_URL,
  description:
    "Codewithajoydas is a software development brand showcasing web applications, mobile applications, developer tools, open-source projects, technical articles and software experiments.",
  image: {
    "@type": "ImageObject",
    url: `${BASE_URL}/opengraph-image`
  },
  publisher: {
    "@id": `${BASE_URL}/#organization`
  },
  creator: {
    "@id": `${BASE_URL}/#person`
  },
  inLanguage: "en-IN"
} satisfies WithContext<WebSite>;
