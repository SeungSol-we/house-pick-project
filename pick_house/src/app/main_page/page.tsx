import { Button } from "@/components/ui/button"

import { Bell } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';
import { Search } from 'lucide-react';
import { MapPinPlus } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { Building2 } from 'lucide-react';
import { Calculator } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

export default function Main_page() {
    let name  = ['앱잼 아파트 1단지', '앱잼 아파트 2단지', '앱잼 아파트 3단지', ]
    let coment = [
        '아파트, 원룸, 다세대, 신축(2018~)',
        '아파트, 원룸, 다세대, 신축(2022~)',
        '아파트, 원룸, 다세대, 신축(2021~)',
    ]
    let date = [
        '2018년 7월',
        '2022년 10월',
        '2021년 6월',
    ]
    let price = [
        '525/40',
        '492/30',
        '498/42',
    ]
  return (
    <div className="w-full h-{100vh} bg-[#FFF6FE] ">
        <div className="flex">
            <p className="mr-32 m-3 text-2xl text-[#FF70BA] font-bold">HousePick</p>
            <Button className="bg-white ml-28 m-1 mt-2">
                <Bell color="black" />
            </Button>
            <Button className="bg-white m-1 mt-2">
                <CircleUserRound color="black"/>
            </Button>  
        </div>
        
        <div className="px-3 mt-5 w-{100vw} h-{100vh}">
            <p className="text-xl font-bold mb-5">표한빈님, 환영합니다!</p>
            <div className="flex w-full h-12 mt-2 px-4 bg-white rounded-full ">
                <input className="w-[95%] h-12  text-xs text-red-300 focus:outline-none" placeholder="찾으시려는 집을 입력해 보세요..."/>
                <div className="mt-[0.85rem] ">
                    <Search size={18}/>
                </div>
            </div>
            <Link href="/">
                <div className="w-full h-[5rem] bg-white flex mt-2 rounded-2xl">
                    <div className="m-4 mt-6">
                        <MapPinPlus size={30} color="#C299AB"/>
                    </div>
                    <div className="mt-5">
                        <p className="text-sx font-bold ">부동산 정보 지도로 확인하기</p>
                        <p className="text-sm font-bold text-[#C299AB]">분석한 정보를 지도로 확인할 수 있어요</p>
                    </div>
                    <div className="mt-6 pl-2">
                        <ChevronRight size={32}/>
                    </div>
                </div>
            </Link>
            <Link href="/">
                <div className="w-full h-[5rem] bg-white flex mt-2 rounded-2xl">
                    <div className="m-4 mt-6">
                        <Building2 size={30} color="#C299AB"/>
                    </div>
                    <div className="mt-5">
                        <p className="text-sx font-bold">어려운 부동산 용어 정리</p>
                        <p className="text-sm font-bold text-[#C299AB]">부동산 초보자를 위해 쉽게 정리했어요</p>
                    </div>
                    <div className="mt-6 pl-2">
                        <ChevronRight size={32}/>
                    </div>
                </div>
            </Link>
            <Link href="/">
                <div className="w-full h-[5rem] bg-white flex mt-2 rounded-2xl">
                    <div className="m-4 mt-6">
                        <Calculator size={30} color="#C299AB"/>
                    </div>
                    <div className="mt-5">
                        <p className="text-sx font-bold">대출 이자 계산기 이용하기</p>
                        <p className="text-sm font-bold text-[#C299AB]">대출 시 납부해야할 이자를 계산합니다.</p>
                    </div>
                    <div className="mt-6 pl-2">
                        <ChevronRight size={32}/>
                    </div>
                </div>
            </Link>
            

            <div className="flex mt-6 mb-5">
                <p className="text-xl font-bold ">회원님께 추천드리는 집</p>
                <p className="text-xl font-bold ml-24 text-[#C299AB]">3개</p>
            </div>
            {
                name.map((a, i) => (
                    <div className='w-full h-[7rem] bg-white flex mt-2 rounded-2xl' key={'a'+i}>
                        <div className='w-20 h-20 m-3'>
                            <Image className=' rounded-2xl' src="/apt.jpg" alt="아파트" width={100} height={100} ></Image>
                        </div>
                        <div className='pt-3'>
                            <p className='font-bold text-xl'>{a}</p>
                            <p className='text-xs text-[#4A3941] pt-1 font-bold'>{coment[i]}</p>
                            <p className='text-xs text-[#4A3941] font-bold'>계약일: {date[i]}</p>
                            <p className='font-bold text-[#FF70BA] pt-1 text-lg'>보증금/월세: {price[i]}</p>
                        </div>
                        <div className='w-12 text-[#F5E1EB] flex justify-center pt-10 text-2xl'>
                            ★
                        </div>
                    </div>       
                ))
            }
            <div className="w-full h-10">

            </div>
        </div>
        
    
        
    </div>    
  );
}

