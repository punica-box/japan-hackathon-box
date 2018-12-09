import { Character } from './types'
import bb8 from './images/bb-8.png'
import bobaFett from './images/boba-fett.png'
import c3Po from './images/c-3po.png'
import chewbacca from './images/chewbacca.png'
import darthMaul from './images/darth_maul.png'
import darthVader from './images/darth-vader.png'
import princessAmidala from './images/princess_amidala.png'
import r2d2 from './images/r2-d2.png'
import royalGuard from './images/royal_guard.png'
import stormtrooper from './images/stormtrooper.png'
import emperor from './images/the_emperor.png'
import yoda from './images/yoda.png'

export const characterMap: { [id: number]: Character } = {
  0: {
    id: 0,
    name: 'BB-8',
    rarity: 'N',
    image: bb8,
    description:
      'BB-8, sometimes spelled and pronounced Beebee-Ate and nicknamed BB, was a BB-series astromech droid who operated approximately thirty years after the Battle of Endor.',
  },
  1: {
    id: 1,
    name: 'BobaFett',
    rarity: 'N',
    image: bobaFett,
    description:
      'Boba Fett was a human male bounty hunter and the genetic clone of the infamous bounty hunter Jango Fett.',
  },
  2: {
    id: 2,
    name: 'C-3PO',
    rarity: 'N',
    image: c3Po,
    description:
      'C-3PO, sometimes spelled See-Threepio and often referred to simply as Threepio, was a 3PO unit protocol droid designed to interact with organics, programmed primarily for etiquette and protocol.',
  },
  3: {
    id: 3,
    name: 'Chewbacca',
    rarity: 'N',
    image: chewbacca,
    description:
      'Chewbacca, known affectionately to his friends as Chewie, was a Wookiee warrior, smuggler, and resistance fighter who fought in the Clone Wars, the Galactic Civil War, and the conflict between the First Order and the Resistance.',
  },
  4: {
    id: 4,
    name: 'DarthMaul',
    rarity: 'R',
    image: darthMaul,
    description:
      'Maul, formerly known as Darth Maul, was a Force-sensitive Dathomirian Zabrak male who lived during the final years of the Galactic Republic and the subsequent reign of the Galactic Empire.',
  },
  5: {
    id: 5,
    name: 'DarthVader',
    rarity: 'SR',
    image: darthVader,
    description:
      'After turning to the dark side of the Force, Anakin Skywalker became known as Darth Vader—Dark Lord of the Sith and apprentice to Emperor Darth Sidious.',
  },
  6: {
    id: 6,
    name: 'PadméAmidala',
    rarity: 'R',
    image: princessAmidala,
    description:
      'Padmé Naberrie of Naboo (publicly known by her regal name, Padmé Amidala, and also known as Her Royal Highness, Queen Amidala of Naboo from 33 BBY to 25 BBY',
  },
  7: {
    id: 7,
    name: 'R2-D2',
    rarity: 'N',
    image: r2d2,
    description:
      'R2-D2, pronounced Artoo-Deetoo and often referred to as Artoo, was an R2-series astromech droid manufactured by Industrial Automaton prior to 32 BBY.',
  },
  8: {
    id: 8,
    name: 'RoyalGuard',
    rarity: 'N',
    image: royalGuard,
    description:
      'RoyalGuard, also known as the Imperial Royal Guard, the Imperial Guard or the Red Guard, was an elite unit whose members served as personal bodyguards to the Galactic Emperor.',
  },
  9: {
    id: 9,
    name: 'Stormtrooper',
    rarity: 'N',
    image: stormtrooper,
    description:
      'Stormtroopers were the assault/policing troops of the Galactic Empire. Dissenting citizens sometimes referred to them as bucketheads, a derogatory nickname inspired by the bucket-shaped helmets of stormtroopers. ',
  },
  10: {
    id: 10,
    name: 'DarthSidious',
    rarity: 'SSR',
    image: emperor,
    description:
      'Darth Sidious, a Force-sensitive human male, was the Dark Lord of the Sith who founded the Galactic Empire after toppling its predecessor, the Galactic Republic from within.',
  },
  11: {
    id: 11,
    name: 'Yoda',
    rarity: 'SSR',
    image: yoda,
    description:
      'Yoda, a Force-sensitive male member of a mysterious species, was a legendary Jedi Master who witnessed the rise and fall of the Galactic Republic, as well as the rise of the Galactic Empire.',
  },
}
