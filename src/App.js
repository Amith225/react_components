import logo from './logo.svg';
import './App.css';
import Tabs from "./Components/Tabs/Tabs";
import LInp from "./Components/LInp/LInp";

function CompRep({label, children}) {
    return (
        <div style={{padding: "10px"}}>
            <hr/>
            <p>{label}</p>
            {children}
            <hr/>
        </div>
    );
}

function FooLInp() {
    return (
        <CompRep label="LInp">
            <LInp type="number" labelMap={val => <span>Number : {val}</span>}/><br/>
            <LInp type="range" min={0} max={28 * 2 + 1} value={0}
                  labelMap={val => <span>Range : {String.fromCharCode(65 + val)}</span>}/><br/>
            <LInp type="number" labelMap={val => <span>Square({val}) = {val ** 2}</span>}/><br/>
            <LInp type="text" labelMap={val => <span>Text : {val}</span>}/><br/>
            <LInp type="number" labelProps={{style: {display: 'initial'}}} min={1} max={100}
                  labelMap={() => <span>Number(1, 100) : </span>}/><br/>
            <LInp type="textBox" labelMap={() => <span>TextBox : </span>}/><br/>
        </CompRep>
    );
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
            </header>
            <CompRep label="Tabs">
                <Tabs newTabPage={FooLInp}/>
            </CompRep>
        </div>
    );
}

export default App;
