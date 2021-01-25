from app.api import bp
from flask import request
from app import c
import sys
from flask import jsonify

@bp.route('/ratings/count', methods=['GET'])
def get_ratings_count():
    ratings_count = (c.execute('''SELECT strftime('%m', tstamp) as Month, Count(*)
                                from RATINGS
                                GROUP BY strftime('%m', tstamp); ''').fetchall())
    ratings_count = tuple([rating[1] for rating in ratings_count])
    response = jsonify({'ratings_count': ratings_count})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@bp.route('/ratings/highest_extraversion', methods=['GET'])
def get_ratings_for_extraverts():
    highest_extraversion_ratings = (c.execute('''SELECT rating, Count(*) 
                                    from ratings inner join (select * from PersonalityData where extraversion = 7.0) highExtraversion
                                    on ratings.user_id = highExtraversion.user_id GROUP BY rating;''')).fetchall()
    highest_extraversion_labels = tuple([rating[0] for rating in highest_extraversion_ratings])
    highest_extraversion_ratings = tuple([rating[1] for rating in highest_extraversion_ratings])
    response = jsonify({'highest_extraversion_ratings': highest_extraversion_ratings,
                        'highest_extraversion_labels': highest_extraversion_labels})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@bp.route('/ratings/highest_extraversion_and_serendiptous_ratings', methods=['GET'])
def get_ratings_for_highest_extraversion_and_serendiptous_movies():
    highest_extraversion_and_serendiptous_ratings = (c.execute('''SELECT rating, Count(*)
                                                from ratings
                                                inner join (select * from PersonalityData where extraversion = 7.0) highExtraversion
                                                on ratings.user_id = highExtraversion.user_id
                                                inner join (select * from Assigned where assigned_metric = 'serendipity' and assigned_condition = 'high') highSerendiptous
                                                on ratings.user_id = highSerendiptous.user_id
                                                GROUP BY rating;''')).fetchall()
    highest_extraversion_and_serendiptous_labels = tuple([label[0] for label in highest_extraversion_and_serendiptous_ratings])
    highest_extraversion_and_serendiptous_ratings= tuple([rating[1] for rating in highest_extraversion_and_serendiptous_ratings])
    response = jsonify({'highest_extraversion_and_serendiptous_ratings': highest_extraversion_and_serendiptous_ratings,
                       'highest_extraversion_and_serendiptous_labels': highest_extraversion_and_serendiptous_labels})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
