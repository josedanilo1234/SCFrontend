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
            <h3 class="mx-auto">Actualizar Articulo</h3>
          </div>
          <div class="col-md-8 mx-auto" v-if="editar==='true'">
            <div>
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
                    <label>Cantidad</label>
                    <input
                      type="text"
                      required="required"
                      class="form-control"
                      placeholder="Cantidad"
                      v-model="datos.CANTIDAD"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Tipo</label>
                    <input
                      type="text"
                      required="required"
                      class="form-control"
                      placeholder="Tipo"
                      v-model="datos.TIPO"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Marca</label>
                    <input
                      type="text"
                      required="required"
                      class="form-control"
                      placeholder="Marca"
                      v-model="datos.MARCA"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-8 mx-auto">
                  <div class="form-group">
                    <label>Valor</label>
                    <input
                      type="text"
                      required="required"
                      class="form-control"
                      placeholder="Valor"
                      v-model="datos.VALOR"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      required="required"
                      class="form-control"
                      placeholder="Ubicacion"
                      v-model="UbicacionSeleccionado"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-md-4 mx-auto">
                  <div class="form-group">
                    <b-button
                      block
                      variant="primary"
                      class="btn-info center-block"
                      data-toggle="modal"
                      data-target="#Ubicacion"
                    >Consultar</b-button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12 text-center">
              <b-button
                type="submit"
                @click="ActualizarArticulo()"
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
            <h3 class="mx-auto">Consultar Articulo</h3>
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
                        placeholder="Codigo - Nombre"
                        v-model="parametro"
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <b-button
                        @click="ConsultarArticulo()"
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
                      <th scope="col">Nombre</th>
                      <th scope="col">Cantidad</th>
                      <th scope="col">Tipo</th>
                      <th scope="col">Marca</th>
                      <th scope="col">Accion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in Articulo" :key="index">
                      <th scope="row">{{item.NOMBRE}}</th>
                      <td>{{item.CANTIDAD}}</td>
                      <td>{{item.TIPO}}</td>
                      <td>{{item.MARCA}}</td>
                      <td>
                        <div class="table-actions">
                          <div class="col-md-12 text-center" style="margin-left: -26%;">
                            <b-button
                              @click="ConsultarArticuloID(item.CODIGO)"
                              class="btn-info ik ik-edit-2"
                            ></b-button>
                            <b-button
                              @click="EliminarArticuloID(item.CODIGO)"
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
      id="Ubicacion"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Consultar Ubicacion</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div>
              <br />
              <br />
              <div class="row">
                <div class="col-md-4"></div>
                <div class="col-md-3">
                  <div class="form-group">
                    <input
                      type="text"
                      required="required"
                      class="form-control"
                      placeholder="Nombre-Estante"
                      v-model="parametro"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <b-button
                      @click="ConsultarUbicacion()"
                      variant="primary"
                      class="btn-info"
                    >Buscar</b-button>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="consulta==='true'">
              <div class="col-md-8 mx-auto">
                <br />
                <br />
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Codigo</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Estante</th>
                      <th scope="col">Accion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in Ubicacion" :key="index">
                      <th scope="row">{{item.CODIGO}}</th>
                      <td>{{item.NOMBRE}}</td>
                      <td>{{item.ESTANTE}}</td>
                      <td>
                        <b-button
                          @click="SeleccionUbicacion(item.CODIGO,item.NOMBRE,item.ESTANTE)"
                          class="btn- btn-sm mx-2"
                        >Seleccionar</b-button>
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
      rutaA: "http://localhost:3000/api/articulo/", //Ruta de la API a la cuan se envian las peticiones
      rutaU: "http://localhost:3000/api/ubicacion/", //Ruta de la API a la cuan se envian las peticiones
      Articulo: [], //Arreglo para obtener clientes de la
      Ubicacion: [], //Arreglo para obtener clientes de la
      consulta: "false",
      editar: "false",
      parametro: "",
      ClienteSeleccionado: "",
      mensaje: { color: "success", texto: "Mensaje" }, //mensaje por defecto alerta
      dismissSecs: 5, //Parametros de la alerta
      dismissCountDown: 0, //Parametros de la alerta
      ArticuloID: {},
      datos: {
          CODIGO: "",
        NOMBRE: "",
        CANTIDAD: "",
        TIPO: "",
        MARCA: ""
      },
      //datos para agregar un usuario asociados al vmodel delos campos agregar
      estado: "" //estado para motrar la alerta
    };
  },
  created() {
    // this.axios.defaults.headers.common['Authorization'] = `Bearer 1111`;
  },
  methods: {
    ConsultarArticulo() {
      if (this.parametro === "") {
        this.consulta = "false";
      } else {
        fetch(this.rutaA + `/${this.parametro}`, {
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
              this.Articulo = data;
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
    ConsultarArticuloID() {

      if (this.parametro === "") {
        this.consulta = "false";
         this.editar = "true";
      } else {
        fetch(this.rutaA + `/${this.parametro}`, {
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
              this.Articulo = data;
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
    ConsultarArticuloID(cedula) {
      this.editar = "true";
      //this.consulta = "false";
      fetch(this.rutaA + `/${cedula}`, {
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
            this.datos = data[0];
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    ActualizarArticulo() {
      // console.log(JSON.stringify(this.UsuarioID));
      fetch(this.rutaA + "/" + this.datos.CODIGO, {
        method: "PUT",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
          "Content-type": "application/json",
          RolSeleccionado: localStorage.getItem("sessionrol")
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
      (this.consulta = "false"), (this.editar = "false"), (this.parametro = "");
    },
   EliminarArticuloID(codigo) {
      fetch(this.rutaA + "/" + codigo, {
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
      (this.consulta = "false"), (this.editar = "false"), (this.parametro = "");
    },
    SeleccionCliente(Codigo,Nombre) {
      this.ClienteSeleccionado = nombre;
      this.datos.FK_CLIENTE = codigo;
      this.consulta = "false";
      $("#Articulo").modal("hide");
    },
    ConsultarUbicacion(){
      if(this.parametro===""){
        this.consulta="false"
      }else{
        fetch(this.rutaU + `/${this.parametro}`, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
          "Content-type": "application/json",
        },
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
          this.Ubicacion = data;
          }
        })
        .catch(e => {
          console.log(e);
          this.mensaje.color = "danger";
          this.mensaje.texto = e.response.data.message;
          this.showAlert();

        });

        this.consulta="true"
      }
      


    },
    
    SeleccionUbicacion(codigo,nombre,estante){
      this.UbicacionSeleccionado=nombre+" - "+estante;
      this.datos.FK_UBICACION=codigo;
      this.consulta="false";
      $("#Ubicacion").modal("hide")
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