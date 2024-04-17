import Vue from 'vue'
import VueRouter from 'vue-router'


import CheckoutPage from '@/pages/checkout/CheckoutPage.vue';
import HomePage from '@/pages/home/HomePage.vue';

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,

  routes: [
    {
      path: '/home',
      name: 'home',
      component:HomePage,
    },

    {
      path: '/checkout/:item',
      name: 'checkout',
      component:CheckoutPage,
      prop:true
    },

    {
      path: '*',
      redirect: 'home',
    },
  ],
});

// Antes de cada navegación, puedes agregar una comprobación
router.beforeEach((to, from, next) => {
  // Comprueba si la ruta a la que intentas navegar es diferente de la ruta actual
  if (to.path !== from.path) {
    next(); // Continúa con la navegación
  } else {
    // Evita la navegación redundante
    console.warn('NavigationDuplicated: Avoided redundant navigation to current location:', to.fullPath);
  }
});

export default router;