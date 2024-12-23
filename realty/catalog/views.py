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
                    return JsonResponse({'success': False}, status=400)
                user = User.objects.create_user(username=username, password=password, email=email)
                user.save()
                return JsonResponse({'success': True}, status=201)

            elif action == 'login':
                # 로그인 처리
                user = authenticate(request, email=email, password=password)
                if user is not None:
                    login(request, user)
                    return JsonResponse({'success': True}, status=200)
                else:
                    return JsonResponse({'success': False}, status=401)

            elif action == 'logout':
                # 로그아웃 처리
                logout(request)
                return JsonResponse({'success': True}, status=200)

            else:
                return JsonResponse({'success': False}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({'success': False}, status=400)

    return JsonResponse({'success': False}, status=405)
