import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t border-r-0 border-l-0 border-b-0">
      <div className="space-y-4 md:space-y-0 md:space-x-3 md:flex md:justify-between py-6 px-10 max-w-7xl lg:mx-auto w-full items-center">
        <Link href='/'>
          <Image src={"/logo.png"} alt="logo" width={150} height={150} />
        </Link>

        <p className="">
          2024 Bonnie Foi Technology. All Rights reserved.
        </p>

        <div>
          <p>
            <Link href={'/terms-and-conditions'} className="hover:underline hover:underline-offset-2 font-medium text-sm">
              Terms and Conditions
            </Link>
          </p>
          <p>
            <Link href={'/privacy-policy'} className="hover:underline hover:underline-offset-2 font-medium text-sm">
              Privacy Policy
            </Link>
          </p>
          <p className="hover:underline hover:underline-offset-2 font-medium text-sm">
            Post Your Ads
          </p>
          <p>
            <Link href={'mailto:bonniefoitech@gmail.com'} className="hover:underline hover:underline-offset-2 font-medium text-sm">
              Contact Us - <span className="italic">bonniefoitech@gmail.com</span>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer