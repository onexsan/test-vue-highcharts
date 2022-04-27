<template>
  <div class="chart-container" v-if="!isLoading">
    <highcharts
      class="hc"
      :constructor-type="'stockChart'"
      :options="chartOptions"
      ref="chart"
    ></highcharts>
  </div>
  <div v-else>
    <loader />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loader from './Loader';

export default {
  components: {
    Loader,
  },
  data() {
    return {
      chartOptions: {
        series: [],
        xAxis: {
          type: 'datetime',
        },
        title: {
          text: 'Data from table',
        },
        exporting: {
          csv: {
            dateFormat: '%A, %b %d, %Y',
          },
          showTable: true,
          tableCaption: false,
        },
      },
    };
  },
  computed: {
    ...mapGetters(['allEntities', 'isLoading']),
  },
  async created() {
    await this.$store.dispatch('fetchFullData');
    this.addDataToTheChart();
  },
  methods: {
    addDataToTheChart() {
      if (this.allEntities) {
        this.chartOptions.series = this.allEntities;
      }
    },
  },
};
</script>

<style lang="scss">
.chart-container {
  margin: 0 auto;
  padding: 0px 5px;

  .hc {
    width: 100%;
  }
}

.highcharts-data-table {
  @media screen and (max-width: 420px) {
    width: 95vw;
    max-height: 30vh;
    overflow: scroll;
    font-size: 12px;

    &::-webkit-scrollbar {
      height: 5px;
      width: 5px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
      background: #888;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
  table {
    width: 100%;
    font-family: Verdana, sans-serif;
    border-collapse: collapse;
    border: 1px solid #ebebeb;
    margin: 10px auto;

    tbody tr:nth-child(even),
    thead tr {
      background: #f8f8f8;

      &:hover {
        background: #f1f7ff;
      }

      th::first-letter {
        text-transform: uppercase;
      }
    }

    td,
    th {
      padding: 0.5em;
      text-align: center;
    }
  }
}
</style>
