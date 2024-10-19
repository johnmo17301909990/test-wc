import requests
from bs4 import BeautifulSoup

def check_google_maps(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 检查是否包含Google Maps的API调用
        scripts = soup.find_all('script')
        for script in scripts:
            if script.get('src') and 'maps.googleapis.com' in script['src']:
                return True
        
        # 检查是否有嵌入的Google Maps iframe
        iframes = soup.find_all('iframe')
        for iframe in iframes:
            if iframe.get('src') and 'google.com/maps' in iframe['src']:
                return True
        
        return False
    except:
        return False