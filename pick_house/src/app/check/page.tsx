const wol = [
    {
        value: "원리금균등",
        label: "원리금균등등",
    },
    {
        value: "원금균등",
        label: "원금균등",
    },
]

export default function check() {
    return (
        <div className="px-5 w-{100vw} h-{100vh} bg-[#FFF6FE]">
            <p className="w-full h-auto pt-10 text-3xl font-medium">대출 이자 계산기</p>

            

            <p className="w-[310px] h-auto mt-2 text-[11px] text-[#C299AB]">매월 동일한 금액(원금 + 이자)을 상환하는 방식이에요. 대출 기간 동안 매달 같은 금액을 납부하므로 예산관리에 용이해요.</p>

            <button>거치기간</button>
            <button>중도상환/금리변동</button>

            <p className="w-[310px] h-auto mt-2 text-[11px] text-[#C299AB]">거치기간:대출을 받은 후 원금 상환을 시작하기 전까지의 기간을 말해요. 이 기간에는 이자만 납부하고 원금은 상환하지 않아요.</p>

            <p className="w-[310px] h-auto mt-2 text-[11px] text-[#C299AB]">중도상환:대출 만기 이전에 원금의 일부 또는 전부를 상환하는 것을 의미해요.</p>
            

            <p className="w-[310px] h-auto mt-2 text-[11px] text-[#C299AB]">금리변동:대출 기간 중 적용되는 이자율이 변하는 것을 말해요.</p>

            <p className="w-full h-auto mt-24 text-base">대출 금액을 입력해주세요</p>
            <input className="w-full h-12 mt-2 px-4 text-xs text-red-300 bg-white rounded-full focus:outline-none " placeholder="예시)1,000,000" />
    
            <p className="w-full h-auto mt-5 text-base">대출 기간을 입력해주세요</p>
            <input className="w-full h-12 mt-2 px-4 text-xs text-red-300 bg-white rounded-full focus:outline-none " type="email" placeholder="예시)12개월" />
    
            <p className="w-full h-auto mt-5 text-base">연 이자율을 입력해주세요</p>
            <input className="w-full h-12 mt-2 px-4 text-xs text-red-300 bg-white rounded-full focus:outline-none " type="email" placeholder="예시)1%" />
    
            <div className="w-full h-[15rem] pt-40">
                <Link href="/sign_in/sign_in_good" className="w-32 h-12">
                    <Button variant="outline" className="border-[#C299AB] w-full h-12 border-2 rounded-3xl text-[#FF70BA] font-extrabold">
                        대출 이자 계산하기
                    </Button>
                </Link>
            </div>
            
        </div>
      );
}