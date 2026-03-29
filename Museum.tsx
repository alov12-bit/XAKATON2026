import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Droplets, Wind, Waves, MapPin, ArrowRight, ShoppingBag, Coffee, Trash2, Factory, DollarSign, Recycle } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: '1. Городская улица',
    description: 'Около 80% морского мусора поступает с суши. Переполненные урны, незаконные свалки и просто брошенный на улице мусор — это начало пути. Даже окурок, брошенный мимо урны, начнет свое долгое путешествие к океану.',
    icon: <MapPin size={32} className="text-slate-700" />,
    color: 'bg-slate-200',
    borderColor: 'border-slate-400'
  },
  {
    id: 2,
    title: '2. Ветер и дожди',
    description: 'Легкий мусор (пакеты, обертки) подхватывается ветром. Сильные дожди смывают уличную грязь, окурки и мелкий пластик прямо в ливневую канализацию, которая часто не имеет фильтров для мелкого мусора.',
    icon: <Wind size={32} className="text-sky-600" />,
    color: 'bg-sky-100',
    borderColor: 'border-sky-400'
  },
  {
    id: 3,
    title: '3. Реки — артерии загрязнения',
    description: 'Ливневки часто ведут напрямую в городские реки. Реки действуют как гигантские конвейерные ленты, доставляя миллионы тонн пластика из глубины материков прямо в моря и океаны каждый год.',
    icon: <Droplets size={32} className="text-blue-500" />,
    color: 'bg-blue-100',
    borderColor: 'border-blue-400'
  },
  {
    id: 4,
    title: '4. Океанические течения',
    description: 'Попав в океан, мусор подхватывается глобальными течениями (круговоротами). Он может путешествовать тысячами километров, сбиваясь в огромные мусорные пятна, такие как Большое тихоокеанское мусорное пятно.',
    icon: <Waves size={32} className="text-teal-600" />,
    color: 'bg-teal-100',
    borderColor: 'border-teal-400'
  },
  {
    id: 5,
    title: '5. Выброс на берег',
    description: 'Штормы, приливы и течения в конечном итоге выбрасывают часть мусора обратно на побережья по всему миру. Даже на самых отдаленных и необитаемых островах сейчас находят тонны пластика.',
    icon: <MapPin size={32} className="text-amber-600" />,
    color: 'bg-amber-100',
    borderColor: 'border-amber-400'
  }
];

export default function Education() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      
      <div className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-4 font-display tracking-wide">Корень проблемы: Почему мы создаем мусор?</h2>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto font-medium">
            Прежде чем мусор попадет в океан, он должен быть произведен и выброшен. Почему человечество оставляет после себя так много отходов и почему мы их не перерабатываем?
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-green-100 relative overflow-hidden group hover:border-green-300 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
            <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              <Coffee size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3 font-display">Культура одноразового</h3>
            <p className="text-slate-600 leading-relaxed">
              Ради минутного удобства мы используем вещи, которые будут разлагаться сотни лет. Маркетинг приучил нас к тому, что "выбросить и купить новое" проще, чем помыть или починить. Одноразовые стаканчики, влажные салфетки, чайные пакетики — всё это содержит скрытый пластик.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-green-100 relative overflow-hidden group hover:border-green-300 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              <ShoppingBag size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3 font-display">Перепотребление</h3>
            <p className="text-slate-600 leading-relaxed">
              Быстрая мода (fast fashion), избыточная упаковка товаров (пластик внутри пластика) и запланированное устаревание техники приводят к тому, что мы покупаем больше, чем нам действительно нужно. Вещи производятся так, чтобы быстро ломаться.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-green-100 relative overflow-hidden group hover:border-green-300 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              <DollarSign size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3 font-display">Экономика против Экологии</h3>
            <p className="text-slate-600 leading-relaxed">
              Почему не перерабатывают всё? Производить новый (первичный) пластик из нефти часто <strong>дешевле</strong>, чем собирать, сортировать, отмывать и перерабатывать старый. Бизнесу невыгодно заниматься переработкой без государственных субсидий.
            </p>
          </div>
        </div>

        {/* Deep dive into recycling */}
        <div className="bg-emerald-50 rounded-3xl p-8 md:p-10 border-2 border-emerald-200 shadow-md">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0 shadow-inner">
              <Recycle size={48} />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-emerald-900 mb-4 font-display">Иллюзия переработки</h3>
              <p className="text-emerald-800 text-lg leading-relaxed mb-4">
                Многие думают, что выбросив пластик в специальную урну, они решили проблему. Но реальность сурова: <strong>лишь около 9% всего произведенного пластика в мире было переработано</strong>.
              </p>
              <ul className="list-disc list-inside text-emerald-700 space-y-2">
                <li><strong>Сложность сортировки:</strong> Существует 7 основных видов пластика, и их нельзя плавить вместе.</li>
                <li><strong>Грязный мусор:</strong> Бутылка с остатками сладкой газировки или жирная коробка от пиццы могут испортить целую партию вторсырья.</li>
                <li><strong>Даунсайклинг:</strong> Пластик теряет качество при каждой переработке. Из бутылки редко делают новую бутылку, чаще — синтепон или плитку, которые потом всё равно окажутся на свалке.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 font-display tracking-wide">Как мусор попадает на побережье?</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
          Нажмите на кнопки ниже, чтобы проследить путь пластиковой бутылки от городской улицы до безлюдного пляжа.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border-2 border-blue-100 p-6 md:p-10 mb-20">

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(index)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold transition-all duration-300 border-2 ${
                activeStep === index 
                  ? `${step.color} ${step.borderColor} text-slate-800 shadow-md scale-105` 
                  : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:scale-105'
              }`}
            >
              <span className="hidden md:block">{step.icon}</span>
              <span className="text-lg font-display">{step.title}</span>
            </button>
          ))}
        </div>
        
        <div className="relative min-h-[250px] bg-slate-50 rounded-3xl border-2 border-slate-100 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="absolute inset-0 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8"
            >
              <div className={`w-32 h-32 md:w-48 md:h-48 rounded-full ${steps[activeStep].color} border-4 ${steps[activeStep].borderColor} shadow-xl flex items-center justify-center shrink-0`}>
                {React.cloneElement(steps[activeStep].icon as React.ReactElement, { size: 64 })}
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-800 mb-4 font-display">{steps[activeStep].title}</h3>
                <p className="text-xl text-slate-600 leading-relaxed">
                  {steps[activeStep].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="bg-gradient-to-br from-sky-400 to-blue-600 rounded-3xl p-10 text-center shadow-2xl text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        <h3 className="text-4xl font-bold mb-6 font-display relative z-10">Невидимая угроза: Микропластик</h3>
        <p className="text-xl max-w-4xl mx-auto leading-relaxed relative z-10 font-medium">
          В океане пластик не гниет. Под воздействием палящего солнца, соленой воды и ударов волн он становится хрупким и распадается на крошечные частицы — <strong>микропластик</strong>. Эти частицы настолько малы, что планктон и рыбы принимают их за еду. Так пластик попадает в пищевую цепь, на вершине которой находимся мы с вами.
        </p>
      </div>
    </div>
  );
}


