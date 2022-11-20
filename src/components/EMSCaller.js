import "../App.css";
import React, { useState, useEffect } from 'react';
import { doc, collection, updateDoc, getDocs, query, where, addDoc, GeoPoint} from "firebase/firestore";
import {db} from "../firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
 

 
const EMSCaller = () => {

    var calls = [];
    
  

    
    

    const [currentCall, setCurrentCall] = useState();
    const [resStatus, setStatus] = useState("Location Not Set");
    const [userLocation, setUserLocation] = useState();
    

    navigator.geolocation.getCurrentPosition(function(position) {
        setUserLocation(new GeoPoint(position.coords.latitude, position.coords.longitude)); 
       });

const sendLocation = async (e) => {
    e.preventDefault();  
   
    try {
        const docRef = await addDoc(collection(db, "callerInfo"), {
          requestCitizen: false, citizenResponse: false, citizenArrive: false, location: userLocation, time: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setStatus("Location Set");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}
    

 
    
 
    return (
        <section className="container">
            <div className="items">
                <h1 className="header">
                    EMS Caller
                </h1>
   
                <div>
                    <div className="btn-container">
                        <button
                            type="submit"
                            className={resStatus== "Location Not Set" ? "btn" : "disabled"}
                            onClick={sendLocation}
                            disabled={resStatus== "Location Not Set" ? false : true}
                            background={resStatus== "Location Not Set" ? "#334;" : "red"}
                        >
                            Send Location
                        </button>
                        
                    </div>

                    <p>Status:{resStatus}</p>
   
                </div>
   
                
            </div>
        </section>
    )
}


 
export default EMSCaller