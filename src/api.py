from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Technotus12@43',
    'database': 'Kbs'
}

conn = None
cursor = None

try:
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    print("Connected to MySQL database successfully!")
except mysql.connector.Error as e:
    print("Error connecting to MySQL database:", e)

@app.route('/get_data', methods=['GET'])
def get_data():
    try:
        cursor.execute("SELECT * FROM kbs")
        data = cursor.fetchall()
        return jsonify({'data': data})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/save_data', methods=['POST'])
def save_data():
    try:
        data = request.json
        print(data)
        query = "INSERT INTO kbs (data) VALUES (%s)"
        cursor.execute(query, (data['data'],))
        conn.commit()
        return jsonify({'message': 'Data saved successfully'})
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
