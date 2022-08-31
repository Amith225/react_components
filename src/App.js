import logo from './logo.svg';
import './App.css';
import Tabs from "./Components/Tabs/Tabs";
import LInp from "./Components/LInp/LInp";

function CompRep({label, children}) {
    return (
        <div style={{margin: "10px"}}>
            <p>{label}</p>
            {children}
            <hr/>
        </div>
    );
}

function Foo() {
    return (
        <CompRep label="LInp">
            <LInp type="number" labelMap={val => `Number : ${val}`}/><br/>
            {/*<LInp type="range" min={0} max={28 * 2 + 1} value={0}*/}
            {/*      labelMap={val => `Range : ${String.fromCharCode(65 + val)} `}/><br/>*/}
            {/*<LInp type="number" labelMap={val => `Square(${val}) = ${val ** 2}`}/><br/>*/}
            {/*<LInp type="text" labelMap={val => `Text : ${val}`}/><br/>*/}
            {/*<LInp type="number" min={1} max={100} labelMap={() => "Number(1, 100) : "}/><br/>*/}
            {/*<LInp type="textBox" labelMap={() => "TextBox : "}/><br/>*/}
        </CompRep>
    );
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
            </header>
            <hr/>
            <CompRep label="Tabs">
                <Tabs newTabPage={undefined}/>
            </CompRep>
            <Foo/>
            <Foo/>
        </div>
    );
}

export default App;
