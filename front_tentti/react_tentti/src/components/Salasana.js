import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';


function Salasana(){

    const [salasana, setSalasana] = useState("");

    const [helpperi, setHelpperi] = useState("");

    const salasanaTesti = (e) => {
        if(salasana == "salainen"){
            setHelpperi("Salasana on oikein")
        }else{
            setHelpperi("Virheellinen salasana")
        }
    }

    const change = (e) => {
        setSalasana(e.target.value);
        setHelpperi("")
    }

    return(
        <div>
            <form>
                <TextField 
                helperText={helpperi} 
                color="primary" 
                required 
                id="standard-basic" 
                label="Salasana" 
                value={salasana}
                onChange={(e) => change(e)}/>
                <Button 
                startIcon={<CheckIcon/>} 
                variant="contained" 
                color="primary" 
                onClick={(e) => salasanaTesti(e)}>Arvaa</Button>
            </form>
        </div>
    );

}

export default Salasana;