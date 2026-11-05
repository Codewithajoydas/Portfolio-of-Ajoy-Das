import type { Person, WithContext } from "schema-dts";
const BASE_URL = "https://www.codewithajoydas.in";

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${BASE_URL}/#person`,
  name: "Ajoy Das",
  url: BASE_URL,
  image: {
    "@type": "ImageObject",
    url: `${BASE_URL}/images/Codewithajoydas_Hero-page.png`,
  },
  jobTitle: "Software Developer",
  description:
    "Ajoy Das is a software developer focused on building web applications, mobile applications, developer tools and software solutions.",
  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "React Native",
    "Expo",
    "MongoDB",
    "Mongoose",
    "REST APIs",
    "Software Architecture",
    "System Design",
    "Web Development",
    "Mobile Application Development",
    "Backend Development",
    "Developer Tools",
    "CLI Development",
  ],
  sameAs: [
    "https://github.com/Codewithajoydas",
    "https://instagram.com/codewithajoydas",
    "https://youtube.com/@codewithajoydas",
  ],
  worksFor: {
    "@id": `${BASE_URL}/#organization`,
  },
} satisfies WithContext<Person>;
