"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";

const SaveProblem = () => {

    const handleSave = () => {
        
    }

  return (
    <div className="mt-10 px-4 sm:px-0 text-justify">
      <Button onClick={handleSave} className="text-lg font-semibold mb-10 gap-2">
        <Plus className="w-5 h-5" color="white" />
        Save
      </Button>
    </div>
  );
};

export default SaveProblem;
