from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
import json

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
                    return JsonResponse({'success': False, 'message': "이미 존재하는 사용자입니다."}, status=400)
                user = User.objects.create_user(username=username, password=password, email=email)
                user.save()
                return JsonResponse({'success': True, 'message': "회원가입 성공!"}, status=201)

            elif action == 'login':
                # 로그인 처리
                user = authenticate(request, email=email, password=password)
                if user is not None:
                    login(request, user)
                    return JsonResponse({'success': True, 'message': "로그인 성공!"}, status=200)
                else:
                    return JsonResponse({'success': False, 'message': "잘못된 사용자명 또는 비밀번호."}, status=401)

            elif action == 'logout':
                # 로그아웃 처리
                logout(request)
                return JsonResponse({'success': True, 'message': "로그아웃 성공!"}, status=200)

            else:
                return JsonResponse({'success': False, 'message': "알 수 없는 요청 작업."}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': "잘못된 요청 데이터 형식입니다."}, status=400)

    return JsonResponse({'success': False, 'message': "잘못된 요청 방식입니다."}, status=405)
