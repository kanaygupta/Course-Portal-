from api import app, db
from flask_cors import CORS
CORS(app)

if __name__ == '__main__':
    db.create_all()
    app.run(host="127.0.0.1", port=5000, debug=True)
