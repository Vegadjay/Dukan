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


<!-- todo: All pages like name and other thing is done and now do one thing that is make that one thing while user add product than that product goes to their shop product

    ? for that we make that model and in that model we make one product array and in that array we add that all things and make that perfect that is new approach and try that approach
 -->