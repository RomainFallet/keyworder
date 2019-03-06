# Keyworder

A NodeJS script for SEO keywords. It gets the number of results and the monthly search volume from Google and use Excel (.xlsx) files as input and output.

## Prerequisites on Mac OS

### 1. Install Git

https://git-scm.com/downloads

This will be used to clone this repository on your machine.

### 2. Install NodeJS v8.10.0 & NPM 3.5.2

https://nodejs.org/download/release/v8.10.0/node-v8.10.0.pkg

You need to install NodeJS in version 8.10.0. This will be used to run our scripts.

### 3. Install Puppeteer

Open a terminal window, run the following command and hit "enter" key:
```sh
sudo npm install -g puppeteer@1.13.0 --unsafe-perm=true --allow-root
```

## Prerequisites on Windows

To ensure consistency between platforms, you need to install the Linux Subsystem for Windows 10. This will provide you a Linux command-prompt inside Windows.

### 1. Enable Linux Subsystem

![screenshot_6](https://user-images.githubusercontent.com/6952638/53820348-e48ce400-3f6b-11e9-84ee-c0bc6e80b033.png)

In the command-prompt, paste the following command and hit the "enter" key:

```sh
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

![screenshot_7](https://user-images.githubusercontent.com/6952638/53820389-f66e8700-3f6b-11e9-952c-967c394feee4.png)

Then, reboot your computer.

### 2. Download Ubuntu command-prompt from Microsoft Store

https://www.microsoft.com/store/productId/9NBLGGH4MSV6

![screenshot_8](https://user-images.githubusercontent.com/6952638/53820564-4ea58900-3f6c-11e9-98ef-19013f839968.png)

### 3. Configure Ubuntu command-prompt

Launch the Ubuntu command-prompt:

![screenshot_9](https://user-images.githubusercontent.com/6952638/53820683-8c0a1680-3f6c-11e9-95de-8a08ebd31773.png)

Enter a username and a password when asked (password will be invisible when typing):

![screenshot_12](https://user-images.githubusercontent.com/6952638/53820727-a47a3100-3f6c-11e9-94d9-5b286bc29b5a.png)

### 4. Follow Linux prerequisites

Now that you have a Linux command-prompt on Windows, use it to install [**Linux prerequisites below**](#prerequisites-on-linux).

## Prerequisites on Linux

### 1. Install Git

This will be used to clone this repository on your machine.

```sh
sudo apt-get update
sudo apt-get -y git-all
```

### 2. Install NodeJS v8.10.0 & NPM 3.5.2

You need to install NodeJS in version 8.10.0. This will be used to run our scripts.
```sh
sudo apt-get install -y nodejs npm
```

### 3. Install Puppeteer dependencies

You need to install these dependencies.
```sh
sudo apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

### 4. Install Puppeteer

Finally, you need to install Puppeteer. The headless Chrome Node API.
```sh
sudo npm install -g puppeteer@1.13.0 --unsafe-perm=true --allow-root
```

## Getting started

### 1. Go into the folder where you want to download the project

```sh
cd /path/to/your/folder/
```

On Windows, in the Ubuntu command-prompt, you can go at the root of your C:/ drive with this command:
```sh
cd /mnt/c/
```

### 2. Download the project

```sh
git clone https://github.com/RomainFallet/keyworder.git
```

### 3. Go into the downloaded project

```sh
cd ./keyworder/
```

### 4. Install the project

First:

```sh
sudo npm install
```

Then:

```sh
npm build
```

## Use the project

### 1. Set up your keyword list

Open the "input.xlsx" file with Excel and fill the first column with the keywords you want:

![screenshot_3](https://user-images.githubusercontent.com/6952638/53822288-c1fcca00-3f6f-11e9-9575-d5d9d698423c.png)

This first line is considered as the header and will not be processed.

### 2. Run the script

```sh
npm start
```

### 3. Get your result

When the script has completed the work, you can view the results in the "output.xlsx" file, generated at the root of the project:

![screenshot_4](https://user-images.githubusercontent.com/6952638/53822592-536c3c00-3f70-11e9-847a-4a6b65cab7cf.png)

The "results" column gives the number of total results from https://www.google.fr:

![screenshot_13](https://user-images.githubusercontent.com/6952638/53822729-99290480-3f70-11e9-8368-bd236d2c4f83.png)

The "volume" column gives the average number of monthly searches for this specific keyword from https://searchvolume.io:

![screenshot_14](https://user-images.githubusercontent.com/6952638/53822887-e7d69e80-3f70-11e9-987d-3812bd872c4a.png)

## Built With

* [NodeJS](https://nodejs.org/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Puppeteer](https://github.com/GoogleChrome/puppeteer) - Headless Chrome Node API.

## Authors

* **Romain Fallet** - *Initial work*

## License

This project is licensed under the Creative Commons Attribution 4.0 International Public License. See [license](https://github.com/RomainFallet/keyworder/blob/master/LICENSE) for details.
