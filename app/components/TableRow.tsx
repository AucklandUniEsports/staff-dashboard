interface TableRowProps{
    name:string;
    role:string;
}

export default function TableRow(){
    return (
        <li className="table-row">
            <div className="table-row-titles">
                <p className="table-column-small">1</p>
                <p className="table-column">AUEC Admin</p>
                <p className="table-column">Super Admin</p>
            </div>
        </li>
    );
}