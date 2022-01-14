const Book = require('../models/bookModel');
const { getPostData } = require('../utils')

async function getBooks(req, res) {
	try {
		const book = await Book.findAll();

		res.writeHead(200, { 'Content-Type': 'application/json'})
		res.end(JSON.stringify(book))
	} catch (error) {
		console.log(error)
	}
}

 
async function getBook(req, res, id) {
	try {
		const book = await Book.findById(id);

		if(!book) {
			res.writeHead(404, { 'Content-Type': 'application/json'})
			res.end(JSON.stringify({ 'message': "´Book not found :'( "}))
		} else {
			res.writeHead(200, { 'Content-Type': 'application/json'})
			res.end(JSON.stringify(book))
		}
	} catch (error) {
		console.log(error)
	}
}

async function createBook(req, res) {
	try {
		const body = await getPostData(req)

		const { name, author, desc, price } = JSON.parse(body)

		const bookdata = {
			name,
			author,
			desc,
			price
		}

		const newBook = await Book.create(bookdata)
		res.writeHead(201, { 'Content-Type': 'application/json'})
		return res.end(JSON.stringify(newBook))

	} catch (error) {
		console.log(error)
	}
}

async function updateBook(req, res, id) {
	try {

		const book = await Book.findById(id)

		if(!book) {

			res.writeHead(404, { 'Content-Type': 'application/json'})
			res.end(JSON.stringify({ 'message': "´Book not found :'( "}))

		} else {

			const body = await getPostData(req)

			const { name, author, desc, price } = JSON.parse(body)

			const bookdata = {
				name: name || book.name,
				author: author || book.author,
				desc: desc || book.desc, 
				price: price || book.price
			}

			const updBook = await Book.update(id, bookdata)
			res.writeHead(200, { 'Content-Type': 'application/json'})
			return res.end(JSON.stringify(updBook))
		}

	} catch (error) {
		console.log(error)
	}
}

async function deleteBook(req, res, id) {
	try {
		const book = await Book.findById(id)

		if(!book) {

			res.writeHead(404, { 'Content-Type': 'application/json'})
			res.end(JSON.stringify({ 'message': "Book not found :'( "}))

		} else {

			await Book.remove(id)
			res.writeHead(200, { 'Content-Type': 'application/json'})
			return res.end(JSON.stringify({ 'message': `Book ${id} has been removed` }))
		}

	} catch (error) {
		console.log(error)
	}
}



module.exports = {
	getBooks,
	getBook,
	createBook,
	updateBook,
	deleteBook
}