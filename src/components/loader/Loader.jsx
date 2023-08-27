import React from 'react'
import { RotatingLines } from 'react-loader-spinner'
const Loader = () => {
    const loaderStyle={  
            display:'flex',
            justifyContent:'center',
            alignItems:"center",
            height:"100vh"
    }
    return (
        <>
            <div className="loader" style={loaderStyle}>
                <RotatingLines
                    strokeColor="black"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="100"
                    visible={true}
                />
            </div>
        </>
    )
}
export default Loader;