import { useState } from 'react';
import Link from 'next/link';

import { Button } from "@/components/ui/button"
import { CircleCheck } from 'lucide-react';

function MyComponent() {
  const [selectedOption, setSelectedOption] = useState('월세'); // 초기값 설정

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };


export default function Data_1() {
  return (
    <div className="w-full h-{100vh} bg-[#FFF6FE] ">
      <div className="px-5 pt-8 w-{100vw} h-{100vh}">
        <p className="w-auto h-auto text-3xl ">선호하시는 집</p>
        <p className="w-auto h-auto text-3xl font-bold">정보를 입력해주세요</p>
        <p className="w-full h-auto mt-2 text-xs">해당 정보를 바탕으로 회원님께 딱 맞는 집을 분석해요</p>
      
        <p className="w-full h-auto mt-4 text-base">사용될 이메일을 입력해 주세요</p>
        <div>
        <select value={selectedOption} onChange={handleOptionChange}>
            <option value="월세">월세</option>
            <option value="전세">전세</option>
        </select>
        <p>선택된 옵션: {selectedOption}</p>
        </div>
      </div>
      

      
    </div>
  );
}

