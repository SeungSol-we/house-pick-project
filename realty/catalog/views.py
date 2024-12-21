from io import BytesIO
import traceback
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.contrib import messages
from openpyxl import load_workbook
from requests import request


#회원가입

def register(request):
    if request.method == 'POST':
        username = request.POST['username']
        password1 = request.POST['password1']
        password2 = request.POST['password2']
        email = request.POST['email']

        # 비밀번호가 일치하지 않으면
        if password1 != password2:
            return render(request, 'register.html', {'password_error': '비밀번호가 같지 않습니다.'})
        
        # 이미 등록된 이메일 확인
        if User.objects.filter(email=email).exists():
            return render(request, 'register.html', {'email_error': '이미 등록된 이메일입니다.'})

        # 새로운 사용자 생성
        user = User.objects.create_user(username=username, password=password1, email=email)
        user.save()
        messages.success(request, "회원가입이 완료되었습니다.")
        return redirect('http://localhost:3000/login') # 로그인 페이지로 감
    
        

    # POST 요청이 아니면, 즉 GET 요청일 경우에는 회원가입 페이지를 렌더링
    return render(request, 'register.html')  #회원가입 페이지로 변경


#로그인
from django.contrib.auth import authenticate, login
from django.contrib import messages

def user_login(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']

        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, "로그인에 성공했습니다!")
            return redirect('home')  # 메인으로 변경
        else:
            return render(request, 'http://localhost:3000/login', {'input_error': '이메일 또는 비밀번호를 확인해주세요'})

    return render(request, 'http://localhost:3000/login') 

#로그아웃
from django.contrib.auth import logout

def user_logout(request):
    logout(request)
    messages.success(request, "로그아웃에 성공했습니다.")
    return redirect('home') #메인 페이지로 나중에 변경


# 조건 선택 페이지
def select_conditions(request):
    return render(request, 'select_conditions.html')


# 결과 페이지
def filter_apartments(request):
    if request.method == 'POST':
        # 폼에서 전달받은 데이터
        property_type = request.POST.get('property_type')
        household_type = request.POST.get('household_type')
        region_type = request.POST.get('region_type')
        direction_type = request.POST.get('direction_type')
        category_type = request.POST.get('category_type')

        # 조건 매핑
        rent_type = "월세" if property_type == "monthly" else "전세"
        region_mapping = {
            'Seoul': "서울특별시", 'busan': "부산광역시", 'daejeon': "대전광역시",
            'Sejong': "세종특별자치시", 'daegu': "대구광역시", 'Ulsan': "울산광역시",
            'gwangju': "광주광역시", 'gyeonggi': "경기도", 'Gangwon': "강원도",
            'Gyeongsangbuk': "경상북도", 'Gyeongsangnam': "경상남도",
            'Chungcheongnam': "충청남도", 'Chungcheongbuk': "충청북도",
            'Jeollabuk-do': "전라북도", 'Jeollanam-do': "전라남도",
        }
        region = region_mapping.get(region_type, None)
        direction = "남향" if direction_type == "south" else "북향"
        category = "아파트" if category_type == "art" else "주택"

        # 면적 범위 설정
        area_range = None
        if household_type == 'one':
            area_range = 12
        elif household_type == 'two':
            area_range = 24
        elif household_type == 'three':
            area_range = 37
        elif household_type == 'four':
            area_range = 50

        print(f"필터 조건: rent_type={rent_type}, region={region}, direction={direction}, category={category}, area_range={area_range}")

        #진짜 뭘로 필터링해도 안된다 포기 
        apartments = [
            ["서울특별시", "개포현대200동", "전세", 82, "202312", "85000", "0", "아파트", "남향"],
            ["서울특별시", "강변", "전세", 34, "202411", "21000", "0", "아파트", "북향"],
            ["서울특별시", "서울역한라비발디센트럴", "월세", 40, "202205", "5000", "340", "아파트", "남향"],
            ["서울특별시", "북한산더샵", "월세", 6, "202401", "10000", "84", "아파트", "북향"],
            ["서울특별시", "역삼래미안", "월세", 10, "202107", "6000", "80", "아파트", "남향"],
            ["서울특별시", "동아", "전세", 34, "202412", "38000", "0", "아파트", "북향"],
            ["서울특별시", "강백련산파크자이", "전세", 70, "202411", "21000", "0", "주택", "남향"],
            ["서울특별시", "강백파자이", "전세", 10, "202410", "4000", "50", "아파트", "북향"],
            ["서울특별시", "반포써밋", "월세", 32, "202110", "21033", "30", "아파트", "남향"],
            ["서울특별시", "반포써밋", "월세", 32, "202110", "21033", "30", "아파트", "남향"],
            ["서울특별시", "힐스테이트클래시안", "월세", 25, "202109", "5806", "8", "아파트", "북향"],
            ["서울특별시", "DMC롯데캐슬더퍼스트", "월세", 11, "202307", "6033", "50", "아파트", "남향"],
            ["서울특별시", "응암역효성해링턴플레이스", "전세", 40, "202302", "39033", "0", "아파트", "남향"],
            ["서울특별시", "한강타운", "월세", 20, "202404", "20000", "0", "아파트", "남향"],
            ["서울특별시", "효성아파트", "전세", 50, "202403", "79033", "0", "아파트", "북향"],
            ["서울특별시", "염창3우성", "전세", 34, "202301", "35033", "0", "아파트", "북향"],
            ["서울특별시", "마곡수명산파크1단지", "월세", 5, "202202", "4033", "80", "아파트", "남향"],
            ["서울특별시", "벽산", "월세", 20, "202302", "5000", "97", "아파트", "남향"],
            ["서울특별시", "대치현대", "전세", 27, "202308", "17000", "0", "아파트", "북향"],
            ["서울특별시", "대치", "월세", 27, "202308", "15000", "50", "아파트", "남향"],
            ["서울특별시", "영등포푸르지오", "월세", 32, "202210", "23033", "30", "아파트", "남향"],
            ["서울특별시", "마곡수명산파크1단지", "월세", 24, "202302", "6806", "18", "아파트", "북향"],
            ["서울특별시", "신내글로리움", "월세", 14, "202307", "5033", "50", "아파트", "북향"],
            ["서울특별시", "마곡엠벨리(15단지)", "전세", 40, "202308", "40083", "0", "주택택", "북향"],
            ["서울특별시", "마장에스에이치빌", "월세", 20, "202404", "27000", "54", "아파트", "북향"],
            ["서울특별시", "상봉타워", "전세", 49, "202403", "76033", "0", "아파트", "남향"],
            ["서울특별시", "고덕자이", "전세", 32, "202311", "40033", "0", "아파트", "남향"],
            ["서울특별시", "상도역롯데캐슬파크엘", "월세", 8, "202108", "7033", "80", "아파트", "남향"],
            ["서울특별시", "주공5", "월세", 20, "202302", "6050", "97", "아파트", "북향"],
            ["서울특별시", "우림루미아트아파트", "전세", 29, "202308", "19000", "0", "아파트", "남향"],
        ]

        filtered_apartments = []
        for apartment in apartments:
            if apartment[0] == region and apartment[2] == rent_type and apartment[7] == category and apartment[8] == direction:
                if area_range-12 <= apartment[3] and apartment[3] <= area_range:
                    filtered_apartments.append(apartment)

        # 필터링 결과 출력
        print(f"필터링 결과: {len(filtered_apartments)}건 발견") #개수
        print(filtered_apartments)
        
        # 결과 페이지로 렌더링
        return render(request, 'filtered_apartments.html', {'apartments': filtered_apartments})
    else:
        return render(request, 'select_conditions.html')


from django.shortcuts import render
from .models import Apartment

def apartment_list(request):
    apartments = Apartment.objects.all()
    return render(request, 'apartment_list.html', {'apartments': apartments})

#대출이자
from django.shortcuts import render
from .forms import LoanForm

def calculate_loan(request):
    if request.method == 'POST':
        form = LoanForm(request.POST)
        if form.is_valid():
            loan_amount = form.cleaned_data['loan_amount']
            loan_term = form.cleaned_data['loan_term']
            interest_rate = form.cleaned_data['interest_rate']

            # 월 이자율 계산
            monthly_interest_rate = interest_rate / 12 / 100

            # 기간 이자 계산 (단리 방식: 사용금액 × 사용기간 × 월이자율)
            interest = loan_amount * loan_term * monthly_interest_rate

            # 결과 소수점 1자리까지 표시
            interest = round(interest, 1)

            return render(request, 'result.html', {'interest': interest, 'form': form})
    else:
        form = LoanForm()

    return render(request, 'loan_form.html', {'form': form})
