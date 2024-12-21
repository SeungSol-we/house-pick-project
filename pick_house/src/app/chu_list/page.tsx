import { CircleCheck } from 'lucide-react';

import Link from 'next/link';

import { Button } from "@/components/ui/button"


export default function Sign_Up_Good() {
    let name  = ['앱잼 아파트 1단지', '앱잼 아파트 2단지', '앱잼 아파트 3단지', '앱잼 아파트 4단지', '앱잼 아파트 5단지', '앱잼 아파트 6단지', '앱잼 아파트 7단지',]
    let coment = [
        '아파트, 원룸, 다세대, 신축(2018~)',
        '아파트, 원룸, 다세대, 신축(2022~)',
        '아파트, 원룸, 다세대, 신축(2021~)',
        '아파트, 원룸, 다세대, 신축(2019~)',
        '아파트, 원룸, 다세대, 신축(2020~)',
        '아파트, 원룸, 다세대, 신축(2023~)',
        '아파트, 원룸, 다세대, 신축(2022~)',
    ]
    let date = [
        '2018년 7월',
        '2022년 10월',
        '2021년 6월',
        '2019년 9월',
        '2020년 12월',
        '2023년 11월',
        '2022년 8월',
    ]
    let price = [
        '525/40',
        '492/30',
        '498/42',
        '513/39',
        '537/35',
        '462/41',
        '556/35',  
    ]


  return (
    <div className="w-full h-{100vh} bg-[#FFF6FE] ">
      <div className="px-5 w-{100vw} h-{100vh}">
        <p className="w-full h-auto pt-10 text-3xl font-medium">회원님의 요구사항을</p>
        <p className="w-full h-auto text-3xl font-bold">반영한 집 리스트 입니다</p>
        <p className="w-full h-auto mt-2 text-xs">회원님이 선택한 데이터들을 반영 했어요</p>
        
        <div className="w-24 h-6 pt-1 flex justify-center mt-8 text-xs rounded-2xl bg-white">
            서울특별시 ▼
        </div>

        <div className='w-full h-32 bg-white flex'>
            <div></div>
            <div></div>
            <div></div>
        </div>
      
      </div>
      
      

      <div className="w-full h-32 flex justify-center mt-[17rem]">
        <Link href="/data_in_1" className="w-[22rem] h-14">
          <Button variant="destructive" className="bg-[#FF70BA] w-[22rem] h-14 border-2 rounded-[2rem] text-white font-bold hover:bg-[#FF70BA]" >
            다음으로
          </Button>
        </Link>
      </div>
    </div>
  );
}

