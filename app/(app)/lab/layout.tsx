import { createSeoMetadata } from "@/lib/seo";
import type { PropsWithChildren } from "react";

export const metadata = createSeoMetadata({
  title: "JavaScript Lab",
  description:
    "Browse small JavaScript projects, browser experiments, UI interactions, and programming exercises built by Ajoy Das.",
  path: "/lab",
});

export default function LabLayout({ children }: PropsWithChildren) {
  return children;
}
