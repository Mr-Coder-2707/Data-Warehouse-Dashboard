import React from 'react';
import { Product } from '../types';

interface ProductTableProps {
  title: string;
  products: Product[];
  loading: boolean;
}

const ProductTable: React.FC<ProductTableProps> = ({ title, products, loading }) => {
  const isTopProducts = title.includes('Top');
  
  if (loading) {
    return (
      <div className="table-container">
        <h3>
          <span className="material-icons">{isTopProducts ? 'star' : 'trending_down'}</span>
          {title}
        </h3>
        <div className="loading">
          <span className="material-icons">sync</span>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <h3>
        <span className="material-icons">{isTopProducts ? 'star' : 'trending_down'}</span>
        {title}
      </h3>
      {products.length === 0 ? (
        <div className="loading">
          <span className="material-icons">info</span>
          No products found
        </div>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="material-icons" style={{ fontSize: '1rem' }}>label</span>
                  Product Name
                </span>
              </th>
              <th>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="material-icons" style={{ fontSize: '1rem' }}>payments</span>
                  Total Sales
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.product_name}</td>
                <td>${product.total_sales.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductTable;
