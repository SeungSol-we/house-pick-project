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

import pandas as pd
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt  # CSRF 보호 비활성화 (API 요청에 필요한 경우)
def filter_apartments(request):
    if request.method == 'POST':
        try:
            # JSON 데이터를 받음
            data = json.loads(request.body)

            # 폼에서 전달받은 데이터
            property_type = data.get('property_type')
            household_type = data.get('household_type')
            region_type = data.get('region_type')
            direction_type = data.get('direction_type')
            category_type = data.get('category_type')

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

            # 필터링된 결과를 JSON 형식으로 반환
            apartments = df.to_dict(orient='records')

            return JsonResponse({'apartments': apartments}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

    else:
        return JsonResponse({'error': 'Only POST method is allowed'}, status=405)

