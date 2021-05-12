from bs4 import BeautifulSoup
import time
import requests
import sys

url = sys.argv[1]
filename = sys.argv[2]
print(url, filename)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
}


while True: 
    html = requests.get(url, headers=headers)
    html = html.text
    soup = BeautifulSoup(html, "html.parser")
    price = soup.find("span", {"id": "priceblock_ourprice"}).text.split("\xa0")[1]
    print("Appending " + str(price) + " to file: " + filename)
    f = open(filename + ".csv", "a")
    f.write(str(int(time.time()))+"000" + ", " + price + "\n")
    f.close()
    time.sleep(5)