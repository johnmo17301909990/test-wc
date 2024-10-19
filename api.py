from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, CheckResult
import os
from form_checker import check_inquiry_form
from submit_checker import check_inquiry_submit
from floating_form_checker import check_floating_form
from thank_page_checker import check_thank_you_page
from chat_plugin_checker import check_live_chat
from whatsapp_checker import check_whatsapp
from email_checker import check_email_hyperlink
from speed_checker import check_website_speed
from error_checker import check_404_page
from mobile_checker import check_mobile_responsive
from google_map_checker import check_google_maps

app = Flask(__name__)
CORS(app)

# 配置数据库
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///website_checker.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# 创建数据库表
with app.app_context():
    db.create_all()

@app.route('/api/check', methods=['POST'])
def check_website():
    data = request.json
    url = data.get('url')
    checks = data.get('checks', [])

    results = {}

    for check in checks:
        result = None
        details = None

        if check == 'inquiryForm':
            result = check_inquiry_form(url)
        elif check == 'inquirySubmit':
            result = check_inquiry_submit(url)
        elif check == 'floatingForm':
            result = check_floating_form(url)
        elif check == 'thankYouPage':
            result = check_thank_you_page(url)
        elif check == 'liveChat':
            result = check_live_chat(url)
        elif check == 'whatsApp':
            result = check_whatsapp(url)
        elif check == 'emailHyperlink':
            result = check_email_hyperlink(url)
        elif check == 'websiteSpeed':
            result = check_website_speed(url)
            details = result
            result = float(result.split(',')[0]) < 3  # 假设3秒以下为良好
        elif check == '404Error':
            result = check_404_page(url)
            details = result
            result = "未检测到404错误页面" in result
        elif check == 'mobileResponsive':
            result = check_mobile_responsive(url)
        elif check == 'googleMaps':
            result = check_google_maps(url)

        # 保存结果到数据库
        check_result = CheckResult(url=url, check_type=check, result=result, details=details)
        db.session.add(check_result)
        db.session.commit()

        results[check] = details if details else result

    return jsonify(results)

@app.route('/api/history', methods=['GET'])
def get_check_history():
    checks = CheckResult.query.order_by(CheckResult.created_at.desc()).limit(10).all()
    history = [{
        'url': check.url,
        'check_type': check.check_type,
        'result': check.result,
        'details': check.details,
        'created_at': check.created_at.isoformat()
    } for check in checks]
    return jsonify(history)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)