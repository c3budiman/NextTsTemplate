## Getting it Started

if you have npm, just use npm. but if you would like to move into pnpm. then install pnpm first. why pnpm? faster, and efficient disk!

```bash
#to install pnpm :
#posix :
curl -fsSL https://get.pnpm.io/install.sh | sh -
#windows : 
iwr https://get.pnpm.io/install.ps1 -useb | iex
```
finally if u have pnpm then you can run this :
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