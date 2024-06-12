import { Button } from '@/components/ui/button'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex min-h-screen items-center justify-center flex-col gap-10'>
      <h1 className='text-8xl'>Page Not Found...</h1>
      <Link href="/">
      <Button className='bg-black shadow-md'>
        Return Home
      </Button>
      </Link>
    </div>
  )
}