import style from './Projects.module.css'

import { useLocation } from 'react-router-dom'
import {useState, useEffect} from 'react'

import Message from "../components/layout/Message"
import Container from '../components/layout/Container'
import Loading from '../components/layout/Loading'
import LinkButton from '../components/layout/LinkButton'
import CardProject from '../components/Project/CardProject'


export default function Projects() {
    const [Projects, setProjects] = useState([ ])
    const [removeLoading, setRemoveLoading] = useState(true)


    const location = useLocation()
    let message = ''
    if(location.state){
         message = location.state.message
    }
    
    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/projects", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',},
                }).then(resp => resp.json())
                .then(data => {
                    console.log(data)
                    setProjects(data)
                    setRemoveLoading(false)
                })
                .catch((err) => console.log(err) )
            }, 300)
        }, [])


    return (
        <div className={style.project_container} >
            <div className={style.title_container}>
                <h1>Meus projetos</h1>
                
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
              {message && <Message type="success" msg={message} />}
              <Container customClass="start">
                {Projects.length > 0 && 
                    Projects.map((project) => (
                    <CardProject name={project.name}
                        id={project.id}
                        budget={project.budget}
                        category={project.category.name} 
                        key={project.id} 
                    />
                ))}
                {removeLoading && <Loading />}
                {!removeLoading && Projects.length === 0 && (
                    <p>Não há projetos cadastrados! </p>
                )}
              </Container>
            </div>
    )} 