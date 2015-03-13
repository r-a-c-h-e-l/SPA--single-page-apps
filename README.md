# Single Page Apps

Javascript single page apps were built using JavaScript/Express/Node.js

	* To run:
	`$ npm install`

All SPA's were persisted with sqlite3 and client side AJAX calls were made to the server.

Pay special attention to the client side Javascript files as that is where all the Single Page magic happens with the DOM manipulation and AJAX calls!

	_aboutME-spa/Public/me.js_
	_pet-spa/petsClient.js_

Dont forget to create your tables and seed your databases!

	`$ sqlite3 petulance.db << schema.sql`
	`$ node seed.js`

