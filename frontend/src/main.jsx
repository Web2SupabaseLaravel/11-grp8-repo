import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RestTable from './components/arab-component/RestTable.jsx'
// import "App.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <RestTable />
    <Footer />
  </StrictMode>,
)
