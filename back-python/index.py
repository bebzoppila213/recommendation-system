from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from scipy import sparse
import pandas as pd
import pickle 

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

raiting_matrix = pd.read_csv('moveId.csv')
csr_data = sparse.load_npz("csr_data.npz")
knn = pickle.load(open('knn', 'rb'))


def get_ricommend_by_film_id(movie_id):
    film_index = raiting_matrix[raiting_matrix['movieId'] == movie_id]
    if len(film_index) > 0:
        film_index = film_index.index[0]
    else:
        return []
    distances, indices = knn.kneighbors(csr_data[film_index], n_neighbors = 10)
    indices_list = indices.squeeze().tolist()[1:]
    recom_list = []
    for index in indices_list:
        move_id = raiting_matrix.iloc[index]['movieId']
        recom_list.append(int(move_id))    
    return recom_list

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/get-recommend', methods=['POST'])
def get_recommend():
    content = request.json
    recomend = []
    for film_id in content['filmsId']:
        recomend = recomend + get_ricommend_by_film_id(film_id)
    return jsonify({"filmsId": recomend})


if __name__ == '__main__':
    app.run(port=2001, debug=True)