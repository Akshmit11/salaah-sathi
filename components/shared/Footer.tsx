import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="space-y-4 sm:space-y-0 sm:flex sm:justify-between  py-6 px-10 shadow-sm max-w-7xl lg:mx-auto w-full">
        <Link href='/'>
          <Image 
            src="/logo.svg"
            alt="logo"
            width={128}
            height={38}
          />
        </Link>

        <p className="">
          2024 Salaah Sathi. All Rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer