#Step 1
##Hitting the API for the first time
What I did:
1. Open post man
2. Request type: POST
3. body parameters:
	- token : ```<my token>```
	- github : ```<this github url>```

#Step 2
##Reversing a string

**Goal:**
Get a string from the ```/reverse``` endpoint, send the reversed
string to the ```/reverse/validate``` endpoint.

What I did:
1. Choose what language to use.
	- I chose JS because I had just been working on a JS project not even two hours before starting this. JS has Jquery, which makes working with API's really easy. The documentation for this challenge also mentioned possibly making a front end for whatever it is we're going to be doing in the further steps, so JS + HTML5/CSS lends itself to that in the future.
2. Framework the web folder.
	- in this directory you'll see /public w/ ./JS , ./CSS .index.html

