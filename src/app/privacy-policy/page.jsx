export default function PrivacyPolicy() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 py-10 text-white bg-gray-900 min-h-screen mt-20">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-8">
          Effective Date: June 2, 2025
        </p>

        <section className="space-y-6 text-lg leading-relaxed">
          <p>
            This Privacy Policy describes how your personal information is
            collected, used, and shared when you visit or make a purchase from{" "}
            <span className="font-semibold text-white">RS Hub Study Material</span>
            .
          </p>

          <h2 className="text-2xl font-semibold">
            1. Personal Information We Collect
          </h2>
          <p>
            When you make a purchase through our website, we collect the
            following information:
          </p>
          <ul className="list-disc list-inside pl-5">
            <li>Your name</li>
            <li>Email address</li>
            <li>Billing address</li>
            <li>
              Payment details (via Razorpay – we do not store your card or UPI
              info)
            </li>
          </ul>

          <h2 className="text-2xl font-semibold">
            2. How We Use Your Information
          </h2>
          <p>Your information is used for the following purposes:</p>
          <ul className="list-disc list-inside pl-5">
            <li>To fulfill your order and send you download links</li>
            <li>To communicate with you regarding your order or support</li>
            <li>To comply with any legal obligations</li>
          </ul>

          <h2 className="text-2xl font-semibold">3. Payment & Security</h2>
          <p>
            All payments are processed through{" "}
            <a
              href="https://razorpay.com"
              target="_blank"
              className="text-blue-400 underline"
            >
              Razorpay
            </a>
            . We do not store or have access to your payment information such as
            card numbers or UPI credentials. Razorpay uses secure encryption
            methods to ensure your data is safe.
          </p>

          <h2 className="text-2xl font-semibold">
            4. Sharing Your Personal Information
          </h2>
          <p>
            We do not sell, trade, or share your personal information with third
            parties, except as necessary to process your payment or comply with
            legal requirements.
          </p>

          <h2 className="text-2xl font-semibold">5. Your Rights</h2>
          <p>
            You have the right to access the personal data we hold about you, to
            ask that your personal data be corrected, updated, or deleted. If
            you would like to exercise this right, please contact us.
          </p>

          <h2 className="text-2xl font-semibold">6. Data Retention</h2>
          <p>
            We retain your order information for our records unless and until
            you ask us to delete this information for legal or tax-related
            reasons.
          </p>

          <h2 className="text-2xl font-semibold">7. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time in order to
            reflect changes to our practices or for other operational, legal, or
            regulatory reasons.
          </p>

          <h2 className="text-2xl font-semibold">8. Contact Us</h2>
          <p>
            For more information or if you have any questions, please contact us
            at:
            <br />
            <a
              href="mailto:rshubdiploma@gmail.com"
              className="text-blue-400 underline"
            >
              rshubdiploma@gmail.com
            </a>
          </p>
        </section>
      </main>
    </>
  );
}
