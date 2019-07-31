This repository refers to article https://fruty.io/2019/07/31/building-a-scalable-react-app-with-next-js/

### Procedure

- git clone repo and cf into it

- docker-compose up -d

Create DB table:

docker-compose exec postgres /bin/bash

psql --username=fruty

\i /init/init.sql

\q

exit

Install dependencies for front and back:

docker-compose run front /bin/sh
cd /home/app
npm install
exit

docker-compose run back /bin/sh
cd /home/app
npm install
exit

docker-compose up -d

All containers should now be up, and you can go to http://localhost:3000 in your browser.

### Verifications

- in front/pages/index.js, change the "Next.js example (Main page)" text.
Watch the hot reloading in action. It's very fast!

- open Chrome Dev Tools, network tab. Watch the calls to the server each time you navigate to a
different page. Next.js only loads what you need at any given time!

- when you're on the main page, click on "Go to the DB test page": you should see the values
you entered in the database during initial setup! This means the front successfully queries the api
("back" docker container), which itself successfully connects to the DB.

- docker-compose exec front /bin/sh
cd /home/app/.next/static/development/pages
You can see that Next.js (using webpack) compiled 1 bundle per page, which enables lazy-loading!


### Notes

- we use the seed React app from Material-ui github repo. Material-ui is not necessarily
the go-to UX framework when working with Next.js but it's so good I wanted to use it anyway,
and I highly recommend it.

- we use a nginx load-balancer in front of the dev server, so that we can easily route
API calls to the back docker container, without messing with front dev server parameters.

- do NOT use this setup in production! This is a dev environment! For production you would have
to make Dockerfiles for front and back (front Dockerfile would use among other things "npm run build" command), build those docker containers and use them in docker-compose.yml, instead of mapping source code inside containers with docker filesystem mappings + installing manually dependencies.
