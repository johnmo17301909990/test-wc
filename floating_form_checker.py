import requests
from bs4 import BeautifulSoup

def check_floating_form(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 查找可能的浮动表单元素
        floating_forms = soup.find_all('div', class_=['float', 'fixed', 'sticky'])
        
        for form in floating_forms:
            if form.find('form'):
                return True
        
        return False
    except:
        return False