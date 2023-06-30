import Input from '../form/Input'

import style from '../Project/ProjectForm.module.css'


export default function serviceFrom(){

    function submit(){

    }

    function handleChange(){

    }

    return(
        <from onSubmit={submit} className={style.form} >
            <Input
            type="text" 
            text="Nome do serviço:"
            name="name"
            placeholder="Insira o nome do serviço"
            handleOnChange={handleChange}
            />
        </from>
    )

}