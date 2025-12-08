interface TableProps{
    columns: string[];
    rows: Record<string, any>[]; 
}

export default function Table({columns, rows} : TableProps){
    return(
        <div>
            <div className="table-columns">
                <div className="table-column-titles">
                    <p className="table-column-small">#</p>
                    {
                        columns.map((column, index)=>
                            <p className="table-column" key={index}>{column}</p>
                        )
                    }
                </div>
                <div className='divider-standard'></div>
            </div>
            <div>
                {rows.map((row, index) =>
                <li className="table-row" key={index}>
                    <div className="table-row-titles">
                            <p className="table-column-small">{index + 1}</p>
                            {columns.map((column, colIndex) => (
                                <p className="table-column" key={colIndex}>
                                    {row[column]}
                                </p>
                            ))}
                    </div>
                </li>
                )}
            </div>
        </div>
    );
}