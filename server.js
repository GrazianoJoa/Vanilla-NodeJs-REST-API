const http = require('http')
const { getProducts, getProduct } = require('./controllers/bookControllers')

const server = http.createServer((req, res) => {
	if(req.url === '/api/books' && req.method === 'GET') {
		getProducts(req, res)
	} else if (req.url.match(/\/api\/books\/([0-9]+)/) && req.method === 'GET') {
		const id = req.url.split('/')[3] 			
		getProduct(req, res)
	} 
	else {
		res.writeHead(404, { 'Content-Type': 'application/json'})
		res.end(JSON.stringify({ 'message': "Route not found :'( "}))
	}
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log('Server running on', PORT));