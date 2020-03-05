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
          <div class="card-header">
            <h3 class="mx-auto">Registrar un Servicio</h3>
          </div>
          <div class="card-body">
            <div class="col-md-8 mx-auto">
              <form @submit.prevent="AgregarServicio()">
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
                      <label>FECHA</label>
                      <input
                        type="date"
                        required="required"
                        class="form-control"
                        placeholder="Fecha"
                        v-model="datos.FECHA_PROCEDIMIENTO"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Estado</label>
                      <input
                        type="text"
                        required="required"
                        class="form-control"
                        placeholder="Estado"
                        v-model="datos.ESTADO"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
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
                        placeholder="Empleado"
                        v-model="EmpleadoSeleccionado"
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
                        data-target="#Empleado"
                      >Consultar</b-button>
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
                        placeholder="Moto"
                        v-model="Motoseleccionado"
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
                        data-target="#Moto"
                      >Consultar</b-button>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 text-center">
                  <b-button type="submit" class="my-4 btn-success center-block">Agregar</b-button>
                </div>
              </form>
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="Moto"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Consultar Moto</h5>
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
                      placeholder="Placa"
                      v-model="parametroMoto"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <b-button @click="ConsultarMoto()" variant="primary" class="btn-info">Buscar</b-button>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="consulta==='true'">
              <div class="col-md-10 mx-auto">
                <br />
                <br />
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Placa</th>
                      <th scope="col">Marca</th>
                      <th scope="col">Tipo</th>
                      <th scope="col">Modelo</th>
                      <th scope="col">Accion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in Moto" :key="index">
                      <th scope="row">{{item.PLACA}}</th>
                      <td>{{item.MARCA}}</td>
                      <td>{{item.TIPO}}</td>
                      <td>{{item.MODELO}}</td>
                      <td>
                        <b-button
                          @click="SeleccionMoto(item.PLACA)"
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

    <!-- Modal -->
    <div
      class="modal fade"
      id="Empleado"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Consultar Empleado</h5>
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
                      placeholder="Cedula - Nombre - Apellido"
                      v-model="parametroEmpleado"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <b-button @click="ConsultarEmpleado()" variant="primary" class="btn-info">Buscar</b-button>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="consulta==='true'">
              <div class="col-md-10 mx-auto">
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
                    <tr v-for="(item, index) in Empleado" :key="index">
                      <th scope="row">{{item.CEDULA}}</th>
                      <td>{{item.NOMBRE}}</td>
                      <td>{{item.APELLIDO}}</td>
                      <td>{{item.TELEFONO}}</td>
                      <td>
                        <b-button
                          @click="SeleccionEmpleado(item.CEDULA,item.NOMBRE,item.APELLIDO)"
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
      rutaS: "http://localhost:3000/api/servicio/", //Ruta de la API a la cuan se envian las peticiones
      rutaE: "http://localhost:3000/api/Empleado/", //Ruta de la API a la cuan se envian las peticiones
      rutaM: "http://localhost:3000/api/moto/", //Ruta de la API a la cuan se envian las peticiones
      Empleado: [], //Arreglo para obtener clientes de la
      Moto: [], //Arreglo para obtener clientes de la
      consulta: "false",
      parametroMoto: "",
      parametroEmpleado: "",
      EmpleadoSeleccionado: "",
      Motoseleccionado: "",
      mensaje: { color: "success", texto: "Mensaje" }, //mensaje por defecto alerta
      dismissSecs: 5, //Parametros de la alerta
      dismissCountDown: 0, //Parametros de la alerta
      datos: {
        NOMBRE: "",
        FECHA_PROCEDIMIENTO: "",
        ESTADO: "",
        VALOR: "",
        FK_MOTO: "",
        FK_EMPLEADO: ""
      }, //datos para agregar un usuario asociados al vmodel delos campos agregar

      estado: "" //estado para motrar la alerta
    };
  },
  created() {
    // this.axios.defaults.headers.common['Authorization'] = `Bearer 1111`;
  },
  methods: {
    AgregarServicio() {
      fetch(this.rutaS, {
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
    ConsultarMoto() {
      if (this.parametroMoto === "") {
        this.consulta = "false";
      } else {
        fetch(this.rutaM + `/${this.parametroMoto}`, {
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
              this.Moto = data;
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
    SeleccionMoto(PLACA) {
      this.Motoseleccionado = PLACA;
      this.datos.FK_MOTO = PLACA;
      console.log(this.datos.FK_MOTO);
      this.consulta = "false";
      $("#Moto").modal("hide");
    },
    ConsultarEmpleado() {
      if (this.parametro === "") {
        this.consulta = "false";
      } else {
        fetch(this.rutaE + `/${this.parametroEmpleado}`, {
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
    SeleccionEmpleado(cedula, nombre, apellido) {
      this.EmpleadoSeleccionado = nombre + " " + apellido;
      this.datos.FK_EMPLEADO = cedula;
      this.consulta = "false";
      $("#Empleado").modal("hide");
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