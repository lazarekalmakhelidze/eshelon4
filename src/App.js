import './style.css';

import React, { useEffect, useRef, useState } from 'react';
import PosterFolio from './components/PosterFolio';
import Img, { webpSrcSet, webpUrl } from './Img';

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
import { useSiteContent, pickList } from './siteContent';
import { mergeSettings, telHref, whatsappHref, sendLead } from './siteSettings';
import ProjectViewer from './components/ProjectViewer';
import { useLang, localizeProject, localizePackage, localizeNews, localizeOffer, localizeTerms, localizeSettings } from './i18n';
import PackageFinder from './components/PackageFinder';
import PriceCalculator from './components/PriceCalculator';
import { FacebookIcon, InstagramIcon, WhatsAppIcon, MessengerIcon } from './components/BrandIcons';

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
    modalImage: '/optimized/portfolio/lokrossfull.jpg',
    modalImageScrollable: true,
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
    modalImage: '/optimized/portfolio/westfull.jpg',
    modalImageScrollable: true,
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
    modalImage: '/optimized/portfolio/ფუდლი.jpg',
    modalImageScrollable: true,
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
  },
  {
    id: 'morika',
    title: 'მორიკა',
    category: 'ბრენდინგი & ვიზუალური იდენტობა',
    description: 'მშვიდი, ინტერიერზე ორიენტირებული ვიზუალური იდენტობა თბილი ტექსტურებით, დახვეწილი ფერთა პალიტრითა და პრეზენტაციული ბრენდ-მასალებით.',
    longDescription: 'მორიკასთვის შექმნილი ვიზუალური სისტემა ეყრდნობა თბილ ტექსტურებს, ინტერიერის ესთეტიკას და ბუნებრივ ფერთა პალიტრას. ქეისში გაერთიანებულია ბრენდის ნიშნები, გარემოს ვიზუალები და გამოყენებითი მასალები, რომლებიც ბრენდს მშვიდ, დახვეწილ და სანდო ხასიათს აძლევს.',
    color: '#8b5e34',
    bgClass: 'bg-stone-950/40 border-stone-500/30 text-stone-300',
    coverImage: '/optimized/portfolio/მორიკა.jpg',
    modalImage: '/optimized/portfolio/მორიკა.jpg',
    modalImageScrollable: true,
    tags: ['Brand Identity', 'Interior Visuals', 'Visual System'],
    features: ['თბილი და ბუნებრივი ფერთა სისტემა', 'ინტერიერზე მორგებული ბრენდის პრეზენტაცია', 'გამოყენებითი მასალების ვიზუალური ერთიანობა']
  },
  {
    id: 'abica',
    title: 'Abica',
    category: 'ბრენდინგი & შეფუთვის დიზაინი',
    description: 'ენერგიული საკვები ბრენდის ვიზუალური იდენტობა გამორჩეული ტიპოგრაფიით, შეფუთვის სისტემითა და სოციალური მედიის ელემენტებით.',
    longDescription: 'Abica-ს ქეისი აგებულია მკაფიო, ხმაურიან და დასამახსოვრებელ ვიზუალურ ენაზე. ნარინჯისფერი და მწვანე ფერების კონტრასტი, გამორჩეული ქართული ტიპოგრაფია, შეფუთვის დიზაინი და ციფრული კომუნიკაციის ელემენტები ბრენდს სწრაფად ცნობად და კომერციულად ძლიერ სახეს აძლევს.',
    color: '#f97316',
    bgClass: 'bg-orange-950/40 border-orange-500/30 text-orange-300',
    coverImage: '/optimized/portfolio/abica.jpg',
    modalImage: '/optimized/portfolio/abica.jpg',
    modalImageScrollable: true,
    tags: ['Brand Identity', 'Packaging Design', 'Food Branding', 'Social Media'],
    features: ['ენერგიული ფერთა კონტრასტი', 'შეფუთვისა და ციფრული ვიზუალების სისტემა', 'დასამახსოვრებელი ტიპოგრაფიული ხასიათი']
  },
  {
    id: 'zenari',
    title: 'ზენარი',
    category: 'ბრენდინგი & დეველოპმენტი',
    description: 'დეველოპმენტის ბრენდისთვის შექმნილი პრემიუმ ვიზუალური იდენტობა მუქი ლურჯი და ოქროსფერი აქცენტებით, არქიტექტურული და ციფრული მატარებლებით.',
    longDescription: 'ზენარის ქეისში მთავარი აქცენტი გაკეთებულია პრემიუმ უძრავი ქონების შეგრძნებაზე: მუქი ლურჯი ფონები, ოქროსფერი ლოგოტიპი, სამშენებლო და ციფრული მატარებლები ქმნის სანდო, მაღალკლასიან და დამახასიათებელ ვიზუალურ ენას. პრეზენტაციაში ერთიანდება ექსტერიერის ვიზუალი, ბრენდირებული სამუშაო მასალები და სოციალური მედიის ფორმატები.',
    color: '#d4af37',
    bgClass: 'bg-blue-950/40 border-yellow-500/30 text-yellow-300',
    coverImage: '/optimized/portfolio/ზენარი.jpg',
    modalImage: '/optimized/portfolio/ზენარი.jpg',
    modalImageScrollable: true,
    tags: ['Real Estate Branding', 'Premium Identity', 'Social Media', 'Brand Applications'],
    features: ['მუქი ლურჯისა და ოქროსფრის პრემიუმ კონტრასტი', 'დეველოპმენტის ბრენდის გამოყენებითი მატარებლები', 'ციფრული და ფიზიკური touchpoint-ების ერთიანი სტილი']
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
    modalImages: Array.from({ length: 15 }, (_, i) => `/optimized/portfolio/athome-ge/at${i + 1}.jpg`),
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
    modalImages: Array.from({ length: 10 }, (_, i) => `/optimized/portfolio/ჰაკენი/ჰ${i + 1}.jpg`),
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
  morika: 'ვიზუალური იდენტობა',
  abica: 'ვიზუალური იდენტობა',
  zenari: 'ვიზუალური იდენტობა',
  'athome-ge': 'სოც. მედია',
  mochiko: 'სოც. მედია',
  'hakken-restaurant': 'სოც. მედია'
};

function getWorkTypeLabel(project) {
  return project.workType || workTypeByProjectId[project.id] || 'სოც. მედია';
}

