
import React from "react";
import type { Metadata } from "next";
import OpenSourceClient from "./OpenSourceClient";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Open Source",
  description:
    "Explore open-source projects, GitHub repositories, contributions, and developer experiments by Ajoy Das.",
  path: "/open-source",
});

export default function OpenSourcePage() {
  return <OpenSourceClient />;
}
