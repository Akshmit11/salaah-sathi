import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with us for any inquiries or support. Contact us via email or visit our office at the provided address.",
};

const ContactUs = () => {
  return (
    <>
      <section className="py-5 md:py-10">
        <h1 className="text-center text-2xl font-bold sm:text-left">
          Contact Us
        </h1>
      </section>
      <section className="w-full flex flex-col">
        <div className="px-4 sm:px-0 text-justify">
          <h3 className="font-semibold text-lg">1. Email</h3>
          <p className="mb-4 mt-2">
            For any inquiries or support, please email us at: 
            <span className="italic"> bonniefoitech@gmail.com</span>
          </p>
          <h3 className="font-semibold text-lg">2. Address</h3>
          <p className="mt-2 mb-4">
            You can visit our office at the following address:
          </p>
          <p className="mt-2 mb-4">
            <span className="italic">
              15-B Block, Pragati Parisar, Depot Chouraha, Bhadbhada Road, Bhopal
            </span>
          </p>
          <h3 className="font-semibold text-lg">3. Business Hours</h3>
          <p className="mt-2 mb-4">
            Our office is open from Monday to Friday, 9:00 AM to 6:00 PM.
          </p>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
