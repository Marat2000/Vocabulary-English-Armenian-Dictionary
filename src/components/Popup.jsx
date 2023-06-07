import Search from './Search'
import React from 'react'
import {FixedSizeList as List} from 'react-window'
import data from '../data.json'

const Popup=({ setFirstWord, setSecondWord, setFirstPopupOpen,setSecondPopupOpen})=>{
	
let allWords=new Array(data.length)
	for (let i = 0 ; i< allWords.length ; i++)
	{allWords[i]=Object.keys(data[i])[0]}

	const inputRef = React.useRef(null)
	const [search , setSearch] = React.useState( )
	

const onListClick=(e)=>{
	if(setFirstWord)
	{	setFirstWord(e.target.innerText)
	setFirstPopupOpen(false)
	}
	else if(setSecondWord)
	{setSecondWord(e.target.innerText)
	setSecondPopupOpen(false)}
}



React.useEffect(() => {

	const searchFaster=(interval)=>{
		let index=0
		
		for(let  i = index ; i < allWords.length ; i++)
{let word=allWords[i].toLowerCase().split(/[\s-/()]+/).join('').split('')
word.length = search.length
word=word.join('')
	if(search > word )
	{	interval=interval/2
		if(index - interval>=0)
		index-=interval}
else {
	if(index+interval <= allWords.length)
	index+=interval
	else index = allWords.length}
if(search.toLowerCase() == word)
	{	 inputRef.current.style.color = 'initial'
		document.querySelector('ul div').scrollTop = 21.99 * (i-1)
		break} else inputRef.current.style.color = 'tomato'
}
 
	}	
	
if(search?.length>0)
searchFaster(10000)
}, [search]);


const mapping=({index , key , style})=>{
	return(
	<li key={key} style={style} className='popupListElement' title={Object.values(data[index])} onClick={onListClick} >
		{allWords[index] }
	</li>
	)

}


return(
	<div className='popup'>
	<Search inputRef={inputRef} search={search} setSearch={setSearch}/>
	<div className= 'popupOverflow'>
	<ul  className='popupList' >
	<List
	width={'auto'}
	height={ .6*window.innerHeight - 50 }
	itemCount={allWords.length}
	itemSize={21.99}
	>{mapping}
	</List>
	</ul>
	</div>
	</div>

	)
}

export default Popup