# State Inventory

This document lists **all pieces of state** currently in the project, and categorizes them as **Server state** (backend-synced) vs **Client/UI state** (frontend-only).

## Server state (TanStack Query)

- **Products list** (`Products` page)
  - **Type**: Server state → fetched from API, cached, and revalidated
  - **Where**: `useQuery({ queryKey: ['products'] })` in `src/pages/Products.tsx`
  - **Shape**: `{ products: Product[] }`
- **Selected product details** (`ProductDetail` page)
  - **Type**: Server state → fetched from API using a route param
  - **Where**: `useQuery({ queryKey: ['product', id] })` in `src/pages/ProductDetail.tsx`
  - **Shape**: `ProductDetail`

## Client/UI state (component / URL / localStorage)

- **Route param: selected product id**
  - **Type**: Client/UI state → URL state (`/products/:id`), used to select which server data to fetch
  - **Where**: `useParams()` in `src/pages/ProductDetail.tsx`
- **Home counter**
  - **Type**: Client/UI state → local component state
  - **Where**: `useState(count)` in `src/pages/Home.tsx`
- **Greeting form input**
  - **Type**: Client/UI state → local component state
  - **Where**: `useState(name)` in `src/components/GreetingForm.tsx`
- **About visit count**
  - **Type**: Client/UI state → persisted client state (localStorage)
  - **Where**: reads/writes `localStorage['aboutVisitCount']` in `src/pages/About.tsx`

## Client/UI state we are adding (this lesson)

- **Filter sidebar open/closed**
  - **Type**: Client/UI state → UI visibility toggle, persisted in localStorage
  - **Where**: `FilterSidebarContext` Provider, using `localStorage['sidebar-open']`
  - **Consumers**: header button triggers actions; sidebar reads `isOpen`
- **Global toast notifications**
  - **Type**: Client/UI state → ephemeral UI notifications
  - **Where**: Zustand `toastStore`
  - **Consumers**: `<ToastHost />` renders notifications; queries/mutations add/remove them

## Conclusion

**TanStack Query only**: products list and product detail data (anything fetched/synced with an API). **Global client state**: filter sidebar open/close and toast notifications (shared across routes/components). **Local UI state**: input fields and simple counters that don’t need to be shared outside their component.


