# -*- coding: utf-8 -*-
"""
Created on Sat Mar 18 13:01:30 2017

@author: Anju
"""


from flask import Flask
 
app = Flask(__name__)


@app.route("/")
def index():
    return "Welcome!"


if __name__ == "__main__":
    app.run(port=5000)
