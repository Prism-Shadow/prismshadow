import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { loadPage } from './navigation/pages'
import { resolveRoute } from './routes'

const container = document.getElementById('root')!

// Pages are prerendered to static HTML at build time. Load the current page's
// chunk before mounting so React replaces that markup with identical content
// in one frame, instead of flashing an empty loading state first.
loadPage(resolveRoute(window.location.pathname))
  .catch(() => undefined)
  .finally(() => {
    createRoot(container).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  })
