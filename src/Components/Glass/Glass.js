import './Glass.css'

function Glass({children, bg, ...props}) {
    return (
        <div className="Glass--cnt">
            <div className="Glass" {...props}>{children}</div>
            <div className="Glass-bg">{bg}</div>
        </div>
    )
}

function Circle({children, ...props}) {
    return (
        <div className="Circle" {...props}>{children}</div>
    )
}

export {Glass, Circle}
