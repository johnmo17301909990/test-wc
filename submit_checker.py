import requests

def check_inquiry_submit(url):
    try:
        # 这里应该实现一个模拟表单提交的逻辑
        # 由于实际提交可能会影响网站数据，这里只是一个示例
        response = requests.post(url, data={'test': 'data'})
        return response.status_code == 200
    except:
        return False