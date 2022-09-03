import './Linp.css';
import {Component} from "react";

let uid = 0;

export default class LInp extends Component {
    prefix = "LInpUIdPrefix--some-string-to-make-this-difficult-to-clash-with-user-defined-id";
    noVals = ['', NaN, null, undefined];
    static defaultProps = {
        onInputBefore: () => null,
        onInput: () => null,
        labelMap: () => null,
        labelProps: {},
        inputProps: {},
        type: 'text',
        min: undefined,
        max: undefined,
        value: '',
    };

    constructor(props) {
        super(props);
        this.state = {value: props.value};
        this.prefix += uid++;
    }

    onInput = (e) => {
        this.props.onInputBefore(e);
        if (e.isPropagationStopped()) return;
        const [val, min, max] = ["number", "range"].includes(this.props.type) ?
            [parseInt(e.target.value), parseInt(this.props.min), parseInt(this.props.max)] :
            [e.target.value, this.props.min, this.props.max];
        let _val = val;
        const noVal = this.noVals.includes(val);
        if (noVal) _val = this.props.value;
        if (noVal || ((this.noVals.includes(min) || min <= val) && (this.noVals.includes(max) || val <= max)))
            this.setState({value: _val});
        e.target.value = this.state.value;
        this.props.onInput(e);
    }

    render() {
        const Tag = this.props.type !== "textBox" ? "input" : "textarea";
        return (
            <div className="LInp">
                <label {...this.props.labelProps} htmlFor={this.prefix}>{this.props.labelMap(this.state.value)}</label>
                <Tag value={this.state.value} type={this.props.type} onInput={this.onInput} wrap="off"
                       id={this.prefix} {...this.props.inputProps} min={this.props.min} max={this.props.max}/>
            </div>
        );
    }
}
