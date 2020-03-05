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
          <div class="card-header" v-if="editar==='true'">
            <h3 class="mx-auto">Actualizar Cliente</h3>
          </div>
          <div class="col-md-8 mx-auto" v-if="editar==='true'">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Cedula</label>
                  <input
                    type="text"
                    required="required"
                    class="form-control"
                    placeholder="Cedula"
                    v-model="ClienteID.CEDULA"
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
                    v-model="ClienteID.NOMBRE"
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
                    v-model="ClienteID.APELLIDO"
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
                    v-model="ClienteID.TELEFONO"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-12 text-center">
              <b-button
                type="submit"
                @click="ActualizarCliente()"
                class="my-4 btn-info center-block"
              >Actualizar</b-button>
              <b-button
                type="submit"
                @click="editar='false'"
                style="margin-left:5%"
                class="my-4 btn-second center-block"
              >cancelar</b-button>
            </div>
          </div>
          <div class="card-header" v-if="editar==='false'">
            <h3 class="mx-auto">Consultar Cliente</h3>
          </div>
          <div class="card-body">
            <div class="col-md-8 mx-auto">
              <div>
                <br />
                <br />
                <div class="row" v-if="editar==='false'">
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
                        @click="ConsultarCliente()"
                        variant="primary"
                        class="btn-info"
                      >Buscar</b-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="consulta==='true'">
              <div class="col-md-8 mx-auto">
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
                      <th scope="col">Telefono</th>
                      <th scope="col">Accion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in Cliente" :key="index">
                      <th scope="row">{{item.CEDULA}}</th>
                      <td>{{item.NOMBRE}}</td>
                      <td>{{item.APELLIDO}}</td>
                      <td>{{item.TELEFONO}}</td>
                      <td>
                        <div class="table-actions">
                          <div class="col-md-12 text-center" style="margin-left: -26%;">
                            <b-button
                              @click="ConsultarClienteID(item.CEDULA)"
                              class="btn-info ik ik-edit-2"
                            ></b-button>
                            <b-button
                              @click="EliminarClienteID(item.CEDULA)"
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
</template>

<script>
export default {
  data() {
    return {
      rutaC: "http://localhost:3000/api/cliente/", //Ruta de la API a la cuan se envian las peticiones
      Cliente: [], //Arreglo para obtener clientes de la
      consulta: "false",
      editar: "false",
      parametro: "",
      ClienteSeleccionado: "",
      mensaje: { color: "success", texto: "Mensaje" }, //mensaje por defecto alerta
      dismissSecs: 5, //Parametros de la alerta
      dismissCountDown: 0, //Parametros de la alerta
      ClienteID: {},
      datos: {
        CEDULA: "",
        NOMBRE: "",
        APELLIDO: "",
        TELEFONO: ""
      },
      //datos para agregar un usuario asociados al vmodel delos campos agregar
      estado: "" //estado para motrar la alerta
    };
  },
  created() {
    // this.axios.defaults.headers.common['Authorization'] = `Bearer 1111`;
  },
  methods: {
    ConsultarCliente() {
      if (this.parametro === "") {
        this.consulta = "false";
      } else {
        fetch(this.rutaC + `/${this.parametro}`, {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            Accept: "application/json",
            "Content-type": "application/json",
            RolSeleccionado: localStorage.getItem("sessionrol")
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
              this.Cliente = data;
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
    ConsultarClienteID(cedula) {
      this.editar = "true";
      fetch(this.rutaC + `/${cedula}`, {
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
            this.ClienteID = data[0];
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    ActualizarCliente() {
      // console.log(JSON.stringify(this.UsuarioID));
      fetch(this.rutaC + "/" + this.ClienteID.CEDULA, {
        method: "PUT",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
          "Content-type": "application/json",
          RolSeleccionado: localStorage.getItem("sessionrol")
        },
        body: JSON.stringify(this.ClienteID)
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
            this.ConsultarCliente();
            this.editar = "false";
          }
        })
        .catch(e => {
          console.log(e);
          this.mensaje.color = "danger";
          this.mensaje.texto = e.response.data.message;
          this.showAlert();
          this.ConsultarCliente();
          this.editar = "false";
        });
    },
    EliminarClienteID(codigo) {
      fetch(this.rutaC + "/" + codigo, {
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
            //console.log(data);
            this.mensaje.color = "success";
            this.mensaje.texto = data.message;
            // this.showAlert();
            this.showAlert();
            this.ConsultarCliente();
            this.editar = "false";
          }
        })
        .catch(e => {
          console.log(e);
          this.mensaje.color = "danger";
          this.mensaje.texto = e.response.data.message;
          this.showAlert();
          this.ConsultarCliente();
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