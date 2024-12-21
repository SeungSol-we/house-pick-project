import Image from "next/image";
import { MoveDown } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex align-items-center justify-center">
      <div className="w-full h-32 text-red-400 text-9xl">
        <MoveDown />
      </div>
    </div>
  );
}
