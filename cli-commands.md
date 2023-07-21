
## Commands:

- First login:
`ssh root@<your-server-ip>`

- Update Linux packages:
`apt update` & `apt upgrade`

- Create user and add to sudo group:
`adduser <username>` & `usermod -aG sudo <username>`

- Logout from server:
`logout`

- Login as user:
`ssh <username>@<your-server-ip>`

- Check if sudo works:
`sudo -v`

- Create SSH key folder:
`mkdir ~/.ssh && chmod 700 ~/.ssh`

- Generate SSH keys (run on your local machine):
`ssh-keygen -b 4096`

- Send SSH keys to server:
  - Windows: `scp $env:USERPROFILE/.ssh/id_rsa.pub <username>@<your-server-ip>:~/.ssh/authorized_keys`
  - Windows: `scp %userprofile%/.ssh/id_rsa.pub <username>@<your-server-ip>:~/.ssh/authorized_keys`
  - Mac: `scp ~/.ssh/id_rsa.pub <username>@<your-server-ip>:~/.ssh/authorized_keys`
  - Linux: `ssh-copy-id <username>@<your-server-ip>`

- Open SSH configuration:
`sudo nano /etc/ssh/sshd_config`

- List of reserved ports you should avoid for SSH:
https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml

- Restart SSH:
`sudo systemctl restart sshd`

- Login as user with your new SSH port:
`ssh <username>@<your-server-ip> -p <ssh-port-number>`

- Install Firewall:
`sudo apt install ufw`

- Show Firewall status:
`sudo ufw status`

- Allow ports in Firewall:
`sudo ufw allow` + `<ssh-port-number>` / `http` / `https`

- Enable Firewall:
`sudo ufw enable`

- Disable Firewall:
`sudo ufw disable`

- Modify Firewall rules:
`sudo nano /etc/ufw/before.rules`
  - Disable pings:
`-A ufw-before-input -p icmp --icmp-type echo-request -j DROP`

- Reboot server:
`sudo reboot`

- NodeJS installation commands:
https://github.com/nodesource/distributions#installation-instructions

- Check Node + NPM version:
`node --version`, `npm --version`

- Install Git & check version:
`sudo apt install git`, `git --version`

- Create an apps folder:
`mkdir apps`

- See files inside a folder:
`ls` (+ `-a` to show hidden files)

- Change directory:
`cd` + `<folder-name>` / `..` (go back)

- Clone your repository:
`git clone <your-repo-url>`
  - If you want to use my repo: https://github.com/codinginflow/nextjs-express-typescript-course
  - Pull latest changes: `git fetch` + `git pull`

- Create a file with Nano:
`nano <filename>`

- Install packages (inside `backend` folder):
`npm install`

- Install + start Redis:
`sudo apt-get install redis`, `sudo service redis-server start`

- Show all Redis database entries:
`redis-cli keys "*"`

- Compile TypeScript:
`npx tsc`

- PM2 docs (with commands):
https://pm2.keymetrics.io/
	- Note: You need to prepend `sudo` when installing PM2 globally

- Start server with PM2 (after compiling TypeScript):
`pm2 start dist/server.js`

- Restart after editing
pm2 restart server


pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u oc --hp /home/oc

- Install NGINX:
`sudo apt install nginx`

- Modify NGINX configuration:
`sudo nano /etc/nginx/sites-available/default`

  - NGINX config changes (pay attention to the comments):
  ``` 
  server_name api.sample.com; # Use your own domain
  
  location / {
		proxy_pass http://localhost:5000; # Use your own port
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection 'upgrade';
		proxy_set_header Host $host;
		proxy_cache_bypass $http_upgrade;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Host $host;
		proxy_set_header X-Forwarded-Proto $scheme;
  }
  ```
  
- Check if NGINX config is valid:
  `sudo nginx -t`
  
- Restart NGINX:
  `sudo service nginx restart`
  
  
- Certbot instructions (SSL):
  https://certbot.eff.org/
