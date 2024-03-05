import type { Handle } from '@sveltejs/kit'
import PocketBase from 'pocketbase'
import {PRIVATE_POCKETBASE_URL } from '$env/static/private'
import {PUBLIC_DOMAIN} from '$env/static/public'

export const handle: Handle = async ({ event, resolve }) => {
  
  event.locals.pb = new PocketBase(PRIVATE_POCKETBASE_URL);
  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')
 
  if (event.locals.pb.authStore.isValid){
    event.locals.user = event.locals.pb.authStore.model
  } else {
    event.locals.user = null
  }

  const response = await resolve(event)
  response.headers.set(
    'set-cookie',
    event.locals.pb.authStore.exportToCookie({ httpOnly: true })
  )

  return response
}