import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import MobileNav from './MobileNav'
import NavItems from './NavItems'

const Header = () => {
  return (
    <header className="flex justify-between p-2 px-5 sm:px-10 shadow-sm fixed top-0 z-10 max-w-7xl lg:mx-auto w-full bg-white">
      <div className="flex gap-10 items-center">
        <Link href={'/'} className="cursor-pointer">
          <Image src={"/img3.webp"} alt="logo" width={450} height={450} className='w-52 h-24' />
        </Link>
        <NavItems />
      </div>
      <div className="flex gap-2 items-center">
        <Button asChild className="hidden md:flex gap-2 text-white">
          <Link href={"/problems/upload"}>
            <Plus className="w-5 h-5" color="white" />
            Share Your Problem
          </Link>
        </Button>
        {/* Signout */}
        <SignedOut>
          <Button asChild variant={"outline"}>
            <Link href={"/sign-in"}>Login</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <MobileNav />
      </div>
    </header>
  )
}

export default Header