var products = {
  view: "treetable",
  id:"products",
  columns:[
					{ id:"id",	header:"", css:{"text-align":"right"},  	width:50},
					{ id:"title",	header:"Title",	width:250,
						template:"{common.treetable()} #title#" },
					{ id:"price",	header:"Price",	width:200}
				],
  select: "cell",
  datatype: "json",
  url: "data/products.js",
}

export {products};
