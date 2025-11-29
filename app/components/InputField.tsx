interface InputFieldProps {
    placeholderText:string;
}

export default function InputField({placeholderText}:InputFieldProps){
    return(
        <input className="input-field" type="text" placeholder={placeholderText}/>
    );
}