"use client";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";
import useChangeQuery from "@/utils/hooks/useChangeQuery";

const SearchBar = () => {
  const { onChangeQuery, getQuery } = useChangeQuery();
  const [keyword, setKeyword] = useState(getQuery("keyword"));

  const onSubmitSearch = () => {
    onChangeQuery("keyword", keyword);
  };
  return (
    <div className="relative flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmitSearch();
          }
        }}
      />
    </div>
  );
};

export default SearchBar;
