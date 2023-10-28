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
         <p>{product.name}</p>
         <p>{product.price}</p>
         <p>{product.stock}</p>
         <div className="d-flex gap-3">
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            <button className="btn btn-primary" onClick={handleSetData}>Edit</button>
         </div>
      </div>
   )
}

export default ProductCard