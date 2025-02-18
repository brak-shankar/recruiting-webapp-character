import './App.css';
import CharacterSheet from "./components/CharacterSheet";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>RPG Character Sheet</h1>
      </header>
      <section className="App-section">
        <CharacterSheet />
      </section>
    </div>
  );
}

export default App;
