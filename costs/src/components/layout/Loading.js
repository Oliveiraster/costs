import loading from '../../img/loading.svg'

import style from '../layout/Loading.module.css'


export default function Loading(){
    return(
    <div className={style.loader_container} >
        <img  src={loading} alt="Loading" className={style.loader} />
    </div>

)}