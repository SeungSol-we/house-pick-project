import { Button } from "@/components/ui/button"

import Link from 'next/link';


export default function Sign_In() {
  return (
    <div className="px-5 w-{100vw} h-{100vh} bg-[#FFF6FE]">
        <p className="w-full h-auto pt-10 text-3xl font-medium">하우스픽을 다시</p>
        <div className="flex h-8">
            <p className="w-24 h-auto text-3xl font-medium">오신걸ㅤ</p>
            <p className="w-auto h-auto text-3xl font-bold">환영합니다!</p>
        </div>
        
        <p className="w-full h-auto mt-2 text-xs">하우스픽에 오신걸 환영해요! 몇가지 정보를 적어주세요</p>

        <p className="w-full h-auto mt-24 text-base">이메일을 입력해 주세요</p>
        <input className="w-full h-12 mt-2 px-4 text-xs text-red-300 bg-white rounded-full focus:outline-none " type="email" placeholder="여기에 이메일을 입력해 주세요" />

         <p className="w-full h-auto mt-5 text-base">비밀번호를 입력해 주세요</p>
        <input className="w-full h-12 mt-2 px-4 text-xs text-red-300 bg-white rounded-full focus:outline-none " type="password" placeholder="여기에 비밀번호를 입력해 주세요" />

        <div className="flex justify-center w-full pt-5 h-8">
            <Link href="/sign_in/sign_idk" className="text-pink-500 w-auto text-xs font-bold">비밀번호/이메일이 기억나지 않나요?</Link>
        </div>
        

        <div className="w-full h-[15rem] pt-40">
            <Link href="/sign_in/sign_in_good" className="w-32 h-12">
                <Button variant="outline" className="border-[#C299AB] w-full h-12 border-2 rounded-3xl text-[#FF70BA] font-extrabold">
                    로그인하기
                </Button>
            </Link>
        </div>
        
    </div>
  );
}

