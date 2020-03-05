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
          <div class="card-header">
            <h3 class="mx-auto">Registrar una nueva Motocicleta</h3>
          </div>
          <div class="card-body">
            <div class="col-md-8 mx-auto">
              <form @submit.prevent="AgregarMoto()">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Placa</label>
                      <input
                        type="text"
                        required="required"
                        class="form-control"
                        placeholder="Placa"
                        v-model="datos.PLACA"
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
                      <label>Modelo</label>
                      <input
                        type="text"
                        required="required"
                        class="form-control"
                        placeholder="Modelo"
                        v-model="datos.MODELO"
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
                        placeholder="Cliente"
                        v-model="ClienteSeleccionado"
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
                        data-target="#Cliente"
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
          <div class="modal-body">
            <div>
              <br><br>
                <div class="row">
                  <div class="col-md-4"></div>
                  <div class="col-md-3">
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
                      <b-button  @click="ConsultarCliente()" variant="primary" class="btn-info">Buscar</b-button>
                    </div>
                  </div>
                </div>

            </div>
            <div v-if="consulta==='true'">
              <div class="col-md-10 mx-auto">
                <br><br>
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
                        <b-button
                          @click="SeleccionCliente(item.CEDULA,item.NOMBRE,item.APELLIDO)"
                          class="btn- btn-sm mx-2"
                        >Seleccionar</b-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
            <div v-if="consulta==='false'">
              <br><br><br><br>
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
      rutaC: "http://localhost:3000/api/cliente/", //Ruta de la API a la cuan se envian las peticiones
      rutaM: "http://localhost:3000/api/moto/", //Ruta de la API a la cuan se envian las peticiones
      Cliente: [], //Arreglo para obtener clientes de la
      consulta: "false",
      parametro: "",
      ClienteSeleccionado:"",
      mensaje: { color: "success", texto: "Mensaje" }, //mensaje por defecto alerta
      dismissSecs: 5, //Parametros de la alerta
      dismissCountDown: 0, //Parametros de la alerta
      datos: {
        PLACA: "",
        MARCA: "",
        TIPO: "",
        MODELO: "",
        FK_CLIENTE: ""
      }, //datos para agregar un usuario asociados al vmodel delos campos agregar

      estado: "" //estado para motrar la alerta
    };
  },
  created() {
    // this.axios.defaults.headers.common['Authorization'] = `Bearer 1111`;
  },
  methods: {
    AgregarMoto() {
      fetch(this.rutaM, {
        method: "POST",
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
          }
        })
        .catch(e => {
          console.log(e);
          this.mensaje.color = "danger";
          this.mensaje.texto = e.response.data.message;
          this.showAlert();
        });
    },
    ConsultarCliente(){
      if(this.parametro===""){
        this.consulta="false"
      }else{
        fetch(this.rutaC + `/${this.parametro}`, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
          "Content-type": "application/json",
          RolSeleccionado: localStorage.getItem("sessionrol")
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
          this.Cliente = data;
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
    SeleccionCliente(cedula,nombre,apellido){
      this.ClienteSeleccionado=nombre+" "+apellido;
      this.datos.FK_CLIENTE=cedula;
      this.consulta="false";
      $("#Cliente").modal("hide")
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