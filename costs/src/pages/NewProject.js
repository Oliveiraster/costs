import ProjectForm from '../components/Project/ProjectForm'

import styles from './Newproject.module.css'

import {useNavigate} from 'react-router-dom'

export default function NewProject() {

    const history = useNavigate()

    function createPost(project){

        project.cost=0
        project.services = []

        fetch("http://localhost:5000/projects", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',},
            body: JSON.stringify(project),
        })
        .then((resp)=> resp.json())
        .then((data) => {
            console.log(data)
            history('/projects')
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviçõs</p>
            <ProjectForm handleSubmit={createPost}  btnText="Criar projeto" />
        </div>

    )
}