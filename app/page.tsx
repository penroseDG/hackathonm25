import { useState, useEffect, SetStateAction } from 'react';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleSaveProduct = async (product: { id: any; }) => {
    try {
      if (product.id) {
        await axios.put(`/api/products/${product.id}`, product);
      } else {
        await axios.post('/api/products', product);
      }
      fetchProducts();
      setSelectedProduct(null);
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  const handleEditProduct = (product: SetStateAction<null>) => {
    setSelectedProduct(product);
  };

  const handleDeleteProduct = async (id: any) => {
    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <ProductForm
        product={selectedProduct}
        onSave={handleSaveProduct}
      />
      <ProductTable
        products={products}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        /> 

    </div>
  );
};
export default HomePage