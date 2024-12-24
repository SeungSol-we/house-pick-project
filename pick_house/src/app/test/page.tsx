"use client"

import { Button } from "@/components/ui/button"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Data_1() {
    const [propertyType, setPropertyType] = useState('');
    const [householdType, setHouseholdType] = useState('');
    const [regionType, setRegionType] = useState('');
    const [directionType, setDirectionType] = useState('');
    const [categoryType, setCategoryType] = useState('');
    const [apartments, setApartments] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();


    const getCSRFToken = (): string | null => { // 함수 반환 타입 명시
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith('csrftoken=')) {
                return cookie.substring('csrftoken='.length, cookie.length);
            }
        }
        return null; // CSRF 토큰이 없는 경우 null 반환
    };


    const handleSubmit = async () => {
        const requestData = {
            property_type: propertyType,
            household_type: householdType,
            region_type: regionType,
            direction_type: directionType,
            category_type: categoryType,
        };

        try {
            const csrftoken = getCSRFToken();
            const response = await fetch('http://localhost:8000/api/user/', { // API 엔드포인트 수정
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                const data = await response.json();
                setApartments(data.apartments); // 필터링된 아파트 데이터 설정
                setError(null); // 에러 초기화
                router.push('/data_in_2');

            } else {
                const errorData = await response.json();
                setError(errorData.error || '필터링 요청 실패'); // 에러 메시지 설정
            }
        } catch (error) {
            console.error('Error:', error);
            setError('서버와의 통신 중 오류가 발생했습니다.');
        }
    };

    return (
      <div>
        {/* ... (기존 JSX) */}
        <div className="w-full h-{100vh} bg-[#FFF6FE] ">
          <div className="px-5 pt-8 w-{100vw} h-{100vh}">
              <p className="w-auto h-auto text-3xl ">선호하시는 집</p>
              <p className="w-auto h-auto text-3xl font-bold">정보를 입력해주세요</p>
              <p className="w-full h-auto mt-2 text-xs">해당 정보를 바탕으로 회원님께 딱 맞는 집을 분석해요</p>
          
              <p className="w-full h-auto mt-4 text-base font-semibold ">월세/전세/매매 중 무엇인가요?</p>
              <div className="w-full h-12 justify-between mt-2 border-0 rounded-3xl bg-white flex align-middle p-4">
                <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="w-full">
                  <option value="">월세/전세 선택</option>
                  <option value="monthly">월세</option>
                  <option value="deposit">전세</option>
                </select>
              </div>
                
              <p className="w-[310px] h-auto mt-2 text-[11px] text-[#C299AB]">월세는 매월 돈을 지급하고, 전세는 보증금을 맡기고 거주하며, 매매는 주택 소유권을 완전히 취득하는 방식이에요</p>

              <p className="w-full h-auto mt-8 text-base font-semibold ">몇인 가구가 살 예정인가요?</p>  
              <div className="w-full h-12 justify-between mt-2 border-0 rounded-3xl bg-white flex align-middle p-4">
                <select value={householdType} onChange={(e) => setHouseholdType(e.target.value)} className="w-full">
                  <option value="">가구 수 선택</option>
                  <option value="one">1인가구</option>
                  <option value="two">2인가구</option>
                  <option value="three">3인가구</option>
                  <option value="fore">4인가구</option>
                </select>
              </div>

              <p className="w-full h-auto mt-6 text-base font-semibold ">선호지역은 무엇인가요?</p>
              <div className="w-full h-12 justify-between mt-2 border-0 rounded-3xl bg-white flex align-middle p-4">
                <select value={regionType} onChange={(e) => setRegionType(e.target.value)} className="w-full">
                  <option value="">선호 지역 선택</option>
                  <option value="one">서울</option>
                  <option value="two">대전</option>
                  <option value="two">세종</option>
                  <option value="two">대구</option>
                  <option value="two">울산</option>
                  <option value="two">부산</option>
                  <option value="two">광주</option>
                  <option value="two">경기도</option>
                  <option value="two">강원도</option>
                  <option value="two">경상북도</option>
                  <option value="two">경상남도</option>
                  <option value="two">충청남도</option>
                  <option value="two">전라북도</option>
                  <option value="two">전라남도</option>
                  {/* ... */}
                </select>
              </div>

              {error && <p style={{ color: 'red' }}>{error}</p>} {/* 에러 메시지 표시 */}

              <div className=" w-full h-14 mt-[8.1rem]">
                <Button variant="outline" className="border-[#C299AB] w-full h-12 border-2 rounded-3xl text-[#FF70BA] font-extrabold" onClick={handleSubmit}>
                    다음으로 넘어가기
                </Button>
              </div>

          </div> 
        </div>
    </div>
    );
}