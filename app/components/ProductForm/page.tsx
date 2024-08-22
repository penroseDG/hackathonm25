import { useState } from 'react';

const ProductForm = ({ onAddProduct }: { onAddProduct: () => void }) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [image, setImage] = useState('');
  const [quantity, setQuantity] = useState<number | string>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productName,
        price: parseFloat(price as string),
        image,
        quantity: parseInt(quantity as string, 10),
      }),
    }).then(() => {
      onAddProduct();
      setProductName('');
      setPrice('');
      setImage('');
      setQuantity(1);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 p-4 border rounded">
      <h2 className="text-xl mb-4">Thêm sản phẩm mới</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Tên sản phẩm</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full mt-2 p-2 border"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Giá</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full mt-2 p-2 border"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Hình ảnh</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full mt-2 p-2 border"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Số lượng</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full mt-2 p-2 border"
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 mt-4">
        Thêm sản phẩm
      </button>
    </form>
  );
};

export default ProductForm
