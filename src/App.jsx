import { useState } from 'react';
import Dice from './Dice';
import './App.css';

const App = () => {
  const [diceCount, setDiceCount] = useState(1); // Cantidad de dados
  const [results, setResults] = useState([]); // Resultados de cada dado
  const [rolling, setRolling] = useState(false); // Estado de animación
  const [counts, setCounts] = useState({ 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }); // Contador de resultados

  // Ajusta el número de dados y actualiza los placeholders
  const adjustDiceCount = (adjustment) => {
    setDiceCount((prev) => {
      const newCount = Math.max(1, prev + adjustment); // Al menos 1 dado
      setResults(Array.from({ length: newCount }, () => null)); // Placeholder 🎲
      setCounts({ 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }); // Resetea el contador
      return newCount;
    });
  };

  // Calcula los conteos de resultados mayores o iguales a cada valor
  const calculateCounts = (results) => {
    const countMap = { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    [2, 3, 4, 5, 6].forEach((threshold) => {
      countMap[threshold] = results.filter((result) => result >= threshold).length;
    });
    setCounts(countMap);
  };

  // Realiza una tirada
  const rollDice = () => {
    if (rolling) return; // Detener si ya están rodando
    setRolling(true);
    const newResults = Array.from({ length: diceCount }, () => Math.ceil(Math.random() * 6));
    setResults(newResults);
    setTimeout(() => {
      setRolling(false);
      calculateCounts(newResults); // Actualiza el contador después de rodar
    }, 600); // Detener la animación después de 600 ms
  };

  return (
    <div className="app-container">
      <div className="dice-roller">
        <h1>🎲 Dice Roller</h1>
        <div className="buttons">
          <button onClick={() => adjustDiceCount(-3)}> -3 </button>
          <button onClick={() => adjustDiceCount(-1)}> -1 </button>
          <span>{diceCount === 1 ? '1 Dice' : `${diceCount} Dices`}</span>
          <button onClick={() => adjustDiceCount(1)}> +1 </button>
          <button onClick={() => adjustDiceCount(3)}> +3 </button>
        </div>
        <button className="roll-button" onClick={rollDice}>
        {rolling
    ? `Rolling ${diceCount === 1 ? 'Dice' : 'Dices'}...`
    : `Roll ${diceCount === 1 ? 'Dice' : 'Dices'}`}
        </button>
        <div className="dice-container">
          {results.map((result, index) => (
            <Dice key={index} number={result} rolling={rolling || result === null} />
          ))}
        </div>
        <div className="results-container">
          <h2>Contador de resultados:</h2>
          <ul>
            {[2, 3, 4, 5, 6].map((value) => (
              <li key={value}>
                +{value}: {counts[value]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
