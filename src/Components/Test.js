import {Component} from "react";

function Wrap({uid}) {
    return <div>uid = {uid} : <input/></div>
}

export default class CustomReactComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {selected: 0};
        this.list = [
            <Wrap uid={0}/>,
            <Wrap uid={1}/>,
            <Wrap uid={2}/>,
            <Wrap uid={3}/>
        ];
    }

    onSelect = (e) => {
        this.setState({selected: parseInt(e.target.value)});
    }

    render() {
        return (
            <div>
                State:
                <select onChange={this.onSelect}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <div>
                    {this.list.map((component) =>
                        <div key={component.props.uid}
                             style={{display: component.props.uid !== this.state.selected ? 'none' : 'initial'}}>
                            {component}
                        </div>)}
                </div>
            </div>
        );
    }
}
