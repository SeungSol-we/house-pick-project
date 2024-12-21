from django.db import models
from django.forms import ValidationError

#admin email = dilidim4@gmail.com, name = andire, password = aa
import requests
from bs4 import BeautifulSoup
import requests
#from catalog.views import region

region = 'Seoul'

keyword = region

url = "https://m.land.naver.com/search/result/{}".format(keyword)
res = requests.get(url)
res.raise_for_status()


soup = (str)(BeautifulSoup(res.text, "lxml"))