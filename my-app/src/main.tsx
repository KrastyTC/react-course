import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FilterSidebarProvider } from './ui/FilterSidebarContext.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <FilterSidebarProvider>
        <App />
      </FilterSidebarProvider>
    </StrictMode>
  </QueryClientProvider>,
)
