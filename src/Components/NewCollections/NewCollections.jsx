import React, { useEffect, useState } from 'react'
import './NewCollections.css'
// import new_collection from '../Assets/new_collections'
import Item from '../Item/Item'
const NewCollections = () => {
  const [new_collection, setNew_collection]= useState([]);

  useEffect(()=>{
    fetch('https://my-ecom-backend.onrender.com/newcollections')
    .then((response)=>response.json())
    .then((data)=>setNew_collection(data));
  },[])
  return (
    <div className='newcollections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {
            new_collection.map((item,i)=>{
                return <Item key={i} id={item.id} image={item.image} name={item.name} old_price={item.old_price} new_price={item.new_price}/>
            })
        }
      </div>
    </div>
  )
}

export default NewCollections
