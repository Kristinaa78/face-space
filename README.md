# BASED app 


## Setup
1. Install  Node.js versioin manager - [nvm](https://github.com/nvm-sh/nvm)

2. With `nvm` install Node.js 16.18.0:
```bash
nvm install 16.18.0
nvm use 16.18.0
```
3. Clone repository and go to ClientApp directory

```bash
git clone git@github.com:team-based/based-app.git
cd based-app/ClientApp
```
4. Install dependencies with npm and try compiling the frontend: 
```
npm install
npm run build
```
5. Install [.NET 6](https://dotnet.microsoft.com/en-us/download/dotnet/6.0).
6. Check installation:
```
dotnet --version
```
## Usage
1. In root directory
```bash
dotnet run
```