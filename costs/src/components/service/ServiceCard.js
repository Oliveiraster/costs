import {BsFillTrashFill} from 'react-icons/bs'

import style from '../Project/CardProject.module.css'

export default function ServiceCard({id, name, cost, description, key}){

    function remove(){

    }

    return(
        <div className={style.cardproject_container}>
            <h4>{name}</h4>
            <p>
                <span> Custo total: </span>
            </p>
            <p>{description}</p>
            <div className={style.cardproject_container_actions} >
                <button onClick={remove}>
                    <BsFillTrashFill /> Remover
                </button>

            </div>

        </div>

    )

}