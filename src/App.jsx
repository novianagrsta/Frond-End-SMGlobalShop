import { Button } from "react-bootstrap"
import './App.css'
import ProductCard from "./components/ProductCard"
import { useEffect, useState } from "react"
import getProducts from "./services/getProduct"
import LoadingSpinner from "./components/LoadingSpinner"
import AddProduct from "./components/AddProduct"
import EditProduct from "./components/editProduct"


function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [showEditProduct, setShowEditProduct] = useState(false)
  const [data, setData] = useState(null)


  const fetchProducts = async () => {
    setLoading(true)
    const data = await getProducts();
    setProducts(data)
    setLoading(false)
  }

  const handleClose = () => {
    setShowAddProduct(false)
    setShowEditProduct(false)
  }

  const onCreate = () => {
    fetchProducts()
    handleClose()
  }

  const onUpdate = () => {
    fetchProducts()
    handleClose()
  }

  const handleSetData = (data) => {
    setData(data)
    setShowEditProduct(true)
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <div className="container">
      <div className="d-flex justify-content-between mt-5">
        <h1>List Product</h1>
        <Button variant="primary"
          onClick={() => setShowAddProduct(true)}
        >
          Tambah Product
        </Button>
      </div>
      <div className="product-list mt-5">
        {loading && <LoadingSpinner />}
        {!loading && products.map(product => {
          return <ProductCard product={product} key={product.id} fetchProducts={fetchProducts} handleSetData={() => handleSetData(product)} />
        })}
      </div>
      <AddProduct show={showAddProduct} handleClose={handleClose} onCreate={onCreate} />
      <EditProduct show={showEditProduct} handleClose={handleClose} onUpdate={onUpdate} data={data} />
    </div>
  )
}

export default App
