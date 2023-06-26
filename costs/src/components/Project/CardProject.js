import style from './CardProject.module.css'

import {BsPencil, BsFillTrashFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'


export default function CardProject({id, name, budget, category, handleRemove}){

    const remove = (e) => {
    e.preventDefault()
    handleRemove(id)
    }

    return(
        <div className={style.cardproject_container}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento:</span> R${budget}
            </p>
            <p className={style.category_text}>
                <span className={`${style.category_text} ${style[category.toLowerCase()]}`}></span> {category}
            </p>
            <div className={style.cardproject_container_actions}>
                <Link to={`/projected/${id}`}>
                    <BsPencil/>Editar
                </Link>
                <button onClick={remove} >
                    <BsFillTrashFill /> Excluir
                </button>
            </div>

         
        </div>
        
    )
}
