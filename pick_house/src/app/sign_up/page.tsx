"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button"


export default function Sign_Up() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const getCSRFToken = () => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.startsWith('csrftoken=')) {
            return cookie.substring('csrftoken='.length, cookie.length);
          }
        }
        return ""; // 토큰이 없으면 빈 문자열 반환
    };

  const handleSubmit = async (action : string) => {
        const requestData = {
        action,
        password,
        email,
        username,
        };

        try {
            const csrftoken = getCSRFToken();
            const response = await fetch('http://localhost:8000/api/user/', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken, // CSRF 토큰 추가
                },
                body: JSON.stringify(requestData),
                credentials: 'include', 
            });

            const result = await response.json();

            if (response.ok && result.success) { // 성공 여부 확인
                setMessage(result.message); // 성공 메시지
                router.push('/sign_up/sign_up_good'); // 성공 시 이동할 페이지
            } else {
                setMessage(`Error: ${result.message}`); // 실패 메시지 (result.message가 없을 경우 대비)
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('서버와의 통신 중 오류가 발생했습니다.');
        }
    };


  return (
    <div className="px-5 w-{100vw} h-{100vh} bg-[#FFF6FE]">
        <p className="w-full h-auto pt-10 text-3xl font-medium">하우스픽을 처음</p>
        <p className="w-full h-auto text-3xl font-bold">시작하시는 군요!</p>
        <p className="w-full h-auto mt-2 text-xs">하우스픽에 오신걸 환영해요! 몇가지 정보를 적어주세요</p>

        <p className="w-full h-auto mt-5 text-base">사용될 성함을 입력해 주세요</p>
        <input className="w-full h-12 mt-2 px-4 text-sm text-[#C299AB] bg-white rounded-full focus:outline-none " 
        type="text" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="여기에 성함을 입력해 주세요" 
        />

        <p className="w-full h-auto mt-5 text-base">사용될 이메일을 입력해 주세요</p>
        <input className="w-full h-12 mt-2 px-4 text-sm text-[#C299AB] bg-white rounded-full focus:outline-none " 
        type="email" 
        placeholder="여기에 이메일을 입력해 주세요" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

        <p className="w-full h-auto mt-5 text-base">비밀번호를 입력해 주세요</p>
        <input className="w-full h-12 mt-2 px-4 text-sm text-[#C299AB] bg-white rounded-full focus:outline-none "
        type="password"
        placeholder="여기에 비밀번호를 입력해 주세요" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />

        <p>{message}</p>

        <div className="w-full h-[15rem] pt-40">
             {/* Link 제거, onClick 핸들러 추가 */}
                <Button variant="outline" 
                        className="border-[#C299AB] w-full h-12 border-2 rounded-3xl text-[#FF70BA] font-extrabold"
                        onClick={() => handleSubmit('register')}> {/* action 값 전달 */}
                    회원가입하기
                </Button>
        </div>
        
    </div>
  );
}

