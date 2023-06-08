import data from './data.json'
import React from 'react'
import Popup from './components/Popup'
import {GrClose as X , GrVolume as Speak} from 'react-icons/gr'
import * as meSpeak from 'mespeak'

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
const [speechText , setSpeechText] = React.useState('')


meSpeak.loadVoice(require("mespeak/voices/en/en.json"))
!meSpeak.isConfigLoaded() && meSpeak.loadConfig(require("mespeak/src/mespeak_config.json"))


const deleteTranscription = (text) => {
	let newText = "";
	for (let i = 0; i < text.length; i++) {
		if (text[i] != "[") newText += text[i];
		else return newText;
	}
};

const deleteRomanNum = (text) => {
	if(text.slice(text.length-3,text.length)===" I ")
	{text=text.replace(" I ", ""); console.log(1)}
else if(text.slice(text.length-4,text.length)===" II ")
	{text=text.replace(" II ", ""); console.log(2)}
else if(text.slice(text.length-5,text.length)===" III ")
	{text=text.replace(" III ", ""); console.log(3)}
else if(text.slice(text.length-4,text.length)===" IV ")
	{text=text.replace(" IV ", ""); console.log(4)}
return text
}


const getQuestion=()=>{
	setMyAnswer('')
document.querySelectorAll('.answer').forEach(i=>i.style.backgroundColor='transparent')
let allWords=new Array(data.length)
let allQuestions=new Array(data.length)
	for (let i = 0 ; i< allWords.length ; i++)
	{allWords[i]=Object.keys(data[i])[0]
	allQuestions[i]=Object.values(data[i])[0]}
let index
let startIndex=0
let endIndex=data.length
if(firstWord!=='')
	startIndex= allWords.indexOf(firstWord)
if(secondWord!=='')
	endIndex= allWords.indexOf(secondWord)+1
index=Math.floor(Math.random()* (endIndex-startIndex) )+startIndex

let forSpeech =deleteTranscription(allWords[index])
forSpeech = deleteRomanNum(forSpeech)
forSpeech=forSpeech.split(/[\s-/()]+/).join('')

setCorrectAnswer(allQuestions[index])
setQuestion(allWords[index])
setSpeechText(forSpeech)

let newAnswers=new Array(4).fill(null)
newAnswers[Math.floor(Math.random()*4)]= allQuestions[index]

for( let i= 0 ; i<= newAnswers.length; i++)
{
	if(newAnswers[i]===null){
	let incorrectAnswerIndex = Math.floor(Math.random()*data.length)
	if(incorrectAnswerIndex!==index &&  deleteRomanNum(allQuestions[incorrectAnswerIndex])!=deleteRomanNum(allQuestions[index]) ){
	newAnswers[i]=allQuestions[incorrectAnswerIndex]
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
		{delay(700).then(()=> getQuestion())}
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
{firstPopupOpen && <div>
	<Popup setFirstPopupOpen={setFirstPopupOpen} setFirstWord={setFirstWord} /> 
	<div onClick={()=>setFirstPopupOpen(false)} className='overlay'></div></div>}
<p>Մինչև<i onClick={()=> setSecondPopupOpen(true)}>{secondWord===''?'Ընտրված': deleteTranscription(secondWord)}</i>բառը</p>
{secondPopupOpen && <div><Popup setSecondPopupOpen={setSecondPopupOpen} setSecondWord={setSecondWord}/> <div onClick={()=>setSecondPopupOpen(false)} className='overlay'></div></div>}
</div>
 <button className="unsortBtn" onClick={()=>{setFirstWord(''); setSecondWord('')}}>Ամբողջը</button> 
</div>}
<hr style={{width:'100%'}}/>
<div style={{display:'flex' ,alignItems:'center', width:'inherit' , justifyContent:'space-between'}}>
<h1 className='question'>{question}</h1>


<button className='speechBtn' onClick={()=>{ meSpeak.canPlay() && meSpeak.speak(speechText,{variant:'m7' , pitch:25, amplitude:10, speed:130 , volume:1 , wordgap:0  })}} >
<Speak  className='speechIcon'/>
</button>


</div>
{answers.map((e,i)=>{return(<button  key={i} onClick={onAnswerClick } className={`answer answer${i}`}>{e}</button>)})}
<button  onClick={  onNextClick } className='nextBtn'>{buttonText}</button>
   <script src=""></script>

</main>)}


export default App;
