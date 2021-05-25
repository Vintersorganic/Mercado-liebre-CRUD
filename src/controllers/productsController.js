const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let productId = function() {
	return products[products.length - 1].id;
}
/*const lasId= ()=>{
	let ultimo=0;
	products.forEach(product => {
		if(ultimo < product.id){
			ultimo = product.id;
		}
	})
return ultimo;
}
*/

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render("products", {products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const id = req.params.id
		res.render("detail", {products, "id":id})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("create");
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let productoNuevo = {
			id: productId() + 1,
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			discount: req.body.discount,
			image: req.body.filename,
			category: req.body.category
		}

		products.push(productoNuevo)

		let productoJSON = JSON.stringify(products)
		
		fs.writeFileSync(productsFilePath, productoJSON)

		res.redirect("/products")
		
	},

	// Update - Form to edit
	edit: (req, res) => {
		products.forEach(product => {
			if(product.id == req.params.id) {
				res.render("product-edit-form", {product})
			}
		})
	},
	// Update - Method to update
	update: (req, res) => {
		res.send("asda")
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		products = products.filter(product => {
			return product.id != req.params.id
		})
		res.redirect("/products")
	}
};

module.exports = controller;