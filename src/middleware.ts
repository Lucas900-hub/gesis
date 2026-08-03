import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // 1. D'abord, gérer l'authentification Supabase pour toutes les requêtes,
  // particulièrement important pour les routes /admin
  const response = await updateSession(request);

  // Si on est sur une route admin, on retourne la réponse de Supabase 
  // (qui gère la redirection si non autorisé)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Si Supabase a décidé de rediriger (ex: vers /admin/login), on suit sa décision
    if (response.headers.get('location')) {
      return response;
    }
    // Sinon, on laisse passer (l'utilisateur est connecté)
    return response;
  }
  
  // 2. Pour les autres routes, appliquer l'internationalisation
  // On s'assure de passer les cookies mis à jour par Supabase à next-intl
  return intlMiddleware(request);
}

export const config = {
  // Skip all paths that should not be internationalized or protected
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
