import data from '../data.json'
import {AiOutlineSearch as Search} from 'react-icons/ai'
import React from 'react'
import {useDebounce} from 'use-debounce-custom-hook'
const Popup=({ setFirstWord, setSecondWord, setFirstPopupOpen,setSecondPopupOpen})=>{

	const allWords=Object.keys(data)
	const [search , setSearch] = React.useState('')
	const listRef=React.useRef(null)
	const debouncedValue=useDebounce(search , 1000)
	const onListClick=(e)=>{
		console.log(listRef.current.scrollTop)
		if(setFirstWord)
		{	setFirstWord(e.target.innerText)
		setFirstPopupOpen(false)
		}
		else if(setSecondWord)
		{setSecondWord(e.target.innerText)
		setSecondPopupOpen(false)}
	}

	const onInputChange=(e)=>{
	 setSearch(e.target.value)
	}

	React.useEffect(()=>{
		
		let searchValue=debouncedValue	
	document.querySelectorAll('.popupList li').forEach((i)=>i.style.backgroundColor='transparent')
	for(let i = 0 ; i< allWords.length; i++)	
	{
	let word=allWords[i].split(' ').join('').split('')
	word.length=searchValue.length
	if(word.join('')==searchValue.split(' ').join('')) 
	{	document.querySelectorAll('.popupList li')[i].style.backgroundColor='#a4d5ed'
		listRef.current.scrollTop=21.99*(i-1)
		break}}
		setSearch(debouncedValue)
	},[debouncedValue])

return(
	<div className='popup'>
	<div style={{display:'flex', margin:'5px', alignItems:'center', border:'1px solid #555', borderRadius:'5px'}}>
	<Search style={{ width:'30px' , height:'30px', color:'#666' }}/>
	<input value={search} onChange={onInputChange} placeholder='Որոնում • • •'/></div>
	<div ref={listRef} className= 'popupOverflow'>
	<ul  className='popupList' >
		{allWords.map((e,i)=>{return ( <li key={i} onClick={onListClick} style={{cursor:'pointer',borderBottom:'1px solid black', padding:'2px', height:'21.99px', boxSizing:'border-box' }}>{e}</li> )})}
	</ul>
	</div>
	</div>

	)
}

export default Popup