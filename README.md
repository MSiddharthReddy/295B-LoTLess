## Welcome LoTLess

This project is an attempt to reduce Loss and Theft in retail stores, while improving the customer shopping experience overall. There are three parts to this codebase,

### IoT Code

The part consists of code for our **Smart Shelf**. This is written in Arduino which is a C based programming language for Arduino boards.

### Mobile Code

This is React-Native code for the system. The main objective of a mobile phone is to communicate with the Arduino over bluetooth and provide our web-server with the pictures of the users and the weight changes.

This will also consist of code for the checkout flow, where the user can checkout without needing to scan the products they took.

### Web Server

This is where our business logic resides. Pictures of users are compared to create virtual carts. This way the store knows who has the product and the user can also checkout quickly because the cart is already made.

Detailed explanation on its way...
