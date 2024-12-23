from turtle import pd
from manage import Apartment

file_path = '/path/to/아파트(전월세)_실거래가.xlsx'

data = pd.read_excel(file_path, sheet_name='아파트(전월세) 실거래가', skiprows=11)

# 데이터 정리

data.columns = data.iloc[0] # 헤더 설정
columns_needed = ["시군구", "단지명", "전월세구분", "전용면적(㎡)", "계약년월", "보증금(만원)", "월세금(만원)", "주택유형", "방향"]
data = data[columns_needed]

# 데이터베이스에 저장
for _, row in data.iterrows():
    Apartment.objects.create(
        city_district=row['시군구'],
        complex_name=row['단지명'],
        rent_type=row['전월세구분'],
        area=row['전용면적(㎡)'],
        contract_year_month=row['계약년월'],
        deposit=row['보증금(만원)'],
        monthly_rent=row['월세금(만원)'],
        housing_type=row['주택유형'],
        direction=row['방향'],
    )
