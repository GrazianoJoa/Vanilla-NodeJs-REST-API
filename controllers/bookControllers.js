const Book = require('../models/bookModel');

async function getProducts(req, res) {
	try {
		const book = await Book.findAll();

		res.writeHead(200, { 'Content-Type': 'application/json'})
		res.end(JSON.stringify(books))
	} catch (error) {
		console.log(error)
	}
}

async function getProduct(req, res, id) {
	try {
		const book = await Book.findById(id)

		if(!book) {
			res.writeHead(404, { 'Content-Type': 'application/json'})
			res.end(JSON.stringify({ 'message': "´Book not found :'( "}))
		} else {
			res.writeHead(200, { 'Content-Type': 'application/json'})
			res.end(JSON.stringify(books))
		}
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	getProducts,
	getProduct
}