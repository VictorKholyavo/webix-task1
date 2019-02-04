var products = {
  view: "treetable",
  id:"products",
  columns:[
					{ id:"id",	header:"", css:{"text-align":"right"},  	width:50},
					{ id:"title",	editor: "text", header:"Title",	width:250,
						template:"{common.treetable()} #title#" },
					{ id:"price",	editor: "text",	header:"Price",	width:200}
				],
  select: "cell",
  editable: true,
  datatype: "json",
  url: "data/products.js",
  rules: {
    $all:webix.rules.isNotEmpty,
    price:webix.rules.isNumber
  }
}

export {products};
