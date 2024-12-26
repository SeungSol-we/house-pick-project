
"use client"

import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Chu_List() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [apartments, setApartments] = useState<any[] | null>(null);

    useEffect(() => {
        const apartmentsString = searchParams.get('apartments');
        if (apartmentsString) {
            try {
                const decodedApartments = JSON.parse(decodeURIComponent(apartmentsString));
                console.log("Chu_List에서 받은 데이터:", decodedApartments);
                setApartments(decodedApartments);
            } catch (error) {
                console.error("apartments 파싱 에러:", error);
            }
        }
    }, [searchParams]);

    if (apartments === null) {
        return <div>로딩 중...</div>;
    }

    if (Array.isArray(apartments) && apartments.length === 0) {
        return <div>데이터가 없습니다.</div>;
    }

    const handleNextClick = () => {
        const encodedApartments = encodeURIComponent(JSON.stringify(apartments));
        router.push(`/main_page?apartments=${encodedApartments}`); // 쿼리 매개변수로 데이터 전달
        console.log(encodedApartments)
    };


  return (
    <div className="w-full h-{100vh} bg-[#FFF6FE] ">
      <div className="px-5 w-{100vw} h-{100vh}">
        <p className="w-full h-auto pt-10 text-3xl font-medium font-thins">회원님의 요구사항을</p>
        <p className="w-full h-auto text-3xl font-bold font-thins">반영한 집 리스트 입니다</p>
        <p className="w-full h-auto mt-2 text-xs">회원님이 선택한 데이터들을 반영 했어요</p>
        
        <div className="w-24 h-6 pt-1 flex justify-center mt-8 text-xs rounded-2xl bg-white">
            {apartments[0].region_type} ▼
        </div>

        {apartments.map((a:any, i:number) => (
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
                  <p className='text-xs text-[#4A3941] font-bold'>계약일: {a.계약년월}</p> {/* 계약년월 속성 이름 확인 */}
                  <p className='font-bold text-[#FF70BA] pt-1 text-lg'>보증금/월세: {a.보증금} / {a.월세금}</p> {/* 보증금, 월세금 속성 이름 확인 */}
              </div>
              {/* ... */}
          </div>
      ))}
        <div className='w-full h-auto flex justify-center mt-4'>
            <p className='text-sm font-bold text-[#C299AB]'>보증금과 월세는 만 원 단위예요</p>
        </div>
        
      
      </div>
      
       <div className="w-full h-24 flex justify-center align-items-center mt-4 bg-white">
          <Button variant="destructive" className="bg-[#FF70BA] w-[22rem] h-14 border-2 rounded-[2rem] text-white font-bold hover:bg-[#FF70BA]" onClick={handleNextClick}> {/* onClick 추가 */}
            다음으로
          </Button>
      </div>
    </div>
  );
}