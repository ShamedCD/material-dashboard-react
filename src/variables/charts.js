// ##############################
// // // javascript library for creating charts
// #############################
require("./chartist.css");
require("chartist-plugin-tooltips");
var Chartist = require("chartist");
var CtAxisTitle = require("chartist-plugin-axistitle");

// ##############################
// // // variables used to create animation on charts
// #############################
var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;

// ##############################
// // // Top 3 supplies
// #############################

const topSuppliesChart = {
  options: {
    axisX: {
      showGrid: false,
    },
    low: 0,
    chartPadding: {
      top: 0,
      right: 5,
      bottom: 1,
      left: 0,
    },
    seriesBarDistance: 10,
    plugins: [
      CtAxisTitle({
        axisX: {
          axisTitle: "Mes",
          axisClass: "ct-axis-title",
          offset: {
            x: 0,
            y: 30,
          },
          textAnchor: "middle",
        },
        axisY: {
          axisTitle: "Pedidos",
          axisClass: "ct-axis-title",
          offset: {
            x: 0,
            y: -1,
          },
          flipTitle: false,
        },
      }),
      Chartist.plugins.tooltip(),
    ],
  },
  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          },
        },
      },
    ],
  ],
  animation: {
    draw: function (data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  },
};

// ##############################
// // // Purchases time
// #############################

const purchaseTimeChart = {
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0,
    }),
    low: 0,
    high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 2,
      left: 0,
    },
    plugins: [
      CtAxisTitle({
        axisX: {
          axisTitle: "Compra (clave)",
          axisClass: "ct-axis-label",
          offset: {
            x: 0,
            y: 30,
          },
          textAnchor: "middle",
        },
        axisY: {
          axisTitle: "Días",
          axisClass: "ct-axis-title",
          offset: {
            x: 0,
            y: -1,
          },
          flipTitle: false,
        },
      }),
    ],
  },
  // for animation
  animation: {
    draw: function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  },
};

// ##############################
// // // Purchases by Service
// #############################
const purchasesByServiceChart = {
  options: {
    labelInterpolationFnc: (value) => {
      return value + "%";
    },
    plugins: [
      Chartist.plugins.tooltip({
        tooltipFnc: (meta, value) => {
          return `<b>${meta} - ${value}%</b>`;
        },
      }),
    ],
  },
  responsiveOptions: [
    [
      "screen and (min-width: 640px)",
      {
        chartPadding: 30,
        labelOffset: 100,
        labelDirection: "explode",
        labelInterpolationFnc: function (value) {
          return value;
        },
      },
    ],
    [
      "screen and (min-width: 1024px)",
      {
        labelOffset: 80,
        chartPadding: 20,
      },
    ],
  ],
};

// ##############################
// // // Purchases by month
// #############################

const purchaseByMonthChart = {
  options: {
    // lineSmooth: Chartist.Interpolation.cardinal({
    //   tension: 0,
    // }),
    low: 0,
    // high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    showArea: true,
    showPoint: true,
    fullWidth: true,
    plugins: [Chartist.plugins.tooltip()],
  },
  animation: {
    draw: function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 2000 * data.index,
            dur: 2000,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      }
    },
  },
};

// ##############################
// // // Intakes time
// #############################

const intakeTimeChart = {
  options: {
    axisX: {
      showGrid: false,
    },
    low: 0,
    chartPadding: {
      top: 0,
      right: 5,
      bottom: 1,
      left: 0,
    },
    seriesBarDistance: 10,
    distributeSeries: true,
    plugins: [
      CtAxisTitle({
        axisX: {
          axisTitle: "Insumo",
          axisClass: "ct-axis-title",
          offset: {
            x: 0,
            y: 30,
          },
          textAnchor: "middle",
        },
        axisY: {
          axisTitle: "Comsumo por 50 unidades",
          axisClass: "ct-axis-title-consumo",
          offset: {
            x: 0,
            y: -1,
          },
          flipTitle: false,
        },
      }),
      Chartist.plugins.tooltip({
        tooltipFnc: (meta, value) => {
          return `<b>${meta}<br>${value} Días</b>`;
        },
      }),
    ],
  },
  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          },
        },
      },
    ],
  ],
  animation: {
    draw: function (data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  },
};

// ##############################
// // // Supply status
// #############################
const supplyStatusChart = {
  options: {
    labelInterpolationFnc: (value) => {
      return value + "%";
    },
    plugins: [
      Chartist.plugins.tooltip({
        tooltipFnc: (meta, value) => {
          return `<b>${meta} - ${value}%</b>`;
        },
      }),
    ],
  },
  responsiveOptions: [
    [
      "screen and (min-width: 640px)",
      {
        chartPadding: 30,
        labelOffset: 100,
        labelDirection: "explode",
        labelInterpolationFnc: function (value) {
          return value;
        },
      },
    ],
    [
      "screen and (min-width: 1024px)",
      {
        labelOffset: 80,
        chartPadding: 20,
      },
    ],
  ],
};

module.exports = {
  topSuppliesChart,
  purchaseTimeChart,
  purchasesByServiceChart,
  purchaseByMonthChart,
  intakeTimeChart,
  supplyStatusChart,
};
