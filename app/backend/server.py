from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import bcrypt
import psycopg2
import os
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
import hashlib
from functools import wraps
from flask_jwt_extended import (
    JWTManager, create_access_token, get_jwt_identity,
    jwt_required, set_access_cookies, unset_jwt_cookies
)
import datetime

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config["JWT_SECRET_KEY"] = "super-secret-key"
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_ACCESS_COOKIE_NAME"] = "access_token_cookie"
app.config["JWT_ACCESS_COOKIE_PATH"] = "/"
app.config["JWT_COOKIE_SAMESITE"] = "None"
app.config["JWT_COOKIE_SECURE"] = True  # True in production (HTTPS only)
app.config["JWT_COOKIE_CSRF_PROTECT"] = False  # for now (can enable later)
app.config["JWT_COOKIE_HTTPONLY"] = True
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(days=1)


jwt = JWTManager(app)

try:
    conn = psycopg2.connect(os.getenv("INTERNAL_DATABASE_URL"))
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("INTERNAL_DATABASE_URL")
except:
    conn = psycopg2.connect(os.getenv("EXTERNAL_DATABASE_URL"))
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("EXTERNAL_DATABASE_URL")
# create a cursor

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'supersecretkey123'

db = SQLAlchemy(app)
conn.close()


# Model
class Relax_user_table(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(64), nullable=False)

    def to_dict(self):
            return {
                "id": self.id,
                "name": self.name,
                "email": self.email
            }
    
# Helper
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

@app.route('/')
def home():
    users = Relax_user_table.query.all()
    data = [user.to_dict() for user in users]
    print("Data: ", data)
    return render_template('index.html', data=data)

# Routes
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data['email']
    if Relax_user_table.query.filter_by(email=email).first():
        return jsonify({'success': False, 'message': 'Email already exists'}), 400

    hashed = hash_password(data['password'])
    new_user = Relax_user_table(name=data['name'], email=email, password_hash=hashed)
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=data['email'])
    response = jsonify({'success': True, 'message': 'Signup successful!'})
    set_access_cookies(response, access_token)
    
    return response, 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = Relax_user_table.query.filter_by(email=data['email']).first()

    if user and user.password_hash == hash_password(data['password']):
        access_token = create_access_token(identity=data['email'])
        response = jsonify({'success': True, 'message': 'Login successful!'})
        set_access_cookies(response, access_token)
        return response, 200

    return jsonify({'success': False, 'message': 'Invalid credentials'}), 401


@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    response = jsonify({'success': True, "msg": "Logout successful"})
    unset_jwt_cookies(response)
    return response

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host=os.getenv("HOST"), port=os.getenv("PORT"), debug=True)