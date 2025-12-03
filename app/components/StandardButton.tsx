interface StandardButtonProps{
    title: string;
    color: string;
    isLink: true | false;
    type?: "button" | "submit" | "reset";
}

export default function StandardButton({title, color, type = "button"}: StandardButtonProps){
    return(
        <button className={"button-standard button-" + color} type={type}>
            {title}
        </button>
    );
}