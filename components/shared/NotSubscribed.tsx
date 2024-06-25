'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

const NotSubscribed = () => {

  const router = useRouter();

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You are <b>not</b> a subscriber!</AlertDialogTitle>
          <AlertDialogDescription>
            If you want to use this feature please subscribe to our plan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => router.push('/')}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => router.push('/experts/subscribe')}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NotSubscribed;
