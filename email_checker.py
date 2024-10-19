import requests
from bs4 import BeautifulSoup
import re

def check_email_hyperlink(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        email_links = soup.find_all('a', href=re.compile(r'^mailto:'))
        
        return len(email_links) > 0
    except:
        return False