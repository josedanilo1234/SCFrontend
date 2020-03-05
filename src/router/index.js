import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../views/Home/Index/Index.vue'
import Home from '../views/Home/Home.vue'
import About from '../views/Home/About.vue'
import Login from '../views/Home/Login.vue'

import Dashboard from '../views//Dashboard/Index/Index.vue'
import Dashboard_index from '../views/Dashboard/index.vue'

import Cliente_Consultar from '../views/Dashboard/Cliente/Consultar.vue'
import Cliente_Agregar from '../views/Dashboard/Cliente/Agregar.vue'

import Moto_consultar from '../views/Dashboard/Moto/Consultar.vue'
import Moto_agregar from '../views/Dashboard/Moto/Agregar.vue'

import Servicio_consultar from '../views/Dashboard/Servicio/Consultar.vue'
import Servicio_agregar  from '../views/Dashboard/Servicio/Agregar.vue'


import Articulo_agregar from '../views/Dashboard/Articulo/Agregar.vue'
import Articulo_consultar from '../views/Dashboard/Articulo/Consultar.vue'


import Maquinaria_consultar from '../views/Dashboard/Maquinaria/Consultar.vue'
import Maquinaria_agregar from '../views/Dashboard/Maquinaria/Agregar.vue'

import Empleado_empleado from '../views/Dashboard/Empleado/Empleado.vue'
import Empleado_usuario from '../views/Dashboard/Empleado/Usuario.vue'

import plantilla from '../views/Dashboard/Index/plantilla.vue'
Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: '',
    component: Index,
    children:[
      {
        path: '/',
        name: 'Home',
        component: Login
      },
      {
        path: '/about',
        name: 'about',
        component: About
      },
      {
        path: '/login',
        name: 'login',
        component: Login
      }
    ]
  },
  {
    path: '/dashboard',
    name: '',
    component: Dashboard,
    children:[
      {
        path: '/',
        name: 'dashboard_index',
        component: Dashboard_index
      },
      {
        path: '/dashboard/Cliente/Consultar',
        name: 'Cliente_Consultar',
        component: Cliente_Consultar
      },
      {
        path: '/dashboard/Cliente/agregar',
        name: 'Cliente_Agregar',
        component: Cliente_Agregar
      },
      {
        path: '/dashboard/Moto/consultar',
        name: 'Moto_consultar',
        component: Moto_consultar
      },
      {
        path: '/dashboard/Moto/agregar',
        name: 'Moto_agregar',
        component: Moto_agregar
      }, 
      {
        path: '/dashboard/Servicio/consultar',
        name: 'Servicio_consultar',
        component: Servicio_consultar
      },
      {
        path: '/dashboard/Servicio/agregar',
        name: 'Servicio_agregar',
        component: Servicio_agregar
      },
      {
        path: '/dashboard/Articulo/agregar',
        name: 'Articulo_agregar',
        component: Articulo_agregar
      },
      {
        path: '/dashboard/Articulo/consultar',
        name: 'Articulo_consultar',
        component: Articulo_consultar
      },
      {
        path: '/dashboard/Maquinaria/consultar',
        name: 'Maquinaria_consultar',
        component: Maquinaria_consultar
      },
      {
        path: '/dashboard/Maquinaria/agregar',
        name: 'Maquinaria_agregar',
        component: Maquinaria_agregar
      },
      {
        path: '/dashboard/empleado/empleado',
        name: 'empleado_empleado',
        component: Empleado_empleado
      },
      {
        path: '/dashboard/empleado/usuario',
        name: 'empleado_usuario',
        component: Empleado_usuario
      },
      {
        path: '/dashboard/plantilla',
        name: 'plantilla',
        component: plantilla
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
