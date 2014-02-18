This is an initial implementation of MWS.

To run Server:
1.Make sure Node and npm are installed.
2.Go to the MWS directory and run npm install.
3.After this run node server.js
4.This will make sure that our server is running

To test client
1.The client directory comes with a static html page.
2.opening up the file in the browser will serve it from the file system and not the server.It has got the necessary bootstrapping mechanism inbuilt so we can see the OK button .
3.To use the MWS in any html file follow the steps below:
	a.include the  ```<script src="widget.js"></script> ```tag in the page
	b.to hook up with the DOM of this page include  ```<div class= "midget-widget-container">  </div>```
4.Voila we can have the MWS embedded.



