var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "Reseller"
});

/** Uncomment  this section and comment out all other sections below
 *  to initialize the database first. Also comment out line 7.
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE Reseller", function (err, result) {
    if (err) throw err;
    console.log("Reseller database created");
  });
});
*/

/** Create Tables */
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE Admin (AdminID int NOT NULL, PRIMARY KEY(AdminID))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Admin table created");
  });
  sql = "CREATE TABLE Seller (SellerID int NOT NULL, FirstName VARCHAR(255), LastName VARCHAR(255), Email VARCHAR(255), PRIMARY KEY(SellerID)) ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Seller table created");
  });
  sql = "CREATE TABLE Buyer (BuyerID int NOT NULL, FirstName VARCHAR(255), LastName VARCHAR(255), Address VARCHAR(255), PRIMARY KEY(BuyerID)) ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Buyer table created");
  });
  sql = "CREATE TABLE ItemModel (ItemID int NOT NULL, SellerID int NOT NULL, Status VARCHAR(255), Price DOUBLE, PRIMARY KEY(ItemID, SellerID), FOREIGN KEY(SellerID) REFERENCES Seller(SellerID))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("ItemModel table created");
  });
  sql = "CREATE TABLE Electionic (ItemID int NOT NULL, SellerID int NOT NULL, Model VARCHAR(255), PRIMARY KEY(ItemID, SellerID), FOREIGN KEY(ItemID) REFERENCES ItemModel(ItemID), FOREIGN KEY(SellerID) REFERENCES Seller(SellerID))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Electronic table created");
  });
  sql = "CREATE TABLE Shoe (ItemID int NOT NULL, SellerID int NOT NULL, Model VARCHAR(255), Size DOUBLE ,PRIMARY KEY(ItemID, SellerID), FOREIGN KEY(ItemID) REFERENCES ItemModel(ItemID), FOREIGN KEY(SellerID) REFERENCES Seller(SellerID))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Shoe table created");
  });
  sql = "CREATE TABLE Card (ItemID int NOT NULL, SellerID int NOT NULL, Model VARCHAR(255), Brand VARCHAR(255), PRIMARY KEY(ItemID, SellerID), FOREIGN KEY(ItemID) REFERENCES ItemModel(ItemID), FOREIGN KEY(SellerID) REFERENCES Seller(SellerID))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Card table created");
  });
  sql = "CREATE TABLE Clothing (ItemID int NOT NULL, SellerID int NOT NULL, Name VARCHAR(255), Brand VARCHAR(255), Size DOUBLE, PRIMARY KEY(ItemID, SellerID), FOREIGN KEY(ItemID) REFERENCES ItemModel(ItemID), FOREIGN KEY(SellerID) REFERENCES Seller(SellerID))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Clothing table created");
  });
  sql = "CREATE TABLE Inventory (SellerID int NOT NULL, PRIMARY KEY(SellerID), FOREIGN KEY(SellerID) REFERENCES Seller(SellerID))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Inventory table created");
  }); 
  sql = "CREATE TABLE Sale (SaleID int, SellerID int NOT NULL, BuyerID int NOT NULL, ItemID int NOT NULL, PRIMARY KEY(SaleID, SellerID), FOREIGN KEY(SellerID) REFERENCES Seller(SellerID), FOREIGN KEY(BuyerID) REFERENCES Buyer(BuyerID), FOREIGN KEY(ItemID) REFERENCES ItemModel(ItemID))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Sale table created");
  });
  sql = "CREATE TABLE Expenses (SellerID int NOT NULL, ShippingCost DOUBLE, PackingCost DOUBLE, PRIMARY KEY(SellerID), FOREIGN KEY(SellerID) REFERENCES Seller(SellerID))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Expenses table created");
  });
  sql = "CREATE TABLE Portfolio (SellerID int NOT NULL, PRIMARY KEY(SellerID), FOREIGN KEY(SellerID) REFERENCES Seller(SellerID))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Portfolio table created");
  });
  sql = "CREATE TABLE Graph (SellerID int NOT NULL, PRIMARY KEY(SellerID), FOREIGN KEY(SellerID) REFERENCES Seller(SellerID))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Graph table created");
  });
});
