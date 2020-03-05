<template>
  <div>
    <header class="default-header">
				<div style="padding-right: 15px;">
					<div class="header-wrap">
						<div class="header-top d-flex justify-content-between align-items-center">
							<div class="logo">
								<a href="#home"><img src="img/logo1.png" alt=""></a>
							</div>
							<div class="main-menubar d-flex align-items-center">
								<nav class="hide nav">
									<a href="/login">Home</a>
									<a href="/login">About</a>
									<a href="/login">Gallery</a>
									<a href="/login">Login</a>
									
								</nav>
								<div class="menu-bar"><span class="lnr lnr-menu"></span></div>
							</div>
						</div>
					</div>
				</div>
			</header>
			<!-- End Header Area -->
			<!-- start banner Area -->
			<section class="banner-area relative" id="home">			
				<router-view></router-view>
			</section>
    </div>

</template>

<style>
#Home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
window.jQuery = require('jquery')
window.$=window.jQuery= require('jquery')
import a from '../../../content/plugins/c3/prueba/prueba.css' 
import b from '../../../content/plugins/c3/prueba/jquery.sticky.js' 
export default {
	
}
</script>