function PortfolioCard({ project, onSelect }) {
  const { t } = useLang();
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
            <Img
              src={project.coverImage}
              sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
              alt={`${project.title} cover`}
              className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 z-10">
              <div className="inline-block px-3 py-1 rounded-md text-xs font-semibold tracking-normal bg-black/55 border border-white/20 text-white">
                {project.title}
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1c1c1c] to-[#0f0f0f] relative flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-radial-gradient from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
            <div className="relative z-10 text-center space-y-3">
              <div className="inline-block px-3 py-1 rounded-md text-xs font-semibold tracking-normal bg-black/50 border border-white/10 text-white">
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
        <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/5 text-xs font-medium tracking-normal text-gray-500">
          {getWorkTypeLabel(project)}
        </div>
        <p className="text-sm text-gray-400 line-clamp-3">{project.description}</p>
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs font-bold text-white group-hover:text-[#E50914] transition duration-200">{t('ქეისის დეტალები', 'View case')}</span>
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

function CountUp({ value }) {
  const ref = useRef(null);
  const match = String(value || '').match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);
  const [shown, setShown] = useState(match ? `${match[1]}0${match[3]}` : value);
  useEffect(() => {
    if (!match) { setShown(value); return undefined; }
    const target = parseFloat(match[2].replace(',', '.'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(value); return undefined; }
    let raf; let start;
    const run = (t) => {
      if (!start) start = t;
      const k = Math.min(1, (t - start) / 1400);
      const eased = 1 - Math.pow(1 - k, 3);
      setShown(`${match[1]}${Math.round(target * eased)}${match[3]}`);
      if (k < 1) raf = requestAnimationFrame(run);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { raf = requestAnimationFrame(run); io.disconnect(); }
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [value]);
  return <span ref={ref} className="tabular-nums">{shown}</span>;
}

function HeroSection({ settings }) {
  const { t, en } = useLang();
  const stats = (settings.stats || []).filter((st) => st && st.value);
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
          <source media="(min-width: 1024px)" type="image/webp" srcSet={webpSrcSet('/cover-landscape.jpg')} sizes="100vw" />
          <source media="(min-width: 1024px)" srcSet="/cover-landscape.jpg" />
          <source type="image/webp" srcSet={webpSrcSet('/cover-portrait.jpg')} sizes="100vw" />
          <img
            src="/cover-portrait.jpg"
            alt=""
            data-boot="cover"
            onLoad={() => window.__boot && window.__boot.mark('cover')}
            onError={() => window.__boot && window.__boot.mark('cover')}
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
          {/* Headline — Georgian calligraphy PNG, English set in the brand display font */}
          {en ? (
            <h1
              className="mersad-heading text-white uppercase leading-[0.95] text-[44px] sm:text-6xl lg:text-7xl tracking-tight mt-2 sm:-mt-2 lg:-mt-8 drop-shadow-[0_10px_30px_rgba(0,0,0,0.75)]"
              style={{ animation: 'headlineIn 1s 0.4s cubic-bezier(0.22,1,0.36,1) both' }}
            >
              Growth is<br />the choice<br /><span className="text-[#ff4d55]">of the few</span>
            </h1>
          ) : (
            <div className="inline-block">
              <h1 className="sr-only">ზრდა ერთეულების არჩევანია</h1>
              <Img
                src="/hero-headline.png"
                sizes="(min-width: 640px) 512px, 60vw"
                alt=""
                data-boot="headline"
                onLoad={() => window.__boot && window.__boot.mark('headline')}
                onError={() => window.__boot && window.__boot.mark('headline')}
                className="w-full max-w-[90vw] sm:max-w-lg mt-1 sm:-mt-4 lg:-mt-12 drop-shadow-[0_10px_30px_rgba(0,0,0,0.75)]"
                fetchPriority="high"
                decoding="async"
                style={{
                  animation: 'headlineIn 1s 0.4s cubic-bezier(0.22,1,0.36,1) both',
                  filter: 'drop-shadow(0 0 14px rgba(229,9,20,0.22))'
                }}
              />
            </div>
          )}
          {settings.tagline && (
            <p className="text-[15px] sm:text-lg text-gray-100 font-medium max-w-md leading-snug text-balance" style={{ animation: 'headlineIn 1s 0.7s cubic-bezier(0.22,1,0.36,1) both' }}>
              {settings.tagline}
            </p>
          )}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4" style={{ animation: 'headlineIn 1s 0.85s cubic-bezier(0.22,1,0.36,1) both' }}>
            <a href="#portfolio" className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold bg-white text-black hover:bg-gray-100 transition duration-200 shadow-lg active:scale-95">
              {t('ᲜᲐᲮᲔ ᲞᲝᲠᲢᲤᲝᲚᲘᲝ', 'VIEW OUR WORK')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            <a href="#pricing" className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10 transition duration-200 active:scale-95">
              {t('ᲤᲐᲡᲔᲑᲘᲡ ᲞᲐᲙᲔᲢᲔᲑᲘ', 'PRICING')}
            </a>
          </div>
          {/* Key metrics */}
          {stats.length > 0 && (
            <div className="pt-7 grid grid-cols-3 gap-4 sm:gap-6 max-w-lg border-t border-white/15" style={{ animation: 'headlineIn 1s 1s cubic-bezier(0.22,1,0.36,1) both' }}>
              {stats.slice(0, 3).map((st, i) => (
                <div key={i}>
                  <div className="text-2xl sm:text-3xl font-black text-white"><CountUp value={st.value} /></div>
                  <div className="text-[12px] sm:text-xs text-gray-300 leading-snug mt-0.5">{st.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function PartnersStrip() {
  const { t } = useLang();
  const LogoMarqueeRow = ({ title, logos, reverse = false, speed = '34s', rowClass = '', titleClass = '' }) => {
    // Repeat logos inside a single cycle so one loop is always wider than the viewport.
    const loopLogos = [...logos, ...logos, ...logos];
    return (
      <div className={`py-6 ${rowClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <p className={`text-center text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.28em] ${titleClass || 'text-gray-500'}`}>{title}</p>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#0b0b0b] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#0b0b0b] to-transparent z-10" />
          <div className={`logo-marquee ${reverse ? 'is-reverse' : ''}`} style={{ '--logo-speed': speed }}>
            <div className="logo-group">
              {loopLogos.map((logo, idx) => (
                <div key={`${logo.name}-${idx}`} className="logo-tile">
                  <Img
                    src={logo.src}
                    sizes="120px"
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
                  <Img
                    src={logo.src}
                    sizes="120px"
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
    <section data-reveal data-pause-offscreen className="reveal-section relative overflow-hidden bg-[#0b0b0b] border-y border-[#1a1a1a]">
      <LogoMarqueeRow title={t('ბრენდები, რომლებთანაც გუნდს უმუშავია', 'Brands our team has worked with')} logos={partnerLogos} speed={partnerMarqueeSpeed} />
      <div className="border-t border-white/5" />
      <LogoMarqueeRow
        title={t('პარტნიორი კომპანიები', 'Partner companies')}
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
  const { t } = useLang();
  return (
    <section id="about" data-reveal className="reveal-section py-24 bg-[#09090a] border-y border-[#1a1a1f] relative overflow-hidden">
      <div className="absolute -top-24 -right-10 w-72 h-72 bg-[#E50914]/12 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-10 w-80 h-80 bg-red-700/10 blur-3xl rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="section-eyebrow text-xs font-bold text-[#E50914] tracking-widest uppercase">{t('ჩვენ და გუნდი', 'About us')}</h2>
            <p className="mersad-heading text-3xl sm:text-4xl text-white leading-tight">
              {t('ᲔᲨᲔᲚᲝᲜᲘᲡ ᲮᲔᲓᲕᲐ ᲓᲐ ᲛᲘᲡᲘᲐ', 'ESHELON’S VISION & MISSION')}
            </p>
            <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
              <p>
                {t('ESHELON-ისთვის ბრენდინგი მხოლოდ ვიზუალი არ არის. ეს არის სტრატეგია, ემოცია და კომუნიკაცია, რომელიც ბიზნესს ბაზარზე გამორჩეულ პოზიციაზე აყენებს.',
                  'For ESHELON, branding is more than visuals. It is strategy, emotion and communication that put a business in a distinctive position in its market.')}
              </p>
              <p>
                {t('ჩვენ ვაერთიანებთ კრეატიულ დიზაინს, სიღრმისეულ ანალიზს და პრაქტიკულ მარკეტინგს, რათა თითოეული პროექტი გახდეს არა უბრალოდ ლამაზი, არამედ შედეგზე ორიენტირებული.',
                  'We combine creative design, in-depth analysis and practical marketing so that every project is not just beautiful, but built for results.')}
              </p>
              <p>
                {t('დღეს ESHELON მუშაობს გუნდურად, დინამიკურად და პასუხისმგებლობით - პარტნიორებთან ერთად ვქმნით სისტემურ ზრდას და ბრენდებს, რომლებსაც საკუთარი ხასიათი და ძლიერი ხმა აქვთ.',
                  'Today ESHELON works as a team — fast, responsive and accountable. Together with our partners we build steady growth and brands with their own character and a strong voice.')}
              </p>
            </div>
            <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="surface-card bg-[#121217] border border-white/10 rounded-xl p-4">
                <p className="text-xs tracking-wide text-gray-400">{t('პრიორიტეტი', 'Priority')}</p>
                <p className="text-sm font-bold text-white mt-1">{t('ხარისხზე ორიენტაცია', 'Quality first')}</p>
              </div>
              <div className="surface-card bg-[#121217] border border-white/10 rounded-xl p-4">
                <p className="text-xs tracking-wide text-gray-400">{t('განვითარება', 'Growth')}</p>
                <p className="text-sm font-bold text-white mt-1">{t('ინოვაციური სიახლეების ძიება', 'Always exploring what’s new')}</p>
              </div>
              <div className="surface-card bg-[#121217] border border-white/10 rounded-xl p-4">
                <p className="text-xs tracking-wide text-gray-400">{t('დისციპლინა', 'Discipline')}</p>
                <p className="text-sm font-bold text-white mt-1">{t('დედლაინების ზუსტი დაცვა', 'Deadlines we keep')}</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="surface-card h-full bg-[#121212] border border-white/10 rounded-2xl p-3 sm:p-4">
              <div className="relative rounded-xl overflow-hidden border border-white/10">
                <Img
                  src="/optimized/about/team-story.jpg"
                  sizes="(min-width: 1024px) 600px, 100vw"
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

function FacebookNewsSection({ posts = facebookNewsPosts, facebookUrl = '' }) {
  const { t } = useLang();
  return (
    <section id="facebook-news" data-reveal className="reveal-section py-14 sm:py-16 bg-[#0c0c0f] border-y border-[#1e1e24]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-8 sm:mb-10">
          <div className="space-y-3 max-w-2xl">
            <h2 className="section-eyebrow text-xs font-bold text-[#E50914] tracking-widest uppercase">{t('სიახლეები', 'News')}</h2>
            <p className="mersad-heading text-2xl sm:text-3xl tracking-tight text-white">{t('ᲑᲝᲚᲝ ᲞᲝᲡᲢᲔᲑᲘ', 'LATEST POSTS')}</p>
            <p className="text-xs sm:text-sm text-gray-400">{t('უახლესი პოსტები, ქეისები და კამპანიების მოკლე მიმოხილვა.', 'Our latest posts, cases and short campaign breakdowns.')}</p>
          </div>
          {facebookUrl && (
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-bold bg-[#E50914] text-white hover:bg-red-700 transition"
          >
            {t('Facebook-ზე ნახვა', 'Open Facebook')}
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
          )}
        </div>
        <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="surface-card group bg-[#121217] border border-white/10 rounded-xl overflow-hidden hover:border-[#E50914]/45 transition duration-300 flex items-stretch sm:block lg:flex"
            >
              <div className="w-28 min-w-[7rem] sm:w-auto sm:min-w-0 aspect-[4/5] overflow-hidden relative lg:w-36 lg:min-w-[9rem]">
                <Img
                  src={post.image}
                  sizes="(min-width: 1024px) 144px, (min-width: 640px) 50vw, 112px"
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <div className="flex-1 min-w-0 p-3.5 sm:p-4 space-y-2 flex flex-col justify-center sm:block lg:flex">
                <div className="flex items-center gap-3 text-[11px] tracking-wide text-gray-400 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-sm sm:text-[15px] font-black text-white leading-snug group-hover:text-[#E50914] transition-colors line-clamp-2 lg:line-clamp-3">{post.title}</h3>
                <p className="text-xs text-gray-300 leading-relaxed line-clamp-2 lg:line-clamp-2">{post.excerpt}</p>
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

function CollaborationPage({ offers = collaborationOffers, terms = collaborationTerms }) {
  const { t } = useLang();
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f2f2f2] font-sans antialiased selection:bg-[#E50914] selection:text-white">
      <nav className="nav-glass sticky top-0 z-40 border-b border-[#262626]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#E50914] to-orange-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300" />
              <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-[#E50914]/50">
                <Img src="/logod.jpg" sizes="48px" alt="ESHELON" className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <span className="text-xl font-black tracking-widest text-white block">ESHELON</span>
              <span className="text-xs tracking-widest text-[#E50914] font-bold block -mt-1 uppercase">Collaboration</span>
            </div>
          </a>
          <div className="flex items-center gap-3">
            <a href="/" className="px-4 py-2 rounded-lg border border-white/15 text-sm text-gray-200 hover:border-white/35 transition">{t('ᲛᲗᲐᲕᲐᲠᲘ', 'HOME')}</a>
            <a href="/#contact" className="px-4 py-2 rounded-lg bg-[#E50914] text-sm font-bold text-white hover:bg-red-700 transition">{t('ᲓᲐᲙᲐᲕᲨᲘᲠᲔᲑᲐ', 'CONTACT')}</a>
          </div>
        </div>
      </nav>
      <main className="relative">
        <div className="absolute inset-x-0 top-0 h-[360px] bg-gradient-to-b from-[#E50914]/15 via-transparent to-transparent pointer-events-none" />
        <section className="py-16 sm:py-20 border-b border-[#1e1e1e]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-5">
              <p className="section-eyebrow text-xs font-bold text-[#E50914] tracking-widest uppercase">{t('B2B გვერდი', 'For agencies')}</p>
              <h1 className="mersad-heading text-4xl sm:text-5xl text-white leading-tight">{t('კოლაბორაცია სააგენტოებისთვის', 'Partnering with agencies')}</h1>
              <p className="text-gray-300 text-sm sm:text-base">
                {t('გამჭვირვალე პირობები, წინასწარ განსაზღვრული ფასები და მარტივი სტრუქტურა. ეს გვერდი შექმნილია ისე, რომ 1 წუთში ნახოთ რეალური მოდელი და თქვენი სარგებელი.',
                  'Transparent terms, fixed prices and a simple structure — see the real model and your margin in one minute.')}
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/15 text-green-300 border border-green-500/35">{t('-10% პარტნიორული ფასდაკლება', '-10% partner discount')}</span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-gray-300 border border-white/15">{t('თეთრი ლეიბლი (White Label)', 'White label')}</span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-gray-300 border border-white/15">{t('ფიქსირებული SLA', 'Fixed SLA')}</span>
              </div>
            </div>
          </div>
        </section>
        <section className="py-14 sm:py-16 border-b border-[#1e1e1e]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
              {offers.map((offer) => (
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
                            <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/15 text-green-300 border border-green-500/30">{t('თქვენი სარგებელი', 'Your margin')} {row.benefit}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="rounded-lg bg-black/35 border border-white/10 px-2.5 py-2">
                              <p className="text-xs text-gray-500 uppercase tracking-wide">{t('პარტნიორის ფასი', 'Partner price')}</p>
                              <p className="text-sm font-bold text-white mt-0.5">{row.partner}</p>
                            </div>
                            <div className="rounded-lg bg-black/35 border border-white/10 px-2.5 py-2">
                              <p className="text-xs text-gray-500 uppercase tracking-wide">{t('საჯარო ფასი', 'Public price')}</p>
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
                <p className="text-sm font-bold text-white">{t('თანამშრომლობის ძირითადი პირობები', 'Key partnership terms')}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {terms.map((term, index) => (
                  <div key={term} className="rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-3 flex items-start gap-2.5">
                    <span className="mt-0.5 text-xs font-bold text-[#E50914]">{String(index + 1).padStart(2, '0')}</span>
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
            {t('კოლაბორაციის დაწყება', 'Start partnering')}
          </a>
        </div>
      </footer>
    </div>
  );
}

function LangSwitch({ className = '' }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`inline-flex items-center rounded-lg border border-white/15 p-0.5 text-[12px] font-bold ${className}`} role="group" aria-label="Language">
      {[['ka', 'ქარ'], ['en', 'ENG']].map(([code, label]) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`px-2.5 py-1.5 rounded-md transition ${lang === code ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function App() {
  const { t, lang } = useLang();
  const siteContent = useSiteContent();
  const calc = { logo: 500, guidelines: 3000, post: 220, story: 40, advertising: 400, shadowTesting: 250, ...(siteContent.calculator || {}) };
  const brandingList = pickList(siteContent.branding, brandingPackages).map((pk) => localizePackage(pk, lang));
  const smmList = pickList(siteContent.smm, smmPackages).map((pk) => localizePackage(pk, lang));
  const newsList = pickList(siteContent.news, facebookNewsPosts).map((n) => localizeNews(n, lang));
  const collaborationContent = siteContent.collaboration || {};
  const settings = localizeSettings(mergeSettings(siteContent.settings), lang);
  const phoneHref = telHref(settings.phone);
  const waHref = whatsappHref(settings.whatsapp, t('გამარჯობა! მაინტერესებს ეშელონის მომსახურება.', 'Hi! I’m interested in working with ESHELON.'));
  const normalizedPath = typeof window !== 'undefined'
    ? (window.location.pathname.replace(/\/+$/, '') || '/')
    : '/';
  const isCollaborationPage = normalizedPath === '/collaboration';
  const [activeTab, setActiveTab] = useState('smm'); // branding vs smm
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [visiblePortfolioCount, setVisiblePortfolioCount] = useState(6);
  const allPortfolioProjects = pickList(siteContent.portfolio, [...portfolioData, ...extraPortfolioData]).map((pr) => localizeProject(pr, lang));
  const [portfolioFilter, setPortfolioFilter] = useState('all');
  const portfolioFilters = (() => {
    const counts = new Map();
    allPortfolioProjects.forEach((pr) => {
      const label = getWorkTypeLabel(pr);
      counts.set(label, (counts.get(label) || 0) + 1);
    });
    return [
      { key: 'all', label: t('ყველა', 'All'), count: allPortfolioProjects.length },
      ...Array.from(counts, ([label, count]) => ({ key: label, label, count }))
    ];
  })();
  const activeFilter = portfolioFilters.some((f) => f.key === portfolioFilter) ? portfolioFilter : 'all';
  const filteredProjects = activeFilter === 'all' ? allPortfolioProjects : allPortfolioProjects.filter((pr) => getWorkTypeLabel(pr) === activeFilter);
  const visiblePortfolioProjects = filteredProjects.slice(0, visiblePortfolioCount);
  const hasMorePortfolioProjects = visiblePortfolioCount < filteredProjects.length;
  const selectedProject = selectedIndex !== null ? allPortfolioProjects[selectedIndex] : null;
  // the project viewer steps through the filtered list the visitor is looking at
  const viewerList = selectedProject && filteredProjects.some((pr) => pr.id === selectedProject.id) ? filteredProjects : allPortfolioProjects;
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFloat, setShowFloat] = useState(false);
  const [contactState, setContactState] = useState('idle'); // idle | sending | sent | error
  const [orderState, setOrderState] = useState('idle');
  const [helperTab, setHelperTab] = useState('finder');
  // Order modal state
  const [orderModal, setOrderModal] = useState(null); // package object or null
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
  // open project from shareable link (#project-<id>) and close on browser back
  const projectsKey = allPortfolioProjects.map((pr) => pr.id).join('|');
  useEffect(() => {
    const fromHash = () => {
      const m = window.location.hash.match(/^#project-(.+)$/);
      if (!m) { setSelectedIndex(null); return; }
      const idx = allPortfolioProjects.findIndex((pr) => String(pr.id) === decodeURIComponent(m[1]));
      setSelectedIndex(idx >= 0 ? idx : null);
    };
    fromHash();
    window.addEventListener('popstate', fromHash);
    return () => window.removeEventListener('popstate', fromHash);
  }, [projectsKey]);
  const openProject = (project) => {
    const idx = allPortfolioProjects.findIndex((pr) => pr.id === project.id);
    if (idx < 0) return;
    window.history.pushState({ project: project.id }, '', `#project-${project.id}`);
    setSelectedIndex(idx);
  };
  const navigateProject = (pr) => {
    const idx = allPortfolioProjects.findIndex((x) => x.id === (pr && pr.id));
    if (idx < 0) return;
    window.history.replaceState({ project: pr.id }, '', `#project-${pr.id}`);
    setSelectedIndex(idx);
  };
  const closeProject = () => {
    if (window.history.state && window.history.state.project) window.history.back();
    else {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
      setSelectedIndex(null);
    }
  };
  const [nearContact, setNearContact] = useState(false);
  useEffect(() => {
    const targets = ['contact', 'site-footer'].map((id) => document.getElementById(id)).filter(Boolean);
    if (!targets.length || !('IntersectionObserver' in window)) return undefined;
    const visible = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
      setNearContact(visible.size > 0);
    }, { threshold: 0.05 });
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isCollaborationPage]);
  useEffect(() => {
    const onScroll = () => setShowFloat(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const progressRef = useRef(null);
  // endless strips (logos, posters) stop animating while off-screen — saves battery and keeps scrolling smooth
  useEffect(() => {
    const els = document.querySelectorAll('[data-pause-offscreen]');
    if (!els.length || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.target.classList.toggle('anim-paused', !e.isIntersecting));
    }, { rootMargin: '120px 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isCollaborationPage]);
  // loading screen: tell it what is ready (see public/index.html)
  useEffect(() => {
    const boot = window.__boot;
    if (!boot) return undefined;
    boot.mark('app');
    if (lang === 'en' || isCollaborationPage) boot.mark('headline');
    if (isCollaborationPage) boot.mark('cover');
    // wait for the brand fonts, but never more than 2.5 s after the page itself is ready
    const fontCap = setTimeout(() => boot.mark('fonts'), 2500);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => boot.mark('fonts'));
    else boot.mark('fonts');
    const check = () => document.querySelectorAll('img[data-boot]').forEach((img) => {
      if (img.complete) boot.mark(img.getAttribute('data-boot'));
    });
    check();
    const id = setInterval(check, 300);
    const stop = setTimeout(() => clearInterval(id), 10000);
    return () => { clearInterval(id); clearTimeout(stop); clearTimeout(fontCap); };
    // run once on first render
  }, []); // eslint-disable-line
  // after the loading screen: quietly fetch the next images people will scroll to
  useEffect(() => {
    const run = () => {
      const urls = [
        ...allPortfolioProjects.slice(0, 6).map((pr) => webpUrl(pr.coverImage, 480)),
        ...folioPosterImages.map((src) => webpUrl(src, 480))
      ].filter(Boolean);
      let i = 0;
      const next = () => {
        if (i >= urls.length) return;
        const img = new Image();
        img.decoding = 'async';
        img.onload = img.onerror = () => { i += 1; setTimeout(next, 60); };
        img.src = urls[i];
      };
      next();
    };
    const start = () => ('requestIdleCallback' in window ? window.requestIdleCallback(run, { timeout: 2500 }) : setTimeout(run, 1200));
    if (!window.__boot || window.__boot.ready) { start(); return undefined; }
    window.addEventListener('eshelon:ready', start, { once: true });
    return () => window.removeEventListener('eshelon:ready', start);
  }, []); // eslint-disable-line
  useEffect(() => {
    let rafId = null;
    const updateScrollProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
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
  const openOrder = (pkg) => {
    setOrderState('idle');
    setOrderModal(pkg);
  };
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!orderModal || orderState === 'sending') return;
    const hp = e.currentTarget.elements.website ? e.currentTarget.elements.website.value : '';
    setOrderState('sending');
    try {
      await sendLead({
        type: orderModal.source === 'finder' ? 'finder' : 'order',
        name: orderForm.name,
        phone: orderForm.phone,
        message: orderForm.note,
        package: orderModal.title,
        price: orderModal.price,
        details: orderModal.details || '',
        website: hp
      });
      setOrderState('sent');
      setOrderForm({ name: '', phone: '', note: '' });
    } catch (err) {
      setOrderState('error');
    }
  };
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (contactState === 'sending') return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    setContactState('sending');
    try {
      await sendLead({
        type: 'contact',
        name: fd.get('name'),
        phone: fd.get('phone'),
        company: fd.get('company'),
        message: fd.get('message'),
        website: fd.get('website')
      });
      setContactState('sent');
      form.reset();
    } catch (err) {
      setContactState('error');
    }
  };
  if (isCollaborationPage) {
    return (
      <CollaborationPage
        offers={pickList(collaborationContent.offers, collaborationOffers).map((o) => localizeOffer(o, lang))}
        terms={localizeTerms(pickList(collaborationContent.terms, collaborationTerms), collaborationContent.terms_en, lang, collaborationTerms)}
      />
    );
  }
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f2f2f2] font-sans antialiased selection:bg-[#E50914] selection:text-white">
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
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
                    <Img src="/logod.jpg" sizes="48px" alt="ESHELON" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div>
                  <span className="text-xl font-black tracking-widest text-white block">ESHELON</span>
                  <span className="text-xs tracking-widest text-[#E50914] font-bold block -mt-1 uppercase">Highest</span>
                </div>
              </a>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-7">
              <a href="#portfolio" className="mersad-nav mersad-nav-link text-gray-300 hover:text-white transition-colors">{t('ᲞᲝᲠᲢᲤᲝᲚᲘᲝ', 'PORTFOLIO')}</a>
              <a href="#services" className="mersad-nav mersad-nav-link text-gray-300 hover:text-white transition-colors">{t('ᲡᲔᲠᲕᲘᲡᲔᲑᲘ', 'SERVICES')}</a>
              <a href="#pricing" className="mersad-nav mersad-nav-link text-gray-300 hover:text-white transition-colors">{t('ᲤᲐᲡᲔᲑᲘ', 'PRICING')}</a>
              <a href="#about" className="mersad-nav mersad-nav-link text-gray-300 hover:text-white transition-colors">{t('ᲩᲕᲔᲜᲡ ᲨᲔᲡᲐᲮᲔᲑ', 'ABOUT')}</a>
              <LangSwitch />
              <a
                href="#contact"
                className="mersad-nav mersad-nav-cta inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#E50914] text-white hover:bg-red-700 active:scale-95 transition"
              >
                {t('ᲓᲐᲒᲕᲘᲙᲐᲕᲨᲘᲠᲓᲘᲗ', 'CONTACT US')}
              </a>
            </div>
            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center gap-3">
              <LangSwitch />
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-11 h-11 -mr-2 flex items-center justify-center text-gray-300 hover:text-white focus:outline-none"
                aria-label={menuOpen ? t('მენიუს დახურვა', 'Close menu') : t('მენიუ', 'Menu')}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-[#0d0d0d]/98 border-b border-[#262626] px-4 pt-4 pb-6 space-y-1 mobile-menu-in">
            {[['#portfolio', t('ᲞᲝᲠᲢᲤᲝᲚᲘᲝ', 'PORTFOLIO')], ['#services', t('ᲡᲔᲠᲕᲘᲡᲔᲑᲘ', 'SERVICES')], ['#pricing', t('ᲤᲐᲡᲔᲑᲘ', 'PRICING')], ['#about', t('ᲩᲕᲔᲜᲡ ᲨᲔᲡᲐᲮᲔᲑ', 'ABOUT')]].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="mersad-nav-mobile flex items-center justify-between py-3.5 border-b border-white/[0.06] text-gray-200 hover:text-white">
                {label}
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </a>
            ))}
            <div className="grid grid-cols-2 gap-3 pt-4">
              {phoneHref && (
                <a href={phoneHref} className="flex items-center justify-center gap-2 py-3 rounded-lg border border-white/15 text-white text-sm font-semibold">
                  <Phone className="w-4 h-4" /> {t('დარეკვა', 'Call')}
                </a>
              )}
              <a href="#contact" onClick={() => setMenuOpen(false)} className={`mersad-nav-mobile flex items-center justify-center py-3 rounded-lg bg-[#E50914] text-white ${phoneHref ? '' : 'col-span-2'}`}>
                {t('ᲓᲐᲒᲕᲘᲙᲐᲕᲨᲘᲠᲓᲘᲗ', 'CONTACT US')}
              </a>
            </div>
          </div>
        )}
      </nav>
      {/* HERO SECTION */}
      <HeroSection settings={settings} />
      {/* PARTNER LOGOS */}
      <PartnersStrip />
      {/* PORTFOLIO SECTION */}
      <section id="portfolio" data-reveal className="reveal-section py-20 sm:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div className="space-y-4 max-w-2xl">
              <h2 className="section-eyebrow text-xs font-bold text-[#E50914] tracking-widest uppercase">{t('ჩვენი ნამუშევრები', 'Our work')}</h2>
              <p className="mersad-heading text-[26px] leading-[1.15] sm:text-4xl tracking-tight text-white break-words">
                {t('ᲞᲝᲠᲢᲤᲝᲚᲘᲝ,', 'A PORTFOLIO')} <br className="hidden sm:block" />
                {t('ᲠᲝᲛᲔᲚᲘᲪ ᲗᲐᲕᲐᲓ ᲡᲐᲣᲑᲠᲝᲑᲡ ᲡᲐᲙᲣᲗᲐᲠ ᲗᲐᲕᲖᲔ', 'THAT SPEAKS FOR ITSELF')}
              </p>
              <p className="text-balance text-gray-300">{t('გადახედეთ ჩვენს მიერ განხორციელებულ ბრენდინგისა და მარკეტინგის ქეისებს.', 'Explore our branding and marketing case studies.')}</p>
            </div>
          </div>
          <div className="mb-14">
            <PosterFolio
              posters={folioPosterImages}
              speedSeconds={62}
            />
          </div>
          {/* FILTERS */}
          {portfolioFilters.length > 2 && (
            <div className="-mx-4 px-4 sm:mx-0 sm:px-0 mb-6 sm:mb-8 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-2 w-max">
                {portfolioFilters.map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => { setPortfolioFilter(f.key); setVisiblePortfolioCount(6); }}
                    aria-pressed={portfolioFilter === f.key}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold border transition ${portfolioFilter === f.key ? 'bg-white text-black border-white' : 'border-white/15 text-gray-300 hover:border-white/40 hover:text-white'}`}
                  >
                    {f.label}
                    <span className={`ml-1.5 text-xs tabular-nums ${portfolioFilter === f.key ? 'text-black/50' : 'text-gray-500'}`}>{f.count}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* GRID OF CASE STUDIES */}
          <div key={portfolioFilter} className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {visiblePortfolioProjects.map((project, idx) => (
              <div
                key={project.id}
                className="portfolio-card-soft-enter transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ animationDelay: `${(idx % 3) * 70}ms` }}
              >
                <PortfolioCard
                  project={project}
                  onSelect={openProject}
                />
              </div>
            ))}
          </div>
          {hasMorePortfolioProjects && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                data-testid="portfolio-show-more"
                onClick={() => setVisiblePortfolioCount((count) => Math.min(count + 3, filteredProjects.length))}
                className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-red-300/20 bg-gradient-to-r from-[#E50914] via-red-600 to-[#E50914] text-white text-xs font-black tracking-wider shadow-[0_18px_38px_-20px_rgba(229,9,20,0.95)] hover:scale-[1.02] active:scale-[0.985] transition"
              >
                <span className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/10 transition" />
                <span className="relative">{t('მეტის ჩვენება', 'Show more')}</span>
                <ChevronDown className="relative w-4 h-4 transition-transform duration-300" />
              </button>
            </div>
          )}
        </div>
      </section>
      {/* PROJECT VIEWER */}
      {selectedProject && (
        <ProjectViewer
          projects={viewerList}
          index={Math.max(0, viewerList.findIndex((pr) => pr.id === selectedProject.id))}
          onClose={closeProject}
          onNavigate={(i) => navigateProject(viewerList[i])}
          onOrder={(pr) => { closeProject(); setTimeout(() => openOrder({ title: `${t('მსგავსი პროექტი', 'A project like')}: ${pr.title}`, price: t('ფასი შეთანხმებით', 'Price on request'), desc: pr.category, details: `${t('პროექტი', 'Project')}: ${pr.title}` }), 60); }}
          workTypeLabel={getWorkTypeLabel(selectedProject)}
        />
      )}
      {/* CORE SERVICES */}
      <section id="services" data-reveal className="reveal-section py-20 sm:py-24 bg-[#0a0a0a] border-y border-[#1e1e1e] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="section-eyebrow text-xs font-bold text-[#E50914] tracking-widest uppercase">{t('ᲠᲐᲡ ᲕᲐᲙᲔᲗᲔᲑᲗ', 'WHAT WE DO')}</h2>
            <p className="mersad-heading text-3xl sm:text-4xl tracking-tight text-white">{t('ᲡᲠᲣᲚᲘ ᲪᲘᲤᲠᲣᲚᲘ ᲐᲠᲡᲔᲜᲐᲚᲘ ᲗᲥᲕᲔᲜᲘ ᲑᲘᲖᲜᲔᲡᲘᲡ ᲬᲐᲠᲛᲐᲢᲔᲑᲘᲡᲗᲕᲘᲡ', 'A FULL DIGITAL ARSENAL FOR YOUR BUSINESS')}</p>
            <p className="text-balance text-gray-300">{t('ჩვენი მომსახურებები მოიცავს ყველაფერს, რაც გჭირდებათ იდეიდან – მილიონიან ბრენდამდე მისასვლელად.', 'Everything you need to go from an idea to a brand people remember.')}</p>
          </div>
          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {/* Service 1 */}
            <div className="surface-card bg-[#121212] border border-white/5 p-7 sm:p-8 rounded-2xl hover:border-[#E50914]/40 hover:-translate-y-1 transition duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center justify-center text-[#E50914] mb-6 group-hover:scale-110 transition duration-300">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="sf-georgian-semibold service-title text-white mb-3">{t('ᲕᲘᲖᲣᲐᲚᲣᲠᲘ ᲘᲓᲔᲜᲢᲝᲑᲐ', 'VISUAL IDENTITY')}</h3>
              <p className="text-gray-300 text-[15px] leading-relaxed mb-5">
                {t('ლოგოების, ფერთა პალიტრის, ტიპოგრაფიისა და სტილის შექმნა. ბრენდბუქი, რომელიც განსაზღვრავს თქვენი ბრენდის სახესა და ხასიათს ნებისმიერ გარემოში.', 'Logos, colour palettes, typography and style. A brand book that defines your brand’s look and character everywhere.')}
              </p>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />
                  <span>{t('გეომეტრიულად სრულყოფილი ლოგოები', 'Geometrically precise logos')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />
                  <span>{t('სრული ტიპოგრაფიული სისტემა', 'Complete typography system')}</span>
                </li>
              </ul>
            </div>
            {/* Service 2 */}
            <div className="surface-card bg-[#121212] border border-white/5 p-7 sm:p-8 rounded-2xl hover:border-[#E50914]/40 hover:-translate-y-1 transition duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-orange-950/40 border border-orange-500/30 flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition duration-300">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="sf-georgian-semibold service-title text-white mb-3">{t('ᲡᲝᲪᲘᲐᲚᲣᲠᲘ ᲛᲔᲓᲘᲘᲡ ᲛᲐᲠᲗᲕᲐ', 'SOCIAL MEDIA MANAGEMENT')}</h3>
              <p className="text-gray-300 text-[15px] leading-relaxed mb-5">
                {t('პოსტერების დიზაინი, რომელიც ზრდის ჩართულობას, ქოფირაითინგი, რომელიც აყალიბებს ბრენდის უნიკალურ ტონს და ყოველკვირეული სთორების რედიზაინი.', 'Post design that drives engagement, copywriting that shapes a unique brand voice, and weekly story design.')}
              </p>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />
                  <span>{t('კონტენტ კალენდრის შედგენა', 'Content calendar planning')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />
                  <span>{t('ემოციური და კრეატიული ქოფირაითინგი', 'Emotional, creative copywriting')}</span>
                </li>
              </ul>
            </div>
            {/* Service 3 */}
            <div className="surface-card bg-[#121212] border border-white/5 p-7 sm:p-8 rounded-2xl hover:border-[#E50914]/40 hover:-translate-y-1 transition duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-blue-950/40 border border-blue-500/30 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition duration-300">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="sf-georgian-semibold service-title text-white mb-3">{t('ᲔᲓᲕᲔᲠᲗᲐᲘᲖᲘᲜᲒᲘ & ᲠᲔᲙᲚᲐᲛᲐ', 'ADVERTISING')}</h3>
              <p className="text-gray-300 text-[15px] leading-relaxed mb-5">
                {t('სარეკლამო კამპანიები, რომლებიც მიმართულია ზუსტ აუდიტორიაზე. შადოუ რეკლამების გამოყენება ტესტირებისა და ოპტიმალური ROI-სთვის.', 'Ad campaigns aimed at exactly the right audience, with shadow ads for testing and the best ROI.')}
              </p>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />
                  <span>{t('სამიზნე აუდიტორიის კვლევა', 'Target audience research')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />
                  <span>{t('A/B ტესტირება და ანალიტიკა', 'A/B testing & analytics')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* PRICING SECTION */}
      <section id="pricing" data-reveal className="reveal-section py-20 sm:py-24 bg-[#0d0d0d] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 sm:mb-14">
            <h2 className="section-eyebrow text-xs font-bold text-[#E50914] tracking-widest uppercase">{t('ფასები და პაკეტები', 'Pricing')}</h2>
            <p className="mersad-heading text-[26px] leading-[1.15] sm:text-4xl text-white">{t('ᲐᲘᲠᲩᲘᲔᲗ ᲗᲥᲕᲔᲜᲘ ᲞᲐᲙᲔᲢᲘ', 'CHOOSE YOUR PACKAGE')}</p>
            <p className="text-balance text-gray-300 text-[15px] sm:text-base">
              {t('გამჭვირვალე ფასები — ერთჯერადი ბრენდინგი ან ყოველთვიური სოციალური მედია.', 'Transparent prices — one-time branding or monthly social media.')}
            </p>
            <div className="flex justify-center pt-3">
              <div className="inline-flex bg-[#121212] p-1 rounded-xl border border-white/[0.08]">
                {[['smm', t('სოციალური მედია', 'Social media')], ['branding', t('ბრენდინგი', 'Branding')]].map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveTab(key)}
                    className={`px-5 sm:px-7 py-2.5 rounded-lg text-sm font-bold transition ${activeTab === key ? 'bg-[#E50914] text-white shadow-[0_8px_24px_-10px_rgba(229,9,20,0.9)]' : 'text-gray-400 hover:text-white'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* PRICING NOTE */}
          {settings.pricingNote && (() => {
            const m = settings.pricingNote.match(/^(.+?[.!?])\s+(.*)$/s);
            return (
              <div className="max-w-3xl mx-auto -mt-2 mb-8 sm:mb-10 flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-left">
                <Info className="w-5 h-5 text-[#ff4d55] shrink-0 mt-0.5" />
                <p className="text-sm text-gray-300 leading-relaxed">
                  {m ? <><span className="font-bold text-white">{m[1]}</span> {m[2]}</> : settings.pricingNote}
                </p>
              </div>
            );
          })()}
          {/* PRICING CARDS */}
          <div key={activeTab} className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-stretch pf-step">
            {(activeTab === 'branding' ? brandingList : smmList).map((pkg, idx) => {
              const included = (pkg.features || []).filter((f) => f.included && f.text);
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col rounded-2xl p-6 sm:p-7 transition duration-300 ${pkg.featured ? 'bg-gradient-to-b from-[#1d1011] to-[#121212] border border-[#E50914]/70 shadow-[0_24px_60px_-30px_rgba(229,9,20,0.6)]' : 'surface-card bg-[#121212] border border-white/[0.08] hover:border-white/20'}`}
                >
                  {pkg.featured && (
                    <span className="absolute -top-3 left-6 px-3 py-1 bg-[#E50914] text-white text-[11px] font-bold tracking-wide rounded-full">
                      {activeTab === 'branding' ? t('ყველაზე პოპულარული', 'Most popular') : t('რეკომენდებული', 'Recommended')}
                    </span>
                  )}
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-lg font-bold text-white">{pkg.title}</h4>
                    {pkg.badge && !pkg.featured && <span className="text-[11px] text-gray-400 px-2 py-0.5 rounded-md border border-white/10">{pkg.badge}</span>}
                  </div>
                  <p className="mt-4 text-[11px] font-semibold tracking-wide text-gray-500">{t('საორიენტაციო ფასი', 'Indicative price')}</p>
                  <div className="mt-1 text-[34px] leading-none font-black text-white tracking-tight">{pkg.price}</div>
                  {pkg.desc && <p className="mt-3 text-sm text-gray-400 leading-relaxed">{pkg.desc}</p>}
                  <ul className="mt-6 pt-5 border-t border-white/[0.08] space-y-3 flex-1">
                    {included.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${feat.discount ? 'text-[#ff4d55]' : 'text-green-500'}`} />
                        <span className={feat.discount ? 'text-white font-semibold' : 'text-gray-200'}>
                          {feat.discount && <span className="mr-1.5 px-1.5 py-0.5 rounded bg-[#E50914] text-white text-[11px] font-black">-50%</span>}
                          {feat.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => openOrder(pkg)}
                    className={`mt-7 w-full py-3.5 px-4 rounded-xl font-bold text-sm transition active:scale-[0.98] ${pkg.featured ? 'bg-[#E50914] text-white hover:bg-red-700' : 'bg-white/[0.06] text-white hover:bg-white/[0.12] border border-white/10'}`}
                  >
                    {t('არჩევა', 'Choose')}
                  </button>
                </div>
              );
            })}
          </div>
          {/* HELPER: finder / calculator */}
          <div className="mt-14 sm:mt-20 max-w-5xl mx-auto" id="package-finder">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">{t('ვერ გადაწყვიტეთ?', 'Not sure yet?')}</p>
                <p className="text-sm text-gray-400 mt-1">{t('უპასუხეთ 3 კითხვას ან ააწყვეთ პაკეტი თავად.', 'Answer 3 quick questions or build your own package.')}</p>
              </div>
              <div className="grid grid-cols-2 sm:inline-grid self-stretch sm:self-auto bg-[#121212] p-1 rounded-xl border border-white/[0.08]">
                {[['finder', t('კითხვარი', 'Quick quiz')], ['calc', t('კალკულატორი', 'Calculator')]].map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setHelperTab(key)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition ${helperTab === key ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div key={helperTab} className="pf-step">
              {helperTab === 'finder' ? (
                <PackageFinder
                  brandingList={brandingList}
                  smmList={smmList}
                  onOrder={openOrder}
                  onShowPricing={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                />
              ) : (
                <div className="surface-card bg-[#121212] border border-white/[0.08] rounded-2xl p-5 sm:p-8">
                  <PriceCalculator prices={calc} onOrder={openOrder} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* ABOUT US */}
      <AboutSection />
      {/* FACEBOOK NEWS */}
      <FacebookNewsSection posts={newsList} facebookUrl={settings.facebook} />
      {/* CONTACT */}
      <section id="contact" data-reveal className="reveal-section py-20 sm:py-24 bg-[#0a0a0a] border-t border-[#1e1e1e] relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[640px] h-[320px] rounded-full bg-[#E50914]/[0.07] blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="reveal-stagger grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Info panel */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h2 className="section-eyebrow text-xs font-bold text-[#E50914] tracking-widest uppercase">{t('კონტაქტი', 'Contact')}</h2>
                <p className="mersad-heading text-[26px] leading-[1.15] sm:text-4xl text-white">{t('ᲓᲐᲕᲘᲬᲧᲝᲗ ᲗᲥᲕᲔᲜᲘ ᲑᲠᲔᲜᲓᲘᲡ ᲐᲦᲛᲐᲕᲚᲝᲑᲐ', 'LET’S GROW YOUR BRAND')}</p>
                <p className="text-balance text-gray-300 text-[15px] leading-relaxed">
                  {t('პირველი კონსულტაცია უფასოა. მოგვწერეთ ან დაგვირეკეთ — ერთად განვსაზღვრავთ, რა სჭირდება თქვენს ბრენდს.', 'The first consultation is free. Message or call us — together we’ll figure out what your brand needs.')}
                </p>
              </div>
              {/* quick actions */}
              <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-3">
                {phoneHref && (
                  <a href={phoneHref} className="contact-action group">
                    <Phone className="w-5 h-5 text-[#ff4d55]" />
                    <span>
                      <span className="block text-[12px] text-gray-400">{t('დარეკვა', 'Call')}</span>
                      <span className="block text-sm font-bold text-white">{settings.phone}</span>
                    </span>
                  </a>
                )}
                {waHref && (
                  <a href={waHref} target="_blank" rel="noopener noreferrer" className="contact-action group">
                    <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                    <span>
                      <span className="block text-[12px] text-gray-400">WhatsApp</span>
                      <span className="block text-sm font-bold text-white">{t('მოგვწერეთ', 'Message us')}</span>
                    </span>
                  </a>
                )}
                {settings.messenger && (
                  <a href={settings.messenger} target="_blank" rel="noopener noreferrer" className="contact-action group">
                    <MessengerIcon className="w-5 h-5 text-[#4f8cff]" />
                    <span>
                      <span className="block text-[12px] text-gray-400">Messenger</span>
                      <span className="block text-sm font-bold text-white">{t('მოგვწერეთ', 'Message us')}</span>
                    </span>
                  </a>
                )}
                {settings.email && (
                  <a href={`mailto:${settings.email}`} className="contact-action group min-[400px]:col-span-2">
                    <Mail className="w-5 h-5 text-[#ff4d55]" />
                    <span className="min-w-0">
                      <span className="block text-[12px] text-gray-400">{t('ელფოსტა', 'Email')}</span>
                      <span className="block text-sm font-bold text-white truncate">{settings.email}</span>
                    </span>
                  </a>
                )}
              </div>
              <div className="space-y-3 text-sm">
                {settings.address && (
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
                    {settings.address}
                  </div>
                )}
                {settings.email2 && (
                  <a href={`mailto:${settings.email2}`} className="flex items-center gap-3 text-gray-300 hover:text-white">
                    <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                    {settings.email2}
                  </a>
                )}
                {(settings.facebook || settings.instagram) && (
                  <div className="flex items-center gap-2 pt-2">
                    {settings.facebook && (
                      <a href={settings.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-btn"><FacebookIcon /></a>
                    )}
                    {settings.instagram && (
                      <a href={settings.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-btn"><InstagramIcon /></a>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Direct message form */}
            <div className="lg:col-span-7">
              <div className="surface-card bg-[#121212] border border-white/[0.08] rounded-2xl p-6 sm:p-10 relative">
                {contactState === 'sent' ? (
                  <div className="py-10 text-center space-y-4 pf-step">
                    <div className="mx-auto w-16 h-16 rounded-full bg-green-500/15 border border-green-500/40 flex items-center justify-center">
                      <Check className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-black text-white">{t('მადლობა, მივიღეთ!', 'Thank you — got it!')}</h3>
                    <p className="text-gray-300 text-[15px]">{settings.responseTime ? `${settings.responseTime}.` : ''} {t('მალე დაგიკავშირდებით მითითებულ ნომერზე.', 'We’ll call you back shortly.')}</p>
                    <button type="button" onClick={() => setContactState('idle')} className="text-sm text-gray-400 hover:text-white underline underline-offset-4">{t('კიდევ ერთი შეტყობინება', 'Send another message')}</button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-white mb-1">{t('მოგვწერეთ პირდაპირ', 'Send us a message')}</h3>
                    <p className="text-sm text-gray-400 mb-6">{settings.responseTime}</p>
                    <form onSubmit={handleContactSubmit} className="space-y-5">
                      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <label className="block">
                          <span className="form-label">{t('სახელი', 'Name')}</span>
                          <input type="text" name="name" autoComplete="name" className="form-input" placeholder={t('მაგ: გიორგი', 'e.g. George')} required />
                        </label>
                        <label className="block">
                          <span className="form-label">{t('ტელეფონი', 'Phone')}</span>
                          <input type="tel" name="phone" autoComplete="tel" inputMode="tel" className="form-input" placeholder="5XX XX XX XX" required />
                        </label>
                      </div>
                      <label className="block">
                        <span className="form-label">{t('ბრენდი ან კომპანია', 'Brand or company')} <span className="text-gray-500">{t('(არასავალდებულო)', '(optional)')}</span></span>
                        <input type="text" name="company" autoComplete="organization" className="form-input" placeholder={t('მაგ: ეშელონ კაფე', 'e.g. Eshelon Café')} />
                      </label>
                      <label className="block">
                        <span className="form-label">{t('რით შეგვიძლია დაგეხმაროთ?', 'How can we help?')}</span>
                        <textarea name="message" className="form-input h-32 resize-none" placeholder={t('მოკლედ აღწერეთ თქვენი ბიზნესი და რა გჭირდებათ…', 'Tell us briefly about your business and what you need…')} required />
                      </label>
                      {contactState === 'error' && (
                        <p className="text-sm text-red-300 bg-red-950/40 border border-red-500/30 rounded-lg p-3">
                          {t('გაგზავნა ვერ მოხერხდა. სცადეთ თავიდან', 'Couldn’t send. Please try again')}{phoneHref ? <> {t('ან', 'or')} <a href={phoneHref} className="underline font-semibold">{t('დაგვირეკეთ', 'call us')}</a></> : ''}.
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={contactState === 'sending'}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#E50914] text-white font-bold rounded-xl text-sm hover:bg-red-700 transition active:scale-95 disabled:opacity-60"
                      >
                        {contactState === 'sending' ? t('იგზავნება…', 'Sending…') : t('გაგზავნა', 'Send')}
                        {contactState !== 'sending' && <Send className="w-4 h-4" />}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <footer id="site-footer" className="bg-black border-t border-[#1a1a1a] pt-12 sm:pt-14 pb-8 sm:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-9 lg:gap-10 text-center lg:text-left">
            <div className="space-y-4 lg:col-span-2 flex flex-col items-center lg:items-start">
              <a href="#hero" onClick={scrollToTopSmooth} className="inline-flex items-center space-x-3 group">
                <div className="w-11 h-11 rounded-lg overflow-hidden border border-[#E50914]/30 group-hover:border-[#E50914]/60 transition-colors">
                  <Img src="/logod.jpg" sizes="48px" alt="ESHELON" className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                  <span className="text-lg font-black tracking-widest text-white block">ESHELON</span>
                  <span className="text-xs tracking-widest text-[#E50914] font-bold block uppercase -mt-1">Highest</span>
                </div>
              </a>
              <p className="text-sm text-gray-400 max-w-xs lg:max-w-sm leading-relaxed text-balance">{settings.tagline}</p>
              {(settings.facebook || settings.instagram || waHref) && (
                <div className="flex items-center gap-2">
                  {settings.facebook && <a href={settings.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-btn"><FacebookIcon /></a>}
                  {settings.instagram && <a href={settings.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-btn"><InstagramIcon /></a>}
                  {waHref && <a href={waHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-btn"><WhatsAppIcon /></a>}
                </div>
              )}
            </div>
            <div className="space-y-3 border-t border-white/[0.06] pt-8 lg:border-0 lg:pt-0">
              <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">{t('ნავიგაცია', 'Menu')}</p>
              <nav className="flex flex-wrap justify-center lg:flex-col lg:items-start gap-x-5 gap-y-2 text-sm">
                <a href="#portfolio" className="text-gray-300 hover:text-white">{t('პორტფოლიო', 'Portfolio')}</a>
                <a href="#services" className="text-gray-300 hover:text-white">{t('სერვისები', 'Services')}</a>
                <a href="#pricing" className="text-gray-300 hover:text-white">{t('ფასები', 'Pricing')}</a>
                <a href="#about" className="text-gray-300 hover:text-white">{t('ჩვენ შესახებ', 'About')}</a>
              </nav>
            </div>
            <div className="space-y-3 border-t border-white/[0.06] pt-8 lg:border-0 lg:pt-0">
              <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">{t('კონტაქტი', 'Contact')}</p>
              <div className="flex flex-col items-center lg:items-start gap-2 text-sm">
                {phoneHref && <a href={phoneHref} className="text-gray-200 hover:text-white font-semibold">{settings.phone}</a>}
                {settings.email && <a href={`mailto:${settings.email}`} className="text-gray-300 hover:text-white break-all">{settings.email}</a>}
                {settings.address && <span className="text-gray-400">{settings.address}</span>}
              </div>
            </div>
          </div>
          <div className="mt-10 sm:mt-12 pt-6 border-t border-white/[0.06] flex flex-col-reverse sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} ESHELON. {t('ყველა უფლება დაცულია.', 'All rights reserved.')}</p>
            <a href="#hero" onClick={scrollToTopSmooth} className="hover:text-white">↑ {t('დასაწყისში დაბრუნება', 'Back to top')}</a>
          </div>
        </div>
      </footer>
      {/* FLOATING CONTACT (mobile) */}
      <div className={`lg:hidden fixed bottom-4 inset-x-4 z-40 flex gap-2 transition-all duration-500 ${showFloat && !nearContact && !selectedProject && !orderModal && !menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'}`}>
        {waHref && (
          <a href={waHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-14 h-14 shrink-0 rounded-2xl bg-[#1b1b1b]/95 backdrop-blur border border-white/10 flex items-center justify-center text-[#25D366] shadow-xl">
            <WhatsAppIcon className="w-6 h-6" />
          </a>
        )}
        {phoneHref && (
          <a href={phoneHref} aria-label={t('დარეკვა', 'Call')} className="w-14 h-14 shrink-0 rounded-2xl bg-[#1b1b1b]/95 backdrop-blur border border-white/10 flex items-center justify-center text-white shadow-xl">
            <Phone className="w-5 h-5" />
          </a>
        )}
        <a href="#contact" className="flex-1 h-14 rounded-2xl bg-[#E50914] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_12px_30px_-10px_rgba(229,9,20,0.8)]">
          {t('უფასო კონსულტაცია', 'Free consultation')}
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
      {/* ORDER MODAL — bottom sheet on phones */}
      {orderModal && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-end sm:items-center justify-center sm:p-4 pv-fade" onClick={() => setOrderModal(null)}>
          <div
            className="bg-[#121212] border border-white/10 rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md p-6 sm:p-8 relative shadow-2xl max-h-[92vh] overflow-y-auto sheet-up"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="sm:hidden mx-auto -mt-2 mb-4 w-10 h-1 rounded-full bg-white/20" />
            <button
              onClick={() => setOrderModal(null)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-gray-300 hover:text-white bg-white/5 rounded-full border border-white/10 transition"
              aria-label={t('დახურვა', 'Close')}
            >
              <X className="w-5 h-5" />
            </button>
            {orderState === 'sent' ? (
              <div className="py-8 text-center space-y-4 pf-step">
                <div className="mx-auto w-16 h-16 rounded-full bg-green-500/15 border border-green-500/40 flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <h4 className="text-2xl font-black text-white">{t('მოთხოვნა მიღებულია!', 'Request received!')}</h4>
                <p className="text-[15px] text-gray-300">{t('მალე დაგიკავშირდებით მითითებულ ნომერზე.', 'We’ll call you back shortly.')}</p>
                <button type="button" onClick={() => setOrderModal(null)} className="mt-2 px-6 py-3 rounded-xl bg-white text-black font-bold text-sm">{t('დახურვა', 'Close')}</button>
              </div>
            ) : (
              <>
                <div className="space-y-2 mb-6 pr-10">
                  <span className="text-xs font-semibold tracking-wide text-[#ff4d55]">{t('მოთხოვნის გაგზავნა', 'Send a request')}</span>
                  <h3 className="text-2xl font-black text-white leading-tight">{orderModal.title}</h3>
                  {orderModal.price && <div className="text-lg font-bold text-white/90">{orderModal.price}</div>}
                  {orderModal.details && <p className="text-sm text-gray-400">{orderModal.details}</p>}
                </div>
                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                  <label className="block">
                    <span className="form-label">{t('სახელი', 'Name')}</span>
                    <input type="text" autoComplete="name" value={orderForm.name} onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })} className="form-input" placeholder={t('მაგ: გიორგი', 'e.g. George')} required />
                  </label>
                  <label className="block">
                    <span className="form-label">{t('ტელეფონი', 'Phone')}</span>
                    <input type="tel" inputMode="tel" autoComplete="tel" value={orderForm.phone} onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })} className="form-input" placeholder="5XX XX XX XX" required />
                  </label>
                  <label className="block">
                    <span className="form-label">{t('კომენტარი', 'Comment')} <span className="text-gray-500">{t('(არასავალდებულო)', '(optional)')}</span></span>
                    <textarea value={orderForm.note} onChange={(e) => setOrderForm({ ...orderForm, note: e.target.value })} className="form-input h-20 resize-none" placeholder={t('ბრენდის სახელი, სურვილები…', 'Brand name, wishes…')} />
                  </label>
                  {orderState === 'error' && (
                    <p className="text-sm text-red-300 bg-red-950/40 border border-red-500/30 rounded-lg p-3">
                      {t('გაგზავნა ვერ მოხერხდა. სცადეთ თავიდან', 'Couldn’t send. Please try again')}{phoneHref ? <> {t('ან', 'or')} <a href={phoneHref} className="underline font-semibold">{t('დაგვირეკეთ', 'call us')}</a></> : ''}.
                    </p>
                  )}
                  <button type="submit" disabled={orderState === 'sending'} className="w-full py-4 bg-[#E50914] text-white font-bold rounded-xl text-sm hover:bg-red-700 transition disabled:opacity-60">
                    {orderState === 'sending' ? t('იგზავნება…', 'Sending…') : t('გაგზავნა', 'Send')}
                  </button>
                  <p className="text-[12px] text-gray-500 text-center">{t('საბოლოო ფასი დაზუსტდება საუბრის შემდეგ.', 'The final price is confirmed after a short call.')}</p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export {
  portfolioData,
  extraPortfolioData,
  workTypeByProjectId,
  brandingPackages,
  smmPackages,
  facebookNewsPosts,
  collaborationOffers,
  collaborationTerms
};

export default App;