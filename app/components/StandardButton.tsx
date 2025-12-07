interface StandardButtonProps{
    title: string;
    color: string;
    isLink: true | false;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}

export default function StandardButton({title, color, onClick, type = "button"}: StandardButtonProps){
    return(
        <button className={"button-standard button-" + color} onClick={onClick} type={type}>
            {title}
        </button>
    );
}