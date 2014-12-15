![alt tag](https://lh5.googleusercontent.com/-nkc_JUpJGIA/VI0_WRTsNrI/AAAAAAAAAYQ/NmWs_Sz7Arw/w1597-h579-no/birdseye_logo.png)
=====

Birdseye is a tool to monitor and display traceroutes using geolocation on IP addresses.

How It Works
----
Our Software is web based and uses the freegeoip.net api to get geolocation information. when an ip address or a domain is entered, our back-end server runs a traceroute, fetch that data for each ip and returns that information to the front-end in a JSON object. We are using JQuery, underscore and Backbone.js on the front end to structure our code following MVC design methods. We use the Google Maps API to display each location on a map and interact with the markers.

Screenshots
----
To Japan with city data
![alt tag](http://i.imgur.com/omjOgyV.png)
Multiple Urls
![alt tag](http://i.imgur.com/IsauQc1.png)
Packet Capture
![alt tag](http://i.imgur.com/rLR3vnU.png)

Easy Setup With Docker
-----

Manual Setup for Development
-----

We'll start by installing some programs for our dependency management
```
$ sudo apt-get install python-pip 
$ sudo apt-get install npm
$ sudo npm install -g bower
```

We don't want to pollute your environment so install virtualenv
```
$ sudo pip install virtualenv
$ virtualenv ./birdseye/lib/python_modules
$ source ./birdseye/lib/python_modules/bin/activate
```

Now we can safely install our deps
```
$ pip install -r test_requirements.txt
$ bower install
```
Installing MTR-Tiny
```
First remove MTR if you have it:
$ sudo apt-get remove mtr

Now add mtr-tiny
$ sudo apt-get install mtr-tiny
1..2..3..Done!
```

Installing PCap
```
Go to: http://www.tcpdump.org/#latest-release
Look for: libpcap-1.6.2.tar.gz
Download/extract
cd to extracted directory
$ ./configure
$ make
$ sudo make install
1..2..3..Done! (I hope).
```

Now run the webserver accordingly
```
$ python ./manage.py runserver
```
Repo Overview
-----
Backend Code, includeing traceroute, packet capture, and geoip lookup is located in:
birdeye/src/

Front end code, including backbone views and models are located in:
birdseye/static/js

HTML template is located in:
birdseye/templates

CSS file is located in:
birdseye/static/css

Unit tests are located in:
birdseye/tests

KNOWN ISSUES/Features to complete
-----
Features:

Need to create our own local database of GeoIps as to not rely on unstable website apis.
Bootstrap packet capture.
Add more statistics to capture data/MTR data if possible.

BUG:
Figure out why pcap tests don't pass on TravisCI. (They pass just fine locally).

Meet the Team
-----
###### Jennifer D. (Zysh)
* I like to code :D woooOooOooo

###### Lao
* last name Akili

###### Jeremy Thomas
* Double major in Mathematics and Computer Science. Although I do not have a lot of experience, I am interested in backend development.

###### Austen L.
* Hi all. So, yeah. Here I am. With my commit. So, yeah. Enjoy it while you can 'cause I don't plan on doing this often. :)

###### Sebastien Hutt
* Hi! Majoring in CSCI and minor in APCG. I used to be major in APCG but I switched because it wasn't technical enough.
I have been focusing in computer graphics recently but I know Javascript and C, C++ pretty well. I did some Python a long time ago. I never used Git before so I hope this get posted!
