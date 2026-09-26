import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { useLang } from '../i18n';

const pick = (list, i) => (list && list.length ? list[Math.min(i, list.length - 1)] : null);

export default function PackageFinder({ brandingList, smmList, onOrder, onShowPricing }) {
  const { t } = useLang();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const need = answers.need;
  const questions = [
    {
      key: 'need',
      title: t('რა გჭირდებათ პირველ რიგში?', 'What do you need first?'),
      options: [
        { value: 'branding', label: t('ბრენდის შექმნა', 'A new brand'), hint: t('ლოგო, ფერები, სტილი', 'Logo, colours, style') },
        { value: 'smm', label: t('სოციალური მედიის მართვა', 'Social media management'), hint: t('პოსტები, სთორები, რეკლამა', 'Posts, stories, ads') },
        { value: 'both', label: t('ორივე ერთად', 'Both'), hint: t('ნულიდან სრულ ბრენდამდე', 'From zero to a complete brand') }
      ]
    },
    need === 'smm'
      ? {
          key: 'level',
          title: t('რამდენად აქტიური ყოფნა გინდათ სოციალურ ქსელებში?', 'How active do you want to be on social media?'),
          options: [
            { value: 0, label: t('სტაბილური', 'Steady'), hint: t('კვირაში ~2 პოსტი', '~2 posts a week') },
            { value: 1, label: t('აქტიური', 'Active'), hint: t('კვირაში 2–3 პოსტი + დაგეგმვა', '2–3 posts a week + planning') },
            { value: 2, label: t('მაქსიმალური', 'Maximum'), hint: t('ყოველდღიური კომუნიკაცია + ანალიტიკა', 'Daily presence + analytics') }
          ]
        }
      : {
          key: 'level',
          title: t('რა დონის ბრენდინგი გჭირდებათ?', 'What level of branding do you need?'),
          options: [
            { value: 0, label: t('მხოლოდ ლოგო', 'Just a logo'), hint: t('სწრაფი სტარტისთვის', 'For a quick start') },
            { value: 1, label: t('სრული ვიზუალური იდენტობა', 'Full visual identity'), hint: t('ლოგო, ტიპოგრაფია, სტილი', 'Logo, typography, style') },
            { value: 2, label: t('ბრენდი ნულიდან', 'A brand from scratch'), hint: t('სახელი, სტრატეგია, ბრენდბუქი', 'Name, strategy, brand book') }
          ]
        },
    ...(need === 'both'
      ? [{
          key: 'smmLevel',
          title: t('და სოციალურ ქსელებში რამდენად აქტიურად?', 'And how active on social media?'),
          options: [
            { value: 0, label: t('სტაბილური', 'Steady'), hint: t('კვირაში ~2 პოსტი', '~2 posts a week') },
            { value: 1, label: t('აქტიური', 'Active'), hint: t('კვირაში 2–3 პოსტი + დაგეგმვა', '2–3 posts a week + planning') },
            { value: 2, label: t('მაქსიმალური', 'Maximum'), hint: t('ყოველდღიური კომუნიკაცია', 'Daily presence') }
          ]
        }]
      : [])
  ];

  const done = step >= questions.length;
  const results = [];
  if (done) {
    if (need === 'branding' || need === 'both') results.push({ kind: t('ბრენდინგი', 'Branding'), pkg: pick(brandingList, answers.level) });
    if (need === 'smm') results.push({ kind: t('SMM', 'Social media'), pkg: pick(smmList, answers.level) });
    if (need === 'both') results.push({ kind: t('SMM', 'Social media'), pkg: pick(smmList, answers.smmLevel) });
  }

  const choose = (key, value) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    setStep((s) => s + 1);
  };
  const reset = () => { setAnswers({}); setStep(0); };
  const q = questions[step];

  return (
    <div className="surface-card relative overflow-hidden bg-gradient-to-br from-[#161013] via-[#121212] to-[#121212] border border-[#E50914]/20 rounded-2xl p-6 sm:p-10">
      <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#E50914]/10 blur-3xl" />
      <div className="relative">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="inline-flex items-center gap-2 text-[#ff4d55] text-sm font-bold">
            <Sparkles className="w-4 h-4" />
            {t('არ იცით, რომელი აირჩიოთ?', 'Not sure which one to pick?')}
          </div>
          {!done && <span className="text-xs text-gray-400 tabular-nums">{step + 1} / {questions.length}</span>}
        </div>

        {!done && (
          <div className="h-1 w-full bg-white/5 rounded-full mb-8 overflow-hidden">
            <div className="h-full bg-[#E50914] transition-all duration-500" style={{ width: `${(step / questions.length) * 100}%` }} />
          </div>
        )}

        {!done ? (
          <div key={step} className="pf-step">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-6">{q.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {q.options.map((o) => (
                <button
                  key={String(o.value)}
                  type="button"
                  onClick={() => choose(q.key, o.value)}
                  className="group text-left p-4 sm:p-5 rounded-xl border border-white/10 bg-black/30 hover:border-[#E50914]/60 hover:bg-[#E50914]/[0.06] active:scale-[0.98] transition"
                >
                  <span className="block text-[15px] font-bold text-white group-hover:text-white">{o.label}</span>
                  <span className="block text-[13px] text-gray-400 mt-1">{o.hint}</span>
                </button>
              ))}
            </div>
            {step > 0 && (
              <button type="button" onClick={() => setStep((s) => s - 1)} className="mt-6 inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white">
                <ArrowLeft className="w-4 h-4" /> {t('უკან', 'Back')}
              </button>
            )}
          </div>
        ) : (
          <div className="pf-step space-y-5">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {results.length > 1 ? t('თქვენთვის ყველაზე შესაფერისი კომბინაცია:', 'Your best-fit combination:') : t('თქვენთვის ყველაზე შესაფერისი პაკეტი:', 'Your best-fit package:')}
            </h3>
            <div className={`grid gap-3 ${results.length > 1 ? 'sm:grid-cols-2' : ''}`}>
              {results.filter((r) => r.pkg).map((r, i) => (
                <div key={i} className="rounded-xl border border-[#E50914]/40 bg-black/40 p-5">
                  <p className="text-xs font-semibold text-gray-400 mb-1">{r.kind}</p>
                  <p className="text-xl font-black text-white">{r.pkg.title}</p>
                  <p className="text-2xl font-black text-[#ff4d55] mt-1">{r.pkg.price}</p>
                  {r.pkg.desc && <p className="text-sm text-gray-300 mt-2 leading-relaxed">{r.pkg.desc}</p>}
                </div>
              ))}
            </div>
            {need === 'both' && (
              <p className="text-sm text-gray-300">{t('სრული ბრენდინგის შემთხვევაში სოციალური მედიის პაკეტზე ფასდაკლება გელით — დეტალებს საუბრისას დავაზუსტებთ.', 'With full branding you get a discount on the social media package — we’ll confirm the details on a call.')}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  const valid = results.filter((r) => r.pkg);
                  onOrder({
                    title: valid.map((r) => r.pkg.title).join(' + '),
                    price: valid.map((r) => r.pkg.price).join(' + '),
                    desc: t('შერჩეულია კითხვარით', 'Picked with the quiz'),
                    source: 'finder'
                  });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E50914] text-white font-bold text-sm hover:bg-red-700 active:scale-[0.98] transition"
              >
                {t('მინდა ეს პაკეტი', 'I want this')} <ArrowRight className="w-4 h-4" />
              </button>
              <button type="button" onClick={onShowPricing} className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-white/15 text-white text-sm font-semibold hover:bg-white/5 transition">
                {t('ყველა პაკეტის ნახვა', 'See all packages')}
              </button>
              <button type="button" onClick={reset} className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-sm text-gray-400 hover:text-white">
                <RotateCcw className="w-4 h-4" /> {t('თავიდან', 'Start over')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
