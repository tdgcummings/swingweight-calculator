/* jshint multistr: true */
(function(swScale) { "use strict";
// IIFE Start

Vue.component('sw-club', {
  template: '\
    <div class="form-group columns">\
      <div class="column col-3">\
        <input v-model="clubName" class="form-input" type="text" placeholder="5 iron">\
      </div>\
      <div class="column col-3">\
        <label class="form-label">{{ clubSw }}</label>\
      </div>\
      <div class="column col-3">\
        <input v-model.number="clubWeight" class="form-input" type="text" placeholder="384">\
      </div>\
      <div class="column col-3">\
        <input v-model.number="clubBalPnt" class="form-input" type="text" placeholder="29.65">\
      </div>\
    </div>',
  data: function() {
    return {
      message: 'Hello Vue!',
      clubName: '',
      clubWeight: '',
      clubBalPnt: ''
    };
  },
  computed: {
    clubSw: function() {
      var finalSw;
      finalSw = this.clubWeight * (this.clubBalPnt - 14);
      finalSw = (finalSw * 0.03528 - 143.5) / 1.75;
      
      finalSw = Math.round(finalSw * 10) / 10;
      
      for (var i = 0; i < swScale.length; i++) {
        if (swScale[i][0] === finalSw ) {
          return swScale[i][1];
        }
      }
      
      if (!this.clubWeight || !this.clubBalPnt) {
        return 'Please enter all fields';
      }
      
      return 'Error with values entered';
    }
  },
  methods: {
  }
});

var vm = new Vue({ /* jshint ignore:line */
  el: '#app',
  data: {
    swRows: 5,
    isActive: false
  },
  computed: {
  },
  methods: {
    addRow: function() {
      this.swRows += 1;
      this.$refs.addRow.blur();
    },
    deleteRow: function() {
      if (this.swRows > 1) {
        this.swRows -= 1;
      }
      this.$refs.deleteRow.blur();
    }
  }
});
  
// IIFE End
})(window.swScale);