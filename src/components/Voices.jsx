import React from 'react'

const Voices=({array, setLanguage , setLanguagesOpen})=>{
	
const onElementClick =(e)=>{
	setLanguage(e.voiceURI)
	setLanguagesOpen(false)
}

return(
<ul  className='voicesPopup'>
	{array && array.map(e=>{return(<li onClick={()=> onElementClick(e) } className='voicesPopupElement'>{e.name}</li>)})}
</ul>
	)
}

export default Voices