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


    const getCSRFToken = (): string | null => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith('csrftoken=')) {
                return cookie.substring('csrftoken='.length, cookie.length);
            }
        }
        return null;
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

            if (!csrftoken) {
                setError('CSRF 토큰을 찾을 수 없습니다.');
                return;
            }

            const response = await fetch('http://localhost:8000/api/filter/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                const data = await response.json();
                setApartments(data.apartments);
                setError(null);

                // 쿼리 파라미터로 데이터 전달
                const queryParams = new URLSearchParams();
                queryParams.set('apartments', JSON.stringify(data.apartments)); // apartments를 문자열로 변환하여 쿼리 파라미터에 추가
                router.push(`/chu_list?${queryParams.toString()}`);
            } else {
                const errorData = await response.json();
                setError(errorData.error || '필터링 요청 실패');
            }
        } catch (error: any) {
            console.error('Error:', error);
            setError(error.message || '서버와의 통신 중 오류가 발생했습니다.');
        }
    };

    return (
         <div className="flex justify-center">
        <div className="w-full h-{100vh} bg-[#FFF6FE]">
          <div className="px-5 pt-8 w-{100vw} h-{100vh}">
              <p className="w-auto h-auto text-3xl ">선호하시는 집</p>
              <p className="w-auto h-auto text-3xl font-bold">정보를 입력해주세요</p>
              <p className="w-full h-auto mt-2 text-xs">해당 정보를 바탕으로 회원님께 딱 맞는 집을 분석해요</p>
          
              <p className="w-full h-auto mt-20 text-base font-semibold ">향 방향은 어떤 것을 선호하시나요?</p>
              <div className="w-full h-12 justify-between mt-2 border-0 rounded-3xl bg-white flex align-middle p-4">
                <select value={directionType} onChange={(e) => setDirectionType(e.target.value)} className="w-full">
                  <option value="">향 방향 선택</option>
                  <option value="monthly">남향</option>
                  <option value="deposit">북향</option>
                </select>
              </div>
                
              <p className="w-[310px] h-auto mt-2 text-[11px] text-[#C299AB]">남향은 일조량이 많고 따뜻하며, 북향은 햇빛이 적고 시원함을 즐길 수 있어요. 대부분 "남향"을 선호해요.</p>


              <p className="w-full h-auto mt-6 text-base font-semibold ">건물 유형 여부는?</p>
              <div className="w-full h-12 justify-between mt-2 border-0 rounded-3xl bg-white flex align-middle p-4">
                <select value={categoryType} onChange={(e) => setCategoryType(e.target.value)} className="w-full">
                  <option value="">선호 지역 선택</option>
                  <option value="Seoul">아파트</option>
                  <option value="daejeon">주택</option>
                </select>
              </div>

              {error && <p style={{ color: 'red' }}>{error}</p>} {/* 에러 메시지 표시 */}

              <div className=" w-full h-[4.5rem] mt-40">
                <Button variant="outline" className="border-[#C299AB] w-full h-12 border-2 rounded-3xl text-[#FF70BA] font-extrabold" onClick={handleSubmit}>
                    다음으로 넘어가기
                </Button>
              </div>

          </div> 
        </div>
    </div>
    );
}