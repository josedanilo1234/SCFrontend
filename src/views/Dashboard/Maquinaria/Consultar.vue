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
            <h3 class="mx-auto">Actualizar Maquinaria</h3>
          </div>
          <div class="col-md-8 mx-auto" v-if="editar==='true'">
            <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Nombre</label>
                      <input
                        type="text"
                        required="required"
                        class="form-control"
                        placeholder="Nombre"
                        v-model="MaquinariaID.NOMBRE"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Tipo</label>
                      <input
                        type="text"
                        required="required"
                        class="form-control"
                        placeholder="Tipo"
                        v-model="MaquinariaID.TIPO"
                      />
                    </div>
                  </div>
                </div>
            <div class="col-md-12 text-center">
              <b-button
                type="submit"
                @click="ActualizarMaquinaria()"
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
            <h3 class="mx-auto">Consultar Maquinaria</h3>
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
                        placeholder="Nombre - Tipo"
                        v-model="parametro"
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <b-button
                        @click="ConsultarMaquinaria()"
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
                      <th scope="col">Codigo</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Tipo</th>
                      <th scope="col">Accion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in Maquinaria" :key="index">
                      <th scope="row">{{item.CODIGO}}</th>
                      <td>{{item.NOMBRE}}</td>
                      <td>{{item.TIPO}}</td>
                      <td>
                        <div class="table-actions">
                          <div class="col-md-12 text-center" style="margin-left: -26%;">
                            <b-button
                              @click="ConsultarMaquinariaID(item.CODIGO)"
                              class="btn-info ik ik-edit-2"
                            ></b-button>
                            <b-button
                              @click="EliminarMaquinariaID(item.CODIGO)"
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
    <!-- Modal -->
    <div
      class="modal fade"
      id="Cliente"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Consultar Cliente</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruta: "http://localhost:3000/api/maquinaria/", //Ruta de la API a la cuan se envian las peticiones
      Maquinaria: [], //Arreglo para obtener clientes de la
      consulta: "false",
      editar: "false",
      parametro: "",
      MaquinariaSeleccioando: "",
      mensaje: { color: "success", texto: "Mensaje" }, //mensaje por defecto alerta
      dismissSecs: 5, //Parametros de la alerta
      dismissCountDown: 0, //Parametros de la alerta
      MaquinariaID: {},
      datos: {
        CODIGO: "",
        NOMBRE: "",
        TIPO: ""
      },
      //datos para agregar un usuario asociados al vmodel delos campos agregar
      estado: "" //estado para motrar la alerta
    };
  },
  created() {
    // this.axios.defaults.headers.common['Authorization'] = `Bearer 1111`;
  },
  methods: {
    ConsultarMaquinaria () {
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

              this.Maquinaria = data;
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
    ConsultarMaquinariaID(Codigo) {
      this.editar = "true";
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
            this.MaquinariaID = data[0];
            console.log(this.MaquinariaID)
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    ActualizarMaquinaria() {
      // console.log(JSON.stringify(this.UsuarioID));
      fetch(this.ruta + "/" + this.MaquinariaID.CODIGO, {
        method: "PUT",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.MaquinariaID)
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
            this.ConsultarMaquinaria();
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
    EliminarMaquinariaID(codigo) {
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
            this.ConsultarMaquinaria();
            this.editar = "false";
          }
        })
        .catch(e => {

          this.mensaje.color = "danger";
          this.mensaje.texto = e.response.data.message;
          this.showAlert();
          this.ConsultarMaquinaria();
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