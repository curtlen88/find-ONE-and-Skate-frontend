import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";


// create a popup component that will be used to display the popup
export default function PopupCard({ coordinates, content, onClose}) { // pass in the coordinates, content, and a function to close the popup - use destructuring
    // create a state to determine if the popup is visible or not
    const[isVisible, setIsVisible] = useState(false);
    // create a function to toggle the visibility of the popup
    return (
        <>
        {isVisible && (  // if the popup is visible, render the popup
            <div
             className="popup" 
             style={{    // set the position of the popup
                left: coordinates[0], 
                top: coordinates[1]
            }}
        >  
        
            <div className="popup__content">
                {content}
            </div>
            <button onClick={onCLose}></button>
        </div>
        )}
        </>
    )
}