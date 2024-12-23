"use client"

import { Button } from "@/components/ui/button"

import Link from 'next/link';

import { useState } from 'react';


export default function Sign_In() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');


     const handleSubmit = async (action : string) => {
        const requestData = {
        action,
        password,
        email,
        };

        try {
        const response = await fetch('http://localhost:8000/api/user/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData),
            credentials: 'include',  // 세션 쿠키를 포함하도록 설정
        });

        const result = await response.json();
        if (response.ok) {
            setMessage(result.message); // 성공 메시지
        } else {
            setMessage(`Error: ${result.message}`); // 실패 메시지
        }
        } catch (error) {
        console.error('Error:', error);
        setMessage('서버와의 통신 중 오류가 발생했습니다.');
        }
    };




  return (
    <div className="px-5 w-{100vw} h-{100vh} bg-[#FFF6FE]">
        <p className="w-full h-auto pt-10 text-3xl font-medium">하우스픽에 다시</p>
        <div className="flex h-8">
            <p className="w-24 h-auto text-3xl font-medium">오신걸ㅤ</p>
            <p className="w-auto h-auto text-3xl font-bold">환영합니다!</p>
        </div>
        
        <p className="w-full h-auto mt-2 text-xs">하우스픽에 오신걸 환영해요! 몇가지 정보를 적어주세요</p>

        <p className="w-full h-auto mt-24 text-base">이메일을 입력해 주세요</p>
        <input className="w-full h-12 mt-2 px-4 text-xs text-red-300 bg-white rounded-full focus:outline-none " 
        type="email" 
        placeholder="여기에 이메일을 입력해 주세요" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}/>

         <p className="w-full h-auto mt-5 text-base">비밀번호를 입력해 주세요</p>
        <input className="w-full h-12 mt-2 px-4 text-xs text-red-300 bg-white rounded-full focus:outline-none " 
        type="password" 
        placeholder="여기에 비밀번호를 입력해 주세요" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}/>

        <p>{message}</p>

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

