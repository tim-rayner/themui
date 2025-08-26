0:00
uh hello everyone it's Aram here in
0:01
today's video I want to explain and show
0:03
you how I'm building my authentication
0:05
systems for my apps I just noticed that
0:07
people like to over complicate things
0:10
and especially authentication part of
0:12
the app building for my opinion can be
0:14
really simple efficient and straight for
0:16
what to do by the end of the video I
0:17
will share the code that you see here so
0:20
you will get access to everything we
0:22
discuss on the video you can find the
0:23
link in the description and use the code
0:25
for your own applications so just copy
0:27
paste change your environment variable
0:30
and push you to production but right now
Start of Tutorial
0:32
I will explain how I do this so I will
0:34
start with the idea behind this if if
0:36
you go if you want to go straight to
0:38
tutorial please check the time stamps in
0:39
the description of the video for down
Authentication Approaches Overview
0:41
dedication especially in the next GS
0:43
applications I tried several approaches
0:45
and found found one that I use the most
0:47
nowadays but it's all like pretty
0:49
similar like I tried clerk I tried next
0:52
out it's now called the out the GS and
0:54
the super base for my case I use the
0:56
super base I like the combination of the
0:58
database plus authentication is just
1:00
much more straightforward so what we'll
1:01
do starts with the you go check
Project Structure & Setup
1:04
documentation and setting up your your
1:06
code base you adding like a providers
1:08
environment variables initializing the
1:10
client then you building some UI part
1:13
you have some sign up or login Pages
1:15
after this you configuring your redirect
1:17
API endpoint so the the URL that the
1:20
user will be redirected to and then you
1:22
have some logic to get client to get the
1:25
user on the client or server so just the
1:27
function that you will be using to get
1:29
the information about the current user
1:31
or maybe combine this function with
1:32
other to get like to F the data or
1:34
something and here it's quite simple but
1:36
you can like extend it as and make it as
1:39
complex as as you want especially with
1:41
the middleware and the custom parameters
1:42
that you can send for the middleware
1:44
this is the thing that will run before
1:45
your request run it is useful to check
1:48
like user permissions or something that
1:49
you want to be executed before before
1:51
every request but you you need to be
1:53
careful with this cuz if you make it
1:55
wrong it's really hard to debug this is
1:57
the code that will run kind of on the
1:59
background you can configure it but it's
2:01
hard to keep track of it so I usually
2:03
work without the middleware or keep it
2:05
as open as possible and then add more
2:08
rules to this I will show you in the
2:10
code base and also we have the custom
2:11
parameters so this is the parameters
2:13
that we will send to our redirect URL to
2:16
add some additional logic cuz
2:17
authentication can be accessed from
2:19
different part of the app let's say one
2:20
user want to uh purchase the plan to
2:23
subscribe straight from the landing page
2:26
so you might pass like a price ID to the
2:28
to the page or like check out
2:30
equals true or something the same goes
2:32
for the free account maybe have like
2:33
different free accounts and you want to
2:35
pass some user permissions or user type
2:37
so it's nice to get get some uh sent a
2:40
parameters so then on the redir URL you
2:42
will be able to execute some logic so
2:44
it's quite simple let's now go to the
Code Organization
2:46
codebase and I will explain everything
2:48
so in the codebase we have them login
2:50
organizational folder you see with the
2:52
brackets it's not going to affect routin
2:53
then they sign in and sign up pages with
2:55
the page TSX and they all share a login
2:58
component basically the L component is
3:00
the main logic of the authentication
3:01
system I will explain in a second but
3:03
before let's just quickly see once again
3:06
so create an account change the text
3:08
here sign in change the text for the
3:09
authentication I use basically same
3:12
action for the sign up a login cuz for
3:14
my case I don't use the uh email and
3:16
password I find it like kind of outdated
3:18
nowadays so I use the magic links and I
3:21
use the Google or other providers like
3:23
for the super base usually what I do the
Supabase Documentation & Setup
3:25
fastest and simplest way just go here
3:28
and open this nice to tutorial that they
3:30
have on the official documentation
3:32
called build a user management app
3:34
nextjs I mean it's basically everything
3:37
we need go here go to the building app
3:40
and start from the first tab just
3:42
install this install the super super GS
3:45
add your environment variables to your
3:47
NV or nvl install superbas SSR and you
3:50
can read in the details why we need this
3:53
main thing it's you need to use or like
3:55
leap folder somewhere in the app to
3:57
store kind of client initialization and
3:59
here like client initialization if you
4:01
want to access super Bas on the client
4:03
and here we have the super Bas
4:04
initialization for the server and we
4:06
also adding the middleware as like
4:07
previously explained so the middle bar
4:09
is just the thing that basically will
4:11
allow will let us run this update
4:13
session um function to refresh the out
4:17
token for the user so the user will be
4:18
authenticated and now we are like
4:21
basically accessing everything we need
4:23
on the login page so now I want to show
4:25
you how I made this all of this and to
4:27
remind you the cleaner version of this
4:29
code this is the project I'm doing
4:31
working on but you will get
4:32
authentication system based on what I
4:34
will show you here by by link on the
4:37
description without all the other logic
4:39
that I have in the app just the old
4:40
system so check it out so now we will I
Supabase Client Configuration
4:43
will explain how I set the super base so
4:45
have I have a u folder I have the super
4:47
base folder inside I have the client as
4:50
you see it's just simple as create a
4:51
client with the environment variables
4:53
the Ser again all everything copied from
4:55
the uh from the documentation from the
4:58
project example but here I also add the
5:00
out option with the parameters of
5:03
refresh token through proceed session
5:05
through the Tex session in url through
5:07
why I'm using this I found that this let
5:09
me keep my users logged in all the time
5:12
I don't like to be logged out
5:13
automatically I want to they to be
5:16
logged in as uh long as possible until
5:19
they like the token expired or they send
5:22
out send out manually by clicking the
5:24
button so I just add this options I find
5:27
it's like much better user experience
5:29
for the middle I just copied from the
Middleware Setup
5:31
update session from the their example
5:33
and I will remind you don't add anything
5:36
before you test the code and before
5:38
you're ready for production cuz I like I
5:41
miss this a lot of times and it's really
5:43
hard to debug you will just be like
5:45
redirected to the or showed an error
5:48
like randomly and you was was just
5:50
wondering why it's happening but this is
5:52
because the middle word so this is the
5:54
middleware in the super base folder and
5:55
we need one more middleware like the
5:57
actual middleware for the next that will
6:00
run the code and here we just just copy
6:03
and paste the code from here from the
6:05
mider where we just using the update
6:06
session that we defined in the in the
6:08
superbas middleware right here so
6:10
basically as you tested the code as you
6:12
ready for production here you will add
6:14
more rules for your middle world let's
6:16
say you want protect some roads or like
6:18
make them not accessible and other so
6:20
you will first test ready for product go
6:23
to production and then you will update
6:25
the middle bar this is how I found like
6:27
the most straightforward way of working
6:29
with this you can test and when you
6:30
ready deployed let's see where are we at
6:33
right now so we discussed UI uh we
Authentication & Redirects
6:35
discussed the middleware um yeah let's
6:37
now talk about them how we like actually
6:40
authenticate and redirect the users so
6:42
this is also really straightforward
6:44
first of all we can send some parameters
6:46
to our um signin or sign up page and by
6:49
search pam.get we will have access to
6:52
these parameters and we are accessing
6:54
search peram by use use search peram
6:56
Hook from nextjs how is it going to look
6:58
in real life so let's say we have this
7:01
application and we want to pass some
7:03
search perm so we will just go like I
7:06
don't know like a redirect equals test
7:11
and
7:12
discount
7:15
equals something so just like this so
7:18
you want you can pass as as many search
7:20
parameters as you want based on your
7:22
logic based on what you trying to
7:24
achieve like create a checkout session
7:26
maybe you need a price ID or or
7:27
something discount if a special discount
7:29
account code like redirect URLs if it's
7:31
like some redirect URLs that can be
7:34
different based on the logic in your app
7:36
we accessing all of this and then we
Client & Server Actions
7:38
have two simple actions why one executed
7:40
on the client handle Google signin and
7:42
one is use exchange State basically form
7:45
action that will execute it on the
7:47
server why I made it this way first to
7:49
show you both approaches and secondly I
7:51
found then when I use the sign in with
7:53
Google on the server um like as a a use
7:56
action State I I find it is for some
7:58
reers it's not directed me to the to the
8:00
Google authentic uh Google oath page I
8:03
don't know why it's happening it might
8:04
be just a bu on my app but it's nice
8:06
also to show you both approaches uh
8:08
handle Google sign in we are crafting
8:10
the r direct to we're using this API out
8:12
call back route that we will discuss we
8:14
will be discussing next we creating the
8:16
client here we are not awaiting it
8:17
because this is the client component
8:19
here from the super based client and we
8:21
are just initializing the thing here and
8:24
passing really important to pass the
8:25
redir two to do redir two we'll have
8:28
access to all the parameters that we
8:30
access it from the search params we kind
8:32
of like duplicate in these parameters to
8:34
our redirect URL this will be needed
8:36
later when we be actually executing the
8:39
logic based on these parameters now we
8:40
passing the provider here important to
8:43
say before we continue you need to go to
Supabase Provider Configuration
8:45
your super base project right here go to
8:47
your providers and just make sure you
8:49
the providers that you need enable just
8:51
go here go to like authentication
8:53
providers and enable like the providers
8:55
you need you see it's a lot of them so
8:57
just choose what you what you want and
8:59
um properly configure them so for like
9:01
so for the let's say for the Google we
9:03
we will need to pass like client secret
9:05
client ID and you can configure and you
9:07
also need to pass this call back URL in
9:10
the Google Cloud console so you when you
9:12
will setting up the project for Google
9:13
authentication just copy this and and
9:15
use it as a the redirect URL you will
9:17
have the option to select the redirect
9:19
URLs like all the possible redirect URLs
9:21
that you allow so just add this don't
9:24
forget to do this yeah so here we
9:26
passing the provider you see we using
9:27
this superway out sign with o out and we
9:30
pass in the provider for Google redirect
9:32
URL some discount codes or empty string
9:35
if it's nothing and redirect for our
9:37
case I just for the test proposes I I
9:39
redirect to test page just to show you
9:41
and here we like uh state to show
9:43
loading and show loading PS for the
9:46
magic link state so the sign sign in
Magic Link Implementation
9:48
with the email to send a magic link like
9:50
pretty much all the same we using the
9:51
use action State this it rodu it in
9:53
react 19 by the way check my uh nextjs
9:56
tutorial Series where we building the AI
9:58
power app I explain how to set up use
10:00
action State properly and correctly so
10:02
in this case we are have the stle with
10:04
the magic link state it can be error or
10:06
success we have the action that will be
10:09
executed on the form submission and we
10:11
have the pending state to show the
10:12
loading indication and we use an use
10:15
action state that is imported from react
10:17
right here use action State we have
10:19
access to the Loading indicator we have
10:20
access to the state so it's easy to pass
10:22
errors or success indications like I
10:25
find it really nice way to work in with
10:27
form submissions and for the form action
10:29
we have this sign in with magic link it
10:31
is validated action it's just is just
10:34
like a helper that basically will let us
10:37
to validate the input so yeah we just
10:39
validating the action here we have this
10:41
console lock I was using for testing I
10:43
will remove it right now so we are
10:44
initializing the create client we are
10:46
waiting this uh we are initializing the
10:48
super base we are create client and we
10:50
accessing a mail press ID this pass from
10:52
our form submission from data you see
10:54
here so this is form data pass as a data
10:56
parameter and here we're just using the
10:58
signning in with OTP with Google we use
11:00
this just uh sign in with o out and here
11:03
with o2p but the same kind of logic pass
11:06
the email pass the options important to
11:09
pass the correct redirect and here I see
11:11
the suggestions to encode it uh why I'm
11:12
using encode let's say in this case like
11:15
this is this needed to be encoded so
11:17
yeah but for example for the price when
11:19
you are sure it's like that just um like
11:22
a normal characters it's not really
11:24
important but let's keep it encoded I
11:26
think it's a nice practice just to
11:27
prevent like bucks and issues here and
11:29
if if error we are sending back the
Form Handling & Error States
11:31
error message so we will show the error
11:33
State and how we are utilizing this you
11:36
see we have this magic link that state
11:38
the success that we will show if the
11:40
success is not empty the same goes for
11:43
the yeah we have the form with action
11:46
that will submit all this you see this
11:48
hidden Fields with the form data it will
11:51
be added to the form data so we will get
11:52
access so if the price ID in the in the
11:54
search baram um not empty we will pass
11:58
it right here
12:00
and you will also see this state. error
12:02
so if the state is error if something
12:04
goes wrong the user will see them what
12:06
is what is like what is wrong with the
12:08
code here is the the way to change the
12:10
mode and for the Google is just one
12:12
button that execute the the logic and
12:14
the loading state so now let me explain
Google Authentication Flow
12:16
what will happen so the you user will
12:18
click uh Google sign sign in we will
12:21
pass all the options the user will be
12:23
redirected to Google link and after a
12:25
successful uh authentication the user
12:27
will be redirected to the basically to
12:29
the URL that we provided what is this
12:32
what is this API out hold back let's see
API Callback Route
12:34
so we need to create a separate API
12:35
route in the API folder you can call it
12:37
whatever you want but I usually make
12:39
like out folder and make like a call
12:41
back folder inside with the radts and
12:43
here we just have the get request we are
12:46
getting everything we passed so all the
12:48
parameters be passed from the client
12:50
that we passed that that we need to like
12:53
change our Logics based on we pass it
12:55
here and we access it here as see we
12:57
decod in the the things we we need to
12:59
access to also we are accessing to the
13:01
code so the code will be added to the
13:03
URL all the time the code will allow to
13:07
super base to exchange the code this is
13:10
the most important thing exchange the
13:12
code for the user session after this
13:14
action after this event the user will be
13:16
authenticated in you app and you will
13:17
have access to the user so this is
13:19
important this is the most important
13:20
thing apart from this everything is like
13:24
um secondary so here we asking the user
13:27
and some commented code that it's
13:30
not not implemented in this app I just
13:33
want you to Showcase let's say we after
13:35
the successful U session code exchange
13:38
we want to create like a default default
13:41
uh data for the user like at the Avatar
13:44
CH change some roles add some
13:46
permissions we can do this here cuz
13:48
after this stab we have the user storage
User Data & Session Management
13:51
so we are like can freely do whatever we
13:53
want with the logic next let's say we
13:56
have the price ID so if you want user to
13:59
see the stripe page with the strip
14:01
product to pay for this here we instead
14:04
of redirecting to the uh to the like a
14:08
page destination page we'll just create
14:10
a checkout session and this checkout
14:12
session will return basically the URL
14:14
toir user to and if nothing is passed
14:17
it's just a regular user execute
14:19
redirect to the redirect to that we
14:21
passed from the URL so in our case it's
14:24
going to be test page like where we will
14:27
show the button to sign out by the way
14:29
quickly mention how to sign out you just
14:31
initialize the client and use the um
14:34
super base. out. sign out just as simple
14:37
as it is so now let's test it and I will
Testing the Authentication
14:39
quickly show you how it's how it's going
14:41
to look like so as you seen previously
14:43
we have this page let's try with the
14:46
Google so I will select one of my
14:47
addresses and now I see I'm
14:49
automatically redirected on the test by
14:51
clicking sign out now I'm here the same
14:54
goes for them for the email see Lo
14:56
loading indications and we see the
14:58
success indication that we successfully
15:00
send them the email I'm not going to
15:02
show you the magic link but basically
15:03
it's the same practice you will just
15:04
receive the link on the your email inbox
15:06
and by click in the link you will be
15:07
redirected and last thing I want to to
15:10
show you so let's say we have this test
15:12
page and I want to access the user so we
15:14
have this clarate client let's also uh
15:17
do const user get a away get user and we
15:20
will console log it to Showcase what we
15:22
get we click Google we click choose the
15:24
same address let's set everything here
15:27
yeah we're getting everything about the
15:28
us so it's working correctly one more
15:30
thing I want to show you before we end
15:32
this video is what is my um way of
Server vs Client Data Fetching
15:36
accessing the user information so i i f
15:39
the user on the server all the time CU
15:41
this is the only way I can have the
15:43
information about the user before the
15:45
page is loaded so I don't really fetch
15:48
it on the on the client but if I need I
15:50
just use the query that I showed you
15:53
this get user get user function that is
15:55
basically just just a WRA around like
15:57
native super based way of getting in the
15:59
user and I execute it like in the user
16:01
fact if I need and store it like in in a
16:03
local state but I try always always try
16:07
to petch it on the on the server and
16:09
pass it down to the client if I need so
16:11
if I need to pass like a like this is my
16:13
client component let's say and I want to
16:16
pass I want to have the access to the
16:17
user there what I will do is I will get
16:20
a prop called user like this and access
16:23
it to the in the client component but it
16:25
will be fed on the server so then I can
16:29
execute and like make sure the
16:31
information in my app is secure and
16:33
everything since correctly so this is it
Conclusion
16:35
I hope this useful this is useful for
16:37
you I hope you found something like
16:38
interesting and something new in this
16:40
video uh please check the code in the
16:42
description get it yourself use it in
16:44
your own projects and build like some
16:45
cool stuff thank you for watching and
16:47
I'll see you in the next video bye-bye
