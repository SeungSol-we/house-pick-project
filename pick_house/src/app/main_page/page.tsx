"use client"

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

import { useSearchParams } from 'next/navigation';


interface Apartment {  // Apartment 타입 정의
    homename: string;
    rent_type: string;
    category: string;
    direction: string;
    계약년월: string; // 필드명 확인
    보증금: number; // 필드명 확인
    월세금: number; // 필드명 확인
    // ... 필요한 다른 필드 추가
}

export default function Main_page() {
    const searchParams = useSearchParams(); // useSearchParams 호출 결과 할당

    const other_apartmentsString = searchParams.get('other_apartments');
    let other_apartments: Apartment[] = [];
    
    if (other_apartmentsString) {
        try {
            other_apartments = JSON.parse(decodeURIComponent(other_apartmentsString)); // URL 디코딩 유지
        } catch (error) {
            console.error("Error parsing other_apartments:", error); // 에러 처리
        }
    }

    console.log(other_apartments)
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
            <Link href="/main_page/woard">
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
            <Link href="/check">
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

            {other_apartments.map((a:any, i:number) => (
                <div className='w-full h-auto bg-white flex mt-4 rounded-2xl' key={i}>
                    <div className='w-20 h-20 m-3'>
                    {a.category === '아파트' || a.category === '주택' ? (
                        <Image
                            className='rounded-2xl'
                            src={a.category === '아파트' ? '/apt.jpg' : '/house.jpeg'}
                            alt="아파트 또는 주택"
                            width={100}
                            height={100}
                        />
                    ) : null}
                    </div>
                    <div className='pt-3 pb-3'>
                        <p className='font-bold text-xl'>{a.homename}</p>
                        <p className='text-xs text-[#4A3941] pt-1 font-bold'>{a.rent_type}, {a.category}, {a.direction}</p>
                        <p className='text-xs text-[#4A3941] font-bold'>계약일: {a.계약년월}</p>
                        <p className='font-bold text-[#FF70BA] pt-1 text-lg'>보증금/월세: {a.보증금} / {a.월세금}</p>
                    </div>
                    {/* ... */}
                </div>
            ))}
            <div className="w-full h-10">

            </div>
        </div>
        
    
        
    </div>    
  );
}

