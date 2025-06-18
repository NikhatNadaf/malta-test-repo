import * as React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="p-8 flex flex-col max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Privacy Policy</h1>
      <p className="mb-4 text-muted-foreground">Last Updated: 27th May 2025</p>

      <p className="mb-4">
        MaltaXplore (operated by A4 Malta Limited, Company Registration Number: C 103683, Registered Office: A4, Triq San Giljan, San Gwann, Malta) is committed to protecting your privacy in accordance with EU General Data Protection Regulation (GDPR).
      </p>

      <h2 className="text-xl font-semibold mb-2">1. Data Controller</h2>
      <p className="mb-4">
        A4 Malta Limited is the data controller responsible for processing your personal data collected through MaltaXplore.
      </p>

      <h2 className="text-xl font-semibold mb-2">2. Data We Collect</h2>
      <p className="mb-4">
        We collect and process the following personal data:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Full name and contact details (email, phone number, address)</li>
        <li>Booking details (services booked, dates, participants)</li>
        <li>Payment information (processed securely via third-party processors)</li>
        <li>Account credentials (for registered users)</li>
        <li>Communication records (emails, chats, inquiries)</li>
        <li>Website usage data (IP address, browser info, analytics data)</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">3. Purpose of Processing</h2>
      <p className="mb-4">
        Your data is processed for the following purposes:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Processing and managing bookings</li>
        <li>Communicating with you regarding your reservations</li>
        <li>Providing customer support</li>
        <li>Complying with legal obligations</li>
        <li>Marketing communications (only if consent is provided)</li>
        <li>Improving our services and platform functionality</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">4. Legal Basis for Processing</h2>
      <p className="mb-4">
        We process your personal data based on:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Performance of contract (fulfilling bookings)</li>
        <li>Legal obligations (tax, accounting, and regulatory compliance)</li>
        <li>Legitimate interests (service improvement, fraud prevention)</li>
        <li>Consent (for marketing communications where applicable)</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">5. Data Sharing</h2>
      <p className="mb-4">
        Your data may be shared with:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Tour and service suppliers for fulfillment of your bookings</li>
        <li>Payment processors</li>
        <li>IT service providers (hosting, CRM, support tools)</li>
        <li>Legal or regulatory authorities, where legally required</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">6. International Transfers</h2>
      <p className="mb-4">
        If personal data is transferred outside the European Economic Area (EEA), appropriate safeguards will be in place to ensure GDPR-compliant protection of your data.
      </p>

      <h2 className="text-xl font-semibold mb-2">7. Data Retention</h2>
      <p className="mb-4">
        We retain your data only as long as necessary for the purposes outlined in this policy, or as required by applicable law.
      </p>

      <h2 className="text-xl font-semibold mb-2">8. Your Rights</h2>
      <p className="mb-4">
        Under GDPR, you have the right to:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Access your personal data</li>
        <li>Request correction or deletion</li>
        <li>Restrict or object to processing</li>
        <li>Withdraw consent where processing is based on consent</li>
        <li>Data portability</li>
        <li>Lodge a complaint with your local Data Protection Authority</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">9. Security Measures</h2>
      <p className="mb-4">
        We implement appropriate technical and organizational measures to safeguard your personal data against unauthorized access, disclosure, or misuse.
      </p>

      <h2 className="text-xl font-semibold mb-2">10. Contact Information</h2>
      <p className="mb-4">
        For any privacy-related inquiries, please contact:
      </p>
      <p className="mb-2">A4 Malta Limited</p>
      <p className="mb-2">Email: info@maltaxplore.com</p>
      <p className="mb-2">Registered Office: A4, Triq San Giljan, San Gwann, Malta</p>

      <h2 className="text-xl font-semibold mb-2">11. Policy Updates</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Updates will be posted on this page.
      </p>
    </div>
  );
}
