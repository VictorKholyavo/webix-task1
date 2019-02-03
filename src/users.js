function sortTitle(){
  $$("users").sort("#name#", "asc");
};

function sortTitleDesc() {
  $$("users").sort("#name#", "desc");
};

var data2 = {
  rows: [
    {
      height: 35,
      view: "toolbar",
      elements: [
        {
          view: "text",
          id:"list_input",
          css:"fltr",
          labelWidth: 190
        },
        {
          view: "button",
          id: "sort_asc",
          width: 100,
          label:"Sort asc",
          type: "form",
          click:sortTitle,
        },
        {
          view: "button",
          id: "sort_desc",
          width: 100,
          label:"Sort desc",
          type: "form",
          click: sortTitleDesc
        }
      ]
    },
    {
      view: "list",
      id:"users",
      borderless: true,
      select: true,
      fillspace:true,
      template:"#name# from #country# <span class='webix_icon wxi-close'></span>",
      datatype:"json",
      url: "data/users.js",
      onClick: {
        'wxi-close':function(e ,id) {
          this.remove(id);
          return false;
        }
      },
      scheme:{
        $change:function(item){
          if (item.id <= 5) {
            item.$css = "highlight";
          }
        }
      }
    }
  ],

};


var chart = {
  view: "chart",
  type: "bar",
  value: "#age#",
  xAxis: {
    template:"#age#"
  },
  yAxis: {
    start: 21,
    end: 60,
    step: 10,
    template: function(obj) {
      return (obj%20?"":obj)
    }
  },
  datatype: "json",
  url: "data/users.js"
};

export {chart, data2};
