import {parse, v4 as uuidv4} from 'uuid'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Loading from '../components/layout/Loading'
import Container from '../components/layout/Container'
import ProjectForm from '../components/Project/ProjectForm'
import Message from '../components/layout/Message'
import ServiceForm from '../components/service/ServiceForm'
import ServiceCard from '../components/service/ServiceCard'
import style from './Projected.module.css'

export default function Projected(){

    const {id} = useParams()

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState([])
    const [services, setServices] = useState(false)
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
                setServices(data.services)
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
            setShowProjectForm(true)
            setMessage('Projeto atualizado')
            setType('success')    
        })
    }

    function createService(){
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço!')
            setType('delete')
            project.services.pop()
            return false
        }
        // adicionar service cost no projeto total
        project.cost = newCost
        // atualizando projeto
        fetch(`http://localhost:5000/projects/${project.id}`,{
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then(resp => resp.json())
        .then((data) => {
            //exibir os serviçoes
            setServices(data.services)
            setShowServiceForm(false)
            setMessage('Serviço adicionado!')
            setType('success')
              
        })
    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm) 
    }
    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm) 
    }

    function removeService(id, cost){
        const servicesUpdated = project.services.filter(
            (service) => service.id != id
        )

        const projectUpdated = project

        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)
        
        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Serviço removido com sucesso!')
            setType('success')
        })
        .catch((err) => console.log(err))

    }

    return(
        <>
            {project.name ? (
                <div className={style.project_details}>
                    <Container custonClass="column">
                        {message && <Message type={type} msg={message}  /> }
                        <div className={style.details_container} >
                            <h1>Projeto: <span>{project.name}</span></h1>
                            <button className={style.btn} onClick={toggleProjectForm}>{showProjectForm ? 'Editar projeto' : 'Fechar'} </button>
                            {showProjectForm ? (
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
                                {showServiceForm && (<ServiceForm handleSubmit={createService} 
                                btnText="Adicionar Serviço"
                                projectData={project}
                                /> )}

                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container custonClass='start'>
                            {services.length > 0 && services.map((service) => (
                                <ServiceCard  
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.id}
                                    handleRemove={removeService}
                                    />
                            ))} 
                        </Container>   
                    </Container>
                </div>
                
                ) : <Loading />}
        </>

    )
}
