import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/collapse'
import './sidebar.css'


function Sidebar() {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-auto col-sm-2  d-flex flex-column justify-content-between min-vh-100'
                style={{
                        backgroundColor: "#232D35"}}>
                    <div className='mt-2'>
                        <a className='text-decoration-none ms-4 d-flex align-items-center text-white d-none d-sm-inline' role='button'>
                            <span className='f5-4'>
                            <img src="https://bama.es/wp-content/uploads/2023/05/logo-semi-white.png" width="140" height="80" className="d-inline-block align-top" alt="Logo"/>
                            </span>
                        </a>
                        <hr className='text-white d-none d-sm-block' />
                        <ul className="nav nav-pills flex-column mt-2 mt-sm-0" id='parentM'>
                            <li className="nav-item  my-1 py-2 py-sm-0">
                                <a href="#" class="nav-link text-white text-center text-sm-start" aria-current="page">
                                    <i className='bi bi-house'></i>
                                    <span className='ms-2 d-none d-sm-inline'>Dashboard</span>
                                </a>
                            </li>
                            <li className="nav-item  my-1 py-2 py-sm-0">
                                <a href="#submenu" class="nav-link text-white text-center text-sm-start" data-bs-toggle = "collapse" aria-current="page">
                                    <i className='bi bi-grid'></i>
                                    <span className='ms-2 d-none d-sm-inline'>Reportes</span>
                                    <i className='bi bi-arrow-down-short ms-0 ms-sm-3'></i>
                                </a>
                                <ul class="nav collapse ms-2 flex-column" id='submenu' data-bs-parent ="#parentM" >
                                    <li class="nav-item">
                                        <a class="nav-link text-white" href="#" aria-current="page">Pedidos</a>
                                    </li>
                                    <li class="nav-item ">
                                        <a class="nav-link text-white" href="#">Facturas</a>
                                    </li>
                                </ul>
                                
                            </li>
                            <li className="nav-item  my-1 py-2 py-sm-0">
                                <a href="#" class="nav-link text-white text-center text-sm-start" aria-current="page">
                                    <i className='bi bi-speedometer2'></i>
                                    <span className='ms-2 d-none d-sm-inline'>Analíticas</span>
                                </a>
                            </li>
                            <li className="nav-item  my-1 py-2 py-sm-0">
                                <a href="#" class="nav-link text-white text-center text-sm-start" aria-current="page">
                                    <i className='bi bi-people'></i>
                                    <span className='ms-2 d-none d-sm-inline'>Clientes</span>
                                </a>
                            </li>  
                        </ul>
                        
                    </div>
                    <div class="dropdown open">
                        <a class="btn border-none dropdown-toggle text-white" type="button" id="triggerId"data-bs-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                               <i className='bi bi-person f5-4'></i> <span className='fs-5 ms-3 d-none d-sm-inline'>Juan</span>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="triggerId">
                            <a class="dropdown-item" href="#">Perfil</a>
                            <a class="dropdown-item" href="#">Configuración</a>
                        </div>
                    </div>
                    

                </div>

            </div>

        </div>

     )
}

export default Sidebar
