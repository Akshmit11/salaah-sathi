"use client";

import { Check, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { getIsSavedProblem, saveProblem } from "@/lib/actions/user.actions";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type SaveProblemProps = {
  problemId: string;
  userId: any;
};

const SaveProblem = ({ problemId, userId }: SaveProblemProps) => {
  const router = useRouter();

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      const isSaved = await getIsSavedProblem(problemId, userId);
      setSaved(isSaved);
    })();
  }, [saved,]);

  const handleSave = async () => {
    const currentUser = await saveProblem(problemId, userId);
    if (!currentUser) redirect("/");

    setSaved(true);        
  };

  return (
    <div className="mt-10 px-4 sm:px-0 text-justify">
      {saved ? (
        <Button
          className="text-lg font-semibold mb-10 gap-2 border-[1px]"
          variant={"ghost"}
        >
          <Check className="w-5 h-5" color="black" />
          Saved
        </Button>
      ) : (
        <Button
          onClick={handleSave}
          className="text-lg font-semibold mb-10 gap-2"
        >
          <Plus className="w-5 h-5" color="white" />
          Save
        </Button>
      )}
    </div>
  );
};

export default SaveProblem;
