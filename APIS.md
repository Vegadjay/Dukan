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
(auth apis)
/api/auth/users/register:- In This endpoint new user make

/api/auth/users/login:- In This endpoint user can login

/api/auth/owner/register:- In this endpoint New Owner can register

/api/auth/owner/login:- In this endpoint Owner can login

/api/auth/logout:- this is that endpoint that both type of user can logout

(product apis):- 
    {
        -> This Product route create two things one is pages and second is api

        -> Api is do work and there are 4 routes that show only pages that is show all details
    }

(routes):- 
/products/createproduct :- Show page that we can create product

/products/create:- This is api that create product request goes

/product/editproduct/:id :- This is page that we can edit product

/product/edit/:id :- this is api that we hit and we can edit over project

/product/deleteproduct/:id :- This is route and in this route we can check confirm to delete or not

/product/deleteproduct/:productId :- this is api that our product is delete.

## Other Routes

(owners router)
owners/products :- Shop Owner all products

owners/orders:- All Orders From Shop

owners/addproduct:- Add Products


<!-- ---------------------------------------- -->

(models) 
product model:-
    productName,
    ownerModel,
    productPrice,
    productquantity,
    productDesctiption,

Shop Model
    ownerModel,
    ownerNo,
    ownerEmail,
    shopName,
    shopAddress,

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

(backend Api that use for make product)

/owners/addproduct:- Here All product is made


(Require things for add product)

Product Name
Price
Qauntity
Category,
Desciprion


<!-- todo: Last:- So in last all thing is working good do one thing now while other user is come and login than this is not working like user has shop than also this is not allow to add product as it is so fix that all things...
 -->