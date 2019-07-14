var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mypw",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  readProducts();
});

//function to display all products
function readProducts() {
  console.log("Displaying all Products...\n");
  connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    beginOrder()
  });
}

//create function using inquirer to prompt user to (entry 1)select id and then (entry 2)select number of units they want to buy
function beginOrder() {
  inquirer
    .prompt([
      {
        name: "ItemID",
        type: "number",
        message: "Enter the Item ID of the item you would like to purchase.",
        //add code to prompt user to "Please enter a valid id" if an existing item id is not entered
      },
      {
        name: "Quantity",
        type: "number",
        message: "How many units of this product would you like to purchase?"
      }
    ])
        .then(function (answer) {
          //compare entry 2 to stock_quantitiy - to do that, have to find item based on id
          var query = "SELECT stock_quantity, product_name FROM products WHERE ?";
          connection.query(query, {item_id: answer.ItemID}, function (err, res) {
            if (err) throw err;            
            console.log(res);
            //this line not working - returning undefined
            console.log(res.stock_quantity + " " + res.product_name + " left in stock");
            

            //if entry 2 > stock_quantity - console.log Insufficient quantity!
            //console.log Order Total: <price>
            //if (answer.Quantity > res.stock_quantity) {
              //console.log("Insufficient Quantity!")
           // }
            //else update products db to update stock_quantity-entry 2

          //}
          connection.end();

          });
        })

   


}


