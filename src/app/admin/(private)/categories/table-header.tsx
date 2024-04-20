import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown, ArrowUp, PlusCircle } from "lucide-react";
import React from "react";

const TableHeader = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center">
        <Select value="ID">
          <SelectTrigger className="w-[100px] py-1">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ID">ID</SelectItem>
            <SelectItem value="dark">Name</SelectItem>
            <SelectItem value="system">Create time</SelectItem>
            <SelectItem value="system">Update time</SelectItem>
          </SelectContent>
        </Select>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">
              <ArrowUp className="h-3.5 w-3.5" />
            </TabsTrigger>
            <TabsTrigger value="active">
              <ArrowDown className="h-3.5 w-3.5" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Category
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
