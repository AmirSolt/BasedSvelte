import type { Handle } from '@sveltejs/kit'
import PocketBase from 'pocketbase'
import {PRIVATE_POCKETBASE_URL } from '$env/static/private'
import {PUBLIC_DOMAIN} from '$env/static/public'

export const handle: Handle = async ({ event, resolve }) => {
  
  event.locals.pb = new PocketBase(PRIVATE_POCKETBASE_URL);
  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')
 
  try {
    if (event.locals.pb.authStore.isValid) {
      await event.locals.pb.collection('users').authRefresh()
    }
  } catch (_) {
    event.locals.pb.authStore.clear()
  }

  event.locals.user = event.locals.pb.authStore.model

  const response = await resolve(event)
  response.headers.set(
    'set-cookie',
    event.locals.pb.authStore.exportToCookie({ httpOnly: true })
  )

  return response
}

export async function handleError({ error, event, status, message }) {
	// const eventID = Sentry.captureException(error, {
	// 	extra: { event, status }
	// });

	return {
		message,
	};
}