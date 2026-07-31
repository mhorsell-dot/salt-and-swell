import InfoPageLayout from "@/components/layout/InfoPageLayout";

export const metadata = {
  title: "Terms & Conditions | Salt & Swell Co.",
};

export default function TermsPage() {
  return (
    <InfoPageLayout
      title="Terms & Conditions"
      subtitle="Conditions governing the use of our website and services."
    >
      <h2>Website Use</h2>
      <p>By using this website you agree to these terms.</p>

      <h2>Orders</h2>
      <p>Orders are subject to availability and confirmation.</p>

      <h2>Pricing</h2>
      <p>Prices may change without notice.</p>

      <h2>Contact</h2>
      <p>Please contact us if you have any questions regarding these terms.</p>
    </InfoPageLayout>
  );
}
