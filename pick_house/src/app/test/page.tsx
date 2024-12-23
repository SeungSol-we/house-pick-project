"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ExamplePage() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRequest = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/example/');
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message);
      }

      setMessage(result.message); // 성공 메시지 설정
      router.push('/success-page'); // 성공 시 다음 페이지로 이동
    } catch (err:any) {
      setError(err.message); // 에러 메시지 설정
    }
  };

  return (
    <div>
      <button onClick={handleRequest}>API 호출</button>
      {error && <p>Error: {error}</p>}
      {message && <p>Success: {message}</p>}
    </div>
  );
}
