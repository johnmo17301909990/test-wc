import requests
from bs4 import BeautifulSoup

def check_live_chat(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 检查常见的在线聊天插件
        chat_keywords = ['livechat', 'tawk.to', 'zendesk', 'intercom', 'drift']
        
        scripts = soup.find_all('script')
        for script in scripts:
            if script.get('src') and any(keyword in script['src'].lower() for keyword in chat_keywords):
                return True
        
        return False
    except:
        return False