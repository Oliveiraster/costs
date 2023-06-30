import Loading from '../components/layout/Loading'
import Container from '../components/layout/Container'
import ProjectForm from '../components/Project/ProjectForm'
import Message from '../components/layout/Message'
import ServiceForm from '../components/service/ServiceForm'

import { Form, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import style from './Projected.module.css'

export default function Projected(){

    const {id} = useParams()

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()
        
    useEffect(() => {

        setTimeout(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
            },
            })
            .then(resp => resp.json())
            .then((data) =>{
                setProject(data)
            })
        },300)
    },[id])

    function editPost(project){
        setMessage('')
        //validação do budget
        if(project.budget < project.cost) {
            setMessage('O orçamento nõ pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }
        fetch(`http://localhost:5000/projects/${project.id}`,{
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then(resp => resp.json())
        .then((data) => {

            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto atualizado')
            setType('success')    
        })
    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm) 
    }
    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm) 
    }

    return(
        <>
            {project.name ? (
                <div className={style.project_details}>
                    <Container custonClass="column">
                        {message && <Message type={type} msg={message}  /> }
                        <div className={style.details_container} >
                            <h1>Projeto: <span>{project.name}</span></h1>
                            <button className={style.btn} onClick={toggleProjectForm}>{!showProjectForm ? 'Editar projeto' : 'Fechar'} </button>
                            {!showProjectForm ? (
                                <div className={style.project_info} >
                                    <p>
                                        <span>Categoria: </span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçãmento: </span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado: </span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={style.project_info} >
                                    <ProjectForm handleSubmit={editPost}
                                    btnText="Concluir edção"
                                    projectData={project} />
                                </div>
                            )}
                        </div>
                        <div className={style.service_form_container}>
                                <h2>Adicionar um serviço: </h2>
                                <button className={style.btn} onClick={toggleServiceForm}>{!showServiceForm ? 'Adicionar serviço' : 'Fechar'} </button>
                        
                            <div className={style.project_info} >
                                {showServiceForm && (<ServiceForm /> )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container custonClass='start'>
                            <p>Itens de Serviço: </p>
                        </Container>   
                    </Container>
                </div>
                
                ) : <Loading />}
        </>

    )
}
