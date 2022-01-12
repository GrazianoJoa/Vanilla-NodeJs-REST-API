const books = require('../data/books')


function findAll() {
	return new Promise((resolve, reject) => {
		resolve(books)
	})
}

function findById(id) {
	return new Promise((resolve, reject) => {
		const book = books.find(p => p.id === id)
		resolve(book) 
	})
}

module.exports = {
	findAll,
	findById
}