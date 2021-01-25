from app.api import bp
import sys
from flask import request
from app import c, conn
from flask_jwt_extended import (create_access_token)
import string
import random
import datetime
from flask import jsonify
from ..utils import validate_register_data, bad_request, convert_data_types, validate_email

@bp.route('/users/login', methods=['POST'])
def login_user():
    data = request.get_json() or {}
    if data['email'] == '':
        return bad_request("Please provide email.")
    elif data['password'] == '':
        return bad_request("Please provide password.")
    else:
        jwt_token = create_access_token(identity={'email': data['email']})
        db_password_res = (c.execute("SELECT PASSWORD FROM USERS WHERE email == '{}'".format(data['email']))).fetchone()
        if db_password_res is None:
            return bad_request("User with this email not registered.")
        else:
            db_password = db_password_res[0]
            if data['password'] == db_password:
                c.execute("UPDATE users SET rand_str = '{}', logged_in = 1 WHERE email == '{}'".format(jwt_token, data['email']))
                conn.commit()
                response = jsonify({'token': jwt_token})
                response.headers.add('Access-Control-Allow-Origin', '*')
            else:
                return bad_request("Invalid password.")
        return response

@bp.route('/users/register', methods=['POST'])
def register_user():
    data = request.get_json() or {}
    users_with_the_same_email = (c.execute("SELECT COUNT(*) FROM USERS WHERE email == '{}'".format(data['email'])).fetchone())[0]
    if len([item for item in data.values() if item == '']) > 1:
        return bad_request("Please fill all fields.")
    print(validate_email(data['email']), file=sys.stderr)
    if validate_email(data['email']) == False:
        return bad_request('Invalid email')
    if users_with_the_same_email > 0:
        return bad_request("Email already exists in database.")
    else:
        data = convert_data_types(data)
        register_data_valid = validate_register_data(data)
        if register_data_valid[0] == True:
            user_id = ''.join(random.choice(string.ascii_lowercase+string.digits) for _ in range(32))
            jwt_token = create_access_token(identity={'email': data['email']})
            last_seen = datetime.datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
            user_query = '''INSERT INTO USERS (user_id, first_name, last_name, email, password, rand_str, last_seen, logged_in)
                      VALUES ('{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}') '''.format(user_id,
                                                                                       data['first_name'],
                                                                                       data['last_name'],
                                                                                       data['email'],
                                                                                       data['password'],
                                                                                       jwt_token,
                                                                                       last_seen,
                                                                                       True)
            c.execute(user_query)
            personality_query = '''INSERT INTO PersonalityData (user_id, openness, agreeableness, emotional_stability,   
                                conscientiousness, extraversion)
                              VALUES ('{}', '{}', '{}', '{}', '{}', '{}') '''.format(user_id,
                                                                                                 data['openness'],
                                                                                                 data['agreeableness'],
                                                                                                 data['emotional_stability'],
                                                                                                 data['conscientiousness'],
                                                                                                 data['extraversion'])
            c.execute(personality_query)
            conn.commit()
            response = jsonify({'token': jwt_token})
        else:
            return bad_request(register_data_valid)
    return response

@bp.route('/users/logout/<string:email>', methods=['GET'])
def logout_user(email):
    c.execute("UPDATE users SET logged_in = 0 WHERE email == '{}'".format(email))
    conn.commit()
    response = jsonify({'message': 'logut'})
    return response
