import data from '../data.json'
const Popup=({ setFirstWord, setSecondWord, setFirstPopupOpen,setSecondPopupOpen})=>{
	const allWords=Object.keys(data)
	const onListClick=(e)=>{
		
		
		if(setFirstWord)
		{	setFirstWord(e.target.innerText)
		setFirstPopupOpen(false)}
		else if(setSecondWord)
		{setSecondWord(e.target.innerText)
		setSecondPopupOpen(false)}
	}

return(
	<ul  className='popup'>
		{allWords.map((e,i)=>{return ( <li key={i} onClick={onListClick} style={{cursor:'pointer',borderBottom:'1px solid black', padding:'2px'}}>{e}</li> )})}
	</ul>


	)
}

export default Popup