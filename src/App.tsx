import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import theme from './styles/theme'
import Home from './pages/Home'
import LetterView from './pages/LetterView'
import FloatingHearts from './components/FloatingHearts'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <FloatingHearts />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/letter/:id" element={<LetterView />} />
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App 