import './Tabs.css';
import {Component} from "react";

// function Vr({height}) {
//     return (
//         <span className="Vr">
//             <span style={{borderLeft: "1px solid #000", height: height, display: "inline-block"}}/>
//         </span>
//     );
// }

const domId = (id) => document.getElementById(id);

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
    prefix = "TabsUIdPrefix--some-string-to-make-this-difficult-to-clash-with-user-defined-id";
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
        this.state.tabPages.push(<this.props.newTabPage uid={this.uid++}/>);
        this.onTabClick(this.state.tabPages.length - 1);
    }

    render() {
        let tab_n = 0;
        const tabs = this.state.tabPages.map(() =>
            <Tab active={this.state.activeTab === tab_n}
                 lActive={this.state.activeTab === tab_n - 1}
                 rActive={this.state.activeTab === tab_n + 1}
                 i={tab_n} key={this.state.tabPages[tab_n++].props.uid}
                 onTabClick={this.onTabClick} onXClick={this.onXClick}>
                <span>Tab:{tab_n + 1}</span>
            </Tab>
        );
        tab_n = 0;
        return (
            <div className="Tabs--Container">
                <div id={this.prefix + "Tabs"} className="Tabs">
                    <span className="Tab" style={{minWidth: "33px", maxWidth: "33px"}}/>
                    {tabs}
                    <button className="plus" onClick={this.onNewTabClick}>+</button>
                    <button className="prev" onClick={() => domId(this.prefix + "Tabs").scrollLeft -= 10}>
                        {"<"}
                    </button>
                    <button className="next" onClick={() => domId(this.prefix + "Tabs").scrollBy(1, 0)}>
                        {">"}
                    </button>
                </div>
                <div className="TabPage">
                    {this.state.tabPages.map((page) =>
                            <div key={page.props.uid}
                                 style={{display: tab_n++ !== this.state.activeTab ? 'none' : 'initial'}}>{page}</div>)}
                </div>
            </div>
        );
    }
}
