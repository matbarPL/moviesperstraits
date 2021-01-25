from werkzeug.http import HTTP_STATUS_CODES
from flask import jsonify
import numpy as np
import re

MAX_LENGTH = 63
MIN_LENGTH = 8
OK = (True, '')
SHORT = (False, 'Password too short. Please provide at least 8 characters.')
LONG = (False, 'Password too long. Please provide less than 64 characters.')

def error_response(status_code, message=None):
    payload = {'error': HTTP_STATUS_CODES.get(status_code, 'Unknown error')}
    if message:
        payload['message'] = message
    response = jsonify(payload)
    response.status_code = status_code
    return response

def bad_request(message):
    return error_response(400, message)

def validate_password(password):
    ''' At least 8 characters'''
    def check_len(password):
        if len(password) < MIN_LENGTH:
            return SHORT
        elif len(password) > MAX_LENGTH:
            return LONG
        else:
            return OK

    return check_len(password)

def validate_traits(data):
    '''Validate traits for register data'''
    numbers_all = np.arange(0.5,7.5,0.5).tolist()
    for trait in ['openness', 'agreeableness', 'emotional_stability', 'conscientiousness', 'extraversion']:
        if data[trait] not in numbers_all:
            return (False, 'Please provide {} as one of [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0]'.format(trait))
    return (True, '')

def validate_register_data(data):
    if validate_password(data['password'])[0] == False:
        return validate_password(data['password'])[1]
    elif validate_traits(data)[0] == False:
        return validate_traits(data)[1]
    else:
        return (True, '')

def convert_data_types(data):
    for key,value in data.items():
        if key in ['openness', 'agreeableness', 'emotional_stability', 'conscientiousness', 'extraversion']:
            data[key] = float(value)
    return data

def validate_email(email):
    regex = '^[a-zA-Z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
    if re.search(regex, email):
        return True
    else:
        return False