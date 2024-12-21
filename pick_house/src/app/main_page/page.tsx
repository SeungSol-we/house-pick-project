import { Button } from "@/components/ui/button"

import { Bell } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';

export default function Main_page() {
  return (
    <div className="w-full h-{100vh} bg-[#FFF6FE] ">
        <div className="flex">
            <p className="mr-32 m-2 text-2xl text-[#FF70BA]">HousePick</p>
            <Button className="bg-white ml-28 m-1">
                <Bell color="black" />
            </Button>
            <Button className="bg-white m-1">
                <CircleUserRound color="black"/>
            </Button>  
        </div>
        <p className="text-3xl ">표한빈님, 환영합니다!</p>
    </div>    
  );
}

