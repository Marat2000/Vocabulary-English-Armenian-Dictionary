import {AiOutlineSearch as SearchIcon , AiOutlineClose as XIcon} from 'react-icons/ai'
import {useDebounce} from 'use-debounce-custom-hook'

import React from 'react'

const Search = ({inputRef , search , setSearch}) =>{
	const [inputValue , setInputValue] = React.useState('')
	const debouncedValue = useDebounce(inputValue , 500)
	
	const inputClear = ()=>{
		inputRef.current.focus()
		inputRef.current.value = ''
		inputRef.current.style.color = 'initial'
		setSearch('')
	}


React.useEffect(()=>{
setSearch(inputValue.split(/[\s-/]+/).join(''))
} , [debouncedValue])


	return(<div style={{display:'flex', margin:'5px', alignItems:'center', border:'1px solid #555', borderRadius:'5px'}}>
		<SearchIcon style={{ width:'30px' , height:'30px', color:'#666' }}/>
		<input ref={inputRef} autoFocus onChange={(e)=> setInputValue(e.target.value)} placeholder='Որոնում • • •'/>
		{ search?.length>0 && <XIcon onClick={inputClear} style={{width:'20px', height:'20px' , cursor:'pointer'}}/>}</div>)
}

export default Search