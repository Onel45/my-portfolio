export const navLinks = [
  ['HOME', '#home'], ['ABOUT', '#about'], ['SKILLS', '#skills'], ['PROJECTS', '#projects'], ['CONTACT', '#contact'],
];

export const skills = [
  { title: 'Programming', text: 'Building a strong foundation in computer science and software development.' },
  { title: 'Web Experiences', text: 'Exploring clean interfaces, responsive layouts, and interactive websites.' },
  { title: 'UI/UX Design', text: 'Designing clear, intuitive interfaces and experiences that feel good to use.' },
  { title: 'Problem Solving', text: 'Breaking big challenges into smaller, practical steps.' },
  { title: 'Basketball', text: 'Discipline, teamwork, resilience, and a constant drive to get better.', gallery: true },
];

export const languages = [
  ['JavaScript', 'Logic & interactivity'],
  ['CSS', 'Styling & layout'],
  ['Python', 'Scripting & backend'],
  ['Java', 'Core programming'],
  ['HTML', 'Structure & markup'],
];

export const communityTags = [
  { text: 'OPEN SOURCE KIGALI ↗', href: 'https://guild.host/open-source-kigali', ext: true },
  { text: 'GOOGLE STUDENT DEVELOPERS ↗', href: 'https://gdsc.community.dev/', ext: true },
  { text: 'MAJOR LEAGUE HACKING (MLH) ↗', href: 'https://mlh.com/about', ext: true },
  { text: 'CONNECT WITH ME ↗', href: '#contact' },
];

export const playgroundTags = [
  { text: 'COMPUTER SCIENCE ↗', href: '#about' },
  { text: 'EXPERIMENTS ↗', href: '#my-work' },
  { text: 'LEARNING ↗', href: '#skills' },
];

export const work = [
  {
    title: 'The Canadian Chef (TCC) App',
    text: "A mobile first food ordering app I designed for the restaurant The Canadian Chef, inspired by kfc.rw and built around the restaurant's real menus and price lists.",
    bullets: [
      'Menu browsing with category chips, search and filters',
      'Item detail pages with quantity stepper and Add to Cart',
      'Mobile money checkout',
      'Separate kitchen screen that displays incoming orders',
    ],
    tags: ['JAVASCRIPT', 'HTML', 'CSS'],
  },
  {
    title: 'Muraho Live',
    text: 'A real time bilingual (English and Kinyarwanda) voice interface for everyday situations in Kigali, like hailing a moto taxi, bargaining at Kimironko market and paying with MTN MoMo. I built it during a hackathon.',
    bullets: [
      'Kigali Street Translator: type an English phrase and get a street style Kinyarwanda translation with live pronunciation',
      'Ready made phrases for moto rides, market prices and mobile payments',
      'Transcribes only when active, and personal audio is not stored',
    ],
    tags: ['HACKATHON', 'KINYARWANDA', 'VOICE'],
    link: { text: 'OPEN MURAHO LIVE ↗', href: 'https://muraho-live.apps.thalesops.com/', ext: true },
  },
  {
    title: 'This Portfolio',
    text: "The site you're on: a responsive, animated personal portfolio I designed and coded by hand, with safe area support for modern phones.",
    bullets: [
      'Responsive on phones, tablets and desktops',
      'Scroll animations and reduced motion support',
      'Direct contact links to WhatsApp, Instagram, Discord and email',
    ],
    tags: ['REACT', 'JAVASCRIPT', 'CSS'],
    link: { text: 'GET IN TOUCH ↗', href: '#contact' },
  },
];

// LinkedIn and GitHub still point to the generic home pages: replace with your profile URLs.
export const contacts = [
  { label: 'Email me', sub: 'oleyonelson88@gmail.com', href: 'mailto:oleyonelson88@gmail.com', aria: 'Email', icon: 'email' },
  { label: 'WhatsApp', sub: '+250 796 696 874', href: 'https://wa.me/250796696874', aria: 'WhatsApp', icon: 'whatsapp', ext: true, wa: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', aria: 'LinkedIn', icon: 'linkedin', ext: true },
  { label: 'GitHub', href: 'https://github.com/', aria: 'GitHub', icon: 'github', ext: true },
  { label: 'Instagram', sub: '@showtimeyeyo', href: 'https://www.instagram.com/showtimeyeyo/?utm_source=ig_web_button_share_sheet', aria: 'Instagram', icon: 'instagram', ext: true },
  { label: 'Discord', href: 'https://discord.com/users/1245124336944152686', aria: 'Discord', icon: 'discord', ext: true },
];

// Photos live in src/assets/gallery (basketball-1.jpg ... basketball-6.jpg). Edit captions and descriptions here.
// `file` is the number in the file name; the order below is the order they appear on the page.
export const gallery = [
  { file: 6, caption: 'Arena day', alt: 'Two players pose together inside an arena' },
  { file: 1, caption: 'Studio day', alt: 'A player in a grey ASK jersey holds a basketball and points at the camera' },
  { file: 2, caption: 'Good company', alt: 'Two players smile and flash peace signs on an outdoor court' },
  { file: 3, caption: 'Studio session', alt: 'A player in a grey ASK jersey sits on the studio floor with a basketball' },
  { file: 4, caption: 'Bench erupts', alt: 'Teammates celebrate on the bench during a game' },
  { file: 5, caption: 'Game face', alt: 'A player in a grey ASK jersey is filmed close up after a game' },
];
