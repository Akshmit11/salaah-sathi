import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
      <section className="w-full flex flex-col">
        <div className="py-5 md:py-10">
          <h1 className="text-center h3-bold sm:text-left">
            Privacy Policy <br />
          </h1>
        </div>
        <div className="px-4 sm:px-0 text-justify">
          <h3 className="font-semibold text-lg">1. Introduction</h3>
          <p className="mb-4 mt-2">
            At Suggest Solutions, your privacy is important to us. This Privacy
            Policy outlines how we collect, use, and protect your personal
            information when you use our website. By accessing or using Suggest
            Solutions, you agree to the terms of this Privacy Policy.
          </p>
          <h3 className="font-semibold text-lg">2. Information We Collect</h3>
          <p className="mb-4 mt-2">
            <span className="font-medium">2.1. Authentication:</span> We use
            Clerk Auth to authenticate users using their Gmail ID. This process
            allows us to securely verify your identity without requiring
            extensive personal information.
          </p>
          <p className="mt-2 mb-4">
            <span className="font-medium">2.2. User Information:</span> When you
            sign up for an account on Suggest Solutions, we collect the
            following information:
            <ul className="list-disc ml-7">
              <li>First Name</li>
              <li>Last Name</li>
              <li>Username</li>
              <li>Email Address</li>
              <li>Profile Photo</li>
            </ul>
          </p>
          <p className="mt-2 mb-4">
            <span className="font-medium">2.3. Data Storage:</span> The
            collected information is stored securely in our database to
            facilitate account management and user interactions on our platform.
          </p>
          <h3 className="font-semibold text-lg">3. Use of Information</h3>
          <p className="mt-2 mb-4">
            <span className="font-medium">3.1. Account Management:</span> The
            information we collect is used to create and manage your account on
            Suggest Solutions. This includes displaying your profile information
            and enabling communication with other users.
          </p>
          <p className="mt-2 mb-4">
            <span className="font-medium">3.2. Service Improvement:</span> We
            may use aggregated and anonymized data to analyze user behavior and
            improve our services. This data does not identify individual users.
          </p>
          <p className="mt-2 mb-4">
            <span className="font-medium">3.3. Communication:</span> We may use
            your email address to send you important updates, newsletters, and
            promotional materials. You can opt out of these communications at
            any time.
          </p>
          <h3 className="font-semibold text-lg">
            4. Protection of Information
          </h3>
          <p className="mt-2 mb-4">
            <span className="font-medium">4.1. Security Measures:</span> We
            implement appropriate technical and organizational measures to
            protect your personal information from unauthorized access,
            disclosure, alteration, or destruction.
          </p>
          <p className="mt-2 mb-4">
            <span className="font-medium">4.2. Data Retention:</span> We retain
            your personal information for as long as your account is active or
            as needed to provide you with our services. If you choose to delete
            your account, we will delete your personal information in accordance
            with our data retention policies.
          </p>
          <h3 className="font-semibold text-lg">5. Sharing of Information</h3>
          <p className="mt-2 mb-4">
            <span className="font-medium">5.1. Third-Party Services:</span> We
            do not sell, trade, or otherwise transfer your personal information
            to outside parties. This excludes trusted third parties who assist
            us in operating our website, conducting our business, or serving our
            users, as long as those parties agree to keep this information
            confidential.
          </p>
          <p className="mt-2 mb-4">
            <span className="font-medium">5.2. Legal Requirements:</span> We may
            disclose your personal information if required to do so by law or in
            response to valid requests by public authorities (e.g., a court or a
            government agency).
          </p>
          <h3 className="font-semibold text-lg">6. Your Rights</h3>
          <p className="mt-2 mb-4">
            <span className="font-medium">6.1. Access and Update:</span> You
            have the right to access and update your personal information at any
            time through your account settings.
          </p>
          <p className="mt-2 mb-4">
            <span className="font-medium">6.2. Deletion:</span> You have the
            right to request the deletion of your personal information. To do
            so, please contact us, and we will process your request in
            accordance with our data retention policies.
          </p>
          <h3 className="font-semibold text-lg">
            7. Changes to This Privacy Policy
          </h3>
          <p className="mt-2 mb-4">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or legal requirements. We will notify you
            of any significant changes by posting the new Privacy Policy on our
            website. Your continued use of Suggest Solutions after any changes
            to this Privacy Policy constitutes your acceptance of the revised
            terms.
          </p>
          <h3 className="font-semibold text-lg">8. Contact Information</h3>
          <p className="mt-2 mb-4">
            For any questions about this Privacy Policy, please contact us at{" "}
            <span className="italic">bonniefoitech@gmail.com</span>.
          </p>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
