import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import theme from './styles/theme'
import Home from './pages/Home'
import LetterView from './pages/LetterView'
import FloatingHearts from './components/FloatingHearts'
import { LanguageProvider } from './contexts/LanguageContext'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <LanguageProvider>
        <Router>
          <FloatingHearts />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/letter/:id" element={<LetterView />} />
          </Routes>
        </Router>
      </LanguageProvider>
    </ChakraProvider>
  )
}

export default App 