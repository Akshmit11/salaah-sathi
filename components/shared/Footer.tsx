import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-r-0 border-l-0 border-b-0">
      <div className="space-y-4 md:space-y-0 md:space-x-3 md:flex md:justify-between py-6 px-5 sm:px-10 max-w-7xl lg:mx-auto w-full items-center">
        <Link href="/">
        <Image src={`/img3.webp`} alt="logo" width={1000} height={1000} className='w-52 h-24 object-contain object-center' priority />
        </Link>
        <p className="">2024 Bonnie Foi Technology. All Rights reserved.</p>
        <div className="flex flex-col md:flex-row flex-wrap gap-2 md:w-1/3">
          <p>
            <Link
              href={"/terms-and-conditions"}
              className="hover:underline hover:underline-offset-2 font-medium text-sm"
            >
              Terms and Conditions
            </Link>
          </p>
          <p>
            <Link
              href={"/privacy-policy"}
              className="hover:underline hover:underline-offset-2 font-medium text-sm"
            >
              Privacy Policy
            </Link>
          </p>
          <p>
            <Link
              href={"/shipping-policy"}
              className="hover:underline hover:underline-offset-2 font-medium text-sm"
            >
              Shipping Policy
            </Link>
          </p>
          <p>
            <Link
              href={"/cancellation-refund-policy"}
              className="hover:underline hover:underline-offset-2 font-medium text-sm"
            >
              Cancellation / Refund Policy
            </Link>
          </p>
          <p>
            <Link
              href={"/contact-us"}
              className="hover:underline hover:underline-offset-2 font-medium text-sm"
            >
              Contact Us
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
