import { NextRequest, NextResponse } from 'next/server';
import { i18nRouter } from 'next-i18n-router';
import { i18nRouterConfig } from './localization/i18nRouterConfig';

export async function middleware(request) {
  // const token = await getToken({
  //   req: request,
  //   secret: process.env.AUTH_SECRET,
  // });
  const token = false;
  const { pathname } = request.nextUrl;
  const pathSegments = pathname.split('/').filter(Boolean);

  // Get the actual route by removing the locale prefix if it exists
  let actualRoute = pathname;
  if (
    pathSegments.length > 0 &&
    i18nRouterConfig.locales.includes(pathSegments[0])
  ) {
    actualRoute = '/' + pathSegments.slice(1).join('/');
  }
  //console.log({ token: token?.email, actualRoute });

  // Get current locale
  const locale = i18nRouterConfig.locales.includes(pathSegments[0])
    ? pathSegments[0]
    : i18nRouterConfig.defaultLocale; // If no locale is found, reset it and let the i18nRouter handle it

  // Handle root path redirect with locale
  if (actualRoute === '/' || actualRoute === '') {
    const dashboardUrl = new URL(`${locale}${'/login'}`, request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // // If user is not authenticated and trying to access any route except /login
  // if (!token &&  ) {
  //   const loginUrl = new URL(`/login`, request.url);
  //   return NextResponse.redirect(loginUrl);
  // }

  // // If user is authenticated and trying to access /login
  // if (token && actualRoute.startsWith('/login')) {
  //   const origin = new URL(request.url).origin;
  //   const dashboardUrl = new URL(`${locale}${routes.dashboard.index}`, origin);
  //   return NextResponse.redirect(dashboardUrl);
  // }

  // Handle i18n routing after auth checks
  return i18nRouter(request, i18nRouterConfig);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public|assets|login|svg|favicon.ico|sitemap.xml|robots.txt|OneSignalSDKWorker.js).*)',
  ],
};
