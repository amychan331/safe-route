from flask import Flask, render_template, send_from_directory

app = Flask(__name__)


@app.route("/")
def index():
    return send_from_directory("static/html", "index.html")


@app.route("/feedback")
def user_feedback():
    return render_template('user_feedback.html')
    #return "feedback form"


def submit():
    pass
    

if __name__ == "__main__":
    app.run(port=5000)
