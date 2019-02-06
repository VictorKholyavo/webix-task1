var collectionForCategories = new webix.DataCollection({
  datatype: "json",
  url:"data/categories.js"
});

function likeCompare(value, filter){
  	value = value.toString().toLowerCase();
  	filter = filter.toString().toLowerCase();
  	return value.indexOf(filter) !== -1;
}

var data = {
  rows: [
    {
      view: "tabbar",
      id: "mytabbar",
      options: [
        {id: 1, value: "All"},
        {id: 2, value: "Old"},
        {id: 3, value: "Modern"},
        {id: 4, value: "New"},
      ],
      on: {
        onChange: function(){
          $$("mydatatable").filterByAll();
        }
      }
    },
    {
      view:"datatable",
      id:"mydatatable",
      scrollX: false,
      columns: [
        {id:"rank", header:"", width: 50, css: "rank", sort:"int"},
        {id:"title", header:["Title", {content:"textFilter", compare:likeCompare}], fillspace:true, sort:"string"},
        {id:"categoryId", header:["Category", {content:"selectFilter"}], collection: collectionForCategories},
        {id:"year", header:"Released"},
        {id:"votes", header:["Votes", {content:"numberFilter"}], sort:"int"},
        {id:"rating", header:["Rating", {content:"numberFilter"}], sort:"int"},
        {id:"del", header:"", template:"{common.trashIcon()}"}
      ],
      select: true,
      hover: "myhover",
      datatype:"json",
      url: "data/data.js",
      scheme: {
        $init: function(obj){
          obj.categoryId = Math.floor(Math.random() * 4) + 1;
          var re = /,/gi;
          obj.votes = obj.votes.replace(re, '.');
          obj.rating = obj.rating.replace(re, '.');
        },
      },
      onClick: {
        "wxi-trash":function(e, id){
          this.remove(id);
          return false;
        }
      }
    }
  ]
};

var form = {
      view:"form",
      id: "myform",
      width: 400,
      autoheight: false,
      elements:[
          { template:"Edit films", type:"section"},
          { view:"text", label:"Title", name:"title", invalidMessage:"Title must be filled in" },
          { view:"text", label:"Year", name:"year", invalidMessage:"Year should be between 1970 and 2019" },
          { view:"text", label:"Rating", name:"rating", invalidMessage:"Rating must be number, not a 0 and not empty" },
          { view:"text", label:"Votes", name:"votes", invalidMessage:"Votes must be less than 100000" },
          {
            view:"combo", width:400, label: "Category", labelWidth:220, name:"categoryId",
            options: collectionForCategories,
          },
          {
            margin: 20,
            cols:[
              { view:"button",
                value:"Add new",
                type:"form",
                click:function(){
                    var form = $$('myform');
            				if(form.isDirty()){
            					if(!form.validate())
            					return false;
            				form.save();
                  }
                }
              },
              {
                view:"button",
                value:"Clear",
                click:function(){
                  webix.confirm({
                    title:"Clear?",
                    ok:"Yes",
                    cancel:"No",
                    text:"Clear",
                    callback:function(result) {
                      if (result) {
                        $$("myform").clear();
                        $$("myform").clearValidation();
                      }
                    }
                  })
                }
              }
          ]}
      ],
      rules:{
          title:webix.rules.isNotEmpty,
          year:function(value){
            return value>1970 && value<=2019;
          },
          votes:function(value){
            return value<100000;
          },
          rating:function(value){
              if (!webix.rules.isNotEmpty(value) ) return false;
              if (value == 0) return false;
              if (isNaN(value)) return false;
              return true;
          }
      },
      on:{
         onValidationError:function(key, data){
           webix.message({text:key+" field is incorrect", type:"error"});
         }
      }

};

export {data, form, collectionForCategories};
