import "../App.css";
import React, { useState, useEffect } from 'react';
import { doc, collection, updateDoc, getDocs, query, where} from "firebase/firestore";
import {db} from "../firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
 

 
const Citizen = () => {


    const [currentCall, setCurrentCall] = useState();
    const [resStatus, setStatus] = useState("no");
    const [callLocation, setCallLocation] = useState();
    

 //query last added call and store in currentCall state
 const requestLocation = async () => {


    await getDocs(collection(db, "callerInfo"))
    .then((querySnapshot)=>{              
        const newData = querySnapshot.docs
            .map((doc) => ({...doc.data(), id:doc.id }));

        setCurrentCall(newData[0]);                
        console.log(currentCall);
    })

    if (currentCall == undefined){
        setStatus("Location Not Recieved");

    } else {
        setStatus("Location Recieved");
       setCallLocation("Call Location: Lat:" + currentCall.location._lat + ", Long:" + currentCall.location._long) 
        
        
    }

}

 //update the citizenArrive field
    const citizenArrive = async (e) => {

        const currentCallRef = query(collection(db, "callerInfo"), where("time", "==", currentCall.time));
        const findCurrentCall = await getDocs(currentCallRef);
        findCurrentCall.forEach( async (user) => {
         const getCaller = doc(db, 'callerInfo', user.id);
         await updateDoc(getCaller, {
            citizenArrive:true
         });
        });

        setStatus("Arrival Confirmed");
        
    }

    //update the citizenRespond field
    const citizenResponse = async (e) => {

        const currentCallRef = query(collection(db, "callerInfo"), where("time", "==", currentCall.time));
        const findCurrentCall = await getDocs(currentCallRef);
        findCurrentCall.forEach( async (user) => {
         const getCaller = doc(db, 'callerInfo', user.id);
         await updateDoc(getCaller, {
            citizenResponse:true
         });
        });

        setStatus("Confirmed Response");
        
    }


   
    useEffect(()=>{
        requestLocation();
    }, [])

 
    
 
    return (
        <section className="container">
            <div className="items">
                <h1 className="header">
                    Citizen Responder Dashboard
                </h1>
   
                <div>
                    <div className="btn-container">
                        <button
                            type="submit"
                            className={resStatus== "Location Not Set" ? "btn" : "disabled"}lassName="btn"
                            onClick={requestLocation}
                        >
                            Get Location
                        </button>

                        

                        
                        
                    </div>
                    <div className="btn-container">
                    <p>{callLocation}</p>
                    </div>
                    <div className="btn-container">

                    <button
                            type="submit"
                            className={resStatus== "Location Recieved" ? "btn" : "disabled"}
                            onClick={citizenResponse}
                        >
                            On My Way
                        </button>

                        <button
                            type="submit"
                            className={resStatus== "Confirmed Response" ? "btn" : "disabled"}
                            onClick={citizenArrive}
                        >
                            I Arrived
                        </button>
                       
                        </div>

                        <div className="btn-container">
                        <p>Status:{resStatus}</p>
                        </div>

                 


   
                </div>
   
                
            </div>
        </section>
    )
}


 
export default Citizen