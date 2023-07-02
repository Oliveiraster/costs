import {Link} from "react-router-dom";

import Container from "./Container";

import styles from './Navbar.module.css'
import logo from '../../img/costs_logo.png'

function Navbar(){
    return(
        <nav className={styles.Navbar}>
            <Container>
                <Link> <img src={logo} alt="Moeda" />
                    </Link>
                <ul className={styles.list}>
                    <li className={styles.item}><Link to="/">Home</Link></li>
                    <li className={styles.item}><Link to='/projects'>Projeto</Link></li>
                    <li className={styles.item}><Link to="/company">Empresa</Link></li>
                    <li className={styles.item}><Link to="/contato">Contato</Link></li>
                </ul>
            </Container>
        </nav>
    )
}

export default Navbar