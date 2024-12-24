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
    value: "남향",
    label: "남향",
  },
  {
    value: "북향",
    label: "북향",
  },
  {
    value: "동향",
    label: "동향",
  },
  {
    value: "서향",
    label: "서향",
  },
]

const person = [
  {
    value: "상관없음",
    label: "상관없음",
  },
  {
    value: "신축",
    label: "신축",
  },
  {
    value: "구축",
    label: "구축",
  },
]

const region = [
  {
    value: "아파트",
    label: "아파트",
  },
  {
    value: "주택",
    label: "주택",
  },
  
]


export default function Data_1() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const [open2, setOpen2] = React.useState(false)
    const [value2, setValue2] = React.useState("")

    const [open3, setOpen3] = React.useState(false)
    const [value3, setValue3] = React.useState("")
    
    return (
        <div className="w-full h-{100vh} bg-[#FFF6FE] ">
            <div className="px-5 pt-8 w-{100vw} h-{100vh}">
                <p className="w-auto h-auto text-3xl ">선호하시는 집</p>
                <p className="w-auto h-auto text-3xl font-bold">정보를 입력해주세요</p>
                <p className="w-full h-auto mt-2 text-xs">해당 정보를 바탕으로 회원님께 딱 맞는 집을 분석해요</p>
            
                <p className="w-full h-auto mt-4 text-base font-semibold ">향 방향은 어떤 것을 선호하시나요?</p>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[330px] justify-between mt-2 border-0 rounded-3xl"
                        >
                        {value
                            ? wol.find((wol) => wol.value === value)?.label
                            : "남향"}
                        <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                        <Command>
                        <CommandInput placeholder="검색 향 방향..." />
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
                    <p className="w-[310px] h-auto mt-2 text-[11px] text-[#C299AB]">남향은 일조량이 많고 따뜻하며, 북향은 햇빛이 적고 시원하고, 동향은 아침 햇살이 좋으며, 서향은 오후 햇빛과 저녁 노을을ㅤ 즐길 수 있어요. 대부분 "남향"을 선호해요.</p>

                    <p className="w-full h-auto mt-8 text-base font-semibold ">신축/구축 선호 여부는?</p>
                    <Popover open={open2} onOpenChange={setOpen2}>
                    <PopoverTrigger asChild>
                        <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open2}
                        className="w-[330px] justify-between mt-2 border-0 rounded-3xl "
                        >
                        {value2
                            ? person.find((person) => person.value === value2)?.label
                            : "상관없음"}
                        <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                        <Command>
                        <CommandInput placeholder="검색 지어진 시기..." />
                        <CommandList>
                            <CommandEmpty>No person found.</CommandEmpty>
                            <CommandGroup>
                                {person.map((person) => (
                                    <CommandItem
                                    key={person.value}
                                    value2={person.value}
                                    onSelect={(currentValue) => {
                                        setValue2(currentValue === value ? "" : currentValue)
                                        setOpen2(false)
                                    }}
                                    >
                                    {person.label}
                                    <Check
                                        className={cn(
                                        "ml-auto",
                                        value2 === person.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                        </Command>
                    </PopoverContent>
                    </Popover>


                    <p className="w-full h-auto mt-6 text-base font-semibold ">건물 유형 여부는?</p>
                    <Popover open={open3} onOpenChange={setOpen3}>
                    <PopoverTrigger asChild>
                        <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open3}
                        className="w-[330px] justify-between mt-2 border-0 rounded-3xl"
                        >
                        {value3
                            ? region.find((region) => region.value === value3)?.label
                            : "아파트"}
                        <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                        <Command>
                        <CommandInput placeholder="검색 지역종류..." />
                        <CommandList>
                            <CommandEmpty>No region found.</CommandEmpty>
                            <CommandGroup>
                                {region.map((region) => (
                                    <CommandItem
                                    key={region.value}
                                    value={region.value}
                                    onSelect={(currentValue) => {
                                        setValue3(currentValue === value3 ? "" : currentValue)
                                        setOpen3(false)
                                    }}
                                    >
                                    {region.label}
                                    <Check
                                        className={cn(
                                        "ml-auto",
                                        value3 === region.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                        </Command>
                    </PopoverContent>
                    </Popover>

                    <div className="w-full h-[15rem] pt-32">
                        <Link href="/chu_list" className="w-32 h-12">
                            <Button variant="outline" className="border-[#C299AB] w-full h-12 border-2 rounded-3xl text-[#FF70BA] font-extrabold">
                                다음으로 넘어가기
                            </Button>
                        </Link>
                    </div>

            </div> 
    </div>
  );
}

