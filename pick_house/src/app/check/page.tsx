import Link from 'next/link';

import { Button } from "@/components/ui/button"
import { MoveLeft } from 'lucide-react';

import * as React from "react"
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const wol = [
    {
        value: "원리금균등",
        label: "원리금균등",
    },
    {
        value: "원금균등",
        label: "원금균등",
    },
]

export default function check() {
    return (
         <div className="w-full h-{100vh} bg-[#FFF6FE] ">
            <div className="px-5 pt-8 w-{100vw} h-{100vh}">
                <Link href="/main_page">
                    <div className='flex'>
                        <div className='h-10 w-10 rounded-full bg-white ps-2 pt-2'>
                            <MoveLeft />
                        </div>
                        <p className='ps-2 pt-2 text-xl font-bold mb-5'>대출 이자 계산기</p>
                    </div>
                </Link>

                <Select>
                <SelectTrigger className="w-[150px] rounded-3xl text-[#C299AB] font-bold pb-t">
                    <SelectValue placeholder="원리금균등" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectItem value="어쩌구">원금균등</SelectItem>
                    <SelectItem value="하하">원리금균등</SelectItem>
                    </SelectGroup>
                </SelectContent>
                </Select>
                

                <p className="w-[310px] h-auto mt-2 text-[11px] text-[#C299AB]">매월 동일한 금액(원금 + 이자)을 상환하는 방식이에요. 대출 기간 동안 매달 같은 금액을 납부하므로 예산관리에 용이해요.</p>

                <div className='flex gap-3 py-3'>
                    <Button variant="outline" className="border-[#C299AB] w-32 h-12 border-2 rounded-3xl text-[#C299AB] font-extrabold hover:bg-[#C299AB] hover:text-white">
                        거치기간
                    </Button>
                    <Button variant="outline" className="border-[#C299AB] w-36 h-12 border-2 rounded-3xl text-[#C299AB] font-extrabold hover:bg-[#C299AB] hover:text-white">
                        중도상환/금리변동
                    </Button>
                </div>
    

                <p className="w-[310px] h-auto mt-2 text-[11px] text-[#C299AB]">거치기간:대출을 받은 후 원금 상환을 시작하기 전까지의 기간을 말해요. 이 기간에는 이자만 납부하고 원금은 상환하지 않아요.</p>

                <p className="w-[310px] h-auto mt-2 text-[11px] text-[#C299AB]">중도상환:대출 만기 이전에 원금의 일부 또는 전부를 상환하는 것을 의미해요.</p>
                

                <p className="w-[310px] h-auto mt-2 text-[11px] text-[#C299AB]">금리변동:대출 기간 중 적용되는 이자율이 변하는 것을 말해요.</p>

                <p className="w-full h-auto mt-6 text-base">대출 금액을 입력해주세요</p>
                <input className="w-full h-12 mt-2 px-4 text-xs text-red-300 bg-white rounded-full focus:outline-none " placeholder="예시)1,000,000" />
        
                <p className="w-full h-auto mt-5 text-base">대출 기간을 입력해주세요</p>
                <input className="w-full h-12 mt-2 px-4 text-xs text-red-300 bg-white rounded-full focus:outline-none " type="email" placeholder="예시)12개월" />
        
                <p className="w-full h-auto mt-5 text-base">연 이자율을 입력해주세요</p>
                <input className="w-full h-12 mt-2 px-4 text-xs mb-6  text-red-300 bg-white rounded-full focus:outline-none " type="email" placeholder="예시)1%" />
        
                <div className="w-full h-[5rem] pt-4">
                    <Link href="/sign_in/sign_in_good" className="w-32 h-12">
                        <Button variant="outline" className="border-[#C299AB] w-full h-12 border-2 rounded-3xl text-[#FF70BA] font-extrabold">
                            대출 이자 계산하기
                        </Button>
                    </Link>
                </div>
                
            </div>
        </div>
      );
}