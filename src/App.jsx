import { useState } from 'react';
import Dice from './Dice';
import './App.css';

const App = () => {
  const [diceCount, setDiceCount] = useState(1); // Cantidad de dados
  const [results, setResults] = useState([]); // Resultados de cada dado
  const [rolling, setRolling] = useState(false); // Estado de animación

  // Ajusta el número de dados y actualiza los placeholders
  const adjustDiceCount = (adjustment) => {
    setDiceCount((prev) => {
      const newCount = Math.max(1, prev + adjustment); // Al menos 1 dado
      setResults(Array.from({ length: newCount }, () => null)); // Placeholder 🎲
      return newCount;
    });
  };

  // Realiza una tirada
  const rollDice = () => {
    if (rolling) return; // Detener si ya están rodando
    setRolling(true);
    setResults(Array.from({ length: diceCount }, () => Math.ceil(Math.random() * 6)));
    setTimeout(() => setRolling(false), 600); // Detener la animación después de 2 segundos
  };

  return (
    <div className="app-container">
      <div className="dice-roller">
        <h1>🎲 Dice Roller</h1>
        <div className="buttons">
          <button onClick={() => adjustDiceCount(-3)}> -3 </button>
          <button onClick={() => adjustDiceCount(-1)}> -1 </button>
          <span>{diceCount==1 ? '1 Dice' : `${diceCount} Dices`}</span>
          <button onClick={() => adjustDiceCount(1)}> +1 </button>
          <button onClick={() => adjustDiceCount(3)}> +3 </button>
        </div>
        <button className="roll-button" onClick={rollDice}>
          {rolling ? 'Rolling...' : 'Roll Dice'}
        </button>
        <div className="dice-container">
          {results.map((result, index) => (
            <Dice key={index} number={result} rolling={rolling || result === null} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
