# My Next Version of my site

[![.github/workflows/test.yaml](https://github.com/mildronize/blog-next/actions/workflows/test.yaml/badge.svg)](https://github.com/mildronize/blog-next/actions/workflows/test.yaml) [![Coverage Status](https://coveralls.io/repos/github/mildronize/blog-next/badge.svg?branch=main)](https://coveralls.io/github/mildronize/blog-next?branch=main)

Current Version (V.5): <https://thadaw.com> (Gatsby)

## Philosophy
- Using React & TypeScript
- Static site generators
- lowest dependecies as much as possible
- lightweight
- using `markdown` is enough. no need `MDX`

## Feature
- Resolve image locally not from static path
  - When dev mode, serve static `_posts` 
  - Remap image location with post directory
- Auto Generate UUID (in dev mode)
- Short URL Mapping
- Auto-refresh when markdown content changed 

## Start

```bash
make npm target=dev
# or using make dev
```

## My Next version trial

- Hugo theme with [mildronize.github.io (next branch)](https://github.com/mildronize/mildronize.github.io/tree/next)
- Hugo theme [hugo-theme-mild](https://github.com/mildronize/hugo-theme-mild) using webpack5 to render CSS and JS.

## Good Example with MD & MDX Blogging

- https://github.com/leerob/nextjs-prism-markdown

using `next-mdx-remote`

- https://github.com/vercel/next.js/tree/canary/examples/with-mdx-remote
- https://www.youtube.com/watch?v=J_0SBJMxmcw, https://github.com/leighhalliday/next-blog
- [Most complete Next.js Starter with windtail](https://github.com/timlrx/tailwind-nextjs-starter-blog)


## Optimization

https://github.com/cyrilwanner/next-optimized-images

## Write Test for I/O

- [Testing a TypeScript File Read / Write operations app using Jest JS, Mocks, Unit Tests](https://www.youtube.com/watch?v=SRVH0Mcakj0)
- [Testing a TypeScript Cache operations app using Jest JS, Mocks, Unit Tests](https://www.youtube.com/watch?v=8NjWq-xHOOw)
- [Testing a TypeScript Logger operations app using Jest JS, Mocks, Unit Tests](https://www.youtube.com/watch?v=BfA7MosIgik)
- [SOLID Principles Playlist](https://www.youtube.com/watch?v=boEi4SVC45k&list=PLkqz4ywkYlzeAylfC4h_ugGiua554Z7vB)
  - Repo: https://github.com/devbootstrap/SOLID-Principles-Examples-using-Typescript