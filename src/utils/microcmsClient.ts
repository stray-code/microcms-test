import { createClient } from 'microcms-js-sdk'

export const cmsClient = createClient({
  serviceDomain: 'hke0ar7pmq',
  apiKey: import.meta.env.VITE_MICROCMS_API_KEY,
})
