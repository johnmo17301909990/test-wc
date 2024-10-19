import requests

def check_mobile_responsive(url):
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
        }
        response = requests.get(url, headers=headers)
        
        # 检查响应头中是否包含移动适配相关的信息
        return 'viewport' in response.text.lower()
    except:
        return False