import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation Refund Policy",
  description:
    "Understand our cancellation and refund policies. Learn about our non-refundable fees and the guidelines for canceling subscriptions.",
};

const CancellationRefundPolicy = () => {
  return (
    <>
      <section className="py-5 md:py-10">
        <h1 className="text-center text-2xl font-bold sm:text-left">
          Cancellation Refund Policy
        </h1>
      </section>
      <section className="w-full flex flex-col">
        <div className="px-4 sm:px-0 text-justify">
          <h3 className="font-semibold text-lg">1. Introduction</h3>
          <p className="mb-4 mt-2">
            Suggest Solutions, developed by Bonnie Foi Technology, operates
            entirely online. No physical products are shipped or delivered.
          </p>
          <h3 className="font-semibold text-lg">2. Subscription Fee</h3>
          <p className="mt-2 mb-4">
            The subscription fee for expert membership is ₹20,000 per year. 
            This fee is non-refundable and must be paid online. 
          </p>
          <h3 className="font-semibold text-lg">3. Cancellation Policy</h3>
          <p className="mt-2 mb-4">
            Users can not cancel their subscription, and no refunds 
            will be issued for the subscription. 
            Once a subscription is activated, it is non-refundable.
          </p>
          <h3 className="font-semibold text-lg">4. Policy Updates</h3>
          <p className="mt-2 mb-4">
            Bonnie Foi Technology reserves the right to update or modify this 
            Cancellation Refund Policy at any time without prior notice. Your 
            continued use of Suggest Solutions following any changes constitutes 
            your acceptance of the new terms.
          </p>
          <h3 className="font-semibold text-lg">5. Contact Information</h3>
          <p className="mt-2 mb-4">
            For any questions about our Cancellation Refund Policy, please 
            contact us at <span className="italic">bonniefoitech@gmail.com</span>.
          </p>
        </div>
      </section>
    </>
  );
};

export default CancellationRefundPolicy;