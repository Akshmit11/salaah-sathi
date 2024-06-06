"use client";

import { usePathname } from "next/navigation";
import { useTransition } from "react";

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
import { deleteSavedProblem } from "@/lib/actions/problem.actions";
import { X } from "lucide-react";

type DeleteSaveProblemParams = {
    problemId: string;
    currentUserId?: string;
}

export const DeleteSavedProblem = ({ problemId, currentUserId }: DeleteSaveProblemParams) => {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex gap-[6px] bg-red-500 py-[8.5px] px-4 text-white font-medium rounded-md hover:bg-primary">
        <X className="w-5 h-5" color="white" />
        Remove
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to remove?</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            This will permanently remove this problem from your saved problems
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await deleteSavedProblem({ problemId, path: pathname, currentUserId });
              })
            }
            className="bg-red-500"
          >
            {isPending ? "Removing..." : "Remove"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
