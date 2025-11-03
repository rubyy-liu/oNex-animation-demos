import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="header">
            <h1>SVG Animation Demos</h1>
            <nav>
                <ul>
                    <li><a href="#frames">Frame Animation</a></li>
                    <li><a href="#vector">Vector Animation</a></li>
                    <li><a href="#hybrid">Hybrid Animation</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;