Generate one api readme for me i gave you all apis + routes make one readme 



## (routes)

(Login And Register New User)
/:-Login Routes(contain login page)

/auth/pages/users/loginpage:- User login page

/auth/pages/users/registerpage:- User can register

/auth/pages/owner/loginpage:- Owner can login

/auth/pages/owner/registerpage:- Owner can register this page

/users/shop:- Users shop page here there is all items stores


## (apis)
(This is api endpoints that user can intrect)

/api/auth/users/register:- In This endpoint new user make

/api/auth/users/login:- In This endpoint user can login

/api/auth/owner/register:- In this endpoint New Owner can register

/api/auth/owner/login:- In this endpoint Owner can login

/api/auth/logout:- this is that endpoint that both type of user can logout


## Other Routes

(owners router)
owners/products :- Shop Owner all products

owners/orders:- All Orders From Shop

owners/addproduct:- Add Products


<!-- ---------------------------------------- -->

(models) 
product model:-
    productName,
    productPrice,
    productquantity,
    productDesctiption,

Shop Model
    shopName,
    adress,
    products,

user Model
    fullName,
    email,
    password,
    cart,
    contact,
    orders

shop Owner
    fullName,
    email,
    password,
    shopAddress,
    shops,
    contact

<!-- todo: all pages are done now make only that db setup for all users and all owners -->