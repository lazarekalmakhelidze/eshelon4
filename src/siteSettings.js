// Contact details, social links and hero numbers. Editable from /admin → „კონტაქტები“.
export const DEFAULT_SETTINGS = {
  tagline: 'ბრენდინგისა და სოციალური მედიის სააგენტო · თბილისი',
  phone: '551 98 15 02',
  whatsapp: '995551981502',
  email: 'tazo.gochelashvili.3@gmail.com',
  email2: 'kalmakhelidzelazare@gmail.com',
  address: 'თბილისი და ქუთაისი, საქართველო',
  facebook: '',
  instagram: '',
  messenger: '',
  responseTime: 'ვპასუხობთ 24 საათში',
  pricingNote: 'ფასები საორიენტაციოა. თითოეულ კომპანიას ინდივიდუალურ შეთავაზებას ვუმზადებთ — ღირებულება არ ითვლება მხოლოდ პოსტების რაოდენობით ან შედეგით: მასში შედის სტრატეგია, დიზაინი და გუნდის სრული ჩართულობა.',
  stats: [
    { value: '100%', label: 'კმაყოფილი კლიენტი' },
    { value: '50+', label: 'შექმნილი იდენტობა' },
    { value: '250%', label: 'ზრდა გაყიდვებში' }
  ]
};

export function mergeSettings(saved) {
  const s = { ...DEFAULT_SETTINGS, ...(saved || {}) };
  if (!Array.isArray(s.stats)) s.stats = DEFAULT_SETTINGS.stats;
  return s;
}

const digits = (v) => String(v || '').replace(/[^0-9]/g, '');

export function telHref(phone) {
  const d = digits(phone);
  if (!d) return '';
  return d.startsWith('995') ? `tel:+${d}` : `tel:+995${d}`;
}

export function whatsappHref(number, text = '') {
  let d = digits(number);
  if (!d) return '';
  if (!d.startsWith('995')) d = `995${d}`;
  return `https://wa.me/${d}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}

export async function sendLead(payload) {
  const res = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, page: typeof window !== 'undefined' ? window.location.pathname : '' })
  });
  let data = {};
  try { data = await res.json(); } catch (e) { /* ignore */ }
  if (!res.ok) {
    const err = new Error(data.error || `HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return data;
}
