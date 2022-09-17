import './Tabs.css';
import {Component} from "react";

const domId = (id) => document.getElementById(id);

function DefaultNewTabPage({uid}) {
    return (
        <section style={{padding: "10px"}}>
            <h1>New Tab Section {uid + 1}</h1>
            <input/>
        </section>
    );
}

function Tab({children, className, ...props}) {
    return (
        <span className={"Tab " + (className ? className : "")} {...props}>
            {children}
        </span>
    );
}

let guid = 0;

export default class Tabs extends Component {
    prefix = "TabsUIdPrefix--some-string-to-make-this-difficult-to-clash-with-user-defined-id";
    tabMinWidth = 70;
    tabMaxWidth = 130;
    sanityOffset = 33;
    static defaultProps = {
        newTabPage: DefaultNewTabPage,
        tabPages: [],
        activeTab: 0,
    };

    constructor(props) {
        super(props);
        this.uid = 0;
        this.scrollTab = 0;
        this.vis = 1;
        this.state = {tabPages: props.tabPages, activeTab: props.activeTab, resize: null};
        this.prefix += guid++;
        window.addEventListener('resize', () => this.setState({resize: null}));
    }

    componentDidMount() {
        if (this.state.tabPages.length === 0) this.onNewTabClick();
    }

    onTabClick = (i) => {
        this.setState({activeTab: i});
    }

    onNewTabClick = () => {
        this.state.tabPages.push(<this.props.newTabPage uid={this.uid++}/>);
        this.onTabClick(this.state.tabPages.length - 1);
    }

    onXClick = (i) => {
        this.state.tabPages.splice(i, 1);
        if (i === this.state.activeTab) this.onTabClick(i === this.state.tabPages.length ? i - 1 : i);
        else this.onTabClick(i > this.state.activeTab ? this.state.activeTab : this.state.activeTab - 1);
        if (this.state.tabPages.length === 0) this.onNewTabClick();
    }

    getTabs = (tabMinWidth) => (
        this.state.tabPages.map(page => {
            let i = this.state.tabPages.indexOf(page);
            return (
                <Tab key={page.props.uid}
                     id={this.prefix + "Tab" + i}
                     onClick={() => this.onTabClick(i)}
                     visible={i < this.scrollTab + this.vis && i >= this.scrollTab ? 1 : 0}
                     active={i === this.state.activeTab ? 1 : 0}
                     style={{
                         minWidth: tabMinWidth ? tabMinWidth : this.tabMinWidth,
                         maxWidth: this.tabMaxWidth,
                     }}>
                    <span>Tab:{i}</span>
                    <code visible={this.state.tabPages.length !== 1 ? "1" : "0"} onClick={(e) => {
                        this.onXClick(i);
                        this.tabScroll(0);
                        e.stopPropagation();
                    }}>X</code>
                </Tab>
            );
        })
    )

    tabScroll = (dir) => {
        let TabA, TabB, inc;
        if (dir > 0) {
            inc = 1;
            TabA = domId(this.prefix + "Tab" + this.scrollTab);
            TabB = domId(this.prefix + "Tab" + (this.scrollTab + this.vis));
        } else {
            inc = -1;
            TabA = domId(this.prefix + "Tab" + (this.scrollTab + this.vis - 1));
            TabB = domId(this.prefix + "Tab" + (this.scrollTab - 1));
        }
        if (TabA && TabB) {
            dir !== 0 && TabA.setAttribute("visible", "0");
            TabB.setAttribute("visible", "1");
            this.scrollTab += inc;
            domId(this.prefix + "tool<").setAttribute("disable",
                this.scrollTab === 0 ? "1" : "0");
            domId(this.prefix + "tool>").setAttribute("disable",
                this.scrollTab + this.vis >= this.state.tabPages.length ? "1" : "0");
        }
    }

    render() {
        let Tabs = domId(this.prefix + "Tabs"), Tools = domId(this.prefix + "Tools");
        let cntTabs = domId(this.prefix + "container--tabs");
        let tabsWidth, tabMinWidth, tabsWidthRem;
        if (Tabs) {
            let full = cntTabs.offsetWidth - Tools.offsetWidth - this.sanityOffset;
            tabMinWidth =
                Math.min(Math.max(full / this.state.tabPages.length, this.tabMinWidth), this.tabMaxWidth);
            tabsWidth =
                Math.min(tabMinWidth * (this.vis = full / tabMinWidth | 0), tabMinWidth * this.state.tabPages.length);
            tabsWidthRem = full - tabsWidth;
            if (this.vis < this.state.tabPages.length) {
                tabMinWidth += tabsWidthRem / this.vis;
                tabsWidth = full;
                tabsWidthRem = 0;
            }
        }
        const tabs = this.getTabs(tabMinWidth);
        return (
            <div className="container">
                <div id={this.prefix + "container--tabs"} className="container--tabs">
                    <span style={{minWidth: this.sanityOffset}}/>
                    <div id={this.prefix + "Tabs"} className="Tabs" style={{maxWidth: tabsWidth}}>{tabs}</div>
                    <div id={this.prefix + "Tools"} className="Tools">
                        <button className="tool" onClick={this.onNewTabClick}>+</button>
                        <button disable={this.scrollTab === 0 ? 1 : 0} className="tool"
                                id={this.prefix + "tool<"} onClick={() => this.tabScroll(-1)}>{"<"}</button>
                        <button disable={this.scrollTab + this.vis >= this.state.tabPages.length ? 1 : 0}
                                className="tool"
                                id={this.prefix + "tool>"} onClick={() => this.tabScroll(+1)}>{">"}</button>
                    </div>
                </div>
                <div className="container--page">
                    {this.state.tabPages.map((page) =>
                        <div key={page.props.uid}
                             style={{
                                 display:
                                     this.state.tabPages.indexOf(page) !== this.state.activeTab ? 'none' : 'initial'
                             }}>
                            {page}
                        </div>)}
                </div>
            </div>
        )
    }
}
