import TableColumns from "./TableColumns";
import TableRow from "./TableRow";

interface TableProps{
}

export default function Table(){
    return(
        <div>
            <TableColumns />
            <div>
                <TableRow/>
            </div>
        </div>
    );
}