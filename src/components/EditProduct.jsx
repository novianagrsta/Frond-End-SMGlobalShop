import { useEffect, useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import editProduct from "../services/editProduct";

const EditProduct = ({ show, handleClose, onUpdate, data }) => {
   const [loading, setLoading] = useState(false);
   const [formData, setFormData] = useState({
      name: '',
      price: '',
      stock: '',
      img: '',
   });

   const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevState) => ({
         ...prevState,
         [name]: value,
      }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      try {
         await editProduct(data.id, formData);
         setFormData({
            name: '',
            price: '',
            stock: '',
            img: '',
         });
         setLoading(false);
         onUpdate();
      } catch (error) {
         console.log(error);
      }
      setLoading(false);
   };


   useEffect(() => {
      if (data) {
         setFormData({
            name: data.name,
            price: data.price,
            stock: data.stock,
            img: data.img,
         })
      }
   }, [data])


   return (
      <div>
         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                     <Form.Label>Nama Product</Form.Label>
                     <Form.Control type="text" placeholder="masukan nama produk" name="name" value={formData.name} onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                     <Form.Label>Harga product</Form.Label>
                     <Form.Control type="text" placeholder="masukan harga produk" name="price" value={formData.price} onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                     <Form.Label>stok product</Form.Label>
                     <Form.Control type="text" placeholder="masukan stok produk" name="stock" value={formData.stock} onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                     <Form.Label>url gambar product</Form.Label>
                     <Form.Control type="text" placeholder="masukan url" name="img" value={formData.img} onChange={handleInputChange} />
                  </Form.Group>
               </Form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose} disabled={loading}>
                  {loading && <Spinner
                     as="span"
                     animation="grow"
                     size="sm"
                     role="status"
                     aria-hidden="true"
                  />}
                  Close
               </Button>
               <Button variant="primary" onClick={handleSubmit} disabled={loading}>
                  {loading && <Spinner
                     as="span"
                     animation="grow"
                     size="sm"
                     role="status"
                     aria-hidden="true"
                  />}
                  Save Changes
               </Button>
            </Modal.Footer>
         </Modal>
      </div >
   );
};

export default EditProduct;