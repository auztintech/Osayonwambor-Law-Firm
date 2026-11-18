/**
 * Partners shown on the home page and the Partners page.
 *
 * Photos: drop a portrait into src/assets/partners/ named after the partner's
 * `id` (e.g. src/assets/partners/a-osayomwanbor.jpg). jpg, jpeg, png and webp
 * all work, and it is picked up automatically. Portrait photos (about 4:5)
 * look best. Until a photo is added, a monogram card is shown instead.
 *
 * TODO: replace the placeholder partners below with the real names and roles.
 */
import principalPhoto from '../assets/hero.png'

const photos = import.meta.glob('../assets/partners/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

const photoFor = (id) =>
  Object.entries(photos).find(([path]) => path.split('/').pop().split('.')[0] === id)?.[1]

const list = [
  {
    id: 'a-osayomwanbor',
    name: 'Barr. A. Osayomwanbor',
    role: 'Principal Partner',
    note: 'Solicitor & Notary Public',
    // the hero photograph is used until a dedicated portrait is added
    fallback: principalPhoto,
    focus: '58% 12%',
  },
  {
    id: 'partner-2',
    name: 'Partner Name',
    role: 'Partner',
    note: 'Litigation & Dispute Resolution',
  },
  {
    id: 'partner-3',
    name: 'Partner Name',
    role: 'Partner',
    note: 'Corporate & Commercial Law',
  },
  {
    id: 'partner-4',
    name: 'Associate Name',
    role: 'Associate',
    note: 'Land & Property Law',
  },
]

export const partners = list.map((p) => ({ ...p, photo: photoFor(p.id) || p.fallback || null }))
