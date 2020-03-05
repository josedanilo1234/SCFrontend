<template>
  <div class="about">
    <div class="auth-wrapper">
            <div class="container-fluid h-100">
                <div class="row flex-row h-100 bg-white">
                    <div class="col-xl-8 col-lg-6 col-md-5 p-0 d-md-block d-lg-block d-sm-none d-none">
                        <div class="lavalite-bg" :style="{ backgroundImage: 'url('  + require('../../content/img/auth/login-bg2.jpg') + ')' }">
                            <div class="lavalite-overlay"></div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-6 col-md-7 my-auto p-0">
                        <div class="authentication-form mx-auto">
                            <div class="logo-centered">
                                <a href="../index.html"><img src="../../content/src/img/logo1.png" style="width:130px; margin-left:-80%;" alt=""></a>
                            </div>
                            <h3>Inicie sesion</h3>
                            <p>Bienvenido!</p>
                            <form @submit.prevent="login()">
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Nombre de usuario" required="" ref="user">
                                    <i class="ik ik-user"></i>
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control" placeholder="Contraseña" required=""  ref="pass">
                                    <i class="ik ik-lock"></i>
                                </div>
                                <div class="row">
                                   
                                    <div class="col text-left">
                                        <a href="forgot-password.html">¿ Olvido su contraseña ?</a>
                                    </div>
                                </div>
                                <div class="sign-btn text-center">
                                    <button class="btn btn-theme" type="submit">Iniciar Sesion</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="ModalError" role="dialog" aria-labelledby="ModalErrorLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered modal-sm mt-0 mb-0" role="document">
                                <div class="modal-content">
                                    <div class="center-block">
                                        <h5 class="modal-title text-center" id="ModalErrorLabel" style="margin-top:6%;"> ERROR</h5>
                                    </div>
                                    <div class="modal-body text-center">
                                        <div style="font-size:14px;">
                                            <img class="img-responsive center-block" src="../../content/img/error.png" width="160 " height="160" alt="User" />
                                            <p>{{this.mensaje}} <br><br></p>
                                        </div>
                                        <div class="">
                                            <button type="button" class="btn waves-effect bg-red" data-dismiss="modal">Cerrar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

  </div>
</template>
<script>
export default {
   data(){
       return{
        ruta:'http://localhost:3000/api/login',
        mensaje:''
       }

   },
   methods: {
       login(){
           fetch(this.ruta,{
                    method: 'POST',
                    mode: 'cors',
                    headers:{
                        'Accept':'application/json',
                        'Content-type':'application/json'
                    },
                    body:`{"NOMBRE":"${this.$refs.user.value}","PASSWORD":"${this.$refs.pass.value}"}`
            })
            .then( res => res.json())
            .then(data=> {
                //console.log(data.token);
                if(data.token){
                    localStorage.setItem('token',data.token);

                    localStorage.setItem('nombre',data.NOMBRE+ ' '+data.APELLIDO)
                    window.location.href = '/dashboard'
                }else{
                    this.mensaje=data.message;
                    //console.log(message);
                    this.error();
                }


            })
       },
       error(){
                $(function () {
                    $("#ModalError").modal('show');
                });
                this.$refs.user.value=null;
                this.$refs.pass.value=null;
       }
   }
}
</script>