import Vue from 'vue';
import App from './App.vue';
import store from './store';

import Highcharts from 'highcharts';
import exportingHC from 'highcharts/modules/exporting';
import exportDataHC from 'highcharts/modules/export-data';
import HighchartsVue from 'highcharts-vue';
import stockInit from 'highcharts/modules/stock';

exportingHC(Highcharts);
exportDataHC(Highcharts);
(function (H) {
  H.addEvent(H.Chart, 'render', function () {
    if (this.dataTableDiv) {
      this.dataTableDiv.innerHTML = this.getTable();
    }
  });
})(Highcharts);
stockInit(Highcharts);
Vue.use(HighchartsVue);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
