import Image from "next/image";

import { MoveDown } from 'lucide-react';
import { House } from 'lucide-react';

import { Button } from "@/components/ui/button"

import Link from 'next/link';

export default function Sign_In() {
  return (
    <div className="w-full h-{100vh} bg-pink-100 ">
        <p className="w-full h-32">하우스픽을 처음</p>
        <p>시작하시는 군요!</p>
        <p>하우스픽에 오신걸 환영해요! 몇가지 정보를 적어주세요</p>

        <p>사용될 성함을 입력해 주세요</p>
    </div>
  );
}

