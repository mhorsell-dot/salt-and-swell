import InfoPageLayout from "@/components/layout/InfoPageLayout";

export const metadata = {
  title: "Privacy Policy | Salt & Swell Co.",
};

export default function PrivacyPage() {
  return (
    <InfoPageLayout title="Privacy Policy" subtitle="Your privacy matters to us.">
      <h2>Information We Collect</h2>
      <p>
        We collect only the information required to fulfil your order and improve your experience.
      </p>

      <h2>How We Use Your Information</h2>
      <p>Order processing, customer support and service improvements.</p>

      <h2>Your Rights</h2>
      <p>
        You may request access, correction or deletion of your personal information where
        applicable.
      </p>
    </InfoPageLayout>
  );
}
