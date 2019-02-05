var admin = {
  cols: [
    {
      view:"datatable",
      id:"admin",
      scrollX: false,
      columns: [
        {id:"id", header:"id", width: 50, css: "rank", sort:"int"},
        {id:"value", header:"Category", editor: "text", fillspace:true, sort:"string"},
        {id:"del", header:"", template:"{common.trashIcon()}"}
      ],
      select: true,
      hover: "myhover",
      editable: true,
      onClick: {
        "wxi-trash":function(e, id){
          this.remove(id);
          return false;
        }
      }
    },
  ]
};


var form2 = {
      view:"form",
      id: "formForCategory",
      width: 400,
      autoheight: false,
      elements:[
          { template:"Add new category", type:"section"},
          { view:"text", label:"Category", name:"value", invalidMessage:"Must be text" },
          { margin: 20,
            cols:[
              { view:"button",
                value:"Add new",
                type:"form",
                click:function(){
                    var form = $$('formForCategory');
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
                        $$("formForCategory").clear();
                        $$("formForCategory").clearValidation();
                      }
                    }
                  })
                }
              }
          ]}
      ],
      rules:{
          value:webix.rules.isNotEmpty,
      },
      on:{
         onValidationError:function(key, data){
           webix.message({text:key+" field is incorrect", type:"error"});
         }
      }
};


export {admin, form2}
