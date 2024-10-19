from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time

def check_404_page(url_to_check):
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    
    try:
        driver.get("https://error404.atomseo.com/")

        input_field = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//input[@name='url']"))
        )
        input_field.send_keys(url_to_check)
        input_field.submit()

        # 等待结果加载
        result_element = WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.CLASS_NAME, "result-message"))
        )
        result = result_element.text
        
        # 提取404页面数量
        import re
        match = re.search(r'(\d+)\s+404', result)
        if match:
            count = match.group(1)
            return f"检测到 {count} 个404错误页面。"
        else:
            return "未检测到404错误页面。"
    
    except Exception as e:
        return f"检查失败：{str(e)}"
    finally:
        driver.quit()