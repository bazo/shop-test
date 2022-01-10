const http = require("http");
const { promisify } = require("util");
const sleep = promisify(setTimeout);
const fs = require("fs").promises;

const HOSTNAME = "localhost";
const PORT = 9001;

const products = [
	{
		sku: 1,
		name: "Product One",
		description: "Product One description",
		price: 1.11,
		basketLimit: 5,
	},
	{
		sku: 2,
		name: "Product Two",
		description: "Product Two description",
		price: 2.22,
		basketLimit: 4,
	},
	{
		sku: 3,
		name: "Product Three",
		description: "Product Three description",
		price: 3.33,
		basketLimit: 3,
	},
	{
		sku: 4,
		name: "Product Four",
		description: "Product Four description",
		price: 4.44,
		basketLimit: 2,
	},
	{
		sku: 5,
		name: "Product Five",
		description: "Product Five description",
		price: 5.55,
		basketLimit: 1,
	},
];

const checkCardNumber = (cardNumber) => {
	if (typeof cardNumber !== "string") return false;
	if (cardNumber.length !== 16) return false;
	if (!luhnCheck(cardNumber)) return false;
	return true;
};

const checkBasket = (basket) => {
	if (!basket || !(basket instanceof Array) || basket.length === 0) {
		console.log("basket format is invalid");
		return false;
	}

	let basketErrors = false;
	for (const item of basket) {
		if (!item.sku || !item.quantity) {
			console.log("basket item format is invalid");
			basketErrors = true;
			break;
		}
		const product = products.find((product) => product.sku === item.sku);
		if (!product) {
			console.log("no matching product sku for basket item");
			basketErrors = true;
			break;
		}
		if (item.quantity > product.basketLimit) {
			console.log(`product quantity (${item.quantity}) for sku ${product.sku} is above basket limit for that product (${product.basketLimit})`);
			basketErrors = true;
			break;
		}
	}
	if (basketErrors) return false;
	return true;
};

const luhnCheck = (strToTest) => {
	let digit = 0;
	let sum = 0;
	let length = strToTest.length;
	let odd = false;

	for (let i = length - 1; i >= 0; i--) {
		digit = parseInt(strToTest[i], 10) | 0;

		if (odd === true) digit = (digit * 2) | 0;
		if (digit > 9) digit = digit - 9;
		odd = !odd;
		sum += digit;
	}

	return sum % 10 === 0;
};

const handleCheckout = async (req, res) => {
	let bodyText = "";
	for await (const chunk of req) {
		bodyText += chunk;
	}
	const body = JSON.parse(bodyText);
	console.log("checkout body content is", body);
	const basketIsValid = checkBasket(body.basket);
	if (!basketIsValid) {
		console.log("basket content is invalid");
		res.writeHead(400, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ error: "basket is invalid" }));
		return;
	}
	const cardIsValid = checkCardNumber(body.cardNumber);
	if (!cardIsValid) {
		console.log(`${body.cardNumber} is an invalid card number`);
		res.writeHead(400, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ error: "card is invalid" }));
		return;
	}
	console.log("checkout is ok");
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(JSON.stringify({ msg: "The checkout transaction was completed successfully." }));
};

const requestListener = async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Request-Method", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, POST, DELETE, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "*");

	if (req.method === "OPTIONS") {
		res.writeHead(200);
		res.end();
		return;
	}
	res.setHeader("Content-Type", "application/json");

	switch (req.url) {
		case "/products": {
			console.log("GET to /products");
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify(products));
			return;
		}
		case "/unreliable_products": {
			console.log("GET to /unreliable_products");
			const random = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
			if (random % 2 === 0) {
				const delay = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
				console.log(`delaying return by ${delay} seconds`);
				await sleep(delay * 1000);
				res.writeHead(200, { "Content-Type": "application/json" });
				res.end(JSON.stringify(products));
			} else {
				console.log(`simulating error return`);
				res.writeHead(400, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ error: "Error retrieving products list" }));
			}
			return;
		}
		case "/checkout": {
			console.log("POST to /checkout");
			handleCheckout(req, res);
			return;
		}
		case "/example_html/products": {
			console.log("GET to /example_html/products");
			try {
				const productsExample = await fs.readFile(__dirname + "/client_utils/example_html/products.html");
				res.setHeader("Content-Type", "text/html");
				res.writeHead(200);
				res.end(productsExample);
			} catch (e) {
				console.error("unable to send example products html", e);
			}
			return;
		}
		case "/example_html/checkout": {
			console.log("GET to /example_html/checkout");
			try {
				const checkoutExample = await fs.readFile(__dirname + "/client_utils/example_html/checkout.html");
				res.setHeader("Content-Type", "text/html");
				res.writeHead(200);
				res.end(checkoutExample);
			} catch (e) {
				console.error("unable to send example checkout html", e);
			}
			return;
		}
		default:
			res.writeHead(404);
			res.end(JSON.stringify({ error: "Resource not found" }));
			return;
	}
};

const server = http.createServer(requestListener);

server.listen(PORT, HOSTNAME, () => {
	console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});
