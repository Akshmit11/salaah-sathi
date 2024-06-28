import { Button } from '@/components/ui/button';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const PaymentFailed = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const currentUser = await getUserById(userId);

  if (!currentUser) {
    redirect("/");
  }

  return (
    <div>
        <h1 className='text-lg font-light'>Payment Failed</h1>
        <p className='font-light mt-2'>If money was deducted from your account. Please contact us through and also attach your payment screenshot. </p>
        <Button className='bg-primary mt-2'>
          <Link href={'/'}>
            Go Home
          </Link>
        </Button>
    </div>
  )
}

export default PaymentFailed