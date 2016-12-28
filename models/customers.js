var md5      	= require('md5');
var mysql      = require('mysql');

var db = require('./db.js');



var model = {};

// model.auth = function(data, res, callback){
// 	var connection = mysql.createConnection(db.credentials);

// 	var query = 'SELECT \
// 					accounts.customers_id  as customer_id, \
// 					accounts.username, \
// 					customers.business_name, \
// 					customers.nature_of_business, \
// 					customers.contact_person, \
// 					customers.email_address \
// 				from accounts \
// 				left join customers on (accounts.customers_id = customers.id) \
// 				where username = ? and password = ?;';

// 	connection.query(query, [data.username, md5(data.password)], function(err, rows, fields) {
// 	  	if (err) throw err;
// 	  	var result = JSON.stringify(rows);
// 	  	callback(result);
// 	});

// 	connection.end();
// }

model.auth = function(data, res, callback){
	var connection = mysql.createConnection(db.credentials);

	var query = 'SELECT \
					accounts.customers_id  as customer_id, \
					accounts.username, \
					customers.business_name, \
					customers.nature_of_business, \
					customers.contact_person, \
					customers.email_address \
				from accounts \
				left join customers on (accounts.customers_id = customers.id) \
				where username = ? and password = ?;';

	connection.query(query, [data.email, md5(data.password)], function(err, rows, fields) {
	  	if (err) throw err;
	  	
	  	var result={};
	  	if(rows.length > 0){
	  		result.status = true;
	  		result.data = rows[0];
	  	}
	  	else {
	  		result.status = false;
	  	}
	  	
	  	callback(JSON.stringify(result));
	});

	connection.end();
}

model.fetch_all = function(res, callback){
	var connection = mysql.createConnection(db.credentials);

	var query = 'SELECT \
					accounts.customers_id  as customer_id, \
					accounts.username, \
					customers.business_name, \
					customers.nature_of_business, \
					customers.contact_person, \
					customers.email_address \
				from accounts \
				left join customers on (accounts.customers_id = customers.id) \
				where customers.archived = false;';

	connection.query(query, function(err, rows, fields) {
	  	if (err) throw err;
	  	var result = JSON.stringify(rows);
	  	callback(result);
	});

	connection.end();
}

model.register = function(data, res, callback){
	var connection = mysql.createConnection(db.credentials);

	var query = 'insert into customers \
				( \
					business_name, \
					nature_of_business, \
					contact_person, \
					email_address \
				) \
				values \
				( \
					?, ?, ?, ?\
				);';

	var values = [
		data.name_of_business,
		data.nature_of_business,
		data.contact_person,
		data.email_address
	];

	connection.query(query, values, function(err, rows, fields) {
	  	if (err) throw err;
	  	var result = JSON.stringify(rows);
	  	callback(result);
	});

	connection.end();
}

model.save_interests = function(data, res, callback){
	var connection = mysql.createConnection(db.credentials);

	var interests = data.interests.split(',');
	var customer_id = data.customer_id;
	
	var values = [];
	var query="begin;";
	for(var i in interests){
		query += 'insert into customers_interests \
					( \
						customers_id, \
						interest \
					) \
					values \
					( \
						?, \
						? \
					); \
					\
				';

		values.push(customer_id);
		values.push(interests[i]);
	}

	query += 'commit;';

	connection.query(query, values, function(err, rows, fields) {
	  	if (err) throw err;
	  	var result = JSON.stringify(rows);
	  	callback(result);
	});

	connection.end();
}

module.exports = model;