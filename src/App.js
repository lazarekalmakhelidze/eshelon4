import './style.css';



import React, { useEffect, useState } from 'react';
import PosterFolio from './components/PosterFolio';

import {

  Compass,

  Award,

  Target,

  Layers,

  ChevronRight,

  CheckCircle,

  TrendingUp,

  Zap,

  Smartphone,

  FileText,

  ArrowRight,

  MessageSquare,

  Menu,

  X,

  MapPin,

  Mail,

  Phone,

  ExternalLink,

  CalendarDays,

  ChevronDown,

  Info,

  Sliders,

  Send,

  Check,

  BrainCircuit,

  Lock

} from 'lucide-react';



// Echelon Branding Assets and Case Studies

const portfolioData = [

  {

    id: 'lokross',

    title: 'LOKROSS',

    category: 'ბრენდინგი & იდენტობა',

    description: 'ლოკროსი წარმოადგენს გეომეტრიული სიზუსტისა და პრემიუმ ვიზუალის სინთეზს. ოპტიკურად დაბალანსებული მონოგრამა იდეალურად ერგება ნებისმიერ მედიუმს.',

    longDescription: 'ჩვენ შევქმენით მყარი, გეომეტრიული სტრუქტურა, სადაც წრეებისა და ხაზების ოპტიკური ბალანსი ქმნის პრემიუმ კლასის იდენტობას. ლოგო ადაპტირებულია სამშენებლო ჩაფხუტებიდან დაწყებული iOS-ის აპლიკაციის აიქონამდე. განსაკუთრებული აქცენტი გაკეთდა B ბლოკის გაყიდვების კამპანიაზე, სადაც გამოყენებულ იქნა დინამიური 3D "Drape" ეფექტი.',

    color: '#00c853',

    bgClass: 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400',

    coverImage: '/optimized/portfolio/lokross-cover.jpg',

    tags: ['Brand Guidelines', 'Logo Design', 'Grid System', '3D Drape Concept'],

    features: ['ოპტიკურად დაბალანსებული გრიდი', 'მონოგრამის არქიტექტურა', '3D პოსტერების სერია']

  },

  {

    id: 'west-dev',

    title: 'West Development',

    category: 'ინდუსტრიული ბრენდინგი',

    description: 'ურბანული და სამშენებლო ხასიათის მქონე იდენტობა, სადაც გამოყენებულია მწვანე კონტეინერების 3D ესთეტიკა და ყვითელი გამაფრთხილებელი ლენტის ელემენტები.',

    longDescription: 'West Development-ისთვის შევიმუშავეთ ინდუსტრიული და ხასიათიანი იდენტობა. ლოგოს გეომეტრია სრულყოფილად ასახავს სიზუსტეს. ბრენდისთვის შერჩეული ტიპოგრაფია (Bebas Neue + Helvetica Neue) კლასიკური, მუშა და სტაბილური ბიზნეს იმიჯის გარანტიაა.',

    color: '#ffab00',

    bgClass: 'bg-amber-950/40 border-amber-500/30 text-amber-400',

    coverImage: '/optimized/portfolio/west.jpg',

    tags: ['Industrial Design', 'Bebas Neue', '3D Container Rendering', 'Caution Tape Theme'],

    features: ['მკაფიო ტიპოგრაფიული იერარქია', 'გრიდზე დასმული გეომეტრია', 'სოციალური მედიის დინამიური ბანერები']

  },

  {

    id: 'foodly',

    title: 'Foodly',

    category: 'მობაილ აპლიკაცია & Mascot',

    description: 'მეგობრული პანდას ილუსტრაცია და პინისა და ჩანგლის გაერთიანება ჭკვიანურ ლოგოში. ნარინჯისფერი და ლურჯი ფერების ენერგიული კონტრასტი.',

    longDescription: 'Foodly-სთვის შექმნილი ლოგო აერთიანებს ადგილმდებარეობის პინსა და ჩანგალს, რაც პირდაპირ მიანიშნებს მიტანის სერვისზე. პერსონაჟი (Mascot) - საყვარელი პანდა - მომხმარებელთან ამყარებს ემოციურ კავშირს, ხოლო UI ელემენტები და კაშკაშა ფერები ზრდის კონვერსიას და აპლიკაციას ხდის მიმზიდველს.',

    color: '#2979ff',

    bgClass: 'bg-blue-950/40 border-blue-500/30 text-blue-400',

    coverImage: '/optimized/portfolio/foodly.jpg',

    tags: ['App UI/UX', 'Mascot Design', 'Vibrant Contrast', 'Brand Mascot'],

    features: ['ანიმაციური პერსონაჟი', 'ილუსტრირებული შეფუთვები', 'Clickable UI სტრუქტურა']

  },

  {

    id: 'panorama',

    title: 'Panorama Group & Solo CH 51',

    category: 'პრემიუმ კამპანიები',

    description: 'ქუთაისის ისტორიული კოლაჟი, ავტომობილების მასშტაბური გათამაშება და Solo-სთან კოლაბორაციით შექმნილი პრემიუმ არქიტექტურული ვიზუალი.',

    longDescription: 'Panorama-სთვის შექმნილი კოლაჟური ხელოვნება ქუთაისის 3500 წლიან ისტორიაზე ძლიერ ემოციურ გავლენას ახდენს. SOLO CH 51-თან კოლაბორაციაში კი დავიჭირეთ პრემიუმ სეგმენტის შეგრძნება მუქი ლურჯი, ოქროსფერი და თეთრი ფერების დახვეწილი ბალანსითა და სუფთა არქიტექტურული რენდერებით.',

    color: '#d500f9',

    bgClass: 'bg-fuchsia-950/40 border-fuchsia-500/30 text-fuchsia-400',

    coverImage: '/optimized/portfolio/panorama.jpg',

    tags: ['Premium Marketing', 'Historical Collage', '3D Render Presentation', 'Solo Collaboration'],

    features: ['მაღალი კლასის ტიპოგრაფია', 'ემოციური ვიზუალური ნარატივი', 'გაყიდვებზე ორიენტირებული რენდერები']

  },

  {

    id: 'education',

    title: 'საგანმანათლებლო პოსტერები',

    category: 'საიმიჯო & ფილოსოფიური სერია',

    description: '„არ გაუშვა შანსი ხელიდან“ — ბეთჰოვენის, ჯორდანის, ტესლასა და არმსტრონგის მაგალითზე აგებული მისტიკური, მოტივაციური კამპანია.',

    longDescription: 'ეს სერია აგებულია ძლიერ ფილოსოფიურ იდეაზე: "წარმოიდგინე, რომ ბეთჰოვენის სიყრუე დასასრულად ჩათვლილიყო...". მუქი, მისტიკური განათებები, დრამატული ტიპოგრაფია და გრეხილი ტექსტები მომხმარებლის მზერას აჯაჭვებს და აიძულებს ბოლომდე წაიკითხოს ბრენდის სათქმელი.',

    color: '#ff1744',

    bgClass: 'bg-red-950/40 border-red-500/30 text-red-400',

    coverImage: '/optimized/portfolio/education.jpg',

    tags: ['Copywriting', 'Storytelling', 'Dramatic Lighting', 'Typography Art'],

    features: ['ღრმა სთორითელინგი (Storytelling)', 'კინემატოგრაფიული დიზაინი', 'მაღალი ორგანული ჩართულობა']

  },

  {

    id: 'beone-apres-ski',

    title: 'BeOne Apres-Ski კამპანია',

    category: 'სოციალური მედია & სეზონური კამპანია',

    description: 'გოდერძის სეზონური შეთავაზებისთვის შექმნილი ვინტაჟურ-კინემატოგრაფიული ვიზუალები, რომლებიც აერთიანებს მოგზაურობის ემოციას და გაყიდვით მესიჯს.',

    longDescription: 'BeOne-ისთვის შევქმენით მრავალფორმატიანი სოციალური მედიის კამპანია: სასტუმროს აპარტამენტების შეთავაზებები, 20%-იანი ფასდაკლების კომუნიკაცია და Apres-Ski განწყობის ძლიერი ვიზუალური ხაზი. დიზაინში გამოყენებულია ნოსტალგიური ტექსტურები, თბილი ფერთა ტონი და დინამიკური ტიპოგრაფია, რათა პოსტები ერთდროულად იყოს დასამახსოვრებელი, ინფორმაციული და კონვერტაციაზე ორიენტირებული.',

    color: '#06b6d4',

    bgClass: 'bg-cyan-950/40 border-cyan-500/30 text-cyan-300',

    coverImage: '/optimized/portfolio/b1-qav.jpg',

    modalImage: '/optimized/portfolio/b1.jpg',

    modalImageScrollable: true,

    tags: ['Campaign Design', 'Social Media', 'Hospitality Branding', 'Apres-Ski Visuals'],

    features: ['სეზონური შეთავაზებების შეფუთვა', 'კარუსელისა და ქარდების ერთიანი სისტემა', 'ვიზუალი + გაყიდვითი მესიჯინგი']

  }

];



const extraPortfolioData = [

  {

    id: 'athome-ge',

    title: 'Athome.ge',

    category: 'სოციალური მედია კამპანია',

    description: 'ატ ჰოუმისთვის შესრულებული ენერგიული სარეკლამო ვიზუალები ტექნოლოგიური შეთავაზებების კომუნიკაციისთვის.',

    longDescription: 'Athome.ge-სთვის შევქმენით მაღალჩართულობაზე ორიენტირებული ქარდების სერია, სადაც ერთ სივრცეში ერთიანდება შეთავაზება, პროდუქტი და მკაფიო ქოლ-თუ-ექშენი. ვიზუალები შექმნილია სწრაფი აღქმისა და მობილურ არხებში უკეთესი შესრულებისთვის.',

    color: '#ef4444',

    bgClass: 'bg-red-950/40 border-red-500/30 text-red-400',

    coverImage: '/optimized/portfolio/athome-ge.jpg',

    modalImage: '/optimized/portfolio/athome-ge.jpg',

    tags: ['SMM Campaign', 'Promo Visual', 'Performance Creative'],

    features: ['სარეკლამო ქარდების სერია', 'შეთავაზებაზე ორიენტირებული ვიზუალი', 'მობილურზე ადაპტირებული ფორმატი']

  },

  {

    id: 'mochiko',

    title: 'მოჩიკო',

    category: 'კონტენტის დიზაინი & SMM',

    description: 'დესერტის ბრენდისთვის ფერადი, ემოციური და პროდუქტისადმი ორიენტირებული კონტენტ-ქარდების პაკეტი.',

    longDescription: 'მოჩიკოსთვის შევქმენით კონტენტის ერთიანი ვიზუალური სისტემა: აქცენტები გემოზე, სეზონურ შეთავაზებებზე და დელივერის არხებზე. თითოეული ქარდი გათვლილია როგორც ბრენდის ცნობადობაზე, ისე შეკვეთების ზრდაზე.',

    color: '#a855f7',

    bgClass: 'bg-violet-950/40 border-violet-500/30 text-violet-300',

    coverImage: '/optimized/portfolio/mochiko.jpg',

    modalImage: '/optimized/portfolio/mochiko.jpg',

    modalImages: Array.from({ length: 20 }, (_, i) => `/optimized/portfolio/mochiko/${i + 1}.jpg`),

    tags: ['Food Content', 'Brand Visuals', 'Social Media'],

    features: ['პროდუქტზე ფოკუსირებული კომუნიკაცია', 'შეთავაზებების ვიზუალური პაკეტი', 'ბრენდთან შესაბამისი ფერთა სტილი']

  },

  {

    id: 'hakken-restaurant',

    title: 'რესტორანი ჰაკენი',

    category: 'რესტორნის სარეკლამო კამპანია',

    description: 'რესტორნის კონტენტისთვის შექმნილი დრამატული, კონტრასტული და გამორჩეული სოციალური მედიის დიზაინები.',

    longDescription: 'ჰაკენის პროექტში მთავარი აქცენტი გაკეთდა ძლიერი პერსონაჟული სტილისა და პროდუქტის ვიზუალური დრამატიზაციის კომბინაციაზე. შედეგად მივიღეთ ქარდების სერია, რომელიც აუდიტორიის ყურადღებას სწრაფად იპყრობს და მენიუს პოზიციებს ეფექტურად ყიდის.',

    color: '#f97316',

    bgClass: 'bg-orange-950/40 border-orange-500/30 text-orange-300',

    coverImage: '/optimized/portfolio/hakken-restaurant.jpg',

    modalImage: '/optimized/portfolio/hakken-restaurant.jpg',

    tags: ['Restaurant Creative', 'SMM Design', 'Promo Posters'],

    features: ['რესტორნის მენიუს ვიზუალური შეფუთვა', 'ბრენდტონის დაცვით შექმნილი ქარდები', 'გაყიდვებზე ორიენტირებული მესიჯინგი']

  }

];

