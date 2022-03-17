import React, {useState, useEffect} from 'react';

function Haku () {
    const [corona, setCorona] = useState([]);
    const [msg, setMsg] = useState ('Searching...')
    
    const fetchUrl = async () =>{
       
        try {
            let url = 'https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaHospitalData';
            const response = await fetch(url);
            const jsonData = await response.json();
            setCorona(...corona,jsonData.hospitalised);
            
            setMsg('');
            } catch (error) {
                setMsg('No information was found!')
            }
    }

    useEffect( () => { fetchUrl(); }, [])
    
    if (msg.length > 0){
        return <div>{msg}</div>
    }
    
    return(<ul>
            {corona.map(tieto => 
                <li key={tieto}>
                Päivä: {tieto.date.substr(0,10)}<br/>
                Paikka: {tieto.area}<br/>
                Sairaalassa: {tieto.totalHospitalised}, joista osastolla {tieto.inWard} ja tehohoidossa {tieto.inIcu}
                </li>
                )}</ul>
    );
    }
    export default Haku;