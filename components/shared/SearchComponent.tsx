"use client"

import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchComponent = ({ placeholder = 'Search title...' }: { placeholder?: string }) => {
    const [query, setQuery] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        let newUrl = '';
        if (query) {
          newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: 'query',
            value: query
          })
        } else {
          newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['query']
          })
        }
        router.push(newUrl, { scroll: false });
      }, 500);

      return () => clearTimeout(delayDebounceFn)
    }, [query, searchParams, router])

  return (
    <div className='flex items-center justify-center min-h-[54px] w-full overflow-hidden rounded-lg px-4 py-2 bg-gray-200 mb-4'>
        <Search className='w-6 h-6' />
        <Input
          type='text'
          placeholder={placeholder}
          onChange={(e) => setQuery(e.target.value)}
          className='text-[16px] font-normal leading-[24px] border-0 bg-gray-200 outline-offset-0 placeholder-text-black focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0'
        />
    </div>
  )
}

export default SearchComponent