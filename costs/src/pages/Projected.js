import Loading from '../components/layout/Loading'
import Container from '../components/layout/Container'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import style from './Projected.module.css'

export default function Projected(){

    const {id} = useParams()

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)

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
    },)
    },[id])

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm) 

    }

    return(
        <>
            {project.name ? (
                <div className={style.project_details}>
                    <Container custonClass="column">
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
                                    <p>Detalhe do projeto</p>
                                </div>
                            )}
                        </div>
                    </Container>
            
                </div>
                
                ) : <Loading />}
        </>

    )
}
