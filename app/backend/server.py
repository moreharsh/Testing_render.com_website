from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import bcrypt
import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

try:
    conn = psycopg2.connect(os.getenv("INTERNAL_DATABASE_URL"))
except:
    conn = psycopg2.connect(os.getenv("EXTERNAL_DATABASE_URL"))
# create a cursor
cur = conn.cursor()

# if you already have any table or not id doesnt matter this 
# will create a products table for you.
cur.execute(
    '''CREATE TABLE IF NOT EXISTS user_table (id serial \
    PRIMARY KEY, name varchar(100), email varchar(100), password varchar(256));''')


# commit the changes
conn.commit()

# close the cursor and connection
cur.close()
conn.close()


@app.route('/')
def home():
    try:
        conn = psycopg2.connect(os.getenv("INTERNAL_DATABASE_URL"))
    except:
        conn = psycopg2.connect(os.getenv("EXTERNAL_DATABASE_URL"))
    # create a cursor
    cur = conn.cursor()

    # Select all products from the table
    cur.execute('''SELECT * FROM user_table''')

    # Fetch the data
    data = cur.fetchall()

    # close the cursor and connection
    cur.close()
    conn.close()

    return render_template('index.html', data=data)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Validate data
    if not username or not email or not password:
        return jsonify({'success': False, 'message': 'Missing data'}), 400

    # Hash password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Create user in database
    try:
        conn = psycopg2.connect(os.getenv("INTERNAL_DATABASE_URL"))
    except:
        conn = psycopg2.connect(os.getenv("EXTERNAL_DATABASE_URL"))

    cur = conn.cursor()

    # Insert the data into the table
    cur.execute(
        '''INSERT INTO user_table \
        (name, email, password) VALUES (%s, %s, %s)''',
        (username, email, hashed_password))

    # commit the changes
    conn.commit()

    # close the cursor and connection
    cur.close()
    conn.close()
    # create_user(username, email, hashed_password)

    return jsonify({'success': True, 'message': 'User created successfully'}), 201

if __name__ == '__main__':
    app.run(host=os.getenv("HOST"), port=os.getenv("PORT"), debug=True)