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
          <div class="card-header" v-if="agregar==='true'">
            <h3 class="mx-auto">Registrar una nuevo Usuario</h3>
          </div>
          <div class="card-body">
            <div class="col-md-8 mx-auto">
              <form @submit.prevent="AgregarUsuario()" v-if="agregar==='true'">
                <div class="row">
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
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Contraseña</label>
                      <input
                        type="password"
                        required="required"
                        class="form-control"
                        placeholder="Contraseña"
                        v-model="datos.PASSWORD"
                      />
                    </div>
                  </div>
                </div>

                <div class="col-md-12 text-center">
                  <b-button type="submit" class="my-4 btn-success center-block">Agregar</b-button>
                  <b-button
                    type="button"
                    @click="consultar='true',agregar='false'"
                    style="margin-left:5%;"
                    class="my-4 btn-info center-block"
                  >Consultar</b-button>
                </div>
              </form>

              <div class="card-header" v-if="editar==='true'">
                <h3 class="mx-auto">Actualizar Usuario</h3>
              </div>
              <div class="card-body" v-if="editar==='true'">
                <div class="col-md-8 mx-auto">
                  <div v-if="editar==='true'">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Nombre</label>
                          <input
                            type="text"
                            required="required"
                            class="form-control"
                            placeholder="Nombre"
                            v-model="UsuarioID.NOMBRE"
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Contraseña</label>
                          <input
                            type="password"
                            required="required"
                            class="form-control"
                            placeholder="Contraseña"
                            v-model="UsuarioID.PASSWORD"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12 text-center">
                      <b-button
                        type="submit"
                        @click="ActualizarUsuario()"
                        class="my-4 btn-info center-block"
                      >Actualizar</b-button>
                      <b-button
                        type="submit"
                        @click="consultar='false',editar='false',listar='false',agregar='true'"
                        style="margin-left:5%"
                        class="my-4 btn-second center-block"
                      >cancelar</b-button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-header" v-if="consultar==='true'">
                <h3 class="mx-auto">Consultar Usuario</h3>
              </div>
              <div v-if="consultar==='true'">
                <div class="row" v-if="consultar==='true'">
                  <div class="col-md-12"></div>
                  <div class="col-md-6 mx-auto">
                    <div class="form-group">
                      <input
                        type="text"
                        required="required"
                        class="form-control"
                        placeholder="Nombre de Usuario"
                        v-model="parametro"
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <b-button
                        @click="ConsultarUsuario()"
                        variant="primary"
                        class="btn-info"
                      >Buscar</b-button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="listar==='true'">
                <div class="col-md-10 mx-auto">
                  <div class="card-header">
                    <h3 class="mx-auto">Resultado de Busqueda</h3>
                  </div>
                  <br />
                  <br />
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Codigo</th>
                        <th scope="col">Nombre Usuario</th>
                        <th scope="col">Accion</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in Usuario" :key="index">
                        <th scope="row">{{item.CODIGO}}</th>
                        <td>{{item.NOMBRE}}</td>
                        <td>
                          <div class="table-actions">
                            <div class="col-md-12 text-center" style="margin-left: -26%;">
                              <b-button
                                @click="ConsultarUsuarioID(item.CODIGO)"
                                class="btn-info ik ik-edit-2"
                              ></b-button>
                              <b-button
                                @click="EliminarUsuarioID(item.CODIGO)"
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
      agregar: "true",
      consultar: "false",
      editar: "false",
      listar: "false",
      rutaE: "http://localhost:3000/api/empleado/", //Ruta de la API a la cuan se envian las peticiones
      rutaU: "http://localhost:3000/api/usuario/", //Ruta de la API a la cuan se envian las peticiones
      Empleado: [], //Arreglo para obtener clientes de la
      Usuario: [], //Arreglo para obtener clientes de la
      UsuarioID: "{}",
      parametro: "",
      mensaje: { color: "success", texto: "Mensaje" }, //mensaje por defecto alerta
      dismissSecs: 5, //Parametros de la alerta
      dismissCountDown: 0, //Parametros de la alerta
      datos: {
        NOMBRE: "",
        PASSWORD: "",
        FK_EMPLEADO: ""
      }, //datos para agregar un usuario asociados al vmodel delos campos agregar

      estado: "" //estado para motrar la alerta
    };
  },
  created() {
    // this.axios.defaults.headers.common['Authorization'] = `Bearer 1111`;
  },
  methods: {
    AgregarUsuario() {
      fetch(this.rutaU, {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
          "Content-type": "application/json"
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
    ConsultarUsuario() {
      this.listar = "true";
      this.agregar = "false";
      if (this.parametro === "") {
        this.consultar = "true";
      } else {
        fetch(this.rutaU + `/${this.parametro}`, {
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
              //alert(this.estado)
              this.tokenInvalido();
            } else {
              console.log(data);
              this.Usuario = data;
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
    ConsultarUsuarioID(Codigo) {
      this.parametro = "";
      this.editar = "true";
      this.consultar = "false";
      fetch(this.rutaU + `/${Codigo}`, {
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
            this.UsuarioID = data[0];
            this.UsuarioID.PASSWORD = "";
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    ActualizarUsuario() {
      // console.log(JSON.stringify(this.UsuarioID));

      fetch(this.rutaU + "/" + this.UsuarioID.CODIGO, {
        method: "PUT",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify(this.UsuarioID)
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
      this.consultar = "false";
      this.editar = "false";
      this.listar = "false";
      this.agregar = "true";
    },
    EliminarUsuarioID(codigo) {
      fetch(this.rutaU + "/" + codigo, {
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
      this.consultar = "false";
      this.editar = "false";
      this.listar = "false";
      this.agregar = "true";
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