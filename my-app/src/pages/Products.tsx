import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Products.css'
import { useToastStore } from '../stores/toastStore'

interface Product {
  id: number
  title: string
  name?: string
}

interface ProductsResponse {
  products: Product[]
}

async function fetchProducts(): Promise<ProductsResponse> {
  const response = await fetch('https://dummyjson.com/products')
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

function Products() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  const addNotification = useToastStore((s) => s.addNotification)
  const lastErrorMessageRef = useRef<string | null>(null)

  useEffect(() => {
    if (!isError) {
      lastErrorMessageRef.current = null
      return
    }

    const msg = error instanceof Error ? error.message : 'An error occurred'
    if (lastErrorMessageRef.current === msg) return
    lastErrorMessageRef.current = msg

    addNotification({
      type: 'error',
      message: 'Failed to load products',
      timeout: 4000,
    })
  }, [addNotification, error, isError])

  if (isLoading) {
    return (
      <div className="products-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading products...</div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="products-container">
        <div className="error-container">
          <div className="error-message">
            Error: {error instanceof Error ? error.message : 'An error occurred'}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Products</h1>
        {data && (
          <div className="products-count">
            Showing {data.products.length} products
          </div>
        )}
      </div>
      <div className="products-grid">
        {data?.products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="product-card"
          >
            <h3 className="product-title">{product.title || product.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Products

