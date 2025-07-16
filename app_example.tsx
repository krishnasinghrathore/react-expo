import React from 'react'
import { createRoot } from 'react-dom/client'
import SimpleDashboard from './simple_dashboard'

// =============================================================================
// MAIN APP
// =============================================================================

const App = () => {
  return <SimpleDashboard />
}

// =============================================================================
// RENDER APP
// =============================================================================

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(<App />)
}

export default App