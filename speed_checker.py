import requests
import time

def check_website_speed(url):
    try:
        start_time = time.time()
        response = requests.get(url)
        end_time = time.time()
        
        load_time = end_time - start_time
        
        # 简单的性能评分计算
        score = max(0, min(100, int(100 - (load_time * 10))))
        
        return f"{load_time:.2f},{score}"
    except:
        return "0,0"