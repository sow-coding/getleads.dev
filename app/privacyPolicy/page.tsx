import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className='w-full flex flex-col items-center'>
    <main className='w-4/5 flex flex-col items-center'>
      <h1 className='text-center font-bold text-2xl mt-4'>Privacy policy - getleads.dev</h1>
      <p className='text-center font-bold text-xl mt-4'>Last Updated: April 28, 2024</p>
      <div className="my-4">
      <h2 className="text-center text-xl">Privacy Policy</h2>
      <p className="text-center">
        At getleads.dev, we are committed to protecting the privacy and security of our {`users'`} information. This policy outlines our practices regarding the collection, use, and disclosure of information we receive when you use our services.
      </p>

      <section className="my-4">
        <h2 className="text-center text-xl">Information Collection</h2>
        <p className="text-center">
          getleads.dev collects information solely related to the functionalities of our service. This includes search filters used by users and the results of such searches. We collect this information to enhance our services and to provide you with tailored functionalities.
        </p>
      </section>

      <section className="my-4">
        <h2 className="text-center text-xl">Use of Information</h2>
        <p className="text-center">
          The information collected by getleads.dev is used to:
        </p>
        <ul className="text-center">
          <li>Improve and customize our services and functionalities;</li>
          <li>Understand and analyze the usage trends and preferences of our users;</li>
          <li>Develop new products, services, features, and functionalities.</li>
        </ul>
      </section>

      <section className="my-4">
        <h2 className="text-center text-xl">Information Sharing and Disclosure</h2>
        <p className="text-center">
          getleads.dev does not sell, trade, or rent your personal information to others. We do not share your information with third parties except as described in this Privacy Policy. The information collected is for internal use only to improve the services provided by getleads.dev.
        </p>
      </section>

      <section className="my-4">
        <h2 className="text-center text-xl">Legal Compliance</h2>
        <p className="text-center">
          getleads.dev may disclose your information if required to do so by law or in the good faith belief that such action is necessary to:
        </p>
        <ul className="text-center">
          <li>Comply with a legal obligation;</li>
          <li>Protect and defend the rights or property of getleads.dev;</li>
          <li>Prevent or investigate possible wrongdoing in connection with the service;</li>
          <li>Protect the personal safety of users of the service or the public;</li>
          <li>Protect against legal liability.</li>
        </ul>
        <p className="text-center">
          Such disclosures may be made pursuant to judicial or other government subpoenas, warrants, or orders, or in accordance with applicable law.
        </p>
      </section>

      <section className="my-4">
        <h2 className="text-center text-xl">Security</h2>
        <p className="text-center">
          We take reasonable measures to protect the information we collect from or about you from unauthorized access, misuse, or disclosure. Please be aware, however, that no method of transmitting information over the Internet or storing information is completely secure.
        </p>
      </section>

      <section className="my-4">
        <h2 className="text-center text-xl">Changes to This Privacy Policy</h2>
        <p className="text-center">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>
      </section>

      <section className="my-4">
        <h2 className="text-center text-xl">Contact Us</h2>
        <p className="text-center">
          If you have any questions about this Privacy Policy, please contact us at support@swos.be.
        </p>
      </section>
    </div>
    </main>
    </div>
  );
}
