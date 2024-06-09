# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints
### Users
- Index [token required] : `'users' [GET] (token)`
- Show [token required]:    `'users/:id' [GET] (token)`
- Create : `'users/create' [POST]`
- Delete [token required]: `'users/:id' [DELETE] (token)`
- Login : `'users/authenticate' [DELETE]`

#### Products
- Index [token required]: `'products/' [GET]`
- Show [token required] : `'products/:id' [GET]`
- Create (args: Product)[token required]: `'products/create' [POST] (token)`
- [ADDED] Delete[token required]: `'products/:id  [DELETE]`

### Orders
- Current Order by user [token required]: `'orders/:user_id' [GET] (token)`
- Create Order[token required]: `'orders/create' [POST] (token)`

## Data Shapes

### Product
- id
- name
- price
- categoryid
```
Table: Product (id:serial[primary key], name:varchar(50)[not null], price:numeric[not null], categoryid:numeric)
```

#### User
- id
- fistname
- lastname
- username
- password_digest

```
Table: User (id:serial[primary key], firstname: varchar (250)[not null], lastname:varchar(250)[not null],username: varchar (500)[not null], password_digest:varchar(200)[not null], created_at: timestamp [not null] default now(), updated_at: timestamp [not null] default now() )
```

#### Orders

- id
- user_id
- status

```
Table: Orders (id:serial[primary key], user_id:integer(foreign key to users table), status  BOOLEAN [not null])
```
#### Table: order_products

- product_id INTEGER REFERENCES products(id)
- order_id INTEGER REFERENCES orders(id)
- quantity INTEGER

```
Table: Order Product (
  order_id: integer(not null) REFERENCES orders (id),
  quantity: integer(not null),
  product_id: integer(not null) REFERENCES products (id)
)
```