import "../App.css";
import React, { useState, useEffect } from 'react';
import { doc, collection, updateDoc, getDocs, query, where} from "firebase/firestore";
import {db} from "../firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
 

 
const Operator = () => {

    var calls = [];
    
  


    
    

    const [currentCall, setCurrentCall] = useState();
    const [resStatus, setStatus] = useState("no");
    

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
    }

}

 //update the citizenResponse field
    const sendResponder = async (e) => {

        const currentCallRef = query(collection(db, "callerInfo"), where("time", "==", currentCall.time));
        const findCurrentCall = await getDocs(currentCallRef);
        findCurrentCall.forEach( async (user) => {
         const getCaller = doc(db, 'callerInfo', user.id);
         await updateDoc(getCaller, {
          requestCitizen:true
         });
        });

        setStatus("Citizen Requested");

        

        
    }


   
    useEffect(()=>{
        requestLocation();
    }, [])

 
    
 
    return (
        <section className="container">
            <div className="items">
                <h1 className="header">
                    Operator Dashboard 
                </h1>
   
                <div>
                    <div className="btn-container">
                        <button
                            type="submit"
                            className="btn"
                            onClick={requestLocation}
                        >
                            Request Location
                        </button>
                        <button
                            type="submit"
                            className="btn"
                            onClick={sendResponder}
                        >
                            Send Citizen Responder
                        </button>
                    </div>

                    <p>Status:{resStatus}</p>
   
                </div>
   
                
            </div>
        </section>
    )
}


 
export default Operator