from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
import json

from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.models import User

class EmailBackend(BaseBackend):
    def authenticate(self, request, email=None, password=None):
        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            return None


# 데이터 검증 및 처리 API
def validate_and_process_user(request):
    if request.method == 'POST':
        try:
            # JSON 데이터 파싱
            data = json.loads(request.body)
            action = data.get('action')  # 클라이언트가 요청한 작업 (예: 'register', 'login')
            username = data.get('username')
            password = data.get('password')
            email = data.get('email', '')

            if action == 'register':
                # 회원가입 처리
                if User.objects.filter(email=email).exists():
                    return JsonResponse({'success': False, 'message': "this user is no"}, status=400)
                user = User.objects.create_user(username=username, password=password, email=email)
                user.save()
                return JsonResponse({'success': True, 'message': "success sign_up"}, status=201)

            elif action == 'login':
                # 로그인 처리
                user = authenticate(request, email=email, password=password)
                if user is not None:
                    login(request, user)
                    return JsonResponse({'success': True, 'message': "success login"}, status=200)
                else:
                    return JsonResponse({'success': False, 'message': "no user or password"}, status=401)

        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': "no function"}, status=400)

    return JsonResponse({'success': False, 'message': "no way"}, status=405)

import pandas as pd
from django.shortcuts import redirect, render

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
            area_range = 0
        elif household_type == 'two':
            area_range = 13
        elif household_type == 'three':
            area_range = 25
        elif household_type == 'four':
            area_range = 38

        # 엑셀 파일 읽기 (엑셀 경로와 파일명을 수정해야 함)
        df = pd.read_excel('path_to_apartment_data.xlsx')

        # 필터링 조건 적용
        if rent_type:
            df = df[df['rent_type'] == rent_type]
            
        if region:
            df = df[df['region'] == region]

        if direction:
            df = df[df['direction'] == direction]

        if category:
            df = df[df['category'] == category]

        if area_range is not None:
            df = df[df['area'] >= area_range]

        print(f"필터링 결과: {len(df)}건 발견")

        # 결과 페이지로 렌더링
        return render(request, 'filtered_apartments.html', {'apartments': df.to_dict(orient='records')})

    else:
        return redirect('select_conditions')


def apartment_list(request):
    # 엑셀 파일 읽기
    df = pd.read_excel('path_to_apartment_data.xlsx')

    # 데이터프레임을 리스트 형식으로 변환하여 템플릿에 전달
    apartments = df.to_dict(orient='records')
    return render(request, 'apartment_list.html', {'apartments': apartments})
