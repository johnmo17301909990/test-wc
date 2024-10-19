import requests
from bs4 import BeautifulSoup

def check_inquiry_form(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        forms = soup.find_all('form')
        
        for form in forms:
            inputs = form.find_all('input')
            if any(input.get('type') == 'submit' for input in inputs):
                return True
        
        return False
    except:
        return False