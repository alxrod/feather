from flask import Flask, jsonify, json
from flask_cors import CORS, cross_origin   

app = Flask(__name__)
app.config['Access-Control-Allow-Origin'] = '*'

@app.route('/jsonfile/<string:fname>')
@cross_origin(origin='*')
def get_json_file(fname):
  with open(fname, 'r') as f:
    data = json.load(f)
  return jsonify(data)

@app.route('/test')
@cross_origin(origin='*')
def test():
  return "TESTER TESTER"

if __name__ == '__main__':
  app.run(debug=True)
