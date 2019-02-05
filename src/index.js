import {data, form, collectionForCategories} from "./dashboard.js";
import {data2, chart} from "./users.js"
import {products} from "./products.js"
import {admin, form2} from "./admin.js"

var header = {
    view: "toolbar",
    css: "webix_header webix_dark",
    cols:[
          {
            view:"label",
            label:"My App"
          },
          {
            view:"button",
            id:"mybutton",
            type:"icon",
            icon:"wxi-user",
            width: 100,
            label:"Profile",
            value:"Show window",
            popup:"my_pop"
          },
      ]
};

var side = {
  css: "list",
  cols: [
    { rows: [
        {
        css: "list",
        view: "list",
        borderless:true,
        id:"mylist",
        scroll:false,
        width:200,
        select: true,
        on:{
          onAfterSelect:function(id){
            $$(id).show();
          }
        },
        data:[ "Dashboard", "Users", "Products", "Admin"],
        },
        {
          view: "label",
          autoheight: true,
          css: "centered status",
          label:"<span class='webix_icon wxi-check'></span>Connected"
        },
      ]
    },
  ]
};



var main = {
  cells: [
    {id:"Dashboard", cols:[data, form]},
    {id:"Users", rows:[data2, chart]},
    {id:"Products", rows:[products]},
    {id:"Admin", cols:[admin, form2]}
  ]
};

var footer = {
  rows:[
    {
      view: "template",
      css: "centered",
      height: 40,
      template:"The software is provided by <span><a href='https://webix.com'>https://webix.com</a></span>. All rights reserved (c)"
    }
  ]
};




webix.protoUI({
  name:"editlist"
}, webix.rules,  webix.EditAbility, webix.ui.list);

webix.ui({
   id:"app",
   rows:[
     header,
     {cols:[side, {view:"resizer"}, main]},
     footer
   ],
});

webix.ui({
  view:"popup",
  id:"my_pop",
    head:"Submenu",
  width:200,
  body:{
    view:"list",
    data:[
        {id:"1", name:"Settings"},
        {id:"2", name:"Log Out"},
    ],
    datatype:"json",
    template:"#name#",
    autoheight:true,
    select:true
  }
});

$$("mydatatable").registerFilter(
  $$("mytabbar"),
  {
    columnId: "year",
    compare:function(value, filter, item) {
          if (filter == 1) return value;
          else if (filter == 2) return value < 1980;
          else if (filter == 3) return value > 2010;
          else if (filter == 4) return value > 2016;
  }},
  {
    getValue:function(node){
      return node.getValue();
    },
    setValue:function(node, value){
      node.setValue(value);
    }
  }
);

$$("admin").sync(collectionForCategories);

$$("myform").bind($$("mydatatable"))

$$("formForCategory").bind($$("admin"))

$$("list_input").attachEvent("onTimedKeyPress",function(){
    var value = this.getValue().toLowerCase();
    $$("users").filter(function(obj){
        return obj.name.toLowerCase().indexOf(value)==0;
    })
});

$$("mychart").sync($$("users"), function(data){
  this.group({
      by:"country",
      map:{
        name:[ "name", "count" ]
      }
  });
});

$$("products").waitData.then(function(){
    $$("products").openAll();
});

$$("mylist").select("Dashboard");
