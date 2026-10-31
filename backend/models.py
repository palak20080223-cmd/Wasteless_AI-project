from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from datetime import datetime

db = SQLAlchemy()

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    
    # Telemetry
    total_savings_inr = db.Column(db.Float, default=0.0)
    total_carbon_offset_kg = db.Column(db.Float, default=0.0)
    meals_saved = db.Column(db.Integer, default=0)
    
    items = db.relationship('InventoryItem', backref='owner', lazy=True)

class InventoryItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    icon = db.Column(db.String(10), nullable=False, default="🥬")
    days_to_expiry = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), nullable=False) # critical, warning, good
    date_added = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
