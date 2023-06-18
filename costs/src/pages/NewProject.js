import ProjectForm from '../components/Project/ProjectForm'
import styles from './Newproject.module.css'

function NewProject() {
    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviçõs</p>
            <ProjectForm btnText="Criar projeto" />
        </div>

    )
}

export default NewProject