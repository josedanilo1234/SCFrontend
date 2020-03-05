<template>
  <div>
    
    <div class="wrapper">
            <header class="header-top" header-theme="light">
                <div class="container-fluid">
                    <div class="d-flex justify-content-between">
                        <div class="top-menu d-flex align-items-center">
                            
                            <button type="button" class="btn-icon mobile-nav-toggle btn-dark d-lg-none " ><i class="ik ik-menu"></i></button>
                           
                           
                        </div>
                        <div class="top-menu d-flex align-items-center">
                             <span class="text"  style="font-size: 14px;">{{this.nombre}}</span>
                            <div class="dropdown">
                               
                                <a class="dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img class="avatar" src="../../../content/img/user.jpg" alt=""></a>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                    <a class="dropdown-item" href="/login" @click="logout()"><i class="ik ik-power dropdown-icon"></i> Logout</a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </header>

            <div class="page-wrap">
                <div class="app-sidebar  bg-orange">
                    <div class="sidebar-header">
                        <a class="header-brand" href="index.html">
                            <div class="logo-img">
                              
                               SINCRO-HONDA
                            </div>
                            
                        </a>
                        
                        <button id="sidebarClose" class="nav-close"><i class="ik ik-x"></i></button>
                    </div>
                    
                    <div class="sidebar-content">
                        <div class="nav-container">
                            <nav id="main-menu-navigation" class="navigation-main">
                                 <div class="nav-item">
                                    <a ><i class=""></i><span>
                                         <div class="row">
                                            </div>
                                        </span></a>
                                </div>

                                <div class="nav-lavel">Menu</div>
                               <div >

                                <div class="nav-item has-sub">
                                    <a href="javascript:void(0)"><i class="ik ik-archive"></i><span>CLIENTES</span></a>
                                    <div class="submenu-content">
                                        <router-link class="menu-item" to="/dashboard/Cliente/Consultar">Consultar</router-link>
                                         <router-link class="menu-item" to="/dashboard/Cliente/agregar">Agregar</router-link>
                                    </div>
                                </div>
                                <div class="nav-lavel"></div>
                                <div class="nav-item has-sub">
                                    <a href="#"><i class="ik ik-user"></i><span>MOTOS</span></a>
                                    <div class="submenu-content">
                                        <router-link class="menu-item" to="/dashboard/Moto/consultar">Consultar</router-link>
                                        <router-link class="menu-item" to="/dashboard/Moto/agregar">Agregar</router-link>
                                    </div>
                                </div>
                                 <div class="nav-lavel"></div>
                                <div class="nav-item has-sub">
                                    <a href="#"><i class="ik ik-check-square"></i><span>SERVICIOS</span></a>
                                    <div class="submenu-content">
                                        <router-link class="menu-item" to="/dashboard/servicio/consultar">Consultar</router-link>
                                        <router-link class="menu-item" to="/dashboard/servicio/agregar">Agregar</router-link>
                                    </div>
                                </div>
                                 <div class="nav-lavel"></div>
                                <div class="nav-item has-sub">
                                    <a href="#"><i class="ik ik-file-minus"></i><span>ARTICULOS</span> </a>
                                    <div class="submenu-content">
                                        <router-link class="menu-item" to="/dashboard/Articulo/consultar">Consultar</router-link>
                                        <router-link class="menu-item" to="/dashboard/Articulo/agregar">Agregar</router-link>

                                    </div>
                                </div>
                                 <div class="nav-lavel"></div>
                                <div class="nav-item has-sub">
                                    <a href="#"><i class="ik ik-slack"></i><span>MAQUINARIA</span></a>
                                    <div class="submenu-content">
                                        <router-link class="menu-item" to="/dashboard/maquinaria/consultar">Consultar</router-link>
                                        <router-link class="menu-item" to="/dashboard/maquinaria/agregar">Agregar</router-link>
                                    </div>
                                </div>
                                 <div class="nav-lavel"></div>
                                <div class="nav-item has-sub">
                                    <a href="#"><i class="ik ik-clipboard"></i><span>EMPLEADOS</span></a>
                                    <div class="submenu-content">
                                        <router-link class="menu-item" to="/dashboard/empleado/empleado">Empleados</router-link>
                                        <router-link class="menu-item" to="/dashboard/empleado/usuario">Usuarios</router-link>
                                    </div>
                                </div>
                                 <div class="nav-lavel"></div>
                               </div>
                                <!-- fin Menu Administrador-->
                            </nav>
                        </div>
                    </div>
                </div>
                <div class="main-content">
                    <router-view/>
                </div>
                <footer class="text-right">
                        Copyright © 2020 <b> Jose Danilo Dussan </b> All Rights Reserved.
                </footer>

            </div>
        </div>
  </div>
</template>
<style>
footer{
    margin-left: 5%;
}
</style>
<script>
export default {
    data() {
        return {
            roles:'',//carga todos los roles del usuario luego del login
            rolSelector: '',//Rol seleccionado de la lista desplegable
            nombre:'',//nombre de la persona que relaizo el login
            ruta:'http://localhost:3000/api/dashboard'
            
        }

    },
    created() {
        
        this.nombre=localStorage.getItem('nombre')
        window.$=window.jQuery= require('jquery')
        this.Vericacion_sesion()
        
    },methods: {
        logout(){//metodo se ejecuta al final de un inicio de sesion se limpia el local storage
            localStorage.setItem('token',null)
            localStorage.setItem('nombre',null)

        },
        Vericacion_sesion(){
            console.log("funciono")
            fetch(this.ruta,{
                    method: 'GET',
                    mode: 'cors',
                    headers:{
                        'Accept':'application/json',
                        'Content-type':'application/json',
                        'Authorization': 'Bearer '+localStorage.getItem('token')
                    }
            })
            .then( res => res.json())
            .then(data=> {
               if(data.Error){//condicion q valida si la petcion retorna un JSON con valor 'Error' si es asi es una validacion de token
                   this.estado=data.Error.message
                   //alert(this.estado)
                   this.logout()
                   window.location.href = '/login'
               }else{

                    console.log(data)
               }
            })
            .catch(e =>{
                console.log(e);
            })

        }

    },
   
}
</script>

