import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import './ProductDetail.css'

interface ProductDetail {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

async function fetchProductDetail(id: string): Promise<ProductDetail> {
  const response = await fetch(`https://dummyjson.com/products/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch product details')
  }
  return response.json()
}

function ProductDetail() {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductDetail(id!),
    enabled: !!id, // Only run query when id exists
  })

  if (isLoading) {
    return (
      <div className="product-detail-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading product details...</div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="product-detail-container">
        <div className="error-container">
          <div className="error-message">
            Error: {error instanceof Error ? error.message : 'An error occurred'}
          </div>
          <Link to="/products" className="back-link">
            ← Back to Products
          </Link>
        </div>
      </div>
    )
  }

  if (!data) {
    return null
  }

  return (
    <div className="product-detail-container">
      <Link to="/products" className="back-link">
        ← Back to Products
      </Link>
      
      <div className="product-detail-content">
        <div className="product-detail-image">
          <img src={data.thumbnail} alt={data.title} />
        </div>
        
        <div className="product-detail-info">
          <h1>{data.title}</h1>
          <div className="product-meta">
            <span className="product-brand">{data.brand}</span>
            <span className="product-category">{data.category}</span>
          </div>
          
          <div className="product-rating">
            <span className="rating-value">⭐ {data.rating}</span>
            <span className="stock-info">In Stock: {data.stock}</span>
          </div>
          
          <div className="product-price">
            <span className="current-price">${data.price}</span>
            {data.discountPercentage > 0 && (
              <span className="discount">
                {data.discountPercentage}% off
              </span>
            )}
          </div>
          
          <div className="product-description">
            <h2>Description</h2>
            <p>{data.description}</p>
          </div>
          
          {data.images && data.images.length > 0 && (
            <div className="product-images">
              <h2>Images</h2>
              <div className="images-grid">
                {data.images.map((image, index) => (
                  <img key={index} src={image} alt={`${data.title} ${index + 1}`} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

