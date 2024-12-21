import Image from "next/image";

import { MoveDown } from 'lucide-react';
import { House } from 'lucide-react';

import { Button } from "@/components/ui/button"

import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full h-{100vh} bg-pink-100 ">
      <div className="w-full h-32 pt-4 text-red-400 flex align-items-center justify-center">
        <MoveDown size={100}/>
      </div>
      <div className="w-full h-56 flex justify-center">
        <div className="rounded-full w-56 h-56 border-red-400 border-4 flex justify-center">
          <div className="m-6">
            <House size={150} color="hotpink" />
          </div>
        </div>
      </div>
      <p className="w-full h-auto mt-12 text-pink-400 text-5xl flex justify-center tems-center">
        HousePick
      </p>
      <p className="w-full h-auto text-stone-900 text-l flex justify-center tems-center ">
        부동산 초보인 당신을 위한
      </p>
      <p className="w-full h-auto text-stone-900 text-l flex justify-center tems-center font-bold">
        최고의 도우미 서비스
      </p>
      <div className="w-full h-32 flex justify-center gap-3 mt-14">
        <Link href="/sign_up" className="w-32 h-12">
          <Button variant="outline" className="border-red-400 w-32 h-12 border-2 rounded-3xl text-red-400">
            회원가입
          </Button>
        </Link>
        <Link href="/sign_in" className="w-32 h-12">
          <Button variant="outline" className="border-red-400 w-32 h-12 border-2 rounded-3xl text-red-400">
            로그인
          </Button>
        </Link>
      </div>
    </div>
  );
}

