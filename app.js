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
      <div class="column col-2">\
        <input v-model.number="clubWeight" class="form-input" type="text" placeholder="384">\
      </div>\
      <div class="column col-2">\
        <input v-model.number="clubBalPnt" class="form-input" type="text" placeholder="29">\
      </div>\
      <div class="column col-2">\
        <input v-model.number="clubBalPntFrac" class="form-input" type="text" placeholder="4">\
      </div>\
    </div>',
  props: [
    'index',
  ],
  created: function() {
  },
  data: function() {
    return {
    };
  },
  computed: {
    clubSw: function() {
      var finalSw;
      finalSw = this.clubWeight * ( (this.clubBalPnt + (this.clubBalPntFrac / 16) ) - 14);
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
    },
    clubName: {
      get: function() {
        return this.$parent.swRows[this.index].clubName;
      },
      set: function(test) {
        this.$parent.swRows[this.index].clubName = test;
      },
    },
    clubWeight: {
      get: function() {
        return this.$parent.swRows[this.index].clubWeight;
      },
      set: function(test) {
        this.$parent.swRows[this.index].clubWeight = test;
      },
    },
    clubBalPnt: {
      get: function() {
        return this.$parent.swRows[this.index].clubBalPnt;
      },
      set: function(test) {
        this.$parent.swRows[this.index].clubBalPnt = test;
      },
    },
    clubBalPntFrac: {
      get: function() {
        return this.$parent.swRows[this.index].clubBalPntFrac;
      },
      set: function(test) {
        this.$parent.swRows[this.index].clubBalPntFrac = test;
      },
    },
  },
  methods: {
  }
});

var vm = new Vue({ /* jshint ignore:line */
  el: '#app',
  data: {
    swRows: [],
    isActive: false
  },
  mounted: function() {
    for (var i = 0; i < 5; i++) {
      this.createRow();
    }
  },
  computed: {
  },
  methods: {
    createRow: function() {
      var templateData = {
        clubName: '',
        clubWeight: '',
        clubBalPnt: '',
        clubBalPntFrac: ''
      };
      this.swRows.push(templateData);
    },
    addRow: function() {
      this.createRow();
      this.$refs.addRow.blur();
    },
    deleteRow: function() {
      if (this.swRows.length > 1) {
        this.swRows.pop();
      }
      this.$refs.deleteRow.blur();
    },
    saveData: function() {
      var a = document.createElement('a');
      a.style = 'display: none';
      var data = JSON.stringify({
        clubs: this.swRows,
      }, null, 2);
      var blob = new Blob([data], {type: 'application/json'});
      var url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'club-sw.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      this.$refs.saveData.blur();
    },
    loadData: function(ev) {
      // if (window.confirm("Are you sure, all unsaved data will be lost")) { return; }
      
      var reader = new FileReader();
    
      var readSuccess = function(ev) {
        var data = null; 
        try {
          data = JSON.parse(ev.target.result);
        } catch (e) {
          window.alert('Cannot load file, please check and try again');
          return;
        }

        this.swRows = [];
        var clubs = data.clubs;
        for (var i = 0; i < clubs.length; i++) {
          this.swRows.push(clubs[i]);
        }
        
        this.$refs.loadData.value = '';
      }.bind(this);
      reader.onload = readSuccess;
    
      reader.readAsText(ev.target.files[0]);
    },
  }
});
  
// IIFE End
})(window.swScale);