
import React from "react";
import type { Metadata } from "next";
import { createSeoMetadata } from "@/lib/seo";
import StackClient from "@/app/(app)/stack/StackClient";

export const metadata: Metadata = createSeoMetadata({
  title: "Technology Stack",
  description:
    "Explore the programming languages, frameworks, libraries, developer tools and technologies used by Ajoy Das to build modern software applications.",
  path: "/stack",
});

export default function StackPage() {
  return <StackClient />;
}
