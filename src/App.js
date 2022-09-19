import logo from './logo.svg';
import './App.css';
import Tabs from "./Components/Tabs/Tabs";
import LInp from "./Components/LInp/LInp";
import {Glass, Circle} from "./Components/Glass/Glass";
import PyLink from "./Components/PyLink/PyLink";
import Test from "./Components/Test";
import DImg from "./Components/DImg/DImg";

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
        <div style={{background: "gray", padding: "10px"}}>
            <LInp type="number" labelMap={val => <span>Number : {val}</span>}/><br/>
            <LInp type="range" min={0} max={28 * 2 + 1} value={0}
                  labelMap={val => <span>Range : {String.fromCharCode(65 + val)}</span>}/><br/>
            <LInp type="number" labelMap={val => <span>Square({val}) = {val ** 2}</span>}/><br/>
            <LInp type="text" labelMap={val => <span>Text : {val}</span>}/><br/>
            <LInp type="number" labelProps={{style: {display: 'initial'}}} min={1} max={100}
                  labelMap={() => <span>Number(1, 100) : </span>}/><br/>
            <LInp type="textBox" labelMap={() => <span>TextBox : </span>}/><br/>
        </div>
    );
}

function FooGlass() {
    const bg =
        <>
            <Circle
                style={{
                    background: "red",
                    width: "80px",
                    height: "80px",
                    top: "100px",
                    left: "30px"
                }}/>
            <Circle
                style={{
                    background: "green",
                    width: "40px",
                    height: "40px",
                    top: "150px",
                    left: "200px"
                }}/>
            <Circle
                style={{
                    background: "blue",
                    width: "150px",
                    height: "130px",
                    top: "180px",
                    left: "70px"
                }}/>
            <Circle
                style={{
                    background: "gold",
                    width: "80px",
                    height: "80px",
                    top: "50px",
                    left: "300px"
                }}/>
        </>
    return (
        <Glass
            bg={bg}
            style={{width: "400px", height: "300px"}}>
            <p style={{padding: "10px"}}>
                Glass morphism is a new design trend that is currently very popular.<br/>
                Essentially, the main aspect of this trend is a semi-transparent background, with a sublime
                shadow and border.<br/>
                But you also have a blur added to the background itself so that whatever is behind the
                background is beautifully "morphed" into the element itself
            </p>
        </Glass>
    )
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
            </header>
            <CompRep label="Tabs">
                <Tabs/>
            </CompRep>
            <CompRep label="LInp">
                <FooLInp/>
            </CompRep>
            <CompRep label="PyLink">
                <PyLink/>
            </CompRep>
            <CompRep label="Glass">
                <FooGlass/>
            </CompRep>
            <CompRep label="DImg">
                <DImg/>
            </CompRep>
        </div>
    );
}

export default App;
