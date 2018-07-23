var mysql = require("mysql");
var inquirer = require('inquirer');
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
})

connection.connect((err, fields) => {
    if (err) {
        return console.log(err.code);
    }
});

var displayDB = async () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM products', (err, resp) => {
            if (err) {
                reject(err)
            } else {
                table = [];
                resp.forEach((product) => {
                    obj = {
                        'Product ID': product.productID,
                        'Category': product.category,
                        'Price': product.price,
                        'Stock': product.stockQuantity
                    }
                    table.push(obj)
                })
                resolve(table)
                console.log('\n')
                console.table(table)
            }
        })
    })
}

var getQty = async (productID) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM products WHERE ProductID = ?`, [productID], (err, resp) => {
            if (err) {
                console.log(err.code)
            } else {
                availableQty = resp[0].stockQuantity
            }
            resolve(availableQty)
        })
    })
}

var updateDB = async (productID, Qty) => {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE products SET ? WHERE ProductID = ?`, [{
            stockQuantity: Qty
        }, productID], () => {
            resolve()
        })
    })
}

var ask = async (question) => {
    return new Promise((resolve, reject) => {
        var prompt = inquirer.createPromptModule();
        var questions = {
            product: {
                type: 'input',
                message: 'What is the Manufacure Number of the Component you Would like yo Purchese?',
                name: 'ans'
            },
            quantity: {
                type: 'input',
                message: 'How many Would like yo Purchese?',
                name: 'ans'
            },
            action: {
                type: 'list',
                name: 'ans',
                message: 'would you like to to purchase another item?',
                choices: ['YES', 'NO'],
            }
        }
        prompt(questions[question]).then((resp) => {
            resolve(resp.ans)
        })
    })
}

var test = async () => {
    await displayDB();
    var productID = await ask('product');
    var requestedQty = await ask('quantity');
    var availableQty = await getQty(productID);
    if (requestedQty <= availableQty) {
        await updateDB(productID, (availableQty - requestedQty))
        await displayDB();
    } else {
        console.log('\nSorry Insufficient quantity!\n')
    }
    if (await ask('action') == 'YES') {
        test()
    } else {
        connection.end()
        console.log('\nthank you for your business, hope to see you soon\n')
    }
}
test()