import React from 'react'
import Scene from './components/Scene'
import './styles/App.css'

function App() {
  return (
    <div className="app-container">
      <Scene />

      {/* Instructions overlay - fades out after a few seconds */}
      <div className="instructions-overlay">
        <div className="instruction-text">
          Click on the symbols to reveal your path
        </div>
      </div>
    </div>
  )
}

export default App
