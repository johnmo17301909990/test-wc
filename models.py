from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class CheckResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255), nullable=False)
    check_type = db.Column(db.String(50), nullable=False)
    result = db.Column(db.Boolean)
    details = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<CheckResult {self.url} - {self.check_type}>'