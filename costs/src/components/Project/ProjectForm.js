import Input from '../form/Input'
import styles from './ProjectForm.module.css'


function ProjectForm() {
    return (
        <form className={styles.form}>
            <Input type='text'
            text="Nome do projeto" 
            name="name" 
            placeholder="Insira o nome do projeto"/>
            <div>
                <input type="text" placeholder="Insira o nome do Projeto" />
            </div>
            <div>
                <input type="number" placeholder="Insira o orçamento total" />
            </div>
            <div>
                <select name="category_id">
                    <option desabled >Selecione a categoria</option>
                </select>
            </div>
            <div>
                <input type="submit" value="Criar Projeto" />
            </div>
        </form>
    )
}

export default ProjectForm