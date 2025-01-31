/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as UsersImport } from './routes/users'
import { Route as RegisterImport } from './routes/register'
import { Route as QuestionsImport } from './routes/questions'
import { Route as PostImport } from './routes/post'
import { Route as MyPostsImport } from './routes/my-posts'
import { Route as LoginImport } from './routes/login'
import { Route as AccountImport } from './routes/account'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const UsersRoute = UsersImport.update({
  id: '/users',
  path: '/users',
  getParentRoute: () => rootRoute,
} as any)

const RegisterRoute = RegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const QuestionsRoute = QuestionsImport.update({
  id: '/questions',
  path: '/questions',
  getParentRoute: () => rootRoute,
} as any)

const PostRoute = PostImport.update({
  id: '/post',
  path: '/post',
  getParentRoute: () => rootRoute,
} as any)

const MyPostsRoute = MyPostsImport.update({
  id: '/my-posts',
  path: '/my-posts',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AccountRoute = AccountImport.update({
  id: '/account',
  path: '/account',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/account': {
      id: '/account'
      path: '/account'
      fullPath: '/account'
      preLoaderRoute: typeof AccountImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/my-posts': {
      id: '/my-posts'
      path: '/my-posts'
      fullPath: '/my-posts'
      preLoaderRoute: typeof MyPostsImport
      parentRoute: typeof rootRoute
    }
    '/post': {
      id: '/post'
      path: '/post'
      fullPath: '/post'
      preLoaderRoute: typeof PostImport
      parentRoute: typeof rootRoute
    }
    '/questions': {
      id: '/questions'
      path: '/questions'
      fullPath: '/questions'
      preLoaderRoute: typeof QuestionsImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/users': {
      id: '/users'
      path: '/users'
      fullPath: '/users'
      preLoaderRoute: typeof UsersImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/account': typeof AccountRoute
  '/login': typeof LoginRoute
  '/my-posts': typeof MyPostsRoute
  '/post': typeof PostRoute
  '/questions': typeof QuestionsRoute
  '/register': typeof RegisterRoute
  '/users': typeof UsersRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/account': typeof AccountRoute
  '/login': typeof LoginRoute
  '/my-posts': typeof MyPostsRoute
  '/post': typeof PostRoute
  '/questions': typeof QuestionsRoute
  '/register': typeof RegisterRoute
  '/users': typeof UsersRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/account': typeof AccountRoute
  '/login': typeof LoginRoute
  '/my-posts': typeof MyPostsRoute
  '/post': typeof PostRoute
  '/questions': typeof QuestionsRoute
  '/register': typeof RegisterRoute
  '/users': typeof UsersRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/account'
    | '/login'
    | '/my-posts'
    | '/post'
    | '/questions'
    | '/register'
    | '/users'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/account'
    | '/login'
    | '/my-posts'
    | '/post'
    | '/questions'
    | '/register'
    | '/users'
  id:
    | '__root__'
    | '/'
    | '/account'
    | '/login'
    | '/my-posts'
    | '/post'
    | '/questions'
    | '/register'
    | '/users'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AccountRoute: typeof AccountRoute
  LoginRoute: typeof LoginRoute
  MyPostsRoute: typeof MyPostsRoute
  PostRoute: typeof PostRoute
  QuestionsRoute: typeof QuestionsRoute
  RegisterRoute: typeof RegisterRoute
  UsersRoute: typeof UsersRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AccountRoute: AccountRoute,
  LoginRoute: LoginRoute,
  MyPostsRoute: MyPostsRoute,
  PostRoute: PostRoute,
  QuestionsRoute: QuestionsRoute,
  RegisterRoute: RegisterRoute,
  UsersRoute: UsersRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/account",
        "/login",
        "/my-posts",
        "/post",
        "/questions",
        "/register",
        "/users"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/account": {
      "filePath": "account.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/my-posts": {
      "filePath": "my-posts.tsx"
    },
    "/post": {
      "filePath": "post.tsx"
    },
    "/questions": {
      "filePath": "questions.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/users": {
      "filePath": "users.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
