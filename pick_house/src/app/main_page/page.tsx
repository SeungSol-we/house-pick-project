import { Button } from "@/components/ui/button"

import { Bell } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';
import { Search } from 'lucide-react';
import { MapPinPlus } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { Building2 } from 'lucide-react';

export default function Main_page() {
  return (
    <div className="w-full h-{100vh} bg-[#FFF6FE] ">
        <div className="flex">
            <p className="mr-32 m-3 text-2xl text-[#FF70BA]">HousePick</p>
            <Button className="bg-white ml-28 m-1">
                <Bell color="black" />
            </Button>
            <Button className="bg-white m-1">
                <CircleUserRound color="black"/>
            </Button>  
        </div>
        <div className="px-3 mt-5 w-{100vw} h-{100vh}">
            <p className="text-xl font-bold ">표한빈님, 환영합니다!</p>
            <div className="flex">
                <input className="w-full h-12 mt-2 px-4 text-xs text-red-300 bg-white rounded-full focus:outline-none" placeholder="찾으시려는 집을 입력해 보세요..."/>
                <div className="mt-4">
                    <Search  />
                </div>
            </div>
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
            <div className="w-full h-[5rem] bg-white flex mt-2 rounded-2xl">
                <div className="m-4 mt-6">
                    <Building2 size={30} color="#C299AB"/>
                </div>
                <div className="mt-5">
                    <p className="text-sx font-bold">부동산 정보 지도로 확인하기</p>
                    <p className="text-sm font-bold text-[#C299AB]">분석한 정보를 지도로 확인할 수 있어요</p>
                </div>
                <div className="mt-6 pl-2">
                    <ChevronRight size={32}/>
                </div>
            </div>
            <div className="w-full h-[5rem] bg-white flex mt-2 rounded-2xl">
                <div className="m-4 mt-6">
                    <Building2 size={30} color="#C299AB"/>
                </div>
                <div className="mt-5">
                    <p className="text-sx font-bold">부동산 정보 지도로 확인하기</p>
                    <p className="text-sm font-bold text-[#C299AB]">분석한 정보를 지도로 확인할 수 있어요</p>
                </div>
                <div className="mt-6 pl-2">
                    <ChevronRight size={32}/>
                </div>
            </div>
            

            
        </div>

        
    </div>    
  );
}

