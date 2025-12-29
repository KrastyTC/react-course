import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next'
import './ProductDetail.css'
import { useToastStore } from '../stores/toastStore'

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

async function markFavorite(id: string) {
  // DummyJSON supports updating resources; this simulates a "favorite" flag write.
  const response = await fetch(`https://dummyjson.com/products/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ favorite: true }),
  })

  if (!response.ok) {
    throw new Error('Failed to favorite product')
  }

  return response.json()
}

function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation('products')
  const { t: tCommon } = useTranslation('common')

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductDetail(id!),
    enabled: !!id, // Only run query when id exists
  })

  const addNotification = useToastStore((s) => s.addNotification)
  const lastErrorMessageRef = useRef<string | null>(null)

  useEffect(() => {
    if (!isError) {
      lastErrorMessageRef.current = null
      return
    }

    const msg = error instanceof Error ? error.message : t('error')
    if (lastErrorMessageRef.current === msg) return
    lastErrorMessageRef.current = msg

    addNotification({
      type: 'error',
      message: t('errorLoadDetails'),
      timeout: 4000,
    })
  }, [addNotification, error, isError, t])

  const favoriteMutation = useMutation({
    mutationFn: (productId: string) => markFavorite(productId),
    onSuccess: () => {
      addNotification({
        type: 'success',
        message: t('favoriteSuccess'),
        timeout: 3000,
      })
    },
    onError: () => {
      addNotification({
        type: 'error',
        message: t('errorFavorite'),
        timeout: 4000,
      })
    },
  })

  if (isLoading) {
    return (
      <div className="product-detail-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">{t('loadingDetails')}</div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="product-detail-container">
        <div className="error-container">
          <div className="error-message">
            {t('error')}: {error instanceof Error ? error.message : t('error')}
          </div>
          <Link to="/products" className="back-link">
            {t('backToProducts')}
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
      <div className="back-link-wrapper">
        <Trans
          i18nKey="backToProducts"
          ns="products"
          components={{
            link: <Link to="/products" className="back-link" />,
          }}
        />
      </div>
      
      <div className="product-detail-content">
        <div className="product-detail-image">
          <img src={data.thumbnail} alt={data.title} />
        </div>
        
        <div className="product-detail-info">
          <h1>{data.title}</h1>
          <div className="product-actions">
            <button
              type="button"
              className="favorite-button"
              onClick={() => favoriteMutation.mutate(String(data.id))}
              disabled={favoriteMutation.isPending}
            >
              {favoriteMutation.isPending ? tCommon('saving') : t('favorite')}
            </button>
          </div>
          <div className="product-meta">
            <span className="product-brand">{data.brand}</span>
            <span className="product-category">{data.category}</span>
          </div>
          
          <div className="product-rating">
            <span className="rating-value">⭐ {data.rating}</span>
            <span className="stock-info">
              <Trans
                i18nKey="inStock"
                ns="products"
                values={{ count: data.stock }}
              >
                In Stock: {{ count: data.stock }}
              </Trans>
            </span>
          </div>
          
          <div className="product-price">
            <span className="current-price">${data.price}</span>
            {data.discountPercentage > 0 && (
              <span className="discount">
                <Trans
                  i18nKey="off"
                  ns="products"
                  values={{ discount: data.discountPercentage }}
                >
                  {{ discount: data.discountPercentage }}% off
                </Trans>
              </span>
            )}
          </div>
          
          <div className="product-description">
            <h2>{t('description')}</h2>
            <p>{data.description}</p>
          </div>
          
          {data.images && data.images.length > 0 && (
            <div className="product-images">
              <h2>{t('images')}</h2>
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

