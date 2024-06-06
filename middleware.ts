import {
    clerkMiddleware,
    createRouteMatcher
  } from '@clerk/nextjs/server';
  
  const isProtectedRoute = createRouteMatcher([
    '/trending(.*)',
    '/past-problems(.*)',
    '/save-problems(.*)',
    '/problems(.*)'
  ]);
  
  export default clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) auth().protect();
  });
  
  export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
  };