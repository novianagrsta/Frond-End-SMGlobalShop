from flask import Flask, jsonify, request
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
api = Api(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    description = db.Column(db.Text)
    price = db.Column(db.Float)


@app.route("/api/products", methods=["GET"])
def get_products():
    products = Product.query.all()
    return jsonify(
        {
            "data": [
                {
                    "id": product.id,
                    "name": product.name,
                    "description": product.description,
                    "price": product.price,
                }
                for product in products
            ]
        }
    )


@app.route("/api/products", methods=["POST"])
def add_product():
    data = request.json

    product = Product(
        name=data["name"],
        description=data["description"],
        price=data["price"],
    )

    db.session.add(product)
    db.session.commit()

    return jsonify({"message": "Product added successfully"})


@app.route("/api/products/<int:id>", methods=["PUT"])
def update_product(id):
    product = Product.query.get(id)

    data = request.json

    product.name = data["name"]
    product.description = data["description"]
    product.price = data["price"]

    db.session.commit()

    return jsonify({"message": "Product updated successfully"})


@app.route("/api/products/<int:id>", methods=["DELETE"])
def delete_product(id):
    product = Product.query.get(id)

    db.session.delete(product)
    db.session.commit()

    return jsonify({"message": "Product deleted successfully"})


if __name__ == "__main__":
    app.run(debug=True)
