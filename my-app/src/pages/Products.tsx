import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import './Products.css'
import { useToastStore } from '../stores/toastStore'

interface Product {
  id: number
  title: string
  name?: string
  price: number
  category: string
  thumbnail: string
  brand?: string
  rating?: number
  stock?: number
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
  const { t } = useTranslation('products')
  const { t: tCommon } = useTranslation('common')
  const navigate = useNavigate()
  const [globalFilter, setGlobalFilter] = useState('')
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

    const msg = error instanceof Error ? error.message : t('error')
    if (lastErrorMessageRef.current === msg) return
    lastErrorMessageRef.current = msg

    addNotification({
      type: 'error',
      message: t('errorLoad'),
      timeout: 4000,
    })
  }, [addNotification, error, isError, t])

  const imageBodyTemplate = (rowData: Product) => {
    return (
      <img
        src={rowData.thumbnail}
        alt={rowData.title || rowData.name}
        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
      />
    )
  }

  const priceBodyTemplate = (rowData: Product) => {
    return `$${rowData.price.toFixed(2)}`
  }

  const actionBodyTemplate = (rowData: Product) => {
    return (
      <button
        type="button"
        className="p-button p-button-text p-button-sm"
        onClick={(e) => {
          e.stopPropagation()
          navigate(`/products/${rowData.id}`)
        }}
      >
        {tCommon('viewDetails')}
      </button>
    )
  }

  if (isLoading) {
    return (
      <div className="products-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">{t('loading')}</div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="products-container">
        <div className="error-container">
          <div className="error-message">
            {t('error')}: {error instanceof Error ? error.message : t('error')}
          </div>
        </div>
      </div>
    )
  }

  const products = data?.products || []

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>{t('title')}</h1>
        {data && (
          <div className="products-count">
            <Trans
              i18nKey="showing"
              ns="products"
              count={products.length}
              values={{ count: products.length }}
            >
              Showing {{ count: products.length }} products
            </Trans>
          </div>
        )}
      </div>
      {products.length === 0 ? (
        <div className="products-empty">
          {t('emptyState')}
        </div>
      ) : (
        <div className="products-datatable-wrapper">
          <div className="products-search">
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder={t('searchPlaceholder')}
              />
            </span>
          </div>
          <DataTable
            value={products}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25, 50]}
            sortMode="single"
            globalFilter={globalFilter}
            emptyMessage={t('emptyState')}
            loading={isLoading}
            className="products-datatable"
            onRowClick={(e) => navigate(`/products/${e.data.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <Column
              field="title"
              header={t('title')}
              sortable
              style={{ minWidth: '200px' }}
            />
            <Column
              field="price"
              header={t('price')}
              sortable
              body={priceBodyTemplate}
              style={{ minWidth: '100px' }}
            />
            <Column
              field="category"
              header={t('category')}
              sortable
              style={{ minWidth: '150px' }}
            />
            <Column
              header={t('image')}
              body={imageBodyTemplate}
              style={{ minWidth: '100px', textAlign: 'center' }}
            />
            <Column
              header={tCommon('actions')}
              body={actionBodyTemplate}
              style={{ minWidth: '150px' }}
            />
          </DataTable>
        </div>
      )}
    </div>
  )
}

export default Products

