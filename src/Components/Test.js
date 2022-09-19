import {Component} from "react";

class CTest extends Component {
    constructor(props) {
        super(props);
        this.state = {test: "hi"}
        if (this.props.this) this.props.this.ref = this;
    }

    test = (test) => {
        this.setState({test: test});
    }

    render() {
        return (
            <div>{this.state.test}</div>
        );
    }
}

export default function Test() {
    let ctest_ref = {};
    return (
        <>
            <CTest this={ctest_ref}/>
            <button onClick={() => ctest_ref.ref.test("blue")}>Test</button>
        </>
    );
}
