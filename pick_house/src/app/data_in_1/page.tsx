"use client"

import { CircleCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button"



 
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
 
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 
const wol = [
  {
    value: "월세",
    label: "월세",
  },
  {
    value: "전세",
    label: "전세",
  },
  {
    value: "매매",
    label: "매매",
  },
]

const person = [
  {
    value: "월세",
    label: "월세",
  },
  {
    value: "전세",
    label: "전세",
  },
  {
    value: "매매",
    label: "매매",
  },
]


export default function Data_1() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    
    return (
        <div className="w-full h-{100vh} bg-[#FFF6FE] ">
            <div className="px-5 pt-8 w-{100vw} h-{100vh}">
                <p className="w-auto h-auto text-3xl ">선호하시는 집</p>
                <p className="w-auto h-auto text-3xl font-bold">정보를 입력해주세요</p>
                <p className="w-full h-auto mt-2 text-xs">해당 정보를 바탕으로 회원님께 딱 맞는 집을 분석해요</p>
            
                <p className="w-full h-auto mt-4 text-base ">월세/전세/매매 중 무엇인가요?</p>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[330px] justify-between mt-2"
                        >
                        {value
                            ? wol.find((wol) => wol.value === value)?.label
                            : "월세"}
                        <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                        <Command>
                        <CommandInput placeholder="Search wol..." />
                        <CommandList>
                            <CommandEmpty>No wol found.</CommandEmpty>
                            <CommandGroup>
                                {wol.map((wol) => (
                                    <CommandItem
                                    key={wol.value}
                                    value={wol.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                    >
                                    {wol.label}
                                    <Check
                                    className={cn(
                                    "ml-auto",
                                    value === wol.value ? "opacity-100" : "opacity-0"
                                    )}
                                    />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                        </Command>
                    </PopoverContent>
                    </Popover>
                    <p className="w-[310px] h-auto mt-2 text-[11px] text-[#C299AB]">월세는 매월 돈을 지급하고, 전세는 보증금을 맡기고 거주하며, 매매는 주택 소유권을 완전히 취득하는 방식이에요</p>

                    <p className="w-full h-auto mt-4 text-base ">몇인 가구가 살 예정인가요?</p>
                    <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[330px] justify-between mt-2"
                        >
                        {value
                            ? wol.find((wol) => wol.value === value)?.label
                            : "월세"}
                        <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                        <Command>
                        <CommandInput placeholder="Search wol..." />
                        <CommandList>
                            <CommandEmpty>No wol found.</CommandEmpty>
                            <CommandGroup>
                                {wol.map((wol) => (
                                    <CommandItem
                                    key={wol.value}
                                    value={wol.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                    >
                                    {wol.label}
                                    <Check
                                        className={cn(
                                        "ml-auto",
                                        value === wol.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                        </Command>
                    </PopoverContent>
                    </Popover>
            </div> 
    </div>
  );
}

