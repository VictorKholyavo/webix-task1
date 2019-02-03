function sortByParam(a,b) {
  var re = /,/gi;
  a = +a.votes.replace(re, '.');
  b = +b.votes.replace(re, '.');
  return a>b?1:(a<b?-1:0);
};

function likeCompare(value, filter){
  	value = value.toString().toLowerCase();
  	filter = filter.toString().toLowerCase();
  	return value.indexOf(filter) !== -1;
}

var data = {
  view:"datatable",
  id:"mydatatable",
  scrollX: false,
  columns: [
    {id:"rank", header:"", width: 50, css: "rank", sort:"int"},
    {id:"title", header:["Title", {content:"textFilter", compare:likeCompare}], fillspace:true, sort:"string"},
    {id:"year", header:["Released", {content:"numberFilter"}], sort: "int"},
    {id:"votes", header:["Votes", {content:"textFilter", compare:likeCompare}], sort:sortByParam},
    {id:"rating", header:["Rating", {content:"textFilter", compare:likeCompare}], sort:"text"},
    {id:"del", header:"", template:"{common.trashIcon()}"}
  ],
  select: true,
  hover: "myhover",
  datatype:"json",
  url: "data/data.js",
  on: {
    onAfterSelect: function(id){
      const item = $$("mydatatable").getItem(id);
      $$("myform").setValues(item);
    }
  },
  onClick: {
    "wxi-trash":function(e, id){
      this.remove(id);
      return false;
    }
  }
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
          { margin: 20,
            cols:[
              { view:"button",
                value:"Add new",
                type:"form",
                click:function(){
                  //if($$("myform").validate()){
                      //var item = $$("myform").getValues();
                      //$$("mydatatable").add(item);

                      const values = $$("myform").getValues();
                    	if (values.id && $$("myform").validate()) {
                    		    $$("mydatatable").updateItem(values.id,values);
                      }
                    	else if($$("myform").validate()){
                    		$$("mydatatable").add(values);
                        webix.message("Correct data");
                      }
                  //}
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
                      else {
                        return
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

export {data, form};
