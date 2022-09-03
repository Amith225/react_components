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

function Tab({active, lActive, rActive, onTabClick, i, onXClick, children, ...props}) {
    return (
        <span className="Tab" onClick={() => onTabClick(i)} {...props}
              active={active ? 1 : undefined} lactive={lActive ? 1 : undefined} ractive={rActive ? 1 : null}>
            {children}
            <code onClick={(e) => onXClick(i) || e.stopPropagation()}>X</code>
        </span>
    );
}

let uid = 0;

export default class Tabs extends Component {
    prefix = "TabsUIdPrefix--some-string-to-make-this-difficult-to-clash-with-user-defined-id";
    tabsMinWidth = 70;
    tabsMaxWidth = 130;
    sanityOffset = 33;
    static defaultProps = {
        newTabPage: DefaultNewTabPage,
        tabPages: [],
        activeTab: 0,
    };

    constructor(props) {
        super(props);
        this.uid = 0;
        this.state = {tabPages: props.tabPages, activeTab: props.activeTab, resize: null};
        this.prefix += uid++;
    }

    componentDidMount() {
        if (this.state.tabPages.length === 0) this.onNewTabClick();
        window.addEventListener('resize', () => this.setState({resize: null}));
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
        // let Tabs = domId(this.prefix + "Tabs");
        // Tabs.scrollBy(-this.tabsMinWidth, 0)
    }

    onTabHover = (i, remove) => {
        let tab = domId(this.prefix + "Tab" + i);
        if (tab) {
            if (remove) tab.classList.remove("lhover")
            else tab.classList.add("lhover");
        }
    }

    tabScroll = (dir) => {
        let Tabs = domId(this.prefix + "Tabs");
        let scrollTimerId = setInterval(() => Tabs.scrollBy(5 * dir, 0), 20);
        window.addEventListener('mouseup', () => clearInterval(scrollTimerId), {once: true});
    }

    render() {
        let Tabs = domId(this.prefix + "Tabs"), Tools = domId(this.prefix + "Tools");
        let cntTabs = domId(this.prefix + "container--tabs");
        let tabsWidth, tabMinWidth, tabsWidthRem;
        if (Tabs) {
            let n, full = cntTabs.offsetWidth - Tools.offsetWidth - this.sanityOffset;
            tabMinWidth =
                Math.min(Math.max(full / this.state.tabPages.length, this.tabsMinWidth), this.tabsMaxWidth);
            tabsWidth =
                Math.min(tabMinWidth * (n = full / tabMinWidth | 0), tabMinWidth * this.state.tabPages.length);
            tabsWidthRem = full - tabsWidth;
            if (n < this.state.tabPages.length) {
                tabMinWidth += tabsWidthRem / n;
                tabsWidth = full;
                tabsWidthRem = 0;
            }
        }
        let tab_n = 0;
        const tabs = this.state.tabPages.map((page) =>
            <Tab active={this.state.activeTab === tab_n}
                 lActive={this.state.activeTab === tab_n - 1}
                 rActive={this.state.activeTab === tab_n + 1}
                 i={tab_n} key={this.state.tabPages[tab_n++].props.uid}
                 id={this.prefix + "Tab" + tab_n}
                 onTabClick={this.onTabClick} onXClick={this.onXClick}
                 style={{
                     minWidth: tabMinWidth,
                     maxWidth: this.tabsMaxWidth
                 }} onMouseEnter={() => this.onTabHover(this.state.tabPages.indexOf(page) - 1)}
                 onMouseLeave={() => this.onTabHover(this.state.tabPages.indexOf(page) - 1, 1)}>
                <span>Tab:{tab_n + 1}</span>
            </Tab>
        );
        tab_n = 0;
        return (
            <div className="container">
                <div id={this.prefix + "container--tabs"} className="container--tabs">
                    <span className="Tab" style={{
                        minWidth: this.sanityOffset,
                        maxWidth: this.sanityOffset,
                    }} id={this.prefix + "Tab" + -1} ractive={this.state.activeTab === 0 ? 1 : null}/>
                    <span id={this.prefix + "Tabs"} className="Tabs" style={{maxWidth: tabsWidth}}>{tabs}</span>
                    <span id={this.prefix + "Tools"} className="Tools">
                        <button className="tool" onClick={this.onNewTabClick}>+</button>
                        <button className="tool" onMouseDown={() => this.tabScroll(-1)}>{"<"}</button>
                        <button className="tool" onMouseDown={() => this.tabScroll(+1)}>{">"}</button>
                    </span>
                    <span className="endSpan" style={{maxWidth: tabsWidthRem}}></span>
                </div>
                <div className="container--page">
                    {this.state.tabPages.map((page) =>
                        <div key={page.props.uid}
                             style={{display: tab_n++ !== this.state.activeTab ? 'none' : 'initial'}}>{page}</div>)}
                </div>
            </div>
        );
    }
}
