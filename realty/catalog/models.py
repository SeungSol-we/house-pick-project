from django.db import models

# Create your models here
class Apartment(models.Model):

    gocity_district = models.CharField(max_length=100, verbose_name="시군구")
    complex_name = models.CharField(max_length=100, verbose_name="단지명")
    rent_type = models.CharField(max_length=10, verbose_name="전월세구분")
    area = models.FloatField(verbose_name="적용면적(㎡)")
    contract_year_month = models.CharField(max_length=6, verbose_name="계약년월")
    deposit = models.CharField(max_length=20, verbose_name="보증금(만원)")
    monthly_rent = models.CharField(max_length=20, verbose_name="월세금(만원)", blank=True, null=True)
    housing_type = models.CharField(max_length=50, verbose_name="주택유형")
    direction = models.CharField(max_length=10, verbose_name="방향", blank=True, null=True)


    def __str__(self):

        return f"{self.city_district} - {self.complex_name}"