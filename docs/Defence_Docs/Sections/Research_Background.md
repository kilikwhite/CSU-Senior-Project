First I started to do research with how HackerRank grades the code.  HackerRank takes all the 
code that was typed then after pressing submit it goes to a server.  That same server compiles 
the code and returns the test cases that were passed and failed. Then I started to integrate the 
basic design of what I want the program to be.  

Next I figured out what language I should use for this program which was a choice between php or 
javascript.  Between php and javascript, I chose to program this in javascript because it would be 
more convenient with the added packages I could add down the line.

After deciding to program the project in javascript, I was suggested to use Meteor js because of the
synchronicity capabilities.  I tried to use Meteor JS but it fell through because I could not figure 
out how to run the ace editor package for Meteor.  The ace editor package was important because it both 
colors the code based off of the language and it changes the code area background.  That was when I 
started to find another main JS package to use instead of Meteor JS and that is React JS.  React JS is 
both a popular package and I figured out a way to use ace editor inside along with other important packages.

With React JS being the main package for the client side, I started to set up the server side.  The package 
that I used on the server side was Socket-io and Sandbox.  Socket-io is a package that allows the use of 
sockets.  The sockets help to connect the host and the client together to help make the online component.  
Next was Sandbox which was used for handling the test cases and compiling the code.  Sandbox even takes care 
of the issue of security since eval() will just compile the code given to it regardless compared to sandbox 
which is contained in an area.

Finally the packages inside of the client side are react-ace and react-time-hook.  React-ace is ace editor 
but was especially made for React JS.  While react-time-hook is responsible for the stopwatch inside of the 
spectator portion of the program.
