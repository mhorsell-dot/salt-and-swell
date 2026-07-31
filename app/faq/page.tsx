import InfoPageLayout from "@/components/layout/InfoPageLayout";

export const metadata = {
  title: "FAQ | Salt & Swell Co.",
};

export default function FAQPage() {
  return (
    <InfoPageLayout
      title="Frequently Asked Questions"
      subtitle="Answers to our most common questions."
    >
      <h2>When will my order ship?</h2>
      <p>Usually within 1–2 business days.</p>

      <h2>Can I exchange sizes?</h2>
      <p>Yes, subject to availability.</p>

      <h2>Do you ship internationally?</h2>
      <p>Yes.</p>

      <h2>How do I contact you?</h2>
      <p>Visit our Contact page.</p>
    </InfoPageLayout>
  );
}
