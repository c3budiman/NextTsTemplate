## How to use this template

- first you need to fork this repo, 
- create new repository in github, 
- in "Repository template" selector choose this template (NextTSTemplate).
- copy the .env.example to .env
- fill in the .env
- and run the script below

```bash
#to install pnpm, if you haven`t already :
#posix system (linux/mac) :
curl -fsSL https://get.pnpm.io/install.sh | sh -
#windows : 
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

```bash
$ pnpm install # install dependency
$ pnpm run dev # start the project in dev environment
$ pnpm run lint # linting
$ pnpm run test # unit testing
$ pnpm run build # build the project
$ pnpm run start # start with the builded project
$ pnpm run analyze # to analyze the bundle size, lib size etc..
```

## Coding Style
- i use airbnb/javascript style, with a litle modification for ease of use.
- you can read more in here : https://github.com/airbnb/javascript