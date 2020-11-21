import React, {useState} from 'react';
import tree from './images/tree.jpg'
import './App.css';

function App() {
  const [inputNum, setInputNum] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [currentDeck, setCurrentDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [remainingCards, setRemainingCards] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleKeyUp = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault();
      if(inputNum < 2) {
        setErrMsg('Amount must be larger or equal to 2');
        return;
      }
      if(inputNum > 13) {
        setErrMsg('Amount must not be larger than 13');
        return;
      }
      setErrMsg(''); 
      createRandomDeck(inputNum);
    }
  }

  const createRandomDeck = (input) => {
    let cardNums = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    let currentIndex = cardNums.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
        temporaryValue = cardNums[currentIndex];
      cardNums[currentIndex] = cardNums[randomIndex];
      cardNums[randomIndex] = temporaryValue;
    }
    let newDeck= [];
    for(let i = 0; i < input; i++) {
      newDeck = [cardNums[i], cardNums[i], ...newDeck];
    } 
    randomizeNewDeck(newDeck);
  }

  const randomizeNewDeck = (newDeck) => {
    let deck = newDeck;
    let currentIndex = newDeck.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
        temporaryValue = deck[currentIndex];
      deck[currentIndex] = deck[randomIndex];
      deck[randomIndex] = temporaryValue;
    }
    setCurrentDeck(deck);
    setRemainingCards(deck.length);
  }

  const handleCardClick = (cardNum, index) => {
    if(isChecking) {
      return;
    }
    if(currentIndex.length === 0 && currentCard === null) {
      setCurrentIndex([index, ...currentIndex]);
      setCurrentCard(cardNum);
      return;
    } 
    if(currentCard !== null) {
      setCurrentIndex([index, ...currentIndex]);
      setIsChecking(true);
      if(currentCard === cardNum) {
        if(remainingCards - 2 === 0) {
          resetState();
        }
        setRemainingCards(remainingCards - 2);
        setCurrentCard(null);
        setIsChecking(false);
      } else {
        setCurrentCard(null); 
        setTimeout(() => { 
          setCurrentIndex(currentIndex.filter((card) => card !== currentIndex[0]));
          setIsChecking(false);
          }, 1000);
      }
    } else {
      setCurrentCard(cardNum);
      setCurrentIndex([index, ...currentIndex]);
    }
  }

  const resetState = () => {
    setCurrentCard(null);
    setCurrentIndex([]);
    setCurrentDeck([]);
    setInputNum(0);
  }

  return (
    <div className="App">
      <h1>Card Flip</h1>
      <p style={{color: 'red'}}>{errMsg}</p>
      <input 
        type="text" 
        value={inputNum}
        onChange={e => setInputNum(e.target.value)}
        placeholder="Set Number of Cards to Play With"
        onKeyUp={handleKeyUp}
      />
      <br/>
      <hr/>
      <div className="card-container">
        {currentDeck.length > 0 && (
          currentDeck.map((cardNum, index) => (
            currentIndex.includes(index) ? 
            // <div style={{border: 'solid black', padding: '60px'}}>{cardNum}</div>
           ( <div className="flip-card ">
              <div className="flip-card-inner flip-card-flipped">
                <div className="flip-card-back">
                  <h1>{cardNum}</h1> 
                </div>
                <div className="flip-card-front">
                  <img src={tree} alt="Avatar" style={{width: "300px", height: '300px'}} />
                </div>
              </div>
            </div>
            )
            :
            // <div>
            //   <img src={tree} style={{width: '80px'}} 
            //     onClick={() => handleCardClick(cardNum, index)}
            //   />
            // </div>
            (
              <div className="flip-card " onClick={() => handleCardClick(cardNum, index)}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src={tree} alt="Avatar" style={{width: "300px", height: '300px'}} />
                  </div>
                  <div className="flip-card-back">
                    <h1>{cardNum}</h1> 
                  </div>
                </div>
              </div>
            )
          ))
        )}
      </div>
      {remainingCards === 0 && 
       <p style={{color: 'green'}}>You Win!</p>
      }
    </div>
  );
}

export default App;
