import React from "react";
import './Footer.css';

const Footer = (props) => {
    const styling={
        fontSize:`${props.fontsize}px`,
    }
    return (
        <>
            <div className="footer" style={styling}>
                Legal ⁃ Privacy ⁃ Cookie Policy ⁃ Consent Manager ⁃ Imprint ⁃ Artist Resources ⁃ Blog ⁃ Charts ⁃
                <span>Language:</span> <span>English (US)</span>
            </div>
        </>
    )
}

export default Footer;