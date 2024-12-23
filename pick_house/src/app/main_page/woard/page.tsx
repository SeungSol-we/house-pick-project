import Link from 'next/link';

import { Button } from "@/components/ui/button"

import { MoveLeft } from 'lucide-react';
import { Search } from 'lucide-react';

export default function Sign_Up_Good() {
    let main = ['갭투자','입주권','공실률','임대수익률','권리분석','LTV','건폐율']
    let sub = [
        '전세금을 활용해 주택을 매입하는 투자 형식',
        '재개발, 재건축시 조합원에게 주어지는 입주자격',
        '임대되지 않은 빈 공간의 비율',
        '부동산 임대 수익을 투자 금액 대비 백분율로 나타낸 것',
        '부동산에 얽힌 권리 관계를 분석하는 절차',
        'Loan to Value ratio, 주택 가격 대비 대출 가능 비율',
        '대지면적 대비 건축물 바닥면적의 비율',
    ]
  return (
    <div className="w-full h-{100vh} bg-[#FFF6FE] ">
      <div className="px-5 pt-8 w-{100vw} h-{100vh}">
        <Link href="/main_page">
            <div className='flex'>
                <div className='h-10 w-10 rounded-full bg-white ps-2 pt-2'>
                    <MoveLeft />
                </div>
                <p className='ps-2 pt-2 text-xl font-bold mb-5'>부동산 용어 정리</p>
            </div>
                   
        </Link>
        <div className="flex w-full h-12 mt-2 px-4 bg-white rounded-full ">
            <input className="w-[95%] h-12  text-xs text-red-300 focus:outline-none" placeholder="찾으시려는 단어를 입력해 보세요..."/>
            <div className="mt-[0.85rem] ">
                <Search size={18}/>
            </div>
        </div>  
        
        {
            main.map((a, i) => (
                <div className='w-full h-[7rem] bg-white flex mt-2 rounded-2xl' key={'a'+i}>
                    <div className='pt-5 pl-4'>
                        <p className='font-bold text-2xl '>{a}</p>
                        <p className='text-xs text-[#C299AB] pt-3 font-bold w-[16rem]'>{sub[i]}</p> 
                    </div>
                    <div className='w-12 text-[#F5E1EB] flex justify-center pt-10 text-2xl'>
                        ★
                    </div>
                </div>       
            ))
        }
      </div>
    </div>
  );
}

