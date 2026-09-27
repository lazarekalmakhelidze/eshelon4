// Default texts for "How we work" and the FAQ. Editable in /admin (tabs „როგორ ვმუშაობთ“ and „კითხვები“).
// These are drafts — facts (timelines, payment, revisions) should be checked by the agency.

export const DEFAULT_PROCESS = [
  {
    id: 'step-1',
    title: 'გაცნობა',
    text: 'ვეცნობით თქვენს ბიზნესს, მიზნებს, აუდიტორიას და კონკურენტებს. ერთად ვავსებთ მოკლე ბრიფს.',
    duration: '',
    en: { title: 'Discovery', text: 'We get to know your business, goals, audience and competitors, and fill in a short brief together.', duration: '' }
  },
  {
    id: 'step-2',
    title: 'სტრატეგია',
    text: 'ვადგენთ მიმართულებას — ვის ველაპარაკებით, რა ტონით და რომელ არხებში.',
    duration: '',
    en: { title: 'Strategy', text: 'We set the direction — who we talk to, in what tone and on which channels.', duration: '' }
  },
  {
    id: 'step-3',
    title: 'დიზაინი და კონტენტი',
    text: 'ვქმნით ვიზუალს და ტექსტებს. ყოველ მნიშვნელოვან ეტაპს თქვენთან ვათანხმებთ.',
    duration: '',
    en: { title: 'Design & content', text: 'We create the visuals and copy, and agree every key step with you.', duration: '' }
  },
  {
    id: 'step-4',
    title: 'გაშვება და ზრდა',
    text: 'ვუშვებთ, ვზომავთ შედეგს და მუდმივად ვაუმჯობესებთ.',
    duration: '',
    en: { title: 'Launch & growth', text: 'We launch, measure the results and keep improving.', duration: '' }
  }
];

export const DEFAULT_FAQ = [
  {
    id: 'faq-1',
    q: 'რატომ არის ფასები საორიენტაციო?',
    a: 'ყველა ბიზნესს განსხვავებული მიზნები, მოცულობა და ამოცანები აქვს. საორიენტაციო ფასი გეხმარებათ, წინასწარ წარმოიდგინოთ ბიუჯეტი, ხოლო ზუსტ, ინდივიდუალურ შეთავაზებას მოკლე საუბრის შემდეგ გიმზადებთ.',
    en: {
      q: 'Why are the prices indicative?',
      a: 'Every business has different goals, scope and tasks. The indicative price helps you plan a budget; we prepare an exact, individual offer after a short conversation.'
    }
  },
  {
    id: 'faq-2',
    q: 'რამდენ ხანში იქნება მზად ჩემი პროექტი?',
    a: 'ვადა პროექტის მოცულობაზეა დამოკიდებული. ზუსტ გრაფიკს პირველივე შეხვედრაზე ვთანხმდებით და მას ვიცავთ.',
    en: {
      q: 'How long will my project take?',
      a: 'It depends on the scope. We agree an exact schedule at the first meeting — and we stick to it.'
    }
  },
  {
    id: 'faq-3',
    q: 'შედის თუ არა რეკლამის ბიუჯეტი ფასში?',
    a: 'არა. ჩვენი ფასი მოიცავს რეკლამის მართვას, ხოლო თავად სარეკლამო ბიუჯეტს (Facebook/Instagram-ზე გადასახდელ თანხას) თქვენს მიზნებზე დაყრდნობით ერთად განვსაზღვრავთ.',
    en: {
      q: 'Is the ad budget included in the price?',
      a: 'No. Our price covers ad management; the ad budget itself (what is paid to Facebook/Instagram) is set together with you based on your goals.'
    }
  },
  {
    id: 'faq-4',
    q: 'რამდენი შესწორება შედის?',
    a: 'შესწორებების რაოდენობას მუშაობის დაწყებამდე ვთანხმდებით, რომ საბოლოო შედეგი ზუსტად თქვენს მოლოდინს შეესაბამებოდეს.',
    en: {
      q: 'How many revisions are included?',
      a: 'We agree the number of revision rounds before we start, so the final result matches exactly what you expect.'
    }
  },
  {
    id: 'faq-5',
    q: 'რა გჭირდებათ ჩემგან დასაწყებად?',
    a: 'მხოლოდ მოკლე საუბარი თქვენს ბიზნესზე, მიზნებსა და აუდიტორიაზე. თუ გაქვთ მაგალითები, რომლებიც მოგწონთ — ესეც დაგვეხმარება. დანარჩენს ჩვენ გავუძღვებით.',
    en: {
      q: 'What do you need from me to start?',
      a: 'Just a short chat about your business, goals and audience. Examples you like help too. We’ll guide you through the rest.'
    }
  }
];

export const DEFAULT_TESTIMONIALS = [];

// Placeholder quotes that show ONLY on the test link (preview / localhost) while no real
// testimonials exist, so the design can be judged. They are marked "ნიმუში / Sample" on the
// page and never appear on the live site. Real quotes (with the client's consent) are added
// in /admin → „შეფასებები“.
export const SAMPLE_TESTIMONIALS = [
  {
    id: 'sample-1',
    sample: true,
    quote: 'ეშელონთან მუშაობის შემდეგ ჩვენი ბრენდი ბევრად უფრო ცნობადი გახდა. გუნდი ყოველთვის დროულად აბარებს სამუშაოს და ყველა დეტალს წინასწარ გვითანხმებს.',
    name: 'კლიენტის სახელი',
    role: 'დამფუძნებელი',
    company: 'კომპანია',
    en: { quote: 'Since working with Eshelon our brand has become far more recognisable. The team always delivers on time and agrees every detail with us in advance.', name: 'Client name', role: 'Founder', company: 'Company' }
  },
  {
    id: 'sample-2',
    sample: true,
    quote: 'სოციალური მედია სრულად ეშელონს გადავაბარეთ — ახლა მეტი შეტყობინება და შეკვეთა შემოდის, ჩვენ კი ჩვენს საქმეზე ვართ კონცენტრირებული.',
    name: 'კლიენტის სახელი',
    role: 'მარკეტინგის მენეჯერი',
    company: 'კომპანია',
    en: { quote: 'We handed our social media over to Eshelon completely — more messages and orders come in now, and we can focus on our own work.', name: 'Client name', role: 'Marketing manager', company: 'Company' }
  },
  {
    id: 'sample-3',
    sample: true,
    quote: 'ლოგოდან ბრენდბუქამდე — ყველაფერი ერთ ადგილას და მაღალ დონეზე გაკეთდა.',
    name: 'კლიენტის სახელი',
    role: 'დირექტორი',
    company: 'კომპანია',
    en: { quote: 'From the logo to the brand book — everything done in one place, and done well.', name: 'Client name', role: 'Director', company: 'Company' }
  }
];

// The test link (preview.eshelon4.pages.dev, other *.eshelon4.pages.dev builds) and local testing.
export function isTestHost() {
  if (typeof window === 'undefined') return false;
  const h = window.location.hostname;
  if (h === 'localhost' || h === '127.0.0.1') return true;
  return h.endsWith('.eshelon4.pages.dev');
}

