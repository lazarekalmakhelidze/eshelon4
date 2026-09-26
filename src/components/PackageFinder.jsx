import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';

const pick = (list, i) => (list && list.length ? list[Math.min(i, list.length - 1)] : null);

export default function PackageFinder({ brandingList, smmList, onOrder, onShowPricing }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const need = answers.need;
  const questions = [
    {
      key: 'need',
      title: 'რა გჭირდებათ პირველ რიგში?',
      options: [
        { value: 'branding', label: 'ბრენდის შექმნა', hint: 'ლოგო, ფერები, სტილი' },
        { value: 'smm', label: 'სოციალური მედიის მართვა', hint: 'პოსტები, სთორები, რეკლამა' },
        { value: 'both', label: 'ორივე ერთად', hint: 'ნულიდან სრულ ბრენდამდე' }
      ]
    },
    need === 'smm'
      ? {
          key: 'level',
          title: 'რამდენად აქტიური ყოფნა გინდათ სოციალურ ქსელებში?',
          options: [
            { value: 0, label: 'სტაბილური', hint: 'კვირაში ~2 პოსტი' },
            { value: 1, label: 'აქტიური', hint: 'კვირაში 2–3 პოსტი + დაგეგმვა' },
            { value: 2, label: 'მაქსიმალური', hint: 'ყოველდღიური კომუნიკაცია + ანალიტიკა' }
          ]
        }
      : {
          key: 'level',
          title: 'რა დონის ბრენდინგი გჭირდებათ?',
          options: [
            { value: 0, label: 'მხოლოდ ლოგო', hint: 'სწრაფი სტარტისთვის' },
            { value: 1, label: 'სრული ვიზუალური იდენტობა', hint: 'ლოგო, ტიპოგრაფია, სტილი' },
            { value: 2, label: 'ბრენდი ნულიდან', hint: 'სახელი, სტრატეგია, ბრენდბუქი' }
          ]
        },
    ...(need === 'both'
      ? [{
          key: 'smmLevel',
          title: 'და სოციალურ ქსელებში რამდენად აქტიურად?',
          options: [
            { value: 0, label: 'სტაბილური', hint: 'კვირაში ~2 პოსტი' },
            { value: 1, label: 'აქტიური', hint: 'კვირაში 2–3 პოსტი + დაგეგმვა' },
            { value: 2, label: 'მაქსიმალური', hint: 'ყოველდღიური კომუნიკაცია' }
          ]
        }]
      : [])
  ];

  const done = step >= questions.length;
  const results = [];
  if (done) {
    if (need === 'branding' || need === 'both') results.push({ kind: 'ბრენდინგი', pkg: pick(brandingList, answers.level) });
    if (need === 'smm') results.push({ kind: 'SMM', pkg: pick(smmList, answers.level) });
    if (need === 'both') results.push({ kind: 'SMM', pkg: pick(smmList, answers.smmLevel) });
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
            არ იცით, რომელი აირჩიოთ?
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
                <ArrowLeft className="w-4 h-4" /> უკან
              </button>
            )}
          </div>
        ) : (
          <div className="pf-step space-y-5">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {results.length > 1 ? 'თქვენთვის ყველაზე შესაფერისი კომბინაცია:' : 'თქვენთვის ყველაზე შესაფერისი პაკეტი:'}
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
              <p className="text-sm text-gray-300">სრული ბრენდინგის შემთხვევაში სოციალური მედიის პაკეტზე ფასდაკლება გელით — დეტალებს საუბრისას დავაზუსტებთ.</p>
            )}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  const valid = results.filter((r) => r.pkg);
                  onOrder({
                    title: valid.map((r) => r.pkg.title).join(' + '),
                    price: valid.map((r) => r.pkg.price).join(' + '),
                    desc: 'შერჩეულია კითხვარით',
                    source: 'finder'
                  });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E50914] text-white font-bold text-sm hover:bg-red-700 active:scale-[0.98] transition"
              >
                მინდა ეს პაკეტი <ArrowRight className="w-4 h-4" />
              </button>
              <button type="button" onClick={onShowPricing} className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-white/15 text-white text-sm font-semibold hover:bg-white/5 transition">
                ყველა პაკეტის ნახვა
              </button>
              <button type="button" onClick={reset} className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-sm text-gray-400 hover:text-white">
                <RotateCcw className="w-4 h-4" /> თავიდან
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
