from app.api import bp
from app import c
from flask import jsonify

@bp.route('/personality/<string:email>', methods=['GET'])
def get_personality_traits(email):
    user_traits = (c.execute('''SELECT openness, agreeableness, emotional_stability, conscientiousness, extraversion 
                                FROM PersonalityData inner join Users on 
                                PersonalityData.user_id  = Users.user_id 
                                WHERE email == '{}' '''.format(email)).fetchone())
    response = jsonify({'user_traits': user_traits})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@bp.route('/personality/aggregated', methods=['GET'])
def get_aggregated_traits():
    aggregated_traits = (c.execute('''SELECT round(avg(openness),2), round(avg(agreeableness),2), round(avg(emotional_stability),2), 
    round(avg(conscientiousness),2), round(avg(extraversion),2) 
                                FROM PersonalityData;''').fetchone())
    response = jsonify({'user_traits': aggregated_traits})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@bp.route('/personality/histogram/<string:trait>', methods=['GET'])
def get_histogram_data(trait):
    histogram_data = ((c.execute('''SELECT {}, Count(*) from PersonalityData GROUP BY {}'''.format(trait, trait))).fetchall())
    histogram_data = tuple([count[1] for count in histogram_data])
    response = jsonify({'histogram_data': histogram_data})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@bp.route('/personality/metrics', methods=['GET'])
def get_metric():
    agg_metrics = []
    for trait in ['openness', 'agreeableness', 'emotional_stability', 'conscientiousness', 'extraversion']:
        mean_data = (c.execute('''SELECT avg({}) FROM PersonalityData'''.format(trait)).fetchall())
        var_data = (c.execute('''SELECT AVG({} * {}) - AVG({}) * AVG({}) as variance FROM PersonalityData'''.format(trait, trait, trait, trait)).fetchall())
        median_data = (c.execute(
            '''SELECT AVG({}) 
            FROM (SELECT {} FROM PersonalityData 
            ORDER BY {} LIMIT 2 - (SELECT COUNT(*) FROM PersonalityData) % 2 
            OFFSET (SELECT (COUNT({}) - 1) / 2 FROM PersonalityData))'''.format(trait, trait, trait, trait )).fetchall())
        agg_metrics.append({'name': trait,
                            'mean': round(mean_data[0][0], 2),
                            'variance': round(var_data[0][0], 2),
                            'median': round(median_data[0][0], 2)
                            })
    response = jsonify(agg_metrics)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response