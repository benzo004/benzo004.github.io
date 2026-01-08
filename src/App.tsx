import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PortfolioPage from './pages/PortfolioPage'
import { LanguageProvider } from './contexts/LanguageContext'

function App() {
    return (
        <LanguageProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<PortfolioPage />} />
                </Routes>
            </Router>
        </LanguageProvider>
    )
}

export default App
