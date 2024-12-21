from django.db import models
from django.forms import ValidationError

#admin email = dilidim4@gmail.com, name = andire, password = aa
class itemregistration(models.Model) :
    #아이템 구매 우선순위
    ranking = ( 
        ('one', '1순위'),
        ('two', '2순위'),
        ('three', '3순위'),
    )

    우선순위 = models.CharField(  
        max_length=7,
        choices=ranking,
        blank=True,
        default='one',
        help_text='구매 우선순위를 결정해 주세요.',
    )
    #물건 이름
    이름 = models.CharField(max_length=200, help_text="물건의 이름을 입력해 주세요.")

    #물건 가격
    가격 = models.IntegerField(help_text="물건의 가격을 입력해 주세요.")

    #물건 참고 이미지지
    이미지 = models.ImageField(upload_to='wish_images/', blank=True, null=True)  

    #물건 정보
    정보 = models.TextField(max_length=1000, help_text="물건의 정보를 입력해주세요.") 

    #구매 여부
    what = (
        ('false', '구매 X'),
        ('true', '구매 O'),
    )

    구매여부 = models.CharField(  
        max_length=100,
        choices=what,
        blank=True,
        default='false',
        help_text='구매 여부를 선택해 주세요.',
    )

    #구매 만족도(구매 후)
    feel = (
        (1, '불만족'),
        (2, '보통'),
        (3, '만족'),
    )

    만족도 = models.IntegerField( 
        blank=True, 
        null=True,
        choices=feel,
        help_text="(구매 후) 만족도를 선택하세요."
    )

    def __str__(self):
        return self.이름
    