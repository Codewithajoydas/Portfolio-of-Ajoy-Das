
import React from "react";
import type { Metadata } from "next";
import ToolsClient from "./ToolsClient";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Developer Tools",
  description:
    "Explore free online developer tools by Ajoy Das. Useful utilities for JSON, JavaScript, CSS, HTML, encoding, formatting, and everyday development workflows.",
  path: "/tools",
});

export default function ToolsPage() {
  return <ToolsClient />;
}
