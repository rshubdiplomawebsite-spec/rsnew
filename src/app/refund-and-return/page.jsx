export default function RefundPolicy() {
  return (
    <main className="rs-shell min-h-screen px-4 pb-16 pt-28 text-white">
      <section className="rs-card mx-auto max-w-4xl p-6 md:p-10">
        <h1 className="font-display mb-4 text-4xl font-extrabold">
          Refund & Cancellation Policy
        </h1>
        <p className="mb-8 text-sm text-gray-400">
          Effective Date: June 2, 2025
        </p>

        <div className="space-y-6 text-lg leading-relaxed text-gray-300">
          <h2 className="text-2xl font-semibold text-white">1. Digital Product Nature</h2>
          <p>
            RS Hub Study Material products are digital study material downloads,
            including notes, PDFs, PYQs, and important questions. Once a
            purchase is completed and access is provided, the product is
            considered delivered.
          </p>

          <h2 className="text-2xl font-semibold text-white">2. No Cancellation After Purchase</h2>
          <p>
            Once payment is processed, cancellation is not possible. Please
            review the material details before making a purchase.
          </p>

          <h2 className="text-2xl font-semibold text-white">3. Download Issues</h2>
          <p>
            If you face any issue downloading purchased notes or receive an
            incomplete file, contact us immediately at{" "}
            <a href="mailto:rshubdiploma@gmail.com" className="text-[#f59e0b] underline">
              rshubdiploma@gmail.com
            </a>
            . We will help you access the correct material.
          </p>

          <h2 className="text-2xl font-semibold text-white">4. Duplicate Payment</h2>
          <p>
            If you are charged twice due to a technical issue or Razorpay error,
            contact us with payment proof. After verification, the duplicate
            charge can be refunded within 7 working days.
          </p>
        </div>
      </section>
    </main>
  );
}
