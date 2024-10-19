import requests
from bs4 import BeautifulSoup

def check_whatsapp(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 检查WhatsApp链接
        whatsapp_links = soup.find_all('a', href=lambda href: href and 'wa.me' in href)
        
        return len(whatsapp_links) > 0
    except:
        return False