import './Tabs.css';
import {Component, createElement} from "react";

// function Vr({height}) {
//     return (
//         <span className="Vr">
//             <span style={{borderLeft: "1px solid #000", height: height, display: "inline-block"}}/>
//         </span>
//     );
// }

function DefaultNewTabPage({uid}) {
    return (
        <section style={{"margin": "10px"}}>
            <h1>New Tab Section {uid + 1}</h1>
            <input/>
        </section>
    );
}

function Tab({active, lActive, rActive, onTabClick, i, onXClick, children}) {
    return (
        <div className="Tab" onClick={() => onTabClick(i)}
             active={active ? 1 : undefined} lactive={lActive ? 1 : undefined} ractive={rActive ? 1 : undefined}>
            {children}
            <code onClick={(e) => onXClick(i) || e.stopPropagation()}>X</code>
        </div>
    );
}

export default class Tabs extends Component {
    static defaultProps = {
        newTabPage: DefaultNewTabPage,
        tabPages: [],
        activeTab: 0,
    };

    constructor(props) {
        super(props);
        this.uid = 0;
        this.state = {tabPages: props.tabPages, activeTab: props.activeTab};
    }

    componentDidMount() {
        if (this.state.tabPages.length === 0) this.onNewTabClick();
    }

    onTabClick = (i) => {
        this.setState({activeTab: i});
    }

    onXClick = (i) => {
        this.state.tabPages.splice(i, 1);
        if (i === this.state.activeTab) this.onTabClick(i === this.state.tabPages.length ? i - 1 : i);
        else this.onTabClick(i > this.state.activeTab ? this.state.activeTab : this.state.activeTab - 1);
        if (this.state.tabPages.length === 0) this.onNewTabClick();
    }

    onNewTabClick = () => {
        let Page = this.props.newTabPage;
        this.state.tabPages.push(<Page uid={this.uid++}/>);
        this.onTabClick(this.state.tabPages.length - 1);
    }

    render() {
        let tab_n = 0;
        const tabs = this.state.tabPages.map(() =>
            <Tab active={this.state.activeTab === tab_n}
                 lActive={this.state.activeTab === tab_n - 1}
                 rActive={this.state.activeTab === tab_n + 1}
                 i={tab_n} key={tab_n++} onTabClick={this.onTabClick} onXClick={this.onXClick}>
                Tab:{tab_n + 1}
            </Tab>
        );
        return (
            <div className="Tabs--Container">
                <div className="Tabs">
                    <span className="Tab" style={{flexGrow: 1, maxWidth: "33px"}}/>
                    {tabs}
                    <button className="plus" onClick={this.onNewTabClick}>+</button>
                </div>
                <div className="TabPage">
                    {this.state.tabPages[this.state.activeTab]}
                </div>
            </div>
        );
    }
}
