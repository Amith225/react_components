import './Table.css';

function Table({children}) {
    let rows = 0, columns = 0;
    for (let row of children) {
        if (row.type === TableRow) {
            let length = 0
            for (let cell of row.props.children) if (cell.type === TableCell) length++;
            if (length > columns) columns = length;
            rows++;
        }
    }
    console.log(rows, columns)
    return (
        <div className="Table" rows={rows} columns={columns}>
            {children}
        </div>
    );
}

function TableRow({children}) {
    return (
        <span className="Table--Row">
            {children}
        </span>
    );
}

function TableCell({children}) {
    return (
        <span className="Table--Cell">
            {children}
        </span>
    );
}

export default function Test() {
    const table = createData(
        createData(0, 0, 0, 0, 0),
        createData(11111, 1, 1, 1, 1),
        createData(2, 2, 2, 2, 2),
        createData(3, 3, 3, 3, 3),
        createData(4, 4, 4, 4, 4),
        createData(5, 5, 5, 5, 5),
    )
    let row = 0, col = 0;
    return (
        <>
            <Table>
                {table.map(r => <TableRow key={row++}>{r.map(v => <TableCell key={col++}>{v}</TableCell>)}</TableRow>)}
            </Table>
        </>
    );
}

function createData(...args) {
    return [...args]
}
