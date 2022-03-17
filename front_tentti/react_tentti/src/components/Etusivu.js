import React from 'react';
import { Link } from 'react-router-dom';


function Etusivu(){
    return(
    <div>
        <Link to='/salasana'>Salasana</Link>
        <a> </a>
        <Link to='/haku'>Corona listaus </Link>
    </div>
        
    );
}
export default Etusivu;