# Installation

- Install Node.js 20
- Install Nginx
- Install MongoDB
- Install PM2

## Nginx Configuration

Remove the default configuration file:

```bash
sudo unlink /etc/nginx/sites-enabled/default
```

Create two new configuration files:
- `/etc/nginx/sites-available/frontend`
- `/etc/nginx/sites-available/backend`

with the following content:

- Frontend: 
```nginx
server {
    listen 80 default_server;
    server_name tc-syd-02.insa-lyon.fr;
    return 301 https://tc-syd-02.insa-lyon.fr$request_uri;
}

server {
    listen 443 ssl;
    server_name tc-syd-02.insa-lyon.fr;

    ssl_certificate /etc/ssl/certs/tc-syd-02_insa-lyon_fr.crt;
    ssl_certificate_key /etc/ssl/certs/tc-syd-02_insa-lyon_fr.key;

    gzip on;
    gzip_types      text/plain application/json;

    root /home/gamification/gamification/front/dist/front/browser/;

    location / {
      index  index.html;
      try_files $uri $uri/ /index.html;
    }

    error_page   500 502 503 504  /50x.html;

    location = /50x.html {
      root   /usr/share/nginx/html;
    }

    location ~* (\.html|\/sw\.js)$ {
      expires -1y;
      add_header Pragma "no-cache";
      add_header Cache-Control "public";
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|json)$ {
      expires 1y;
      add_header Cache-Control "public, immutable";
    }
}
```
- Backend:
```nginx
server{
    listen 80;
    server_name api.tc-syd-02.insa-lyon.fr;
    return 301 https://api.tc-syd-02.insa-lyon.fr$request_uri;
}

server{
    listen 443 ssl;
    server_name api.tc-syd-02.insa-lyon.fr;
    ssl_certificate /etc/ssl/certs/tc-syd-02_insa-lyon_fr.crt;
    ssl_certificate_key /etc/ssl/certs/tc-syd-02_insa-lyon_fr.key;
    gzip on;
    gzip_types      text/plain application/json;

    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_pass http://127.0.0.1:3000;
    }
}
```

Then, create a symbolic link to enable the configuration files:

```bash
sudo ln -s /etc/nginx/sites-available/frontend /etc/nginx/sites-enabled/frontend
sudo ln -s /etc/nginx/sites-available/backend /etc/nginx/sites-enabled/backend
```

Finally, restart Nginx:

```bash
sudo service nginx restart
```

## MongoDB Configuration

Create a database named `syd` and a user with read and write access to this database.

## Backend Configuration
Copy the `backend` folder to the server.
Create a `.env` file in the `backend` folder with the following content:

```bash
FRONTEND_URL=the url of the frontend
MONGO_URI=mongodb://user:password@localhost:27017/syd
ENV=prod
ACCESS_TOKEN_SECRET=a strong secret
COOKIE_SECRET=another strong secret
```

Install the dependencies:

```bash
npm install
```

Start the backend:

```bash
pm2 start ./src/app/app.js --name syd-backend
```

## Frontend Configuration

Build the frontend:

```bash
npm run build -- --configuration production
```

Then edit the permissions of the `browser` folder:

```bash
chmod -R a+rx /home/gamification/gamification/front/dist/front/browser/
``` 

## PM2 Configuration

With the backend running, save the current processes:

```bash
pm2 save
```

Then, generate the startup script:

```bash
pm2 startup
```

Finally, restart the backend:

```bash
pm2 restart syd-backend
```


