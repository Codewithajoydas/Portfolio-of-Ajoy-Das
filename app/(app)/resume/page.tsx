import ResumeClient from "@/app/(app)/resume/ResumeClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Codewithajoydas",
  description:
    "Professional resume, technical skills, work experience, and selected software development projects.",
};

export default function ResumePage() {
  return <ResumeClient />;
}