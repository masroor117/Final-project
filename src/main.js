import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'
// css for whole app
import './assets/scss/app.scss'
Vue.config.productionTip = false

// Firebase web app configuration 
var firebaseConfig = {
  apiKey: "AIzaSyCNC1zFUXM4I-Oi6LH-5a8jrNODo_ce2DY",
  authDomain: "entertainment-king.firebaseapp.com",
  projectId: "entertainment-king",
  storageBucket: "entertainment-king.appspot.com",
  messagingSenderId: "256671216325",
  appId: "1:256671216325:web:a9932838a365b4ffd076ac"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
