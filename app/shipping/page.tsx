import InfoPageLayout from "@/components/layout/InfoPageLayout";

export const metadata = {
  title: "Shipping | Salt & Swell Co.",
};

export default function ShippingPage() {
  return (
    <InfoPageLayout
      title="Shipping"
      subtitle="Fast, reliable delivery throughout Australia and selected international destinations."
    >
      <h2>Shipping Information</h2>
      <p>Orders are dispatched within 1–2 business days.</p>

      <h2>Australia</h2>
      <ul>
        <li>Standard Shipping: 3–7 business days.</li>
        <li>Express Shipping available at checkout.</li>
        <li>Free shipping on eligible orders.</li>
      </ul>

      <h2>International</h2>
      <p>Delivery times vary depending on destination and customs processing.</p>
    </InfoPageLayout>
  );
}
