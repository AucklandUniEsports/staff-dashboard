interface StandardButtonProps{
    title: string;
    color: string;
}


export default function StandardButton({title, color}: StandardButtonProps){
    return(
        <button className={"button-standard button-" + color}>
            {title}
        </button>
    );
}