import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description:
    "Read our shipping policy to understand the guidelines for our services. Learn about how we handle deliveries and updates to our policy.",
};

const ShippingPolicy = () => {
  return (
    <>
      <section className="py-5 md:py-10">
        <h1 className="text-center text-2xl font-bold sm:text-left">
          Shipping Policy
        </h1>
      </section>
      <section className="w-full flex flex-col">
        <div className="px-4 sm:px-0 text-justify">
          <h3 className="font-semibold text-lg">1. Introduction</h3>
          <p className="mb-4 mt-2">
            Suggest Solutions, developed by Bonnie Foi Technology, operates
            entirely online. No physical products are shipped or delivered.
          </p>
          <h3 className="font-semibold text-lg">2. Electronic Delivery</h3>
          <p className="mt-2 mb-4">
            All services, including expert subscriptions, are delivered
            electronically upon successful payment. Users will receive access
            to their services via the email or account provided during
            registration.
          </p>
          <h3 className="font-semibold text-lg">3. Policy Updates</h3>
          <p className="mt-2 mb-4">
            Bonnie Foi Technology reserves the right to update or modify this
            Shipping Policy at any time without prior notice. Your continued
            use of Suggest Solutions following any changes constitutes your
            acceptance of the new terms.
          </p>
          <h3 className="font-semibold text-lg">4. Contact Information</h3>
          <p className="mt-2 mb-4">
            For any questions about our Shipping Policy, please contact us at{" "}
            <span className="italic">bonniefoitech@gmail.com</span>.
          </p>
        </div>
      </section>
    </>
  );
};

export default ShippingPolicy;
