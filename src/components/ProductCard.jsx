import { Button } from "react-bootstrap"
import deleteProduct from "../services/deleteProduct"
import './ProductCard.css'

function ProductCard({ product, fetchProducts, handleSetData }) {

   async function handleDelete() {
      await deleteProduct(product.id)
      fetchProducts()
   }

   return (
      <div className="product-card">
         <img src={product.img} alt={product.name} />
         <p class="name">{product.name}</p>
         <p class="price">{product.price}</p>
         <p class="stock">Stok: {product.stock}</p>
         <div className="d-flex gap-3">
            <Button className="btn btn-danger" onClick={handleDelete}>Delete</Button>
            <Button className="btn btn-primary" onClick={handleSetData}>Edit</Button>
         </div>
      </div>
   )
}

export default ProductCard