const workTypeByProjectId = {
  lokross: 'ვიზუალური იდენტობა',
  'west-dev': 'ვიზუალური იდენტობა',
  foodly: 'ვიზუალური იდენტობა',
  panorama: 'სოც. მედია',
  education: 'სოც. მედია',
  'beone-apres-ski': 'სოც. მედია',
  'athome-ge': 'სოც. მედია',
  mochiko: 'სოც. მედია',
  'hakken-restaurant': 'სოც. მედია'
};

function getWorkTypeLabel(project) {
  return workTypeByProjectId[project.id] || 'სოც. მედია';
}


function PortfolioCard({ project, onSelect }) {
  return (
    <div
      onClick={() => onSelect(project)}
      className="surface-card group relative cursor-pointer bg-[#121212] border border-white/5 rounded-2xl overflow-hidden hover:border-[#E50914]/40 transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-28px_rgba(229,9,20,0.45)] flex flex-col justify-between"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(100%_60%_at_50%_0%,rgba(229,9,20,0.18),rgba(229,9,20,0)_65%)]" />
      <div className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-0 group-hover:translate-x-[420%] transition-transform duration-700" />

      <div className="aspect-video relative border-b border-white/5 overflow-hidden">
        {project.coverImage ? (
          <>
            <img
              src={project.coverImage}
              alt={`${project.title} cover`}
              className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 z-10">
              <div className="inline-block px-3 py-1 rounded-md text-[10px] font-mono tracking-widest uppercase bg-black/55 border border-white/20 text-white">
                {project.title}
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1c1c1c] to-[#0f0f0f] relative flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-radial-gradient from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
            <div className="relative z-10 text-center space-y-3">
              <div className="inline-block px-3 py-1 rounded-md text-[10px] font-mono tracking-widest uppercase bg-black/50 border border-white/10 text-white">
                {project.title}
              </div>
              <p className="text-lg font-black tracking-tight text-white group-hover:text-[#E50914] transition duration-200">
                {project.category}
              </p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-[#E50914]/10 blur-xl group-hover:bg-[#E50914]/20 transition duration-300" />
          </div>
        )}
      </div>

      <div className="p-6 space-y-4">
        <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/5 text-[10px] font-medium tracking-wide text-gray-500">
          {getWorkTypeLabel(project)}
        </div>

        <p className="text-sm text-gray-400 line-clamp-3">{project.description}</p>

        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs font-bold text-white group-hover:text-[#E50914] transition duration-200">ქეისის დეტალები</span>
          <ChevronRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 group-hover:text-[#E50914] transition duration-200" />
        </div>
      </div>
    </div>
  );
}


// Pricing Data matching the exact PDF content, fully corrected

const brandingPackages = [

  {

    title: "ლოგო დიზაინი",

    price: "500 ₾",

    desc: "საწყისი პაკეტი სტარტაპებისთვის და ახალი პროექტებისთვის, ვისაც სჭირდება სწრაფი და ხარისხიანი იდენტობა.",

    features: [

      { text: "ლოგოს დიზაინი ერთ ენაზე (ქართული ან ინგლისური)", included: true },

      { text: "ლოგოს ადაპტაცია: ჰორიზონტალური, ვერტიკალური და ავატარის ფორმატი", included: true },

      { text: "ძირითადი ფერების პალიტრა", included: true },

      { text: "ლოგოს გამოყენების მოკლე წესები (სივრცე, ზომა, ფონი)", included: true },

      { text: "ვიზუალური სტილის აღწერა", included: false },

      { text: "სრული ბრენდბუქი & სტრატეგია", included: false }

    ],

    badge: "სტარტაპი"

  },

  {

    title: "ვიზუალური იდენტობა",

    price: "3,000 ₾",

    desc: "საშუალო ბიზნესისთვის, რომელსაც სურს ბაზარზე მყარად და პროფესიონალურად პოზიციონირება.",

    features: [

      { text: "ლოგოს სრული ფორმა (ძირითადი ნიშანი + ტექსტური ბლოკი)", included: true },

      { text: "ლოგოს ადაპტაცია: ჰორიზონტალური, ვერტიკალური და სოციალური მედიის ავატარი", included: true },

      { text: "სრული ფერთა პალიტრა", included: true },

      { text: "ლოგო ორივე ენაზე (ქართული და ინგლისური)", included: true },

      { text: "ლოგოს გამოყენების წესები", included: true },

      { text: "ბრენდის ტიპოგრაფიის სისტემა", included: true },

      { text: "ვიზუალური სტილი & ელემენტები", included: true },

    ],

    badge: "პოპულარული",

    featured: true

  },

  {

    title: "სრული ბრენდინგი",

    price: "3,900 ₾",

    desc: "მაქსიმალური პაკეტი ბრენდის სრული იდენტობისა და სტრატეგიის ჩამოსაყალიბებლად, სახელდებიდან დაწყებული.",

    features: [

      { text: "ბრენდის სახელი (Naming) & სლოგანი", included: true },

      { text: "ბრენდის ტონი (Tone of Voice) & სტრატეგია", included: true },

      { text: "ლოგოს სრული არქიტექტურა და ყველა საჭირო ადაპტაცია (ციფრული + ბეჭდური)", included: true },

      { text: "ფერები, ტიპოგრაფია & უნიკალური გრიდები", included: true },

      { text: "შეფუთვისა და კორპორატიული ატრიბუტიკა", included: true },

      { text: "სრული ბრენდ-არქიტექტურის წიგნი", included: true },

      { text: "ნებისმიერ სოციალური მედიის პაკეტზე", included: true, discount: true }

    ],

    badge: "Echelon Premium"

  }

];



const smmPackages = [

  {

    title: "Basic",

    price: "2,400 ₾ / თვეში",

    desc: "სტაბილური ონლაინ ყოფნისთვის და სოციალური ქსელების მოწესრიგებისთვის.",
    compareHint: "საწყისი დონე მცირე მოცულობით.",

    features: [

      { text: "პოსტები / თვე: 8", included: true },

      { text: "სთორი / თვე: 6", included: true },

      { text: "რეკლამის მართვა", included: true },

      { text: "კონტენტ კალენდარი", included: false },

      { text: "Shadow რეკლამების ტესტირება", included: false },

      { text: "ყოველთვიური დეტალური რეპორტინგი", included: false }

    ],

    badge: "საბაზისო"

  },

  {

    title: "Premium",

    price: "3,000 ₾ / თვეში",

    desc: "ოპტიმალური პაკეტი: 10 პოსტი + 10 სთორი რედიზაინი და რეკლამის სრული მართვა.",
    compareHint: "Basic-ზე მეტი მოცულობა და დაგეგმვა.",

    features: [

      { text: "პოსტები / თვე: 10", included: true },

      { text: "სთორი / თვე: 10", included: true },

      { text: "რეკლამის მართვა", included: true },

      { text: "კონტენტ კალენდარი", included: true },

      { text: "Shadow რეკლამების ტესტირება", included: false },

      { text: "ყოველთვიური დეტალური რეპორტინგი", included: false }

    ],

    badge: "რეკომენდებული",
    deltaFromPrev: [
      "+2 პოსტი Basic-თან შედარებით",
      "+4 სთორი Basic-თან შედარებით",
      "კონტენტ კალენდარი ჩართული"
    ],

    featured: true

  },

  {

    title: "Ultimate",

    price: "4,450 ₾ / თვეში",

    desc: "სრული მარკეტინგული მხარდაჭერა და მაქსიმალური წვდომა უახლესი სტრატეგიებით.",
    compareHint: "Premium-ის სრული ვერსია, სრული მონიტორინგით.",

    features: [

      { text: "პოსტები / თვე: 14", included: true },

      { text: "სთორი / თვე: 18", included: true },

      { text: "რეკლამის მართვა", included: true },

      { text: "კონტენტ კალენდარი", included: true },

      { text: "Shadow რეკლამების ტესტირება", included: true },

      { text: "ყოველთვიური დეტალური რეპორტინგი", included: true }

    ],

    badge: "მაქსიმალური",
    deltaFromPrev: [
      "+4 პოსტი Premium-თან შედარებით",
      "+8 სთორი Premium-თან შედარებით",
      "Shadow ტესტირება ჩართული",
      "რეპორტინგი ჩართული"
    ]

  }

];

const partnerLogos = [
  { name: 'Ase', src: '/logos/experience/ase1.png', scale: 0.85 },
  { name: 'AtHome', src: '/logos/experience/athome1.png', scale: 0.82 },
  { name: 'Zen', src: '/logos/experience/zen1.png', scale: 0.88 },
  { name: 'Info', src: '/logos/experience/info1.png', scale: 0.88 },
  { name: 'Mor', src: '/logos/experience/mor1.png', scale: 0.83 },
  { name: 'Mochi', src: '/logos/experience/moch1.png?v=20260529a', scale: 0.81 },
  { name: 'Foodly', src: '/logos/experience/foodl1.png', scale: 0.82 },
  { name: 'Hakken', src: '/logos/experience/hak1.png?v=20260529a', scale: 0.84 },
  { name: 'Split', src: '/logos/experience/spli1.png', scale: 0.8 }
];

const collaboratorMarqueeSpeed = '110s';
const partnerMarqueeSpeed = '200s';

const collaboratorLogos = [
  { name: 'Collaborator 1', src: '/logos/log1.png', scale: 0.8 },
  { name: 'Collaborator 2', src: '/logos/log2.png?v=20260529a', scale: 0.84 },
  { name: 'Collaborator 3', src: '/logos/log3.png', scale: 0.82 },
  { name: 'Collaborator 4', src: '/logos/log4.png', scale: 0.9 },
  { name: 'Collaborator 5', src: '/logos/log5.png', scale: 0.86 }
];

const facebookNewsPosts = [
  {
    id: 'fb-1',
    title: 'ᲨᲔᲜᲘ ᲞᲔᲠᲡᲝᲜᲐᲟᲘ ᲡᲐᲣᲑᲠᲝᲑᲡ ᲨᲔᲜᲡ ᲑᲠᲔᲜᲓᲖᲔ',
    excerpt: 'ემოციური ვიზუალი, ძლიერი ხასიათი და მკაფიო მესიჯი - კონტენტი, რომელიც პირველივე წამში იჭერს ყურადღებას.',
    date: '2026-05-18',
    readTime: '2 წთ',
    image: '/optimized/facebook/p1.jpg',
    url: 'https://www.facebook.com/'
  },
  {
    id: 'fb-2',
    title: 'ᲡᲢᲠᲐᲢᲔᲒᲘᲐ ᲗᲣ ᲓᲘᲖᲐᲘᲜᲘ? ᲝᲠᲘᲕᲔ ᲔᲠᲗᲐᲓ',
    excerpt: 'DYNOCONCEPT-ის ესთეტიკა და არტ-დირექშენი ერთ კამპანიაში, სადაც ბრენდის ხმა და ვიზუალი ერთ ხაზზე მუშაობს.',
    date: '2026-05-12',
    readTime: '3 წთ',
    image: '/optimized/facebook/p2-new.jpg',
    url: 'https://www.facebook.com/'
  },
  {
    id: 'fb-3',
    title: 'ᲐᲡᲔ ᲕᲔᲠ ᲒᲐᲘᲛᲐᲠᲯᲕᲔᲑ - ᲓᲒᲔᲑᲐ ᲡᲢᲠᲐᲢᲔᲒᲘᲐ',
    excerpt: 'შოკ-მესიჯი, წითელი დინამიკა და კონვერსიაზე მორგებული კოპირაითინგი, რომელიც აუდიტორიას მოქმედებაზე გადაჰყავს.',
    date: '2026-05-07',
    readTime: '2 წთ',
    image: '/optimized/facebook/p3.jpg',
    url: 'https://www.facebook.com/'
  },
  {
    id: 'fb-4',
    title: 'ᲓᲘᲓᲘ ᲘᲓᲔᲔᲑᲘ ᲙᲝᲡᲛᲘᲣᲠᲘ ᲗᲕᲐᲚᲗᲐᲮᲔᲓᲕᲘᲗ',
    excerpt: 'მინიმალისტური, კინემატოგრაფიული კადრი და ღრმა აზრი - პოსტი, რომელიც ბრენდის ფილოსოფიას მშვიდად, მაგრამ ძლიერად გადმოსცემს.',
    date: '2026-04-29',
    readTime: '4 წთ',
    image: '/optimized/facebook/p4.jpg',
    url: 'https://www.facebook.com/'
  }
];



function HeroSection() {



  return (

    <section

      id="hero"

      className="relative overflow-hidden min-h-[100svh] lg:min-h-[92vh] flex items-center"

    >

      <style>{`

        @keyframes coverReveal {

          from { opacity: 0; transform: scale(1.08); }

          to   { opacity: 1; transform: scale(1); }

        }

        @keyframes headlineGlow {

          0%,100% { opacity: 1; }

          50%      { opacity: 0.96; }

        }

        @keyframes headlineIn {

          from { opacity: 0; transform: translateY(32px); }

          to   { opacity: 1; transform: translateY(0); }

        }

        html { scroll-behavior: smooth; }

      `}</style>



      {/* Cover image wrapper */}

      <div

        className="absolute inset-0 scale-[1.02] lg:scale-[1.04]"

      >

        <picture className="block w-full h-full">
          <source media="(min-width: 1024px)" srcSet="/cover-landscape.jpg" />
          <img
            src="/cover-portrait.jpg"
            alt="Eshelon Cover"
            className="w-full h-full object-cover object-[62%_20%] lg:object-right"
            style={{ animation: 'coverReveal 2.4s cubic-bezier(0.22,1,0.36,1) both' }}
            fetchPriority="high"
            decoding="async"
          />
        </picture>

      </div>



      {/* Multi-layer blending to avoid hard image edges */}

      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/70 via-[#0d0d0d]/40 to-[#0d0d0d]/10 lg:from-[#0d0d0d]/74 lg:via-[#0d0d0d]/56 lg:to-[#0d0d0d]/10" />
      <div className="absolute inset-x-0 top-0 h-36 sm:h-40 bg-gradient-to-b from-[#0d0d0d]/58 via-[#0d0d0d]/22 to-transparent lg:from-[#0d0d0d]/45 lg:via-[#0d0d0d]/12" />
      <div className="absolute bottom-0 left-0 right-0 h-72 sm:h-80 bg-gradient-to-t from-[#0d0d0d]/95 via-[#0d0d0d]/84 to-transparent lg:from-[#0d0d0d]/74 lg:via-[#0d0d0d]/56" />
      <div className="absolute inset-y-0 right-0 w-40 lg:w-48 bg-gradient-to-l from-[#0d0d0d]/36 via-[#0d0d0d]/14 to-transparent lg:from-[#0d0d0d]/24 lg:via-[#0d0d0d]/6" />
      <div className="absolute inset-0 lg:hidden bg-[radial-gradient(95%_58%_at_25%_46%,rgba(13,13,13,0.52),rgba(13,13,13,0)_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(110%_70%_at_50%_10%,rgba(229,9,20,0.08),rgba(13,13,13,0)_58%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-8 pointer-events-none [background-image:radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.1)_0,rgba(255,255,255,0)_40%),radial-gradient(circle_at_80%_0,rgba(229,9,20,0.12)_0,rgba(229,9,20,0)_35%)]" />



      {/* Content */}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-14 sm:py-20 lg:py-16">

        <div className="max-w-[620px] space-y-7 sm:space-y-8">



          {/* Headline PNG — entrance + glow pulse */}
          <div className="inline-block">
            <img
              src="/hero-headline.png"
              alt="Headline"
              className="w-full max-w-[90vw] sm:max-w-lg mt-1 sm:-mt-4 lg:-mt-12 drop-shadow-[0_10px_30px_rgba(0,0,0,0.75)]"
              fetchPriority="high"
              decoding="async"
              style={{
                animation: 'headlineIn 1s 0.4s cubic-bezier(0.22,1,0.36,1) both',
                filter: 'drop-shadow(0 0 14px rgba(229,9,20,0.22))'
              }}
            />
          </div>



          <div className="flex flex-col sm:flex-row items-start gap-4">

            <a href="#portfolio" className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold bg-white text-black hover:bg-gray-100 transition duration-200 shadow-lg active:scale-95">

              ᲜᲐᲮᲔ ᲞᲝᲠᲢᲤᲝᲚᲘᲝ

              <ArrowRight className="w-5 h-5 ml-2" />

            </a>

            <a href="#pricing" className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10 transition duration-200 active:scale-95">

              ᲤᲐᲡᲔᲑᲘᲡ ᲞᲐᲙᲔᲢᲔᲑᲘ

            </a>

          </div>



          {/* Key metrics */}

          <div className="pt-8 grid grid-cols-3 gap-6 max-w-lg border-t border-white/10">

            <div>

              <div className="text-2xl sm:text-3xl font-black text-white">100%</div>

              <div className="text-xs text-gray-400 uppercase tracking-wider">კმაყოფილი კლიენტი</div>

            </div>

            <div>

              <div className="text-2xl sm:text-3xl font-black text-white">50+</div>

              <div className="text-xs text-gray-400 uppercase tracking-wider">შექმნილი იდენტობა</div>

            </div>

            <div>

              <div className="text-2xl sm:text-3xl font-black text-white">250%</div>

              <div className="text-xs text-gray-400 uppercase tracking-wider">ზრდა გაყიდვებში</div>

            </div>

          </div>



        </div>

      </div>

    </section>

  );

}


function PartnersStrip() {
  const LogoMarqueeRow = ({ title, logos, reverse = false, speed = '34s', rowClass = '', titleClass = '' }) => {
    // Repeat logos inside a single cycle so one loop is always wider than the viewport.
    const loopLogos = [...logos, ...logos, ...logos];

    return (
      <div className={`py-6 ${rowClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <p className={`text-center text-[11px] uppercase tracking-[0.28em] ${titleClass || 'text-gray-500'}`}>{title}</p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#0b0b0b] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#0b0b0b] to-transparent z-10" />

          <div className={`logo-marquee ${reverse ? 'is-reverse' : ''}`} style={{ '--logo-speed': speed }}>
            <div className="logo-group">
              {loopLogos.map((logo, idx) => (
                <div key={`${logo.name}-${idx}`} className="logo-tile">
                  <img
                    src={logo.src}
                    alt={`${logo.name} logo`}
                    className="logo-mark"
                    style={logo.scale ? { '--logo-scale': logo.scale } : undefined}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>

            <div className="logo-group" aria-hidden="true">
              {loopLogos.map((logo, idx) => (
                <div key={`${logo.name}-clone-${idx}`} className="logo-tile">
                  <img
                    src={logo.src}
                    alt=""
                    className="logo-mark"
                    style={logo.scale ? { '--logo-scale': logo.scale } : undefined}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section data-reveal className="reveal-section relative overflow-hidden bg-[#0b0b0b] border-y border-[#1a1a1a]">
      <LogoMarqueeRow title="გუნდის გამოცდილება" logos={partnerLogos} speed={partnerMarqueeSpeed} />
      <div className="border-t border-white/5" />
      <LogoMarqueeRow
        title="კოლაბორატორი კომპანიები"
        logos={collaboratorLogos}
        reverse
        speed={collaboratorMarqueeSpeed}
        rowClass="bg-[#101013] border-t border-[#25252b]"
        titleClass="text-gray-400"
      />
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" data-reveal className="reveal-section py-24 bg-[#09090a] border-y border-[#1a1a1f] relative overflow-hidden">
      <div className="absolute -top-24 -right-10 w-72 h-72 bg-[#E50914]/12 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-10 w-80 h-80 bg-red-700/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="section-eyebrow text-xs font-bold text-[#E50914] tracking-widest uppercase">Ჩვენ და გუნდი</h2>
            <p className="mersad-heading text-3xl sm:text-4xl text-white leading-tight">
              ᲔᲨᲔᲚᲝᲜᲘᲡ ᲮᲔᲓᲕᲐ ᲓᲐ ᲛᲘᲡᲘᲐ
            </p>

            <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
              <p>
                ESHELON-ისთვის ბრენდინგი მხოლოდ ვიზუალი არ არის. ეს არის სტრატეგია, ემოცია და კომუნიკაცია, რომელიც
                ბიზნესს ბაზარზე გამორჩეულ პოზიციაზე აყენებს.
              </p>
              <p>
                ჩვენ ვაერთიანებთ კრეატიულ დიზაინს, სიღრმისეულ ანალიზს და პრაქტიკულ მარკეტინგს, რათა თითოეული პროექტი
                გახდეს არა უბრალოდ ლამაზი, არამედ შედეგზე ორიენტირებული.
              </p>
              <p>
                დღეს ESHELON მუშაობს გუნდურად, დინამიკურად და პასუხისმგებლობით - პარტნიორებთან ერთად ვქმნით სისტემურ
                ზრდას და ბრენდებს, რომლებსაც საკუთარი ხასიათი და ძლიერი ხმა აქვთ.
              </p>
            </div>

            <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="surface-card bg-[#121217] border border-white/10 rounded-xl p-4">
                <p className="text-[10px] uppercase tracking-widest text-gray-500">პრიორიტეტი</p>
                <p className="text-sm font-bold text-white mt-1">ხარისხზე ორიენტაცია</p>
              </div>
              <div className="surface-card bg-[#121217] border border-white/10 rounded-xl p-4">
                <p className="text-[10px] uppercase tracking-widest text-gray-500">განვითარება</p>
                <p className="text-sm font-bold text-white mt-1">ინოვაციური სიახლეების ძიება</p>
              </div>
              <div className="surface-card bg-[#121217] border border-white/10 rounded-xl p-4">
                <p className="text-[10px] uppercase tracking-widest text-gray-500">დისციპლინა</p>
                <p className="text-sm font-bold text-white mt-1">დედლაინების ზუსტი დაცვა</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="surface-card h-full bg-[#121212] border border-white/10 rounded-2xl p-3 sm:p-4">
              <div className="relative rounded-xl overflow-hidden border border-white/10">
                <img
                  src="/optimized/about/team-story.jpg"
                  onError={(e) => { e.currentTarget.src = '/optimized/facebook/p3.jpg'; }}
                  alt="ESHELON founders and team story visual"
                  className="w-full h-[420px] sm:h-[500px] object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/25 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FacebookNewsSection() {
  return (
    <section id="facebook-news" data-reveal className="reveal-section py-14 sm:py-16 bg-[#0c0c0f] border-y border-[#1e1e24]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-8 sm:mb-10">
          <div className="space-y-3 max-w-2xl">
            <h2 className="section-eyebrow text-xs font-bold text-[#E50914] tracking-widest uppercase">ᲤᲔᲘᲡᲑᲣᲥ ᲜᲘᲣᲡᲔᲑᲘ</h2>
            <p className="mersad-heading text-2xl sm:text-3xl tracking-tight text-white">ᲒᲐᲛᲝᲒᲕᲧᲔᲕᲘ FACEBOOK-ᲖᲔ</p>
            <p className="text-xs sm:text-sm text-gray-400">ბლოგის სტილში თავმოყრილი უახლესი პოსტები, ქეისები და კამპანიების მოკლე მიმოხილვა.</p>
          </div>

          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-[11px] font-bold bg-[#E50914] text-white hover:bg-red-700 transition"
          >
            Facebook-ზე ნახვა
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </div>

        <div className="reveal-stagger grid grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
          {facebookNewsPosts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="surface-card group bg-[#121217] border border-white/10 rounded-xl overflow-hidden hover:border-[#E50914]/45 transition duration-300 lg:flex lg:items-stretch"
            >
              <div className="aspect-[4/5] overflow-hidden relative lg:w-36 lg:min-w-[9rem] lg:aspect-[4/5]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              <div className="p-3.5 sm:p-4 space-y-2.5 lg:flex-1 lg:flex lg:flex-col lg:justify-center">
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-gray-400">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-sm sm:text-[15px] font-black text-white leading-snug group-hover:text-[#E50914] transition-colors line-clamp-2 lg:line-clamp-3">{post.title}</h3>
                <p className="text-[11px] text-gray-300 leading-relaxed line-clamp-2 lg:line-clamp-2">{post.excerpt}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

const collaborationOffers = [
  {
    id: 'full',
    title: 'სრული SMM მომსახურება',
    subtitle: 'დიზაინი + კონტენტი + რეკლამის მართვა',
    accent: 'from-[#E50914]/25 to-transparent',
    rows: [
      { pack: 'Basic', partner: '1,650 ₾', public: '1,485 ₾', benefit: '+915 ₾' },
      { pack: 'Premium', partner: '2,100 ₾', public: '1,890 ₾', benefit: '+1,110 ₾', featured: true },
      { pack: 'Ultimate', partner: '3,100 ₾', public: '2,790 ₾', benefit: '+1,660 ₾' }
    ]
  },
  {
    id: 'design',
    title: 'გრაფიკული დიზაინის გუნდი',
    subtitle: 'მხოლოდ დიზაინის მხარდაჭერა',
    accent: 'from-cyan-500/20 to-transparent',
    rows: [
      { pack: 'Basic', partner: '800 ₾', public: '720 ₾', benefit: '+1,600 ₾' },
      { pack: 'Premium', partner: '1,050 ₾', public: '945 ₾', benefit: '+1,950 ₾' },
      { pack: 'Ultimate', partner: '1,480 ₾', public: '1,332 ₾', benefit: '+2,970 ₾' }
    ]
  },
  {
    id: 'marketing',
    title: 'მარკეტინგული გუნდი',
    subtitle: 'მხოლოდ რეკლამა + ოპტიმიზაცია',
    accent: 'from-amber-500/20 to-transparent',
    rows: [
      { pack: 'Basic', partner: '850 ₾', public: '765 ₾', benefit: '+1,550 ₾' },
      { pack: 'Premium', partner: '1,150 ₾', public: '1,035 ₾', benefit: '+1,850 ₾' },
      { pack: 'Ultimate', partner: '1,750 ₾', public: '1,575 ₾', benefit: '+2,700 ₾' }
    ]
  }
];

const collaborationTerms = [
  'მხოლოდ სააგენტო-აგენტთან კომუნიკაცია (კლიენტთან პირდაპირი კონტაქტის გარეშე)',
  'თვეში მაქსიმუმ 2 რედაქტირების რაუნდი',
  '100% წინასწარი გადახდა ყოველი თვის დაწყებამდე',
  '12-თვიანი ანტი-პოაჩინგი თანამშრომლობის დასრულების შემდეგ',
  'კოლაბორაციის საჯარო აღნიშვნა + პარტნიორისთვის -10% ფასდაკლება'
];

const folioPosterImages = [
  '/optimized/posters/harmonica-main-01.jpg',
  '/optimized/posters/showcase/post-28-square.jpg',
  '/optimized/posters/showcase/post-23.jpg',
  '/optimized/posters/showcase/post-26-square.jpg',
  '/optimized/posters/showcase/post-04-square.jpg',
  '/optimized/posters/showcase/post-20.jpg',
  '/optimized/posters/harmonica-botbagh-04.jpg',
  '/optimized/posters/showcase/post-18-square.jpg',
  '/optimized/posters/showcase/post-13.jpg',
  '/optimized/posters/showcase/post-02.jpg',
  '/optimized/posters/showcase/post-12-square.jpg',
  '/optimized/posters/harmonica-pres-03.jpg',
  '/optimized/posters/showcase/post-25.jpg',
  '/optimized/posters/showcase/post-33.jpg',
  '/optimized/posters/showcase/post-31-square.jpg',
  '/optimized/posters/showcase/post-34-square.jpg'
];

function CollaborationPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f2f2f2] font-sans antialiased selection:bg-[#E50914] selection:text-white">
      <nav className="nav-glass sticky top-0 z-40 border-b border-[#262626]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#E50914] to-orange-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300" />
              <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-[#E50914]/50">
                <img src="/logod.jpg" alt="Eshelon Logo" className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <span className="text-xl font-black tracking-widest text-white block">ESHELON</span>
              <span className="text-[10px] tracking-widest text-[#E50914] font-bold block -mt-1 uppercase">Collaboration</span>
            </div>
          </a>

          <div className="flex items-center gap-3">
            <a href="/" className="px-4 py-2 rounded-lg border border-white/15 text-sm text-gray-200 hover:border-white/35 transition">მთავარი</a>
            <a href="/#contact" className="px-4 py-2 rounded-lg bg-[#E50914] text-sm font-bold text-white hover:bg-red-700 transition">დაკავშირება</a>
          </div>
        </div>
      </nav>

      <main className="relative">
        <div className="absolute inset-x-0 top-0 h-[360px] bg-gradient-to-b from-[#E50914]/15 via-transparent to-transparent pointer-events-none" />

        <section className="py-16 sm:py-20 border-b border-[#1e1e1e]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-5">
              <p className="section-eyebrow text-xs font-bold text-[#E50914] tracking-widest uppercase">B2B გვერდი</p>
              <h1 className="mersad-heading text-4xl sm:text-5xl text-white leading-tight">კოლაბორაცია სააგენტოებისთვის</h1>
              <p className="text-gray-300 text-sm sm:text-base">
                გამჭვირვალე პირობები, წინასწარ განსაზღვრული ფასები და მარტივი სტრუქტურა. 
                ეს გვერდი შექმნილია ისე, რომ 1 წუთში ნახოთ რეალური მოდელი და თქვენი სარგებელი.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-green-500/15 text-green-300 border border-green-500/35">-10% პარტნიორული ფასდაკლება</span>
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/5 text-gray-300 border border-white/15">თეთრი ლეიბლი (White Label)</span>
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/5 text-gray-300 border border-white/15">ფიქსირებული SLA</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16 border-b border-[#1e1e1e]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
              {collaborationOffers.map((offer) => (
                <div key={offer.id} className="surface-card relative overflow-hidden bg-[#121212] border border-white/10 rounded-2xl p-5 sm:p-6">
                  <div className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${offer.accent}`} />
                  <div className="relative space-y-4">
                    <div>
                      <h2 className="text-xl font-black text-white">{offer.title}</h2>
                      <p className="text-xs text-gray-400 mt-1">{offer.subtitle}</p>
                    </div>

                    <div className="space-y-2">
                      {offer.rows.map((row) => (
                        <div key={`${offer.id}-${row.pack}`} className={`rounded-xl border p-3 ${row.featured ? 'border-[#E50914]/45 bg-[#E50914]/8' : 'border-white/10 bg-white/[0.02]'}`}>
                          <div className="flex items-center justify-between mb-1.5">
                            <p className="text-sm font-bold text-white">{row.pack}</p>
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-500/15 text-green-300 border border-green-500/30">თქვენი სარგებელი {row.benefit}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[11px]">
                            <div className="rounded-lg bg-black/35 border border-white/10 px-2.5 py-2">
                              <p className="text-[10px] text-gray-500 uppercase tracking-wide">პარტნიორის ფასი</p>
                              <p className="text-sm font-bold text-white mt-0.5">{row.partner}</p>
                            </div>
                            <div className="rounded-lg bg-black/35 border border-white/10 px-2.5 py-2">
                              <p className="text-[10px] text-gray-500 uppercase tracking-wide">საჯარო ფასი</p>
                              <p className="text-sm font-bold text-white mt-0.5">{row.public}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16 border-b border-[#1e1e1e]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="surface-card bg-[#121212] border border-white/10 rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-4 h-4 text-[#E50914]" />
                <p className="text-sm font-bold text-white">თანამშრომლობის ძირითადი პირობები</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {collaborationTerms.map((term, index) => (
                  <div key={term} className="rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-3 flex items-start gap-2.5">
                    <span className="mt-0.5 text-[10px] font-bold text-[#E50914]">{String(index + 1).padStart(2, '0')}</span>
                    <p className="text-sm text-gray-300 leading-relaxed">{term}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black border-t border-[#1a1a1a] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} ESHELON DIGITAL AGENCY</p>
          <a href="/#contact" className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-xs font-bold bg-[#E50914] text-white hover:bg-red-700 transition">
            კოლაბორაციის დაწყება
          </a>
        </div>
      </footer>
    </div>
  );
}

function App() {

  const SMM_POST_UNIT_PRICE = 220;
  const SMM_STORY_UNIT_PRICE = 40;
  const ORDER_RECIPIENTS = [
    "tazo.gochelashvili.3@gmail.com",
    "kalmakhelidzelazare@gmail.com"
  ];
  const normalizedPath = typeof window !== 'undefined'
    ? (window.location.pathname.replace(/\/+$/, '') || '/')
    : '/';
  const isCollaborationPage = normalizedPath === '/collaboration';

  const [activeTab, setActiveTab] = useState('smm'); // branding vs smm

  const [selectedProject, setSelectedProject] = useState(null);
  const [showMorePortfolio, setShowMorePortfolio] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);



  // Custom calculator state

  const [customServices, setCustomServices] = useState({

    logo: false,

    guidelines: false,

    posts: 10,

    stories: 10,

    advertising: true,

    shadowTesting: false

  });



  // AI strategist generator states

  const [businessIdea, setBusinessIdea] = useState("");

  const [aiLoading, setAiLoading] = useState(false);

  const [aiStrategyResult, setAiStrategyResult] = useState(null);

  const [aiError, setAiError] = useState("");



  // Order modal state

  const [orderModal, setOrderModal] = useState(null); // package object or null

  const [orderSuccess, setOrderSuccess] = useState(false);

  const [orderForm, setOrderForm] = useState({ name: '', phone: '', note: '' });


  const scrollToTopSmooth = (e) => {

    e.preventDefault();

    window.scrollTo({ top: 0, behavior: 'smooth' });

    setMenuOpen(false);

  };

  useEffect(() => {
    const revealSections = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!revealSections.length) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      revealSections.forEach((el) => el.classList.add('reveal-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    revealSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {

    const isAnyModalOpen = Boolean(selectedProject || orderModal);

    if (!isAnyModalOpen) return undefined;


    const previousOverflow = document.body.style.overflow;

    const previousPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;


    document.body.style.overflow = 'hidden';

    if (scrollbarWidth > 0) {

      document.body.style.paddingRight = `${scrollbarWidth}px`;

    }


    return () => {

      document.body.style.overflow = previousOverflow;

      document.body.style.paddingRight = previousPaddingRight;

    };

  }, [selectedProject, orderModal]);


  useEffect(() => {

    if (!selectedProject) return undefined;

    const onEsc = (event) => {

      if (event.key === 'Escape') {

        setSelectedProject(null);

      }

    };

    window.addEventListener('keydown', onEsc);

    return () => window.removeEventListener('keydown', onEsc);

  }, [selectedProject]);

  useEffect(() => {
    const root = document.documentElement;
    let rafId = null;

    const updateScrollProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      root.style.setProperty('--scroll-progress', progress.toString());
      rafId = null;
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(updateScrollProgress);
    };

    updateScrollProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);



  // Calculate price dynamically for custom estimator

  const calculateCustomPrice = () => {

    let base = 0;

    if (customServices.logo) base += 500;

    if (customServices.guidelines) base += 1200;

    base += customServices.posts * SMM_POST_UNIT_PRICE;

    base += customServices.stories * SMM_STORY_UNIT_PRICE;

    if (customServices.advertising) base += 400;

    if (customServices.shadowTesting) base += 250;

    return base;

  };



  // Exponential backoff API call helper

  const fetchWithBackoff = async (url, options, retries = 5, delay = 1000) => {

    try {

      const response = await fetch(url, options);

      if (!response.ok) {

        throw new Error(`HTTP error! status: ${response.status}`);

      }

      return await response.json();

    } catch (error) {

      if (retries > 0) {

        await new Promise(resolve => setTimeout(resolve, delay));

        return fetchWithBackoff(url, options, retries - 1, delay * 2);

      } else {

        throw error;

      }

    }

  };



  // Call Gemini to generate brand strategic response

  const generateAIStrategy = async (e) => {

    e.preventDefault();

    if (!businessIdea.trim()) return;



    setAiLoading(true);

    setAiError("");

    setAiStrategyResult(null);



    const apiKey = ""; // Runtime key injection expected

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;



    const systemPrompt = `You are the brilliant and bold Creative Director of "Echelon" (ეშელონი) Digital Agency.

Your agency combines deep strategic chess-like planning and explosive anime-styled artistic creativity (represented by chess knight and pencil symbols).

The user is giving you their business/startup idea.

Generate a sharp, encouraging, and highly professional branding strategy response in GEORGIAN language.

Your response MUST be in structured JSON format with the following keys:

1. "slogan": An epic, memorable, punchy branding slogan in Georgian.

2. "vibeDescription": A short description of the visual vibe/style they should adopt (color palette, styling notes).

3. "strategySteps": Array of 3 key strategic actions they must take immediately to win the market.

4. "heroIdea": A unique, mind-blowing social media or advertising campaign concept.

Keep the style bold, youthful, and highly confident (as a top-tier digital agency). Do not mention any JSON syntax in the text, just return the valid JSON.`;



    const payload = {

      contents: [{

        parts: [{ text: `ჩემი ბიზნესის იდეაა: ${businessIdea}. მომიფიქრე ეშელონის სტილის სტრატეგია!` }]

      }],

      systemInstruction: {

        parts: [{ text: systemPrompt }]

      },

      generationConfig: {

        responseMimeType: "application/json",

        responseSchema: {

          type: "OBJECT",

          properties: {

            slogan: { type: "STRING" },

            vibeDescription: { type: "STRING" },

            strategySteps: {

              type: "ARRAY",

              items: { type: "STRING" }

            },

            heroIdea: { type: "STRING" }

          },

          required: ["slogan", "vibeDescription", "strategySteps", "heroIdea"]

        }

      }

    };



    try {

      const data = await fetchWithBackoff(url, {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify(payload)

      });



      const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (textResponse) {

        const parsedData = JSON.parse(textResponse);

        setAiStrategyResult(parsedData);

      } else {

        throw new Error("პასუხი ვერ მივიღეთ.");

      }

    } catch (err) {

      console.error(err);

      setAiError("უკაცრავად, სტრატეგიის გენერირებისას მოხდა შეცდომა. გთხოვთ, სცადოთ მოგვიანებით.");

    } finally {

      setAiLoading(false);

    }

  };



  const handleOrderSubmit = (e) => {

    e.preventDefault();
    if (!orderModal) return;

    const subject = `ESHELON შეკვეთა: ${orderModal.title}`;
    const body = [
      `პაკეტი: ${orderModal.title}`,
      `ფასი: ${orderModal.price}`,
      `სახელი: ${orderForm.name || '-'}`,
      `ტელეფონი: ${orderForm.phone || '-'}`,
      `შენიშვნა: ${orderForm.note || '-'}`
    ].join('\n');
    const mailtoLink = `mailto:${ORDER_RECIPIENTS[0]}?cc=${encodeURIComponent(ORDER_RECIPIENTS.slice(1).join(','))}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    setOrderSuccess(true);

    setTimeout(() => {

      setOrderSuccess(false);

      setOrderModal(null);

      setOrderForm({ name: '', phone: '', note: '' });

    }, 3000);

  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = (formData.get('name') || '').toString().trim();
    const phone = (formData.get('phone') || '').toString().trim();
    const company = (formData.get('company') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();

    const subject = "ESHELON: ახალი შეტყობინება საიტიდან";
    const body = [
      `სახელი: ${name || '-'}`,
      `ტელეფონი: ${phone || '-'}`,
      `კომპანია: ${company || '-'}`,
      `შეტყობინება: ${message || '-'}`
    ].join('\n');
    const mailtoLink = `mailto:${ORDER_RECIPIENTS[0]}?cc=${encodeURIComponent(ORDER_RECIPIENTS.slice(1).join(','))}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    setOrderSuccess(true);
    e.currentTarget.reset();
    setTimeout(() => setOrderSuccess(false), 3000);
  };



  if (isCollaborationPage) {
    return <CollaborationPage />;
  }

  return (

    <div className="min-h-screen bg-[#0d0d0d] text-[#f2f2f2] font-sans antialiased selection:bg-[#E50914] selection:text-white">

      <div className="scroll-progress" aria-hidden="true" />



      {/* GLOWING HEADER BACKGROUND ACCENT */}

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-[#E50914]/8 via-transparent to-transparent pointer-events-none -z-10" />



      {/* NAVBAR */}

      <nav className="nav-glass sticky top-0 z-40 border-b border-[#262626]/80">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center justify-between h-20">

            <div className="flex items-center space-x-3">

              {/* Logo — smooth scroll to hero */}

                <a

                  href="#hero"

                  onClick={scrollToTopSmooth}

                  className="flex items-center space-x-3 group"

              >

                <div className="relative cursor-pointer">

                  <div className="absolute -inset-1 bg-gradient-to-r from-[#E50914] to-orange-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300" />

                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-[#E50914]/50">

                    <img src="/logod.jpg" alt="Eshelon Logo" className="w-full h-full object-cover" />

                  </div>

                </div>

                <div>

                  <span className="text-xl font-black tracking-widest text-white block">ESHELON</span>

                  <span className="text-[10px] tracking-widest text-[#E50914] font-bold block -mt-1 uppercase">Highest</span>

                </div>

              </a>

            </div>



            {/* Desktop Navigation */}

            <div className="hidden md:flex items-center space-x-8">

              <a href="#about" className="text-sm font-medium text-gray-300 hover:text-[#E50914] transition-colors">ჩვენს შესახებ</a>

              <a href="#services" className="text-sm font-medium text-gray-300 hover:text-[#E50914] transition-colors">სერვისები</a>

              <a href="#portfolio" className="text-sm font-medium text-gray-300 hover:text-[#E50914] transition-colors">პორტფოლიო</a>

              <a href="#pricing" className="text-sm font-medium text-gray-300 hover:text-[#E50914] transition-colors">ფასები</a>

              <a href="/collaboration" className="text-sm font-medium text-gray-300 hover:text-[#E50914] transition-colors">კოლაბორაცია</a>

              <a href="#ai-strategist" className="text-sm font-medium flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors bg-red-950/40 px-3 py-1 rounded-full border border-red-500/20">

                <BrainCircuit className="w-4 h-4" />

                <span>Echelon AI</span>

              </a>

              <a

                href="#contact"

                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-bold bg-[#E50914] text-white hover:bg-red-700 active:scale-95 transition"

              >

                კონტაქტი

              </a>

            </div>



            {/* Mobile menu button */}

            <div className="md:hidden">

              <button

                onClick={() => setMenuOpen(!menuOpen)}

                className="text-gray-400 hover:text-white focus:outline-none"

              >

                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}

              </button>

            </div>

          </div>

        </div>



        {/* Mobile Menu */}

        {menuOpen && (

          <div className="md:hidden bg-[#0d0d0d] border-b border-[#262626] px-4 py-6 space-y-4">

            <a href="#about" onClick={() => setMenuOpen(false)} className="block text-base font-medium text-gray-300 hover:text-[#E50914]">ჩვენს შესახებ</a>

            <a href="#services" onClick={() => setMenuOpen(false)} className="block text-base font-medium text-gray-300 hover:text-[#E50914]">სერვისები</a>

            <a href="#portfolio" onClick={() => setMenuOpen(false)} className="block text-base font-medium text-gray-300 hover:text-[#E50914]">პორტფოლიო</a>

            <a href="#pricing" onClick={() => setMenuOpen(false)} className="block text-base font-medium text-gray-300 hover:text-[#E50914]">ფასები</a>

            <a href="/collaboration" onClick={() => setMenuOpen(false)} className="block text-base font-medium text-gray-300 hover:text-[#E50914]">კოლაბორაცია</a>

            <a href="#ai-strategist" onClick={() => setMenuOpen(false)} className="flex items-center space-x-2 text-base font-medium text-red-400">

              <BrainCircuit className="w-5 h-5" />

              <span className="mersad-heading">ESHELON AI ᲑᲠᲔᲜᲓ-ᲡᲢᲠᲐᲢᲔᲒᲘ</span>

            </a>

            <a href="#contact" onClick={() => setMenuOpen(false)} className="block w-full text-center py-3 rounded-lg text-base font-bold bg-[#E50914] text-white">

              დაგვიკავშირდით

            </a>

          </div>

        )}

      </nav>

      {/* HERO SECTION */}

      <HeroSection />


      {/* PARTNER LOGOS */}

      <PartnersStrip />

      {/* ABOUT US */}

      <AboutSection />

      {/* CORE SERVICES */}

      <section id="services" data-reveal className="reveal-section py-24 bg-[#0a0a0a] border-y border-[#1e1e1e] relative">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">



          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">

            <h2 className="section-eyebrow text-xs font-bold text-[#E50914] tracking-widest uppercase">ᲠᲐᲡ ᲕᲐᲙᲔᲗᲔᲑᲗ</h2>

            <p className="mersad-heading text-3xl sm:text-4xl tracking-tight text-white">ᲡᲠᲣᲚᲘ ᲪᲘᲤᲠᲣᲚᲘ ᲐᲠᲡᲔᲜᲐᲚᲘ ᲗᲥᲕᲔᲜᲘ ᲑᲘᲖᲜᲔᲡᲘᲡ ᲬᲐᲠᲛᲐᲢᲔᲑᲘᲡᲗᲕᲘᲡ</p>

            <p className="text-gray-400">ჩვენი მომსახურებები მოიცავს ყველაფერს, რაც გჭირდებათ იდეიდან – მილიონიან ბრენდამდე მისასვლელად.</p>

          </div>



          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">



            {/* Service 1 */}

            <div className="surface-card bg-[#121212] border border-white/5 p-8 rounded-2xl hover:border-[#E50914]/40 transition duration-300 group">

              <div className="w-12 h-12 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center justify-center text-[#E50914] mb-6 group-hover:scale-110 transition duration-300">

                <Compass className="w-6 h-6" />

              </div>

              <h3 className="text-xl font-bold text-white mb-3">ვიზუალური იდენტობა</h3>

              <p className="text-gray-400 text-sm leading-relaxed mb-4">

                ლოგოების, ფერთა პალიტრის, ტიპოგრაფიისა და სტილის შექმნა. ბრენდბუქი, რომელიც განსაზღვრავს თქვენი ბრენდის სახესა და ხასიათს ნებისმიერ გარემოში.

              </p>

              <ul className="space-y-2 text-xs text-gray-500">

                <li className="flex items-center space-x-2">

                  <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />

                  <span>გეომეტრიულად სრულყოფილი ლოგოები</span>

                </li>

                <li className="flex items-center space-x-2">

                  <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />

                  <span>სრული ტიპოგრაფიული სისტემა</span>

                </li>

              </ul>

            </div>



            {/* Service 2 */}

            <div className="surface-card bg-[#121212] border border-white/5 p-8 rounded-2xl hover:border-[#E50914]/40 transition duration-300 group">

              <div className="w-12 h-12 rounded-xl bg-orange-950/40 border border-orange-500/30 flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition duration-300">

                <Smartphone className="w-6 h-6" />

              </div>

              <h3 className="text-xl font-bold text-white mb-3">სოციალური მედიის მართვა</h3>

              <p className="text-gray-400 text-sm leading-relaxed mb-4">

                პოსტერების დიზაინი, რომელიც ზრდის ჩართულობას, ქოფირაითინგი, რომელიც აყალიბებს ბრენდის უნიკალურ ტონს და ყოველკვირეული სთორების რედიზაინი.

              </p>

              <ul className="space-y-2 text-xs text-gray-500">

                <li className="flex items-center space-x-2">

                  <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />

                  <span>კონტენტ კალენდრის შედგენა</span>

                </li>

                <li className="flex items-center space-x-2">

                  <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />

                  <span>ემოციური და კრეატიული ქოფირაითინგი</span>

                </li>

              </ul>

            </div>



            {/* Service 3 */}

            <div className="surface-card bg-[#121212] border border-white/5 p-8 rounded-2xl hover:border-[#E50914]/40 transition duration-300 group">

              <div className="w-12 h-12 rounded-xl bg-blue-950/40 border border-blue-500/30 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition duration-300">

                <TrendingUp className="w-6 h-6" />

              </div>

              <h3 className="text-xl font-bold text-white mb-3">ედვერთაიზინგი & რეკლამა</h3>

              <p className="text-gray-400 text-sm leading-relaxed mb-4">

                სარეკლამო კამპანიები, რომლებიც მიმართულია ზუსტ აუდიტორიაზე. შადოუ რეკლამების გამოყენება ტესტირებისა და ოპტიმალური ROI-სთვის.

              </p>

              <ul className="space-y-2 text-xs text-gray-500">

                <li className="flex items-center space-x-2">

                  <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />

                  <span>სამიზნე აუდიტორიის კვლევა</span>

                </li>

                <li className="flex items-center space-x-2">

                  <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />

                  <span>A/B ტესტირება და ანალიტიკა</span>

                </li>

              </ul>

            </div>



          </div>

        </div>

      </section>



      {/* PORTFOLIO SECTION */}

      <section id="portfolio" data-reveal className="reveal-section py-24 relative">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">



          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">

            <div className="space-y-4 max-w-2xl">

              <h2 className="section-eyebrow text-xs font-bold text-[#E50914] tracking-widest uppercase">ჩვენი ნამუშევრები</h2>

              <p className="mersad-heading text-3xl sm:text-4xl tracking-tight text-white">
                ᲞᲝᲠᲢᲤᲝᲚᲘᲝ,
                <br className="hidden lg:block" />
                ᲠᲝᲛᲔᲚᲘᲪ ᲗᲐᲕᲐᲓ ᲡᲐᲣᲑᲠᲝᲑᲡ ᲡᲐᲙᲣᲗᲐᲠ ᲗᲐᲕᲖᲔ
              </p>

              <p className="text-gray-400">გადახედეთ ჩვენს მიერ განხორციელებულ ბრენდინგისა და მარკეტინგის ქეისებს.</p>

            </div>

            <div className="flex items-center space-x-2 bg-[#121212] p-1.5 rounded-xl border border-white/5 self-start md:self-auto">

              <span className="text-xs text-gray-400 px-3 py-1 bg-white/5 rounded-lg border border-white/5 font-mono">LATEST WORK</span>

            </div>

          </div>



          <div className="mb-14">
            <PosterFolio
              posters={folioPosterImages}
              speedSeconds={62}
            />
          </div>

          {/* GRID OF CASE STUDIES */}

          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.map((project) => (
              <PortfolioCard
                key={project.id}
                project={project}
                onSelect={setSelectedProject}
              />
            ))}
          </div>

          <div
            className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              showMorePortfolio ? 'max-h-[1600px] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'
            }`}
            aria-hidden={!showMorePortfolio}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-1">
              {extraPortfolioData.map((project, idx) => (
                <div
                  key={project.id}
                  className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    showMorePortfolio ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
                  style={{ transitionDelay: `${idx * 90}ms` }}
                >
                  <PortfolioCard
                    project={project}
                    onSelect={setSelectedProject}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowMorePortfolio((prev) => !prev)}
              className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-red-300/20 bg-gradient-to-r from-[#E50914] via-red-600 to-[#E50914] text-white text-xs font-black tracking-wider shadow-[0_18px_38px_-20px_rgba(229,9,20,0.95)] hover:scale-[1.02] active:scale-[0.985] transition"
            >
              <span className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/10 transition" />
              <span className="relative">{showMorePortfolio ? 'ნაკლების ჩვენება' : 'მეტის ჩვენება'}</span>
              <ChevronDown className={`relative w-4 h-4 transition-transform duration-300 ${showMorePortfolio ? 'rotate-180' : ''}`} />
            </button>
          </div>

        </div>

      </section>



      {/* PORTFOLIO MODAL */}

      {selectedProject && (

        <div

          className="fixed inset-0 bg-black/82 z-50"

          onClick={() => setSelectedProject(null)}

          style={{ animation: 'fadeIn 0.35s ease both' }}

        >

          <style>{`

            @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }

            @keyframes slideUp { from { opacity:0; transform:translateY(26px) scale(0.975) } to { opacity:1; transform:translateY(0) scale(1) } }

          `}</style>



          <div className="h-full w-full flex items-center justify-center p-4 sm:p-8">

            <div

              className={`surface-card bg-[#121212] border border-white/10 rounded-2xl w-full shadow-[0_32px_100px_-36px_rgba(0,0,0,0.9)] relative h-[88vh] overflow-hidden flex flex-col ${selectedProject.modalImages?.length ? 'max-w-6xl' : 'max-w-2xl'}`}

              onClick={(e) => e.stopPropagation()}

              style={{ animation: 'slideUp 0.42s cubic-bezier(0.22,1,0.36,1) both' }}

            >

              {/* Close button */}

              <button

                onClick={() => setSelectedProject(null)}

                className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white bg-black/70 p-2 rounded-full border border-white/10 transition"

              >

                <X className="w-5 h-5" />

              </button>



              {/* Cover image — full width */}

              {(selectedProject.modalImage || selectedProject.coverImage) && !selectedProject.modalImageScrollable && !selectedProject.modalImages?.length && (

                <div className="w-full rounded-t-2xl overflow-hidden">

                  <img

                    src={selectedProject.modalImage || selectedProject.coverImage}

                    alt={selectedProject.title}

                    className="w-full max-h-[38vh] object-cover"

                  />

                </div>

              )}



              <div className="flex-1 min-h-0 overflow-y-auto custom-scroll">

              {selectedProject.modalImages?.length > 0 && (
                <div className="w-full border-b border-white/10 p-3 sm:p-4 lg:p-5">
                  <div className="columns-1 sm:columns-2 xl:columns-3 gap-3 sm:gap-4 [column-fill:_balance]">
                    {selectedProject.modalImages.map((imageSrc, imageIdx) => (
                      <div
                        key={`${imageSrc}-${imageIdx}`}
                        className="mb-3 sm:mb-4 break-inside-avoid rounded-xl overflow-hidden border border-white/10 bg-black/30 shadow-[0_10px_28px_-20px_rgba(0,0,0,0.9)]"
                      >
                        <img
                          src={imageSrc}
                          alt={`${selectedProject.title} ${imageIdx + 1}`}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedProject.modalImageScrollable && (selectedProject.modalImage || selectedProject.coverImage) && !selectedProject.modalImages?.length && (
                <div className="w-full rounded-t-2xl overflow-hidden border-b border-white/10">
                  <img
                    src={selectedProject.modalImage || selectedProject.coverImage}
                    alt={selectedProject.title}
                    className="w-full h-auto object-contain"
                  />
                </div>
              )}

              {/* Content */}

              <div className="p-8 space-y-6">

                <div className="space-y-1">

                  <span className="text-xs font-mono tracking-widest text-[#E50914] uppercase">{selectedProject.category}</span>

                  <h3 className="text-3xl font-black text-white">{selectedProject.title}</h3>

                </div>



                <p className="text-gray-300 leading-relaxed text-sm">{selectedProject.longDescription}</p>



                <div className="space-y-3">

                  <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest">მთავარი ელემენტები:</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                    {selectedProject.features.map((feat, idx) => (

                      <div key={idx} className="flex items-center space-x-2 bg-black/40 p-3 rounded-lg border border-white/5 text-xs text-gray-300">

                        <CheckCircle className="w-4 h-4 shrink-0 text-[#E50914]" />

                        <span>{feat}</span>

                      </div>

                    ))}

                  </div>

                </div>



                <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/5 text-[10px] font-medium tracking-wide text-gray-500">
                  {getWorkTypeLabel(selectedProject)}
                </div>

              </div>



              {/* Footer */}

              <div className="px-8 pb-8 pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">

                <span className="text-xs text-gray-400">გსურთ მსგავსი შედეგი თქვენს ბრენდზე?</span>

                <button

                  onClick={() => { setOrderModal(selectedProject); setSelectedProject(null); }}

                  className="w-full sm:w-auto px-6 py-3 bg-[#E50914] text-white font-bold rounded-lg text-xs hover:bg-red-700 transition"

                >

                  მსგავსი პროექტის შეკვეთა

                </button>

              </div>

              </div>

            </div>

          </div>

        </div>

      )}



      {/* ECHELON AI STRATEGIST */}

      <section id="ai-strategist" data-reveal className="reveal-section py-24 bg-gradient-to-b from-[#0a0a0a] to-[#121212] border-t border-[#1e1e1e] relative">

        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-red-600/4 pointer-events-none rounded-full" />



        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="max-w-4xl mx-auto">



            <div className="text-center space-y-4 mb-12">

              <div className="inline-flex items-center space-x-2 bg-red-950/40 border border-red-500/20 px-3 py-1 rounded-full text-xs text-red-400">

                <BrainCircuit className="w-4 h-4" />

                <span>ხელოვნური ინტელექტი • GEMINI POWERED</span>

              </div>

              <h2 className="mersad-heading text-3xl sm:text-4xl text-white">ESHELON AI ᲑᲠᲔᲜᲓ-ᲡᲢᲠᲐᲢᲔᲒᲘ</h2>

              <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">

                გაქვთ ბიზნესის იდეა, მაგრამ არ იცით როგორ აქციოთ ის ბრენდად? ჩაწერეთ თქვენი იდეა ქვემოთ და ჩვენი AI სტრატეგი უნიკალურ ბრენდ-კონცეფციას წამებში დაგიგენერირებთ!

              </p>

            </div>



            <div className="surface-card bg-[#181818] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-xl">

              <form onSubmit={generateAIStrategy} className="space-y-6">

                <div>

                  <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">დაწერეთ თქვენი ბიზნესის ან სტარტაპის იდეა:</label>

                  <textarea

                    value={businessIdea}

                    onChange={(e) => setBusinessIdea(e.target.value)}

                    placeholder="მაგ: მინდა გავხსნა კრეატიული კაფე ქუთაისში, სადაც იქნება წიგნების კითხვა და მშვიდი გარემო..."

                    className="w-full bg-black/60 border border-white/10 rounded-xl p-4 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] transition h-32 resize-none"

                    required

                  />

                </div>



                <div className="flex justify-end">

                  <button

                    type="submit"

                    disabled={aiLoading}

                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#E50914] text-white font-bold rounded-xl text-sm hover:bg-red-700 transition duration-200 disabled:bg-gray-800 disabled:text-gray-500 cursor-pointer"

                  >

                    {aiLoading ? (

                      <>

                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />

                        მზადდება სტრატეგია...

                      </>

                    ) : (

                      <>

                        სტრატეგიის გენერირება

                        <Zap className="w-4 h-4 ml-2 fill-white text-white" />

                      </>

                    )}

                  </button>

                </div>

              </form>



              {/* AI Strategy Error Message */}

              {aiError && (

                <div className="mt-8 bg-red-950/40 border border-red-500/30 p-4 rounded-xl text-sm text-red-400">

                  {aiError}

                </div>

              )}



              {/* AI Strategy Results Panel */}

              {aiStrategyResult && (

                <div className="mt-8 pt-8 border-t border-white/10 space-y-6 animate-fade-in">

                  <div className="bg-gradient-to-r from-red-950/20 to-orange-950/20 border border-white/5 rounded-xl p-6 space-y-4">

                    <span className="text-[10px] font-mono tracking-widest text-[#E50914] uppercase">თქვენი საფირმო სლოგანი</span>

                    <p className="text-xl sm:text-2xl font-black text-white italic">

                      "{aiStrategyResult.slogan}"

                    </p>

                  </div>



                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="bg-black/40 border border-white/5 p-6 rounded-xl space-y-3">

                      <span className="text-[10px] font-mono tracking-widest text-orange-400 uppercase">ვიზუალური Vibe & სტილი</span>

                      <p className="text-sm text-gray-300 leading-relaxed">

                        {aiStrategyResult.vibeDescription}

                      </p>

                    </div>



                    <div className="bg-black/40 border border-white/5 p-6 rounded-xl space-y-3">

                      <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">სუპერ სარეკლამო იდეა</span>

                      <p className="text-sm text-gray-300 leading-relaxed">

                        {aiStrategyResult.heroIdea}

                      </p>

                    </div>

                  </div>



                  <div className="bg-black/40 border border-white/5 p-6 rounded-xl space-y-4">

                    <span className="text-[10px] font-mono tracking-widest text-green-400 uppercase block">3 ნაბიჯი წარმატებისთვის:</span>

                    <ol className="space-y-3">

                      {aiStrategyResult.strategySteps.map((step, idx) => (

                        <li key={idx} className="flex items-start space-x-3 text-sm text-gray-300">

                          <span className="font-bold text-[#E50914] font-mono bg-red-950/40 w-6 h-6 rounded-full flex items-center justify-center border border-[#E50914]/20 flex-shrink-0 text-xs mt-0.5">

                            {idx + 1}

                          </span>

                          <span>{step}</span>

                        </li>

                      ))}

                    </ol>

                  </div>



                  <div className="text-center pt-4">

                    <p className="text-xs text-gray-500 mb-3">მოგეწონათ ხელოვნური ინტელექტის შემოთავაზება? განვავითაროთ ის ერთად!</p>

                    <a

                      href="#contact"

                      className="inline-flex items-center space-x-2 text-xs font-bold text-[#E50914] hover:underline"

                    >

                      <span>ესაუბრეთ ეშელონის დიზაინერებს ამ იდეაზე</span>

                      <ArrowRight className="w-3.5 h-3.5" />

                    </a>

                  </div>

                </div>

              )}



            </div>

          </div>

        </div>

      </section>



      {/* PRICING SECTION */}

      <section id="pricing" data-reveal className="reveal-section py-24 bg-[#0d0d0d] relative">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">



          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">

            <h2 className="section-eyebrow text-xs font-bold text-[#E50914] tracking-widest uppercase">ფასები და პაკეტები</h2>

            <p className="mersad-heading text-3xl sm:text-4xl text-white">ᲐᲘᲠᲩᲘᲔᲗ ᲗᲥᲕᲔᲜᲘ ᲔᲨᲔᲚᲝᲜᲘᲡ ᲞᲐᲙᲔᲢᲘ</p>

            <p className="text-gray-400 text-sm sm:text-base">

              ყველა ფასი გამჭვირვალეა. აირჩიეთ სრული ბრენდინგი ან ყოველთვიური სოციალური მედიის (SMM) მხარდაჭერა.

            </p>



            {/* TAB SELECTOR */}

            <div className="flex justify-center pt-4">

              <div className="inline-flex bg-[#121212] p-1 rounded-xl border border-white/5">

                <button

                  onClick={() => setActiveTab('smm')}

                  className={`px-6 py-2.5 rounded-lg text-sm font-bold transition ${activeTab === 'smm' ? 'bg-[#E50914] text-white' : 'text-gray-400 hover:text-white'}`}

                >

                  სოციალური მედია (SMM)

                </button>

                <button

                  onClick={() => setActiveTab('branding')}

                  className={`px-6 py-2.5 rounded-lg text-sm font-bold transition ${activeTab === 'branding' ? 'bg-[#E50914] text-white' : 'text-gray-400 hover:text-white'}`}

                >

                  ბრენდინგი & იდენტობა

                </button>

              </div>

            </div>

          </div>



          {/* PRICING GRID */}

          <div className="reveal-stagger grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

            {activeTab === 'branding' ? (

              brandingPackages.map((pkg, idx) => (

                <div

                  key={idx}

                  className={`surface-card bg-[#121212] border rounded-2xl p-8 flex flex-col justify-between transition duration-300 relative ${pkg.featured ? 'border-[#E50914] shadow-lg shadow-[#E50914]/5 ring-1 ring-[#E50914]' : 'border-white/5'}`}

                >

                  {pkg.featured && (

                    <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 bg-[#E50914] text-white text-[10px] font-bold tracking-wider rounded-full uppercase">

                      ყველაზე პოპულარული

                    </div>

                  )}



                  <div className="space-y-6">

                    <div className="flex items-start justify-between">

                      <div>

                        <span className="text-[10px] uppercase tracking-widest font-mono text-gray-500 block mb-1">{pkg.badge}</span>

                        <h4 className="text-xl font-bold text-white">{pkg.title}</h4>

                      </div>

                    </div>



                    <div className="flex items-baseline text-white">

                      <span className="text-4xl font-black tracking-tight">{pkg.price}</span>

                    </div>



                    <p className="text-xs text-gray-400 leading-relaxed">{pkg.desc}</p>
                    {pkg.compareHint && (
                      <p className="text-[11px] text-[#E50914] leading-relaxed">{pkg.compareHint}</p>
                    )}
                    {pkg.deltaFromPrev && (
                      <div className="flex flex-wrap gap-2">
                        {pkg.deltaFromPrev.map((item, itemIdx) => (
                          <span
                            key={itemIdx}
                            className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-md bg-black/35 border border-white/10 text-gray-200"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}



                    <div className="border-t border-white/5 pt-6 space-y-4">

                      {pkg.features.map((feat, fIdx) => (
                        (() => {
                          const isDiscount = Boolean(feat.discount);
                          return (

                        <div key={fIdx} className={`flex items-start space-x-3 text-xs ${isDiscount ? 'bg-white/[0.03] border border-[#E50914]/35 rounded-lg px-3 py-2.5' : ''}`}>

                          {feat.included ? (

                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />

                          ) : (

                            <Lock className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />

                          )}

                          <div className="flex flex-col items-start gap-1.5">
                            {isDiscount && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black tracking-wide bg-[#E50914] text-white">
                                -50% ფასდაკლება
                              </span>
                            )}
                            <span className={feat.included ? (isDiscount ? "text-white font-semibold" : "text-gray-300") : "text-gray-600 line-through"}>
                              {feat.text}
                            </span>
                          </div>

                        </div>
                          );
                        })()

                      ))}

                    </div>

                  </div>



                  <div className="pt-8">

                    <button

                      onClick={() => setOrderModal(pkg)}

                      className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs transition duration-200 ${pkg.featured ? 'bg-[#E50914] text-white hover:bg-red-700' : 'bg-[#1a1a1a] text-white hover:bg-white/5 border border-white/10'}`}

                    >

                      არჩევა და შეკვეთა

                    </button>

                  </div>

                </div>

              ))

            ) : (

              smmPackages.map((pkg, idx) => (

                <div

                  key={idx}

                  className={`surface-card bg-[#121212] border rounded-2xl p-8 flex flex-col justify-between transition duration-300 relative ${pkg.featured ? 'border-[#E50914] shadow-lg shadow-[#E50914]/5 ring-1 ring-[#E50914]' : 'border-white/5'}`}

                >

                  {pkg.featured && (

                    <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 bg-[#E50914] text-white text-[10px] font-bold tracking-wider rounded-full uppercase">

                      რეკომენდებული

                    </div>

                  )}



                  <div className="space-y-6">

                    <div className="flex items-start justify-between">

                      <div>

                        <span className="text-[10px] uppercase tracking-widest font-mono text-gray-500 block mb-1">{pkg.badge}</span>

                        <h4 className="text-xl font-bold text-white">{pkg.title}</h4>

                      </div>

                    </div>



                    <div className="flex items-baseline text-white">

                      <span className="text-4xl font-black tracking-tight">{pkg.price}</span>

                    </div>



                    <p className="text-xs text-gray-400 leading-relaxed">{pkg.desc}</p>
                    {pkg.compareHint && (
                      <p className="text-[11px] text-[#E50914] leading-relaxed">{pkg.compareHint}</p>
                    )}



                    <div className="border-t border-white/5 pt-6 space-y-4">

                      {pkg.features.map((feat, fIdx) => (
                        (() => {
                          const isDiscount = Boolean(feat.discount);
                          return (

                        <div key={fIdx} className={`flex items-start space-x-3 text-xs ${isDiscount ? 'bg-white/[0.03] border border-[#E50914]/35 rounded-lg px-3 py-2.5' : ''}`}>

                          {feat.included ? (

                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />

                          ) : (

                            <Lock className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />

                          )}

                          <div className="flex flex-col items-start gap-1.5">
                            {isDiscount && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black tracking-wide bg-[#E50914] text-white">
                                -50% ფასდაკლება
                              </span>
                            )}
                            <span className={feat.included ? (isDiscount ? "text-white font-semibold" : "text-gray-300") : "text-gray-600 line-through"}>
                              {feat.text}
                            </span>
                          </div>

                        </div>
                          );
                        })()

                      ))}

                    </div>

                  </div>



                  <div className="pt-8">

                    <button

                      onClick={() => setOrderModal(pkg)}

                      className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs transition duration-200 ${pkg.featured ? 'bg-[#E50914] text-white hover:bg-red-700' : 'bg-[#1a1a1a] text-white hover:bg-white/5 border border-white/10'}`}

                    >

                      არჩევა და შეკვეთა

                    </button>

                  </div>

                </div>

              ))

            )}

          </div>



          {/* DYNAMIC PRICE ESTIMATOR / CALCULATOR */}

          <div className="surface-card mt-20 bg-[#121212] border border-white/5 rounded-2xl p-6 sm:p-10 max-w-4xl mx-auto">

            <div className="flex items-center space-x-3 mb-6">

              <Sliders className="w-6 h-6 text-[#E50914]" />

              <h3 className="mersad-heading text-xl text-white">ᲘᲜᲓᲘᲕᲘᲓᲣᲐᲚᲣᲠᲘ ᲞᲐᲙᲔᲢᲘᲡ ᲐᲛᲬᲧᲝᲑᲘ</h3>

            </div>



            <p className="text-xs text-gray-400 mb-8 leading-relaxed">

              გჭირდებათ სპეციფიკური მოთხოვნები? ააწყვეთ თქვენი პაკეტი და ნახეთ სავარაუდო ფასი.

            </p>



            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Controls */}

              <div className="space-y-6">

                <div className="flex items-center justify-between">

                  <label className="text-xs font-bold text-gray-300 uppercase">ლოგოს დიზაინი (+500 ₾)</label>

                  <input

                    type="checkbox"

                    checked={customServices.logo}

                    onChange={(e) => setCustomServices({ ...customServices, logo: e.target.checked })}

                    className="w-5 h-5 rounded border-white/10 text-[#E50914] focus:ring-[#E50914] bg-black"

                  />

                </div>



                <div className="flex items-center justify-between">

                  <label className="text-xs font-bold text-gray-300 uppercase">ბრენდბუქი & გრიდები (+1200 ₾)</label>

                  <input

                    type="checkbox"

                    checked={customServices.guidelines}

                    onChange={(e) => setCustomServices({ ...customServices, guidelines: e.target.checked })}

                    className="w-5 h-5 rounded border-white/10 text-[#E50914] focus:ring-[#E50914] bg-black"

                  />

                </div>



                <div className="space-y-2">

                  <div className="flex justify-between">

                    <label className="text-xs font-bold text-gray-300 uppercase">პოსტების რაოდენობა: {customServices.posts}</label>

                    <span className="text-xs font-mono text-[#E50914]">({customServices.posts * SMM_POST_UNIT_PRICE} ₾)</span>

                  </div>

                  <input

                    type="range"

                    min="4"

                    max="30"

                    value={customServices.posts}

                    onChange={(e) => setCustomServices({ ...customServices, posts: parseInt(e.target.value, 10) })}

                    className="w-full accent-[#E50914]"

                  />

                </div>



                <div className="space-y-2">

                  <div className="flex justify-between">

                    <label className="text-xs font-bold text-gray-300 uppercase">სთორების რაოდენობა: {customServices.stories}</label>

                    <span className="text-xs font-mono text-[#E50914]">({customServices.stories * SMM_STORY_UNIT_PRICE} ₾)</span>

                  </div>

                  <input

                    type="range"

                    min="0"

                    max="30"

                    value={customServices.stories}

                    onChange={(e) => setCustomServices({ ...customServices, stories: parseInt(e.target.value, 10) })}

                    className="w-full accent-[#E50914]"

                  />

                </div>



                <div className="flex items-center justify-between">

                  <label className="text-xs font-bold text-gray-300 uppercase">რეკლამის მართვა (Ad set) (+400 ₾)</label>

                  <input

                    type="checkbox"

                    checked={customServices.advertising}

                    onChange={(e) => setCustomServices({ ...customServices, advertising: e.target.checked })}

                    className="w-5 h-5 rounded border-white/10 text-[#E50914] focus:ring-[#E50914] bg-black"

                  />

                </div>



                <div className="flex items-center justify-between">

                  <label className="text-xs font-bold text-gray-300 uppercase">შადოუ რეკლამების ტესტირება (+250 ₾)</label>

                  <input

                    type="checkbox"

                    checked={customServices.shadowTesting}

                    onChange={(e) => setCustomServices({ ...customServices, shadowTesting: e.target.checked })}

                    className="w-5 h-5 rounded border-white/10 text-[#E50914] focus:ring-[#E50914] bg-black"

                  />

                </div>

              </div>



              {/* Dynamic Calculation Output */}

              <div className="bg-black/40 border border-white/5 rounded-xl p-6 flex flex-col justify-between text-center md:text-left">

                <div className="space-y-4">

                  <span className="text-[10px] font-mono tracking-widest text-[#E50914] uppercase block">კალკულაციის ჯამი:</span>

                  <div className="text-4xl sm:text-5xl font-black text-white">{calculateCustomPrice()} ₾</div>

                  <p className="text-xs text-gray-400 leading-relaxed">

                    ეს არის ინდივიდუალური გაანგარიშება. საბოლოო პაკეტი დაზუსტდება თქვენთან დეტალური საუბრის შემდეგ.

                  </p>

                </div>



                <div className="pt-6">

                  <button

                    onClick={() => setOrderModal({ title: 'ინდივიდუალური პაკეტი', price: `${calculateCustomPrice()} ₾`, desc: 'თქვენს მიერ აწყობილი კალკულაცია' })}

                    className="w-full py-4 bg-white text-black font-bold rounded-xl text-xs hover:bg-gray-100 transition active:scale-95"

                  >

                    არჩეული პაკეტის შეკვეთა

                  </button>

                </div>

              </div>

            </div>

          </div>



        </div>

      </section>



      {/* FACEBOOK NEWS */}

      <FacebookNewsSection />



      {/* CONTACT & ORDER FORMS */}

      <section id="contact" data-reveal className="reveal-section py-24 bg-[#0a0a0a] border-t border-[#1e1e1e] relative">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="reveal-stagger grid grid-cols-1 lg:grid-cols-12 gap-12">



            {/* Info panel */}

            <div className="lg:col-span-5 space-y-8">

              <div className="space-y-4">

                <h2 className="section-eyebrow text-xs font-bold text-[#E50914] tracking-widest uppercase">კონტაქტი</h2>

                <p className="mersad-heading text-3xl sm:text-4xl text-white">ᲓᲐᲕᲘᲬᲧᲝᲗ ᲗᲥᲕᲔᲜᲘ ᲑᲠᲔᲜᲓᲘᲡ ᲐᲦᲛᲐᲕᲚᲝᲑᲐ</p>

                <p className="text-gray-400 text-sm leading-relaxed">

                  დაგვიკავშირდით დღესვე და მიიღეთ უფასო კონსულტაცია ეშელონის წამყვან სპეციალისტებთან. ჩვენ ერთად განვსაზღვრავთ თქვენი ბრენდის წარმატების ფორმულას.

                </p>

              </div>



              <div className="space-y-4">

                <div className="flex items-center space-x-3">

                  <div className="w-10 h-10 rounded-lg bg-[#121212] border border-white/5 flex items-center justify-center text-[#E50914]">

                    <MapPin className="w-5 h-5" />

                  </div>

                  <div>

                    <div className="text-xs text-gray-500 font-mono uppercase">ოფისი:</div>

                    <div className="text-sm font-bold text-white">თბილისი და ქუთაისი, საქართველო</div>

                  </div>

                </div>



                <div className="flex items-center space-x-3">

                  <div className="w-10 h-10 rounded-lg bg-[#121212] border border-white/5 flex items-center justify-center text-[#E50914]">

                    <Mail className="w-5 h-5" />

                  </div>

                  <div>

                    <div className="text-xs text-gray-500 font-mono uppercase">ელ-ფოსტა:</div>

                    <div className="text-sm font-bold text-white">tazo.gochelashvili.3@gmail.com</div>
                    <div className="text-xs text-gray-400">kalmakhelidzelazare@gmail.com</div>

                  </div>

                </div>



                <div className="flex items-center space-x-3">

                  <div className="w-10 h-10 rounded-lg bg-[#121212] border border-white/5 flex items-center justify-center text-[#E50914]">

                    <Phone className="w-5 h-5" />

                  </div>

                  <div>

                    <div className="text-xs text-gray-500 font-mono uppercase">ტელეფონი:</div>

                    <div className="text-sm font-bold text-white">551 98 15 02</div>

                  </div>

                </div>

              </div>



              <div className="pt-6 border-t border-white/5">

                <p className="text-xs text-gray-500 leading-relaxed">

                  ჩვენ ვპასუხობთ ყველა შეტყობინებას 24 საათის განმავლობაში.

                </p>

              </div>

            </div>



            {/* Direct message form */}

            <div className="lg:col-span-7">

              <div className="surface-card bg-[#121212] border border-white/5 rounded-2xl p-6 sm:p-10">

                <h3 className="text-xl font-bold text-white mb-6">მოგვწერეთ პირდაპირ</h3>



                <form onSubmit={handleContactSubmit} className="space-y-6">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                    <div>

                      <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">თქვენი სახელი:</label>

                      <input

                        type="text"
                        name="name"

                        className="w-full bg-black/60 border border-white/10 rounded-lg p-3.5 text-white text-sm focus:outline-none focus:border-[#E50914] transition"

                        placeholder="მაგ: გიორგი"

                        required

                      />

                    </div>

                    <div>

                      <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">ტელეფონის ნომერი:</label>

                      <input

                        type="tel"
                        name="phone"

                        className="w-full bg-black/60 border border-white/10 rounded-lg p-3.5 text-white text-sm focus:outline-none focus:border-[#E50914] transition"

                        placeholder="მაგ: +995 5..."

                        required

                      />

                    </div>

                  </div>



                  <div>

                    <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">ბრენდის ან კომპანიის დასახელება:</label>

                    <input

                      type="text"
                      name="company"

                      className="w-full bg-black/60 border border-white/10 rounded-lg p-3.5 text-white text-sm focus:outline-none focus:border-[#E50914] transition"

                      placeholder="მაგ: ეშელონ კაფე"

                    />

                  </div>



                  <div>

                    <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">შეტყობინება / მოთხოვნები:</label>

                    <textarea

                      name="message"
                      className="w-full bg-black/60 border border-white/10 rounded-lg p-3.5 text-white text-sm focus:outline-none focus:border-[#E50914] transition h-32 resize-none"

                      placeholder="დაწერეთ თქვენი სურვილები..."

                      required

                    />

                  </div>



                  <div className="flex justify-end">

                    <button

                      type="submit"

                      className="w-full sm:w-auto px-8 py-4 bg-[#E50914] text-white font-bold rounded-xl text-xs hover:bg-red-700 transition duration-200 active:scale-95"

                    >

                      გაგზავნა

                    </button>

                  </div>

                </form>



                {orderSuccess && (

                  <div className="mt-6 bg-green-950/40 border border-green-500/30 p-4 rounded-xl text-xs text-green-400">

                    შეტყობინება წარმატებით გაიგზავნა! ეშელონის სტრატეგები მალე დაგიკავშირდებიან.

                  </div>

                )}

              </div>

            </div>



          </div>

        </div>

      </section>



      {/* FOOTER */}

      <footer className="bg-black border-t border-[#1a1a1a] py-12">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">

            <a href="#hero" onClick={scrollToTopSmooth} className="flex items-center space-x-3 group">

              <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#E50914]/30 group-hover:border-[#E50914]/60 transition-colors">

                <img src="/logod.jpg" alt="Eshelon Logo" className="w-full h-full object-cover" />

              </div>

              <div>

                <span className="text-md font-bold tracking-widest text-white block group-hover:text-[#E50914] transition-colors">ESHELON</span>

                <span className="text-[9px] tracking-widest text-gray-500 block uppercase -mt-1">Highest</span>

              </div>

            </a>



            <p className="text-xs text-gray-500 font-mono">

              © {new Date().getFullYear()} ESHELON DIGITAL AGENCY. ყველა უფლება დაცულია.

            </p>



            <div className="flex items-center">
              <span className="text-gray-500 hover:text-white transition text-xs font-semibold tracking-wide">@eshelon</span>
            </div>

          </div>

        </div>

      </footer>



      {/* DIRECT PACKAGE ORDER MODAL */}

      {orderModal && (

        <div className="fixed inset-0 bg-black/82 z-50 flex items-center justify-center p-4">

          <div className="bg-[#121212] border border-white/10 rounded-2xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl">

            <button

              onClick={() => setOrderModal(null)}

              className="absolute top-4 right-4 text-gray-400 hover:text-white bg-black/40 p-1.5 rounded-full border border-white/5 transition"

            >

              <X className="w-5 h-5" />

            </button>



            <div className="space-y-4 mb-6">

              <span className="text-[10px] font-mono tracking-widest text-[#E50914] uppercase">პაკეტის შეკვეთა</span>

              <h3 className="text-2xl font-black text-white">{orderModal.title}</h3>

              <div className="text-lg font-bold text-[#E50914]">{orderModal.price}</div>

              <p className="text-xs text-gray-400">{orderModal.desc}</p>

            </div>



            <form onSubmit={handleOrderSubmit} className="space-y-4">

              <div>

                <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-1">თქვენი სახელი:</label>

                <input

                  type="text"

                  value={orderForm.name}

                  onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}

                  className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-[#E50914] transition"

                  placeholder="მაგ: გიორგი"

                  required

                />

              </div>



              <div>

                <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-1">ტელეფონის ნომერი:</label>

                <input

                  type="tel"

                  value={orderForm.phone}

                  onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}

                  className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-[#E50914] transition"

                  placeholder="მაგ: +995..."

                  required

                />

              </div>



              <div>

                <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-1">კომენტარი ან შენიშვნა:</label>

                <textarea

                  value={orderForm.note}

                  onChange={(e) => setOrderForm({ ...orderForm, note: e.target.value })}

                  className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-[#E50914] transition h-20 resize-none"

                  placeholder="დამატებითი მოთხოვნები..."

                />

              </div>



              <button

                type="submit"

                className="w-full py-4 bg-[#E50914] text-white font-bold rounded-xl text-xs hover:bg-red-700 transition"

              >

                დადასტურება და შეკვეთა

              </button>

            </form>



            {orderSuccess && (

              <div className="absolute inset-0 bg-[#121212] rounded-2xl flex flex-col items-center justify-center p-6 text-center z-10 animate-fade-in">

                <CheckCircle className="w-12 h-12 text-green-500 mb-4 animate-bounce" />

                <h4 className="text-lg font-bold text-white mb-2">შეკვეთა მიღებულია!</h4>

                <p className="text-xs text-gray-400">

                  ჩვენი წარმომადგენელი ძალიან მალე დაგიკავშირდებათ მითითებულ ნომერზე.

                </p>

              </div>

            )}

          </div>

        </div>

      )}



    </div>

  );

}

export default App;
