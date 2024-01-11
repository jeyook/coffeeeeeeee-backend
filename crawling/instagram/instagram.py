from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import os
from urllib.request import urlretrieve
import re

driver = webdriver.Chrome()
driver.get("https://www.instagram.com/")
time.sleep(1)
# 아이디 입력하는 방법
inputId = driver.find_element(By.CSS_SELECTOR, "#loginForm > div > div:nth-child(1) > div > label > input")
inputId.send_keys("인스타아이다입력")
time.sleep(1)
# 비밀번호 입력하는 방법
inputPW = driver.find_element(By.CSS_SELECTOR, "#loginForm > div > div:nth-child(2) > div > label > input")
inputPW.send_keys("인스타비밀번호입력")
time.sleep(1)
# 로그인 버튼을 클릭
loginBtn = driver.find_element(By.CSS_SELECTOR, "#loginForm > div > div:nth-child(3)")
loginBtn.click()

# 로그인저장 나중에하기 버튼 클릭

laterBtn_locator = (By.XPATH, "//*[contains(text(), '나중에 하기')]")
laterBtn = WebDriverWait(driver, 20).until(EC.presence_of_element_located(laterBtn_locator))

laterBtn.click()



# 알림설정 나중에하기 버튼 클릭
notice = driver.find_element(By.XPATH, "//*[contains(text(), '나중에 하기')]")
notice.click()

time.sleep(5)

driver.get("https://www.instagram.com/explore/tags/카페")

# 첫번째 인기게시물 클릭 여기서 blocker 발생






# time.sleep(3)

# pageString = driver.page_source
# print(pageString)
# driver.close()
# 검색 상단에 등장한 내용을 클릭


# son = driver.find_element(By.XPATH, "//*[contains(text(), 'child(1)')]")


# son.click()
# time.sleep(5)

# img = driver.find_elements_by_css_selector("div.KL4Bh > img")
# for i in range(len(img)) :
#     urlretrieve(img[i].get_attribute("src"), "C:/Users/SM03/Desktop/이미지/"+str(i)+".jpg")
#     time.sleep(1)
