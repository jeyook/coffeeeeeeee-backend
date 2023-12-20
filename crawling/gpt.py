import csv
import random
import time
import requests

RESULT = {}
# 서울 전체를 포함하는 박스
# LAT_LOW = 37.41265837084936
# LAT_HIGH = 37.713495548544674
# LONG_LOW = 126.75257521546801
# LONG_HIGH = 127.20821726799363

# test용
LAT_LOW = 37.53265837084936
LAT_HIGH = 37.543495548544674
LONG_LOW = 127.00157521546801
LONG_HIGH = 127.01721726799363 

RESULT_FILE = "data.csv"

with open(RESULT_FILE, 'r', encoding='utf-8') as file:
    rdr = csv.reader(file)
    for line in rdr:
        if line[2] != "id":
            RESULT[line[2]] = True
            # TODO: 위도 경도 값을 LAT_LOW랑 LONG_LOW로 저장해서 이미 크롤링 한 부분은 스킵하도록 구성

TOTAL_QUERIED_PLACES = 0
TOTAL_DUPLICATIONS = 0

BOUNDARY_TOL = 0.001 # standard 0.001
SCANNING_STEP = 0.0015 # standard 0.0015


def crawl_map_data(latitude, longitude):
    global TOTAL_QUERIED_PLACES, TOTAL_DUPLICATIONS
    base_url = "https://map.naver.com/p/api/search/allSearch"

    # Replace these values with your desired coordinates
    search_coord = f"{longitude}%3B{latitude}"
    boundary = f"{longitude-BOUNDARY_TOL}%3B{latitude-BOUNDARY_TOL}%3B{longitude+BOUNDARY_TOL}%3B{latitude+BOUNDARY_TOL}"

    params = {
        'query': '카페',
        'type': 'all',
        'searchCoord': search_coord,
        'placeSearchOption': f'clientX%3D{longitude}%26clientY%3D{latitude}%26entry%3Dbmp%26x%3D{longitude}%26y%3D{latitude}',
        'boundary': boundary
    }

    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Referer': f'https://map.naver.com/p/search/%EC%B9%B4%ED%8E%98?c=15.00,0,0,0,dh',
        # Add other headers as needed
        # TODO: add more detailed headers
        'authority': "map.naver.com",
        "method": "GET",
        "scheme": "https",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "ko-KR,ko;q=0.8,en-US;q=0.6,en;q=0.4",
        "Cache-Control": "no-cache",
        "Cookie": "NNB=TIA76RYVVAEGG; ASID=b446168400000187bd52fb2c00000063; _ga_BN0T1HQHR1=GS1.1.1683383558.1.0.1683383558.0.0.0; page_uid=950693af-49e2-4536-9fdf-494c09e494dd; PUBLIC_PAGE=0; _ga=GA1.2.857460547.1683383559; nx_ssl=2; page_uid=iUwnIwqo1aVssLme4NZssssstyK-476766; nid_inf=934614048; NID_JKL=5FJHqQB3q4AMjM8DDkX7rj2+EofuNbFhz0WH3u8XDFg=",
        "Expires": "Sat, 01 Jan 2000 00:00:00 GMT",
        "Pragma": "no-cache",
        "Sec-Ch-Ua": '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": "macOS",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
    }

    response = requests.get(base_url, params=params, headers=headers)
    datalength = 0
    duplications = 0
    if response.status_code == 200:
        data = response.json()['result']['place']['list']
        datalength = len(data)
        for place in data:
            if RESULT.get(place['id']):
                duplications += 1
            else:
                record(RESULT_FILE, place)
                RESULT[place['id']] = True # 
    else:
        print(f"Failed to retrieve data. Status code: {response.status_code}")
        raise Exception()
    if datalength != 0:
        print(f"Duplication: {format((duplications/datalength)*100, '.2f')}% of {datalength} places")
    TOTAL_QUERIED_PLACES += datalength
    TOTAL_DUPLICATIONS += duplications

def record(output_file, data):
    with open(output_file, 'r') as f:    
        lines = f.readlines()
        
        with open(output_file,'a') as write_file:
            if lines == []:
                keys_str = ""
                for key in data.keys():
                    keys_str += str(key)+","
                print(keys_str, file=write_file)
            values_str = ""
            for value in data.values():
                values_str += str(value)+","
            print(values_str, file=write_file)

if __name__ == "__main__":
    # Example coordinates (replace with your desired coordinates)
    latitude = LAT_LOW
    longitude = LONG_LOW
    # 시작 좌표로부터 최대값까지 사각형을 다 훑는 로직으로 변경
    while latitude < LAT_HIGH:
        while longitude < LONG_HIGH:
            print("위도", latitude, "경도", longitude)
            crawl_map_data(latitude, longitude)
            longitude += SCANNING_STEP
            time.sleep(random.random() + 0.5)
            if random.random() > 0.5 and random.random() > 0.5:
                time.sleep(random.random() + 0.3)
        longitude = LONG_LOW
        latitude += SCANNING_STEP

    total_duplication_rate = TOTAL_DUPLICATIONS/TOTAL_QUERIED_PLACES
    print(f"Total duplication rate: {format(total_duplication_rate * 100, '.2f')}%")
    print(f"Total places searched: {len(RESULT.keys())}")
