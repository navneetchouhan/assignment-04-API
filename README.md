# assignment-04-API
Book Lending API for WMDD-4935 class


# Overview
A Book Lending API which allows you to add,update,get and delete books.

**It is authenticated with JWT Auth**

**All the requests sent should have bearer token**

## Token is:

eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkFudGhvbnkgVmFsaWQgVXNlciIsImlhdCI6MTQyNTQ3MzUzNX0.KA68l60mjiC8EXaC2odnjFwdIDxE__iDu5RwLdN1F2A

## Available Routes

POST <br>
'/books'<br>
**A book has title, author, isbn,genre, publicationinfo : (datepublished,publisher),copies : (edition,numberofcopies,available) and everything is must required for creating a new book**
<br>
**When you add a book you can see its id(which is unique) in respone**
<br><br>
GET
<br>
'/books'  
**(You can pass parameter such as limit,id isbn, title, genre , author and if you don't pass any query parameter, it will get all books)**
<br>
**The paramater passed will also work like search when you use it for title,genre and author (It is not case-sensitive, so 'xyz' and 'XYZ' will get you the same results)**
<br>
eg:
<br>
/books?author=one
<br>
/books?title=one
<br>
/books?limit=5
<br>
/books?genre=one
<br>
/books?isbn=12345
<br>
etc
<br><br><br>
GET
<br>
'/books/{id}'
<br>
**This will get you a book by id**

PUT
<br>
PATCH
<br>
'/books/{id}'
<br>
**This will update a book by id**
<br><br>
DELETE
<br>
'/books/{id}'
<br>
**This will delete a book by id**

### For testing purpose, Body raw data for POST is avaliable in addData.txt



