<template>
  <div v-if="estado===''">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <br />
          <div>
            <b-alert
              :show="dismissCountDown"
              dismissible
              :variant="mensaje.color"
              @dismissed="dismissCountDown=0"
              @dismiss-count-down="countDownChanged"
              class="text-center"
            >{{mensaje.texto}}</b-alert>
          </div>
          <br />
          <br />
          <div class="card-header" v-if="consultar==='falsee'">
            <h3 class="mx-auto">Registrar un nuevo Empleado</h3>
          </div>
          <div class="card-body">
            <div class="col-md-8 mx-auto">
              <form @submit.prevent="AgregarEmpleado()" v-if="consultar==='falsee'">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Cedula</label>
                      <input
                        type="text"
                        required="required"
                        class="form-control"
                        placeholder="Cedula"
                        v-model="datos.CEDULA"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Nombre</label>
                      <input
                        type="text"
                        required="required"
                        class="form-control"
                        placeholder="Nombre"
                        v-model="datos.NOMBRE"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Apellido</label>
                      <input
                        type="text"
                        required="required"
                        class="form-control"
                        placeholder="Apellido"
                        v-model="datos.APELLIDO"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Telefono</label>
                      <input
                        type="text"
                        required="required"
                        class="form-control"
                        placeholder="Telefono"
                        v-model="datos.TELEFONO"
                      />
                    </div>
                  </div>
                  </div>
                  <div class="row">
                  <div class="col-md-8 mx-auto">
                    <div class="form-group">
                      <label>Sueldo</label>
                      <input
                        type="text"
                        required="required"
                        class="form-control"
                        placeholder="Sueldo"
                        v-model="datos.SUELDO"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-12 text-center">
                  <b-button type="submit" class="my-4 btn-success center-block">Agregar</b-button>
                   <b-button type="button" @click="consultar='true'" style="margin-left:5%;" class="my-4 btn-info center-block">Consultar</b-button>
                </div>
              </form>
              </div>
              </div>



               <div class="card-header" v-if="editar==='true'">
            <h3 class="mx-auto">Actualizar Empleado</h3>
          </div>
          <div class="card-body">
            <div class="col-md-8 mx-auto">
              <div  v-if="editar==='true'">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Cedula</label>
                      <input
                        type="text"
                        required="required"
                        class="form-control"
                        placeholder="Cedula"
                        v-model="EmpleadoID.CEDULA"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Nombre</label>
                      <input
                        type="text"
                        required="required"
                        class="form-control"
                        placeholder="Nombre"
                        v-model="EmpleadoID.NOMBRE"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Apellido</label>
                      <input
                        type="text"
                        required="required"
                        class="form-control"
                        placeholder="Apellido"
                        v-model="EmpleadoID.APELLIDO"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Telefono</label>
                      <input
                        type="text"
                        required="required"
                        class="form-control"
                        placeholder="Telefono"
                        v-model="EmpleadoID.TELEFONO"
                      />
                    </div>
                  </div>
                  </div>
                  <div class="row">
                  <div class="col-md-8 mx-auto">
                    <div class="form-group">
                      <label>Sueldo</label>
                      <input
                        type="text"
                        required="required"
                        class="form-control"
                        placeholder="Sueldo"
                        v-model="EmpleadoID.SUELDO"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-12 text-center">
                  <b-button
                type="submit"
                @click="ActualizarEmpleado()"
                class="my-4 btn-info center-block"
              >Actualizar</b-button>
              <b-button
                type="submit"
                @click="editar='false',consultar='falsee',consulta='false'"
                style="margin-left:5%"
                class="my-4 btn-second center-block"
              >cancelar</b-button>
                </div>
              </div>






               <div class="card-header" v-if="consultar==='true'">
                  <h3 class="mx-auto">Consultar Empleado</h3>
                </div>
                <div class="row" v-if="consultar==='true'">
                  <div class="col-md-12"></div>
                  <div class="col-md-6 mx-auto">
                    <div class="form-group">
                      <input
                        type="text"
                        required="required"
                        class="form-control"
                        placeholder="Cedula - Nombre - Apellido"
                        v-model="parametro"
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <b-button
                        @click="ConsultarEmpleado()"
                        variant="primary"
                        class="btn-info"
                      >Buscar</b-button>
                    </div>
                  </div>
                </div>
                 <div v-if="consulta==='true'">
              <div class="col-md-12 mx-auto">
                <div class="card-header">
                  <h3 class="mx-auto">Resultado de Busqueda</h3>
                </div>
                <br />
                <br />
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Cedula</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Apellido</th>
                      <th scope="col">Accion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in Empleado" :key="index">
                      <th scope="row">{{item.CEDULA}}</th>
                      <td>{{item.NOMBRE}}</td>
                      <td>{{item.APELLIDO}}</td>
                      <td>
                        <div class="table-actions">
                          <div class="col-md-12 text-center" style="margin-left: -26%;">
                            <b-button
                              @click="ConsultarEmpleadoID(item.CEDULA)"
                              class="btn-info ik ik-edit-2"
                            ></b-button>
                            <b-button
                              @click="EliminarEmpleadoID(item.CEDULA)"
                              style="margin-left:2%;"
                              class="btn-danger ik ik-trash-2"
                            ></b-button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div v-if="consulta==='false'">
              <br />
              <br />
              <br />
              <br />
               </div>
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruta: "http://localhost:3000/api/Empleado/", //Ruta de la API a la cuan se envian las peticiones
      mensaje: { color: "success", texto: "Mensaje" }, //mensaje por defecto alerta
      dismissSecs: 5, //Parametros de la alerta
      dismissCountDown: 0, //Parametros de la alerta
      editar:'false',
            EmpleadoID:"{}",
      Empleado: [],
      parametro:'',
      datos: {
        CEDULA: "",
        NOMBRE: "",
        APELLIDO: "",
        SUELDO: "",
        TELEFONO: ""
      }, //datos para agregar un usuario asociados al vmodel delos campos agregar
      consultar:'falsee',
      consulta:'false',
      MaquinariaID: {},
      estado: "" //estado para motrar la alerta
    };
  },
  created() {
    // this.axios.defaults.headers.common['Authorization'] = `Bearer 1111`;
  },
  methods: {
    AgregarEmpleado() {
      fetch(this.ruta, {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.datos)
      })
        .then(res => res.json())
        .then(data => {
          if (data.Error) {
            //condicion q valida si la petcion retorna un JSON con valor 'Error' si es asi es una validacion de token
            this.estado = data.Error.message;
            //alert(this.estado)
            this.tokenInvalido();
          } else {
            //console.log(data);
            this.mensaje.color = "success";
            this.mensaje.texto = data.message;
            this.showAlert();
          }
        })
        .catch(e => {
          console.log(e);
          this.mensaje.color = "danger";
          this.mensaje.texto = e.response.data.message;
          this.showAlert();
        });
    },
    
    ConsultarEmpleado() {
      
      if (this.parametro === "") {
        this.consulta = "false";
      } else {
        fetch(this.ruta + `/${this.parametro}`, {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            Accept: "application/json",
            "Content-type": "application/json",
          }
        })
          .then(res => res.json())
          .then(data => {
            if (data.Error) {
              //condicion q valida si la petcion retorna un JSON con valor 'Error' si es asi es una validacion de token
              this.estado = data.Error.message;
              //alert(this.estado)
              this.tokenInvalido();
            } else {

              this.Empleado = data;
            }
          })
          .catch(e => {
            console.log(e);
            this.mensaje.color = "danger";
            this.mensaje.texto = e.response.data.message;
            this.showAlert();
          });

        this.consulta = "true";
      }
    },
    ConsultarEmpleadoID(Codigo) {
      this.parametro='';
      this.editar = "true";
      this.consultar = "false";
      fetch(this.ruta + `/${Codigo}`, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.Error) {
            //condicion q valida si la petcion retorna un JSON con valor 'Error' si es asi es una validacion de token
            this.estado = data.Error.message;
            // alert(this.estado)
            this.tokenInvalido();
          } else {
            this.EmpleadoID = data[0];
            console.log(this.MaquinariaID)
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    ActualizarEmpleado() {
      // console.log(JSON.stringify(this.UsuarioID));
      
      fetch(this.ruta + "/" + this.EmpleadoID.CEDULA, {
        method: "PUT",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.EmpleadoID)
      })
        .then(res => res.json())
        .then(data => {
          if (data.Error) {
            //condicion q valida si la petcion retorna un JSON con valor 'Error' si es asi es una validacion de token
            this.estado = data.Error.message;
            //alert(this.estado)
            this.tokenInvalido();
          } else {
            //console.log(data);
            this.mensaje.color = "success";
            this.mensaje.texto = data.message;
            this.showAlert();
            this.editar = "false";
          }
        })
        .catch(e => {
          console.log(e);
          this.mensaje.color = "danger";
          this.mensaje.texto = e.response.data.message;
          this.showAlert();
          this.editar = "false";
        });
        this.editar='false',
        this.consultar='falsee',
      this.consulta='false'
    },
    EliminarEmpleadoID(codigo) {
      fetch(this.ruta + "/" + codigo, {
        method: "DELETE",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.Error) {
            //condicion q valida si la petcion retorna un JSON con valor 'Error' si es asi es una validacion de token
            this.estado = data.Error.message;
            //alert(this.estado)
            this.tokenInvalido();
          } else {

            this.mensaje.color = "success";
            this.mensaje.texto = data.message;
            // this.showAlert();
            this.showAlert();
            this.editar = "false";
          }
        })
        .catch(e => {

          this.mensaje.color = "danger";
          this.mensaje.texto = e.response.data.message;
          this.showAlert();
          this.editar = "false";
        });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    tokenInvalido() {
      window.location.href = "/login";
      localStorage.setItem("token", null);
      localStorage.setItem("nombre", null);
    }
  }
};
</script>