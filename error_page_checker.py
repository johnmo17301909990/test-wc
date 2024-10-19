import requests

def check_404_error(url):
    try:
        # 尝试访问一个不存在的页面
        response = requests.get(f"{url}/non_existent_page_12345")
        
        # 如果返回404，说明网站正确处理了404错误
        return response.status_code == 404
    except:
        return False