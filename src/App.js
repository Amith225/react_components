import logo from './logo.svg';
import './App.css';
import Tabs from "./components/Tabs/Tabs";
import LInp from "./components/LInp/LInp";
import {Glass, Circle} from "./components/Glass/Glass";
import PyLink from "./components/PyLink/PyLink";
import Test from "./components/Test";
import DImg from "./components/DImg/DImg";
import Slider from "./components/Slider/Slider";

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
        images[item.replace('./', '')] = r(item);
    });
    return images;
}

const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

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
        <div style={{background: "#bfbfbf", padding: "10px"}}>
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
            <Circle bg="red" w={80} h={80} x={30} y={100}/>
            <Circle bg="green" w={40} h={40} x={200} y={150}/>
            <Circle bg="blue" w={150} h={130} x={70} y={180}/>
            <Circle bg="gold" w={80} h={80} x={300} y={50}/>
            <Circle bg="pink" w={50} h={60} x={140} y="10%">
                <Circle bg="red" w={25} h={30} x="25%" y="25%"/>
            </Circle>
        </>
    return (
        <Glass
            back={bg}
            style={{maxWidth: "400px", minHeight: "300px"}}>
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
            <CompRep label="Slider">
                <Slider imgs={Object.values(images)}/>
            </CompRep>

            {/*<CompRep label="Test">*/}
            {/*    <Test/>*/}
            {/*</CompRep>*/}
        </div>
    );
}

export default App;
