import data from './data.json'
import React from 'react'
import Popup from './components/Popup'
import {GrClose as X} from 'react-icons/gr'

function App() {
const [answers, setAnswers]= React.useState([])
const [question, setQuestion] = React.useState("")
const [correctAnswer, setCorrectAnswer] = React.useState("")
const [myAnswer, setMyAnswer] =React.useState("")
const [firstPopupOpen , setFirstPopupOpen] = React.useState(false)
const [secondPopupOpen , setSecondPopupOpen] = React.useState(false)
const [sorting, setSorting] = React.useState(false)
const [firstWord, setFirstWord]=React.useState('')
const [secondWord, setSecondWord]=React.useState('')
const [buttonText , setButtonText]= React.useState('Ստուգել')

const deleteTranscription=(text)=>{
	let newText=''
	for(let i=0 ; i<text.length; i++){
		if(text[i]!='[')
			newText+=text[i]
		else return newText
	}
}

const getQuestion=()=>{
	setMyAnswer('')
document.querySelectorAll('.answer').forEach(i=>i.style.backgroundColor='transparent')
let index
let startIndex=0
let endIndex=Object.keys(data).length
if(firstWord!=='')
	startIndex= Object.keys(data).indexOf(firstWord)
if(secondWord!=='')
	endIndex= Object.keys(data).indexOf(secondWord)+1
index=Math.floor(Math.random()* (endIndex-startIndex) )+startIndex

setCorrectAnswer(Object.values(data)[index])
setQuestion(Object.keys(data)[index])

let newAnswers=new Array(4).fill(null)
newAnswers[Math.floor(Math.random()*4)]= Object.values(data)[index]

for( let i= 0 ; i<= newAnswers.length; i++)
{
	if(newAnswers[i]===null){
	let incorrectAnswerIndex = Math.floor(Math.random()*Object.keys(data).length)
	if(incorrectAnswerIndex!==index){
	newAnswers[i]=Object.values(data)[incorrectAnswerIndex]
	}
	else i=-1

	}
}
setAnswers(newAnswers)
}

React.useEffect( getQuestion ,[firstWord,secondWord])

const checkAnswer=()=>{
	if(myAnswer.target) myAnswer.target.style.backgroundColor='#fc6a82'
	document.querySelector(`.answer${answers.indexOf( correctAnswer)}`).style.backgroundColor='#bdff96'
}

const delay=(ms)=>{return(new Promise(resolve=> setTimeout(()=>resolve(), ms)))}
const onNextClick=()=>{

	if(myAnswer.target)
	{if(buttonText==='Ստուգել')	
		{checkAnswer()
		if( myAnswer.target.innerText.split(' ').join('') == correctAnswer.split(' ').join('') )
		{delay(1200).then(()=> getQuestion())}
		else delay(800).then(()=> setButtonText('Հաջորդը ►'))}
		else if(buttonText==='Հաջորդը ►')
		{getQuestion(); setButtonText('Ստուգել') }}
}


const onAnswerClick=(e)=>{
	setMyAnswer(e);
	document.querySelectorAll('.answer').forEach(i=>i.style.backgroundColor='transparent')
	e.target.style.backgroundColor='#a4d5ed'
}




  return (<main>
  	<hr style={{width:'100%'}}/>
 <button className='unsortBtn' onClick={()=> setSorting(!sorting)}>{sorting? X():"Ֆիլտրել"}</button>
{sorting && <div className="sorting"> 	
 <div className="sortInput">
<p>Սկսած<i onClick={()=> setFirstPopupOpen(true)}>{firstWord===''?'Ընտրված': deleteTranscription(firstWord)}</i>բառից</p>
{firstPopupOpen && <div><Popup setFirstPopupOpen={setFirstPopupOpen} setFirstWord={setFirstWord} /> <div onClick={()=>setFirstPopupOpen(false)} className='overlay'></div></div>}
<p>Մինչև<i onClick={()=> setSecondPopupOpen(true)}>{secondWord===''?'Ընտրված': deleteTranscription(secondWord)}</i>բառը</p>
{secondPopupOpen && <div><Popup setSecondPopupOpen={setSecondPopupOpen} setSecondWord={setSecondWord}/> <div onClick={()=>setSecondPopupOpen(false)} className='overlay'></div></div>}
</div>
 <button className="unsortBtn" onClick={()=>{setFirstWord(''); setSecondWord('')}}>Ամբողջը</button> 
</div>}
<hr style={{width:'100%'}}/>

<h1 className='question'>{question}</h1>
{answers.map((e,i)=>{return(<button  key={i} onClick={onAnswerClick } className={`answer answer${i}`}>{e}</button>)})}
<button  onClick={onNextClick } className='nextBtn'>{buttonText}</button>
</main>)}


export default App;
