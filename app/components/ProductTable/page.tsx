// app/components/ProductTable.tsx
import { useState, useEffect } from 'react';

type Product = {
    id: number;
    productName: string;
    price: number;
    image: string;
    quantity: number;
};

const ProductTable = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/api/products')
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    const handleDelete = (id: number) => {
        fetch(`/api/products/${id}`, {
            method: 'DELETE',
        }).then(() => {
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        });
    };

    return (
        <div className="container mx-auto my-8">
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="py-2">STT</th>
                        <th className="py-2">Tên sản phẩm</th>
                        <th className="py-2">Hình ảnh</th>
                        <th className="py-2">Giá</th>
                        <th className="py-2">Số lượng</th>
                        <th className="py-2">Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{product.productName}</td>
                            <td className="border px-4 py-2">
                                <img src={product.image} alt={product.productName} className="h-12" />
                            </td>
                            <td className="border px-4 py-2">{product.price} VND</td>
                            <td className="border px-4 py-2">{product.quantity}</td>
                            <td className="border px-4 py-2">
                                <button className="text-blue-500 mr-2">Sửa</button>
                                <button
                                    className="text-red-500"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;