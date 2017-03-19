from flask import Flask,render_template
 
app = Flask(__name__)


@app.route("/")
def index():
    return "Welcome to Safe Route Travel for Walkers!"
    
@app.route("/feedback")
def user_feedback():
    return render_template('user_feedback.html')
    #return "feedback form"


def submit():
    

if __name__ == "__main__":
    app.run(port=5000)
