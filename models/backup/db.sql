create table customers (
	id int not null auto_increment PRIMARY KEY,
	business_name varchar(50) not null,
	nature_of_business varchar(50) not null,
	contact_person varchar(50) not null,
	email_address varchar(50) not null,
	archived boolean not null default false
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

create table accounts (
	customers_id int not null, 
  	username varchar(50),
  	password varchar(50),
  	PRIMARY KEY (username),
  	FOREIGN KEY(customers_id) REFERENCES customers(id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

INSERT INTO customers 
(
	business_name,
	nature_of_business,
	contact_person,
	email_address
) VALUES
(
	'Business One',
	'IT Solutions',
	'Person 1',
	'person_one@business_one.com' 
)
;

INSERT INTO accounts (customers_id, username, password) VALUES
(1, 'user1', md5('user123'));

create table customers_interests (
	customers_id int not null, 
	interest varchar(50),
	PRIMARY KEY (customers_id, interest),
	FOREIGN KEY(customers_id) REFERENCES customers(id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

ALTER TABLE customers_interests
ADD UNIQUE KEY customer_interest (customers_id, interest);