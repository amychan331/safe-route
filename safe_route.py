# -*- coding: utf-8 -*-
"""
Created on Sat Mar 18 13:01:30 2017

@author: Anju
"""


from flask import Flask
from flask import send_from_directory

app = Flask(__name__)


@app.route("/")
def index():
    return "Welcome!"


@app.route("/example")
def index_wip():
    return send_from_directory('static/html', "index.html")

@app.route("/map")
def map():
    return send_from_directory('static/html', 'autocomplete.html')


if __name__ == "__main__":
    app.run(port=5000)
