import InfoPageLayout from "@/components/layout/InfoPageLayout";

export const metadata = {
  title: "Returns | Salt & Swell Co.",
};

export default function ReturnsPage() {
  return (
    <InfoPageLayout title="Returns" subtitle="We want you to love every purchase.">
      <h2>30 Day Returns</h2>
      <p>Items may be returned within 30 days if unworn, unwashed and in original condition.</p>

      <h2>Exchanges</h2>
      <p>Subject to stock availability.</p>

      <h2>Refunds</h2>
      <p>Refunds are processed back to the original payment method.</p>
    </InfoPageLayout>
  );
}
