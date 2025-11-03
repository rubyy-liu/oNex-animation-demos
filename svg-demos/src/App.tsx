import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SvgCanvas from './components/SvgCanvas';

const App: React.FC = () => {
    return (
        <div className="App">
            <Header />
            <main style={{ padding: '20px' }}>
                <h1>SVG Animation Demos</h1>
                <SvgCanvas />
            </main>
            <Footer />
        </div>
    );
};

export default App;