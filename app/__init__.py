from flask import Flask
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import sqlite3
import os

conn = sqlite3.connect(os.path.join("data","pers2movies.db"), check_same_thread=False)
c = conn.cursor()

app = Flask(__name__)
CORS(app, support_credentials=True)
jwt = JWTManager(app)
app.config['JWT_SECRET_KEY'] = 'super-secret-key-python-sql-intro'

login = LoginManager(app)
login.login_view = 'login'

app.debug = True
from app.api import bp as api_bp
app.register_blueprint(api_bp, url_prefix='/api')

if __name__=="__main__":
    app.run()