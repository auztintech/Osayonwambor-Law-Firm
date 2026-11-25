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
    id: 'christopher-o',
    name: 'Christopher Okunbor',
    role: 'Partner',
    note: '',
  },
  {
    id: 'Jennifer-a',
    name: 'Jennifer Agbontean',
    role: 'Partner',
    note: '',
  },
  {
    id: 'omoh-asun',
    name: 'Omeh-Asun Bridget',
    role: 'Associate',
    note: '',
  },
  {
    id: 'Gloria-u',
    name: 'Gloria Ugbodaga',
    role: 'Associate',
    note: '',
  },
  {
    id: 'au-onwodi',
    name: 'Moses Aiwikhoe',
    role: 'Associate',
    note: '',
  },
  {
    id: 'oo-obaseki',
    name: 'O.O. Okaseki',
    role: 'Associate',
    note: '',
  },
  {
    id: 'up-omorege',
    name: 'U. P. Omorege',
    role: 'Associate',
    note: '',
  },
]

export const partners = list.map((p) => ({ ...p, photo: photoFor(p.id) || p.fallback || null }))
