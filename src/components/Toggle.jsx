import React from 'react'

const Toggle=({toggleOn, setToggleOn})=>{
 return(
 <div className='toggle' onClick={()=> setToggleOn(!toggleOn)}>
 <div className='toggleCircle' style={{marginLeft:`${toggleOn? '27px' : '2.5px' }`}}>  </div>	
 </div>)
 


}

export default Toggle