from flask import Blueprint, jsonify, request

from models import Product

routes = Blueprint("routes", __name__)


@routes.route("/api/products", methods=["GET"])
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


@routes.route("/api/products", methods=["POST"])
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


@routes.route("/api/products/<int:id>", methods=["PUT"])
def update_product(id):
    product = Product.query.get(id)

    data = request.json

    product.name = data["name"]
    product.description = data["description"]
    product.price = data["price"]

    db.session.commit()

    return jsonify({"message": "Product updated successfully"})


@routes.route("/api/products/<int:id>", methods=["DELETE"])
def delete_product(id):
    product = Product.query.get(id)

    db.session.delete(product)
    db.session.commit()

    return jsonify({"message": "Product deleted successfully"})
