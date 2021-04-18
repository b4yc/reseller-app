# reseller-app

This application allows a reseller to track their inventory and update with sales and restocking. It integrates many features to simplify the reselling process. The application includes a snappy front-end built in Ionic-React and a backend framework in Django Python.

## Prerequisites
There are two package managers used to build this app. Please ensure you have them installed on your system or click on the hyperlink to install them now.
* [Python](https://www.python.org/downloads/)
* Python package manager [pip](https://pip.pypa.io/en/stable/)
* Node package manager [yarn](https://classic.yarnpkg.com/en/docs/install/)

## Usage

Clone this repository:
```bash
git clone https://github.com/b4yc/reseller-app
```
Now you will need two terminals open, and navigate to the directory that you just made. 

On one terminal, navigate into the backend directory.
```bash
cd backend
```
Install the dependencies (we highly recommend using a virtual environment):
```bash
pip install -r requirements.txt
```
Start the server:
```bash
cd reseller
python manage.py runserver
```
The backend should now be deployed at localhost:8000.

On the other terminal, navigate into the front-end directory. 
```bash
cd reseller
```
Install the dependencies:
```bash
yarn install
```
Deploy the application:
```bash
ionic serve
```
A local development server on localhost:8100 should start up and you can now start reZelling!
