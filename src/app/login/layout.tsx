import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Sign In & Registration",
  description:
    "Sign in to your InternPilot student account to track applications, match your technical skills with Ugandan opportunities, and consult your grounded Gemini AI career advisor.",
  alternates: {
    canonical: "/login",
  },
  openGraph: {
    title: "Student Sign In & Registration | InternPilot",
    description:
      "Access verified Ugandan tech internships, scholarships, and personalized AI career advisory.",
    url: "/login",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
