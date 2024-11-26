import { useState } from 'react';
import Dice from './Dice';
import './App.css';
import { GiInvertedDice2, GiInvertedDice3, GiInvertedDice4, GiInvertedDice5, GiInvertedDice6 } from 'react-icons/gi';

const DICE_THRESHOLDS = [2, 3, 4, 5, 6];
const ICONS = {
  2: <GiInvertedDice2 className="icon-large" />,
  3: <GiInvertedDice3 className="icon-large" />,
  4: <GiInvertedDice4 className="icon-large" />,
  5: <GiInvertedDice5 className="icon-large" />,
  6: <GiInvertedDice6 className="icon-large" />,
};

const App = () => {
  const [diceCount, setDiceCount] = useState(1); // Cantidad de dados
  const [results, setResults] = useState([]); // Resultados de cada dado
  const [rolling, setRolling] = useState(false); // Estado de animación
  const [counts, setCounts] = useState(createInitialCounts()); // Contador de resultados

  // Función para inicializar el contador
  function createInitialCounts() {
    return DICE_THRESHOLDS.reduce((acc, value) => ({ ...acc, [value]: 0 }), {});
  }

  // Ajusta el número de dados
  const adjustDiceCount = (adjustment) => {
    setDiceCount((prev) => {
      const newCount = Math.max(1, prev + adjustment); // Siempre al menos 1 dado
      setResults(Array.from({ length: newCount }, () => null)); // Placeholder para los dados
      setCounts(createInitialCounts()); // Resetea el contador
      return newCount;
    });
  };

  // Calcula cuántos resultados son mayores o iguales a cada valor
  const calculateCounts = (results) => {
    const countMap = createInitialCounts();
    results.forEach((result) => {
      DICE_THRESHOLDS.forEach((threshold) => {
        if (result >= threshold) countMap[threshold]++;
      });
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
      calculateCounts(newResults);
    }, 600); // Duración de la animación
  };

  return (
    <div className="app-container">
      <div className="dice-roller">
        <h1>🎲 Dice Roller</h1>

        <div className="buttons">
  <button onClick={() => adjustDiceCount(-3)} disabled={diceCount < 4}> 
    -3 
  </button>
  <button onClick={() => adjustDiceCount(-1)} disabled={diceCount < 2}> 
    -1 
  </button>
  <span>{diceCount === 1 ? '1 Dice' : `${diceCount} Dices`}</span>
  <button onClick={() => adjustDiceCount(1)}> 
    +1 
  </button>
  <button onClick={() => adjustDiceCount(3)}> 
    +3 
  </button>
</div>


        <button className="roll-button" onClick={rollDice} disabled={rolling}>
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
          <h2>Results for {diceCount} {diceCount === 1 ? 'dice' : 'dices'}:</h2>
          <ul>    
            {DICE_THRESHOLDS.map((value) => (
              <li key={value}>
                {ICONS[value]}+ : {counts[value]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
