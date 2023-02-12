import React, { useState } from "react";

// create a place for the marker info to be displayed when the marker is clicked 
const MarkerInfo = ({ description, Photos }) => { // pass in the description and photos - use destructuring 
    return ( // return the marker info
        <div className="marker-info">
            <p>{description}</p>
            <img src={photos} alt="marker photos" />
        </div>  
    )
}

export default MarkerInfo;