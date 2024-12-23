"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ExamplePage() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRequest = async () => {
    try {
      const csrftoken = await getCSRFToken(); // 아래에 getCSRFToken 함수 구현 예시 참조

      const response = await fetch('http://localhost:8000/api/user', {
        method: 'POST', // POST 요청으로 변경 (CSRF 토큰은 POST 요청에 필요)
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken, // CSRF 토큰 헤더 추가
        },
        // body: JSON.stringify({ ... 필요한 데이터 }), // 필요한 경우 데이터 추가
      });
    } catch (err:any) {
      setError(err.message); // 에러 메시지 설정
    }
  };


  const getCSRFToken = async () => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('csrftoken=')) {
        return cookie.substring('csrftoken='.length, cookie.length);
      }
    }
    return "";
  };

  return (
    <div>
      <button onClick={handleRequest}>API 호출</button>
      {error && <p>Error: {error}</p>}
      {message && <p>Success: {message}</p>}
    </div>
  );
}
