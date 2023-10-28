import React from 'react';
import './App.css';
import ProductCard from './components/ProductCard';
import { useEffect, useState } from 'react';
import getProducts from './services/getProducts';
import LoadingSpinner from './components/LoadingSpinner';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import { Button } from 'react-bootstrap';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [data, setData] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  const handleClose = () => {
    setShowAddProduct(false);
    setShowEditProduct(false);
  };

  const onCreate = () => {
    fetchProducts();
    handleClose();
  };

  const onUpdate = () => {
    fetchProducts();
    handleClose();
  };

  const handleSetData = (data) => {
    setData(data);
    setShowEditProduct(true);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <header class="header">
        <img src="https://smglobalshop.com/cdn/shop/files/SGS_LOGO_ONLY.png?v=1681320954" alt="Logo" width="100" height="100" />
        <h1>My Product List</h1>
      </header>


      <div className="container">
        <div className="d-flex justify-content-end mt-5">
          <Button variant="primary" onClick={() => setShowAddProduct(true)}>Tambah Product</Button>
        </div>

        <div className="product-list mt-5">
          {loading && <LoadingSpinner />}
          {!loading && products.map((product) => {
            return (
              <ProductCard
                product={product}
                key={product.id}
                fetchProducts={fetchProducts}
                handleSetData={() => handleSetData(product)}
              />
            );
          })}
        </div>

        <AddProduct show={showAddProduct} handleClose={handleClose} onCreate={onCreate} />
        <EditProduct show={showEditProduct} handleClose={handleClose} onUpdate={onUpdate} data={data} />
      </div>

      <footer className="footer">
        <p>Copyright &copy; 2023 Noviana Gresita Br. Perangin-Angin</p>
      </footer>
    </div>
  );
}

export default App;
