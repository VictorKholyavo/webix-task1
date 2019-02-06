var collectionForUsers = new webix.DataCollection({
  datatype: "json",
  url:"data/users.js"
});

function sortTitle(){
  $$("users").sort("#name#", "asc");
};

function sortTitleDesc() {
  $$("users").sort("#name#", "desc");
};

var numb = 13;
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
          click: sortTitle,
        },
        {
          view: "button",
          id: "sort_desc",
          width: 100,
          label:"Sort desc",
          type: "form",
          click: sortTitleDesc
        },
        {
          view: "button",
          id: "add_new",
          css:"add_new",
          width: 100,
          label:"Add new",
          type: "form",
          click:function(){
              var user = {"id":numb,"name":"Pirs Brosnan", "age":65, "country":"USA"};
              collectionForUsers.add(user);
              numb = numb + 1;
          }
        }
      ]
    },
    {
      view: "editlist",
      id:"users",
      borderless: true,
      select: true,
      template:"#name# from #country# <span class='webix_icon wxi-close'></span>",
      editable: true,
      editor:"text",
      editValue:"name",
      data: collectionForUsers,
      onClick: {
        'wxi-close':function(e ,id) {
          collectionForUsers.remove(id);
          return false;
        }
      },
      rules:{
          name:webix.rules.isNotEmpty
      },

    },
  ],
};


var chart = {
  rows: [
    {
      view: "chart",
      id:"mychart",
      type: "bar",
      value: "#name#",
      xAxis: {
        template:"#country#"
      },
      yAxis: {
        start: 0,
        end: 10,
        step: 2,
      }
    },
  ]
};

export {chart, data2};
