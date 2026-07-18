export default function CheckoutProgress() {
  const steps = [
    { title: "Cart", active: false, complete: true },
    { title: "Checkout", active: true, complete: false },
    { title: "Complete", active: false, complete: false },
  ];

  return (
    <div className="mt-8 flex items-center justify-center gap-5">
      {steps.map((step, index) => (
        <div key={step.title} className="flex items-center gap-5">

          <div className="flex flex-col items-center">

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition
                ${
                  step.complete
                    ? "border-black bg-black text-white"
                    : step.active
                      ? "border-black bg-white text-black"
                      : "border-black/15 bg-white text-black/35"
                }`}
            >
              {index + 1}
            </div>

            <span
              className={`mt-2 text-xs uppercase tracking-[0.18em]
                ${
                  step.active
                    ? "text-black"
                    : "text-black/45"
                }`}
            >
              {step.title}
            </span>

          </div>

          {index !== steps.length - 1 && (
            <div className="h-px w-20 bg-black/10" />
          )}

        </div>
      ))}
    </div>
  );
}
