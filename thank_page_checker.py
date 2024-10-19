import requests

def check_thank_you_page(url):
    try:
        response = requests.get(url)
        
        # 检查页面内容是否包含感谢相关的关键词
        keywords = ['thank you', 'thanks', 'appreciation', 'grateful']
        return any(keyword in response.text.lower() for keyword in keywords)
    except:
        return False