from django.contrib.auth.models import User
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib import messages

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


def answer1(request):
    #월/전세, 매매 선택택
    property_type = request.POST.get('property_type')
        
    if property_type == 'monthly':
        money = ("월세")

    elif property_type == 'jeonse':
        money = ("전세")

    elif property_type == 'sale':
        money = ("매매")

    #가구 선택
    household_type = request.POST.get('household_type')

    if household_type == 'one':
        person = ("one")
    
    elif household_type == 'two':
        person = ("two")
    
    elif household_type == 'three':
        person = ("three")
    
    elif household_type == 'four':
        person = ("four")

    #선호지역
    region_type = request.POST.get('region_type')

    if region_type == 'Seoul': #서울
        region = ("Seoul")
    elif region_type == 'busan': #부산
        region = ("busan")
    elif region_type == 'daejeon': #대전
        region = ("daejeon")
    elif region_type == 'Sejong': #세종
        region = ("Sejong")
    elif region_type == 'daegu': #대구
        region = ("daegu")
    elif region_type == 'Ulsan': #울산
        region = ("Ulsan")
    elif region_type == 'gwangju': #광주
        region = ("gwangju")
    elif region_type == 'gyeonggi': #경기도
        region = ("gyeonggi-do")
    elif region_type == 'Gangwon': #강원도
        region = ("Gangwon-do")
    elif region_type == 'Gyeongsangbuk': #경상북도
        region = ("Gyeongsangbuk-do")
    elif region_type == 'Gyeongsangnam': #경상남도
        region = ("Gyeongsangnam-do")
    elif region_type == 'Chungcheongnam': #충청남도
        region = ("Chungcheongnam-do")
    elif region_type == 'Chungcheongbuk': #충청북도
        region = ("Chungcheongbuk-do")
    elif region_type == 'Jeollabuk-do': #전라북도
        region = ("Jeollabuk-do")
    elif region_type == 'Jeollanam-do': #전라남도
        region = ("Jeollanam-do")

    #집 방향
    direction_type = request.POST.get('direction_type')
    
    if direction_type == 'East': #동
        direction = ("east")

    elif direction_type == 'west': #서
        direction = ("west")

    elif direction_type == 'south': #남
        direction = ("south")

    elif direction_type == 'north': #북
        direction = ("north")

    #신, 구축 + 상관 ㄴㄴ
    building_type = request.POST.get('building_type')

    if building_type == 'new':
        building = ("new")

    elif building_type == 'old':
        building = ("old")

    elif building_type == 'noone':
        building = ("noone")

    #건물 유형
    category_type = request.POST.get('category_type')

    if category_type == ('art'):
        category = ("art")

    elif category_type == ("house"): #주택
        category = ("house")


