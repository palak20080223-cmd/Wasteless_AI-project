import os
import time
from flask import Flask, render_template, request, jsonify
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, InventoryItem

# Point Flask to the separated frontend folders
app = Flask(__name__, 
            template_folder='../frontend/templates', 
            static_folder='../frontend/static')

app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev_premium_key')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI', 'sqlite:///wasteless.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@login_manager.unauthorized_handler
def unauthorized():
    return jsonify({"error": "Unauthorized"}), 401

# --- THE SINGLE HTML PAGE ROUTE (SPA) ---
@app.route('/')
def index():
    return render_template('index.html')

# --- SECURE API ENDPOINTS ---
@app.route('/api/auth/status')
def auth_status():
    if current_user.is_authenticated:
        return jsonify({
            "logged_in": True,
            "user": {
                "username": current_user.username,
                "savings": current_user.total_savings_inr,
                "carbon": current_user.total_carbon_offset_kg,
                "meals": current_user.meals_saved
            }
        })
    return jsonify({"logged_in": False})

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({"error": "Email already registered"}), 400
    
    hashed_password = generate_password_hash(data.get('password'), method='pbkdf2:sha256')
    new_user = User(email=data.get('email'), username=data.get('username'), password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"success": True})

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data.get('email')).first()
    if user and check_password_hash(user.password_hash, data.get('password')):
        login_user(user)
        return jsonify({"success": True, "username": user.username})
    return jsonify({"error": "Invalid credentials"}), 401

@app.route('/api/auth/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"success": True})

@app.route('/api/data/inventory')
@login_required
def get_inventory():
    items = InventoryItem.query.filter_by(user_id=current_user.id).order_by(InventoryItem.days_to_expiry).all()
    return jsonify([{
        "id": i.id, "name": i.name, "icon": i.icon, "days": i.days_to_expiry, "status": i.status
    } for i in items])

@app.route('/api/action/vision', methods=['POST'])
@login_required
def analyze_vision():
    time.sleep(1.5) # Mock Azure Vision Processing
    new_items = [
        InventoryItem(name="Paneer (Loose)", icon="🧀", days_to_expiry=1, status="critical", user_id=current_user.id),
        InventoryItem(name="Ripe Tomatoes", icon="🍅", days_to_expiry=3, status="warning", user_id=current_user.id),
        InventoryItem(name="Green Capsicum", icon="🫑", days_to_expiry=5, status="good", user_id=current_user.id)
    ]
    db.session.bulk_save_objects(new_items)
    db.session.commit()
    return jsonify({"success": True})

@app.route('/api/action/recipe', methods=['POST'])
@login_required
def generate_recipe():
    dietary_pref = request.json.get('preference', 'Veg')
    critical_items = InventoryItem.query.filter_by(user_id=current_user.id, status='critical').all()
    
    if not critical_items:
        return jsonify({"error": "No critical items found! Please scan items to your pantry first."}), 400
        
    critical_names = [f"{i.icon} {i.name}" for i in critical_items]
    time.sleep(2.0) # Mock Semantic Kernel Orchestration
    
    current_user.total_savings_inr += 185.0
    current_user.total_carbon_offset_kg += 3.2
    current_user.meals_saved += 1
    
    for item in critical_items:
        db.session.delete(item)
    db.session.commit()
    
    return jsonify({
        "recipe_name": f"Zero-Waste {critical_items[0].name} Delight ({dietary_pref})",
        "ingredients_used": critical_names,
        "instructions": [
            "Sauté base spices in a colorful pan.",
            f"Add your expiring {critical_items[0].name} to save it from the bin!",
            "Mix well and simmer for 5 minutes.",
            "Garnish and enjoy your eco-friendly meal."
        ],
        "quick_commerce": {
            "missing_items": ["Garam Masala 🌶️", "Coriander 🌿"],
            "estimated_delivery": "10 mins"
        }
    })

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)
