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

        if password1 != password2:
            messages.error(request, "입력한 비밀번호와 다릅니다.")
            return redirect('register')

        if User.objects.filter(username=username).exists():
            messages.error(request, "비밀번호가 맞습니다.")
            return redirect('register')

        user = User.objects.create_user(username=username, password=password1, email=email)
        user.save()
        messages.success(request, "회원가입이 완료되었습니다.")
        return redirect('login')

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
            messages.success(request, "로그인에 성공했습니다.")
            return redirect('home')  # 홈 페이지로 리다이렉트
        else:
            messages.error(request, "이름이나 패스워드를 확인해주세요.")
            return redirect('login')

    return render(request, 'login.html')

#로그아웃
from django.contrib.auth import logout

def user_logout(request):
    logout(request)
    messages.success(request, "Logged out successfully!")
    return redirect('login')

