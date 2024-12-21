from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.contrib import messages

#회원가입입

def register(request):
    if request.method == 'POST':
        username = request.POST['username']
        password1 = request.POST['password1']
        password2 = request.POST['password2']
        email = request.POST['email']

        # 비밀번호가 일치하지 않으면
        if password1 != password2:
            messages.error(request, "입력한 비밀번호와 다릅니다.")
            return redirect('register')

        # 이미 존재하는 사용자명 확인
        if User.objects.filter(username=username).exists():
            messages.error(request, "이미 존재하는 사용자명입니다.")
            return redirect('register')

        # 이미 등록된 이메일 확인
        if User.objects.filter(email=email).exists():
            messages.error(request, "이미 등록된 이메일입니다.")
            return redirect('register')

        # 새로운 사용자 생성
        user = User.objects.create_user(username=username, password=password1, email=email)
        user.save()
        messages.success(request, "회원가입이 완료되었습니다.")
        return redirect('login')  # 로그인 페이지로 리디렉션

    # POST 요청이 아니면, 즉 GET 요청일 경우에는 회원가입 페이지를 렌더링
    return render(request, 'register.html') 


#로그인
from django.contrib.auth import authenticate, login
from django.contrib import messages

def user_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, "Logged in successfully!")
            return redirect('home')  # 홈 페이지로 리다이렉트
        else:
            messages.error(request, "Invalid username or password!")
            return redirect('login')

    return render(request, 'login.html')

#로그아웃
from django.contrib.auth import logout

def user_logout(request):
    logout(request)
    messages.success(request, "Logged out successfully!")
    return redirect('login')

