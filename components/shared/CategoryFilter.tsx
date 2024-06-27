"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryEnum } from "@/constants";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const CategoryFilter = ({ type }: { type?: string}) => {
  const categories = categoryEnum.Enum;
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSelectCategory = (category: string) => {
      let newUrl = '';

      if(category && category !== 'All') {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'category',
          value: category
        })
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['category']
        })
      }

      router.push(newUrl, { scroll: false });
  }

  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)} defaultValue="All">
      <SelectTrigger className="w-full h-[54px] mb-4 lg:ml-4">
        <SelectValue placeholder={`${type ? 'Category' : 'Type of Problem'}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">
          { type ? 'Category - All' : 'Type of Problem - All'
          }
        </SelectItem>
        {Object.values(categories).map((category: any) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
