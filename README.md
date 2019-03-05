# Keyworder

A NodeJS script for SEO keywords. It gets the number of results and the monthly search volume from Google and use Excel (.xlsx) files as input and output.

## Prerequisites on Linux & Mac OS

### 1. Install Git latest (https://git-scm.com/downloads)

This will be used to clone this repository on your machine.

### 2. Install NodeJS v8.10.0 (https://nodejs.org/download/release/v8.10.0/)

You need to install NodeJS in version 8.10.0. This will be used to run our scripts.

## Prerequisites on Linux

### 1. Install Chromium dependencies

In the command-prompt, paste the following command and hit the "enter" key:
```sh
sudo apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

## Prerequisites on Windows

### 1. Enable Linux Subsystem

This will allow us to use a Linux command-prompt on Windows 10.

![screenshot_6](https://user-images.githubusercontent.com/6952638/53820348-e48ce400-3f6b-11e9-84ee-c0bc6e80b033.png)

In the command-prompt, paste the following command and hit the "enter" key:
```sh
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```
![screenshot_7](https://user-images.githubusercontent.com/6952638/53820389-f66e8700-3f6b-11e9-952c-967c394feee4.png)

Then, reboot your computer.

### 2. Download Ubuntu command-prompt from Microsoft Store (https://www.microsoft.com/store/productId/9NBLGGH4MSV6)

![screenshot_8](https://user-images.githubusercontent.com/6952638/53820564-4ea58900-3f6c-11e9-98ef-19013f839968.png)

### 3. Configure Ubuntu command-prompt

Launch the Ubuntu command-prompt:

![screenshot_9](https://user-images.githubusercontent.com/6952638/53820683-8c0a1680-3f6c-11e9-95de-8a08ebd31773.png)

Enter a username and a password when asked (password will be invisible when typing):

![screenshot_12](https://user-images.githubusercontent.com/6952638/53820727-a47a3100-3f6c-11e9-94d9-5b286bc29b5a.png)

### 4. Install NodeJS 8.10.0

In the Ubuntu command-prompt, paste the following command and hit the "enter" key:

```sh
sudo apt-get install nodejs
```

You will be asked for the password you set up earlier.

### 5. Install Chromium dependencies

In the Ubuntu command-prompt, paste the following command and hit the "enter" key:
```sh
sudo apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```
