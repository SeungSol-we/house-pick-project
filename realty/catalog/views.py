import os
from urllib.parse import urlencode
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
import json
from django.urls import path, reverse

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
from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
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
                    return JsonResponse({'success': False, 'message': "이미 있는 이메일입니다."}, status=400)
                user = User.objects.create_user(username=username, password=password, email=email)
                user.save()
                return JsonResponse({'success': True, 'message': "회원가입에 성공했습니다."}, status=201)

            elif action == 'login':
                # 로그인 처리
                user = authenticate(request, email=email, password=password)  # email 전달
                if user is not None:
                    login(request, user)
                    return JsonResponse({
                        'success': True,
                        'message': "",
                        'user': {
                            'username': user.username,
                            'email': user.email,
                        }
                    }, status=200)
                else:
                    return JsonResponse({'success': False, 'message': "이메일이나 비밀번호가 맞지 않습니다."}, status=401)

        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': "JSON 형식이 잘못되었습니다."}, status=400)

    return JsonResponse({'success': False, 'message': "허용되지 않은 요청 방식입니다."}, status=405)

from django.http import JsonResponse
from django.contrib.auth.decorators import login_required

from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_protect

@login_required(login_url=None)  # 리다이렉트 대신 None 설정
@csrf_protect
def get_user_data(request):
    if request.method == "GET":
        return JsonResponse({
            'username': request.user.username,
            'email': request.user.email,
        })
    return JsonResponse({'error': 'Method not allowed'}, status=405)


import pandas as pd
from django.shortcuts import redirect, render

import pandas as pd
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

import random

import random
import pandas as pd
import json
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt  # CSRF 보호 비활성화
def filter_apartments(request):
    if request.method == 'POST':
        try:
            # JSON 데이터 파싱
            data = json.loads(request.body)

            # 클라이언트가 제공한 데이터 추출
            property_type = data.get('property_type', '')
            household_type = data.get('household_type', '')
            region_type = data.get('region_type', '')
            direction_type = data.get('direction_type', '')
            category_type = data.get('category_type', '')

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
            region = region_mapping.get(region_type)
            direction = "남향" if direction_type == "south" else "북향"
            category = "아파트" if category_type == "art" else "주택"

            # 면적 범위 설정
            area_range = None
            if household_type == 'one':
                area_range = int(0)
            elif household_type == 'two':
                area_range = int(13)
            elif household_type == 'three':
                area_range = int(25)
            elif household_type == 'four':
                area_range = int(38)

            # 엑셀 파일 읽기
            try:
                file_path = os.path.join(os.path.dirname(__file__), 'apt.xlsx')
                df = pd.read_excel(file_path, header=0)
            except FileNotFoundError:
                return JsonResponse({'success': False, 'message': "아파트 데이터 파일이 없습니다."}, status=500)

            # Clean column names (strip whitespace) and ensure correct types
            df.columns = df.columns.str.strip()  # Remove any leading/trailing spaces from column names
            df = df.drop_duplicates()

            df['area_range'] = pd.to_numeric(df['area_range'], errors='coerce')  # Ensure area_range is numeric

            # 필터링 조건 적용
            if rent_type:
                df = df[df['rent_type'] == rent_type]
            if region:
                df = df[df['region_type'] == region]
            if direction:
                df = df[df['direction'] == direction]
            if category:
                df = df[df['category'] == category]
            if area_range is not None:
                df = df[df['area_range'] >= area_range]

            # 결과 확인
            if df.empty:
                return JsonResponse({'success': False, 'message': "조건에 맞는 아파트가 없습니다."}, status=404)

            # 필터링된 결과를 JSON 형식으로 반환
            apartments = df.to_dict(orient='records')

            # 랜덤으로 7개 추출
            random.shuffle(apartments)
            main_apartments = apartments[:7] if len(apartments) > 7 else apartments

            # 랜덤으로 3개 추출
            other_apartments = apartments[:3] if len(apartments) > 3 else apartments

            return JsonResponse({
                'success': True,
                'apartments': main_apartments,
                'other_apartments': other_apartments
            }, status=200)
            

        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': "유효하지 않은 JSON 데이터입니다."}, status=400)

        except Exception as e:
            # 예상치 못한 오류 처리
            return JsonResponse({'success': False, 'message': f"서버 오류: {str(e)}"}, status=500)

    else:
        return JsonResponse({'success': False, 'message': "POST 요청만 허용됩니다."}, status=405)
