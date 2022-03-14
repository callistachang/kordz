from flask import Flask, request, Response, send_from_directory
from flask_cors import CORS, cross_origin
import os
import json
from pathlib import Path


app = Flask(__name__, static_url_path="")
cors = CORS(app)
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "db")
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["CORS_HEADERS"] = "Content-Type"


@app.route("/tokens", methods=["GET"])
def tokens():
    print("/tokens")
    try:
        with open("items.json", "r") as f:
            tokens = json.loads(f.read())
        res = []
        for k in tokens.keys():
            tokens[k]["id"] = k
            res.append(tokens[k])
        return {"result": res}
    except:
        return {"message": "ITEMS_NOT_FOUND"}


@app.route("/tokens/<path:id>", methods=["GET"])
def token(id):
    print("/tokens")
    try:
        with open("items.json", "r") as f:
            tokens = json.loads(f.read())
        tokens[id]["id"] = id
        return tokens[id]
    except:
        return {"message": "ITEMS_NOT_FOUND"}


@app.route("/update/<path:id>", methods=["POST"])
def updateTx(id):
    # print("/tokens")
    try:
        with open("items.json", "r") as f:
            tokens = json.loads(f.read())
        tokens[id]["token"] = "https://mumbai.polygonscan.com/tx/" + request.form.get("hash")
        with open("items.json", "w") as f:
            json.dump(tokens, f)
        return {"message": "DONE"}
    except:
        return {"message": "ITEMS_NOT_FOUND"}


@app.route("/image/<path:filename>", methods=["GET"])
def image(filename):
    print("/image")
    return send_from_directory("db/image", filename)


@app.route("/audio/<path:filename>", methods=["GET"])
def audio(filename):
    print("/audio")
    return send_from_directory("db/audio", filename)


@app.route("/upload", methods=["POST"])
def upload():
    if request.method == "POST":
        try:
            if not request.files:
                return {"message": "FILE_NOT_FOUND"}
            imageFile = request.files.get("image")
            audioFile = request.files.get("audio")
            if imageFile and audioFile:
                items_json_path = Path("items.json")
                items_json_path.touch(exist_ok=True)
                db_folder_path = Path("db")
                db_folder_path.mkdir(exist_ok=True)
                with open("items.json", "r") as f:
                    tokens = json.loads(f.read())
                imageFile.save(os.path.join(app.config["UPLOAD_FOLDER"], "image", str(imageFile.filename)))
                audioFile.save(os.path.join(app.config["UPLOAD_FOLDER"], "audio", str(audioFile.filename)))
                data = request.form
                token_id = int(data.get("id"))
                new_token_object = {
                    "title": data.get("title"),
                    "description": data.get("description"),
                    "price": data.get("price"),
                    "seller": data.get("seller"),
                    "image": os.path.join(request.host_url, "image", str(imageFile.filename)),
                    "audio": os.path.join(request.host_url, "audio", str(audioFile.filename)),
                }
                try:
                    tokens[str(token_id)] = new_token_object
                except:
                    return {"message": "TOKEN_DOES_NOT_EXIST_IN_OUR_SERVERS"}
                with open("items.json", "w") as f:
                    json.dump(tokens, f)
                    print(tokens)
                return {"metadataURI": os.path.join(request.host_url, "tokens", str(token_id))}
        except Exception as e:
            print(e)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
