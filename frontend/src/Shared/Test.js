import React,{ useEffect,useState } from 'react'

const  Test=()=> {
      
 
        fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => console.log(json))

    
    return (
        <div>
           <h1>hello </h1>
        </div>
    )
}

export default Test
