import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, PresentationControls, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import { Info, AlertTriangle, Clock, FlaskConical, Recycle } from 'lucide-react';

const exhibits = [
  {
    id: 'bottle',
    name: 'Пластиковая бутылка',
    material: 'Пластик (ПЭТ)',
    decomposition: '450 лет',
    cause: 'Фотодеградация. Ультрафиолетовые лучи солнца медленно разрушают полимерные связи пластика. Он не гниет, а распадается на крошечные частицы — микропластик.',
    impact: 'Микропластик проглатывают морские животные. Токсины накапливаются в тканях рыб и по пищевой цепи попадают к человеку.',
    notRecycledReason: 'Грязные бутылки сложно перерабатывать. Кроме того, производство нового пластика из нефти часто дешевле, чем сбор и переработка старого.',
    color: '#88ccff',
    imageUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'can',
    name: 'Алюминиевая банка',
    material: 'Металл (Алюминий)',
    decomposition: '200 лет',
    cause: 'Окисление (коррозия). В соленой морской воде металл вступает в реакцию с кислородом и солями, постепенно ржавея и истончаясь.',
    impact: 'Острые края ранят животных. Токсичные примеси из красок на банке растворяются в воде. Однако собранный алюминий можно перерабатывать бесконечно.',
    notRecycledReason: 'Алюминий — один из самых выгодных материалов для переработки. Если банка оказалась в океане, это исключительно вина отсутствия инфраструктуры сбора.',
    color: '#c0c0c0',
    imageUrl: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'tire',
    name: 'Автомобильная шина',
    material: 'Резина',
    decomposition: 'Более 500 лет',
    cause: 'Фотодеградация и механическое истирание. Резина очень устойчива к бактериям, поэтому она разрушается только под воздействием солнца и трения о камни.',
    impact: 'Выделяет токсичные химикаты (например, 6PPD-хинон) и микрорезину. Часто становится смертельной ловушкой для мелких крабов, рыб и осьминогов.',
    notRecycledReason: 'Шины сложно перерабатывать из-за их прочности. Их часто сжигают (что загрязняет воздух) или выбрасывают на нелегальные свалки.',
    color: '#222222',
    imageUrl: 'https://images.unsplash.com/photo-1580487434522-1d54238e5520?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'bag',
    name: 'Полиэтиленовый пакет',
    material: 'Пластик (ПВД/ПНД)',
    decomposition: '10-20 лет',
    cause: 'Фотодеградация. Тонкий пластик быстрее разрушается на солнце, но в темных глубинах океана этот процесс может занять столетия.',
    impact: 'Морские черепахи и киты часто путают плавающие пакеты с медузами. Проглатывание приводит к блокировке пищеварения и гибели от голода.',
    notRecycledReason: 'Тонкие пакеты застревают в сортировочных машинах на заводах, ломая их. Их сбор экономически невыгоден.',
    color: '#ffffff',
    imageUrl: 'https://images.unsplash.com/photo-1621451537084-482c73073e0f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'glass',
    name: 'Стеклянная бутылка',
    material: 'Стекло',
    decomposition: 'До 1 000 000 лет',
    cause: 'Механическое разрушение. Стекло химически инертно и не подвергается биоразложению. Оно лишь разбивается волнами и трением о песок, превращаясь в "морское стекло".',
    impact: 'Наименее токсичный вид мусора. Главная опасность — острые осколки на мелководье, которые могут поранить людей и животных.',
    notRecycledReason: 'Стекло тяжелое, его транспортировка на переработку стоит дорого. Если стекло бьется в смешанном мусоре, его почти невозможно отсортировать.',
    color: '#4ade80',
    imageUrl: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'apple',
    name: 'Огрызок яблока',
    material: 'Органика',
    decomposition: '1-2 месяца',
    cause: 'Биоразложение. Органические отходы поедаются бактериями, грибками и мелкими морскими организмами.',
    impact: 'В небольших количествах безопасен. Но массовый выброс органики (например, сточные воды) вызывает цветение водорослей, которые забирают кислород из воды, убивая рыб.',
    notRecycledReason: 'Органика должна компостироваться. На обычных свалках без доступа кислорода она гниет, выделяя метан — мощный парниковый газ.',
    color: '#facc15',
    imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa5636817С6cf?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'net',
    name: 'Рыболовная сеть',
    material: 'Нейлон / Пластик',
    decomposition: 'Около 600 лет',
    cause: 'Синтетические волокна (нейлон) очень прочные и устойчивы к гниению. Разрушаются только под длительным воздействием солнца и трения.',
    impact: '«Призрачная рыбалка». Брошенные сети продолжают ловить и убивать рыб, черепах, дельфинов и китов долгие годы, пока не распадутся.',
    notRecycledReason: 'Сложно извлекать со дна. Сети часто запутаны в кораллы или камни, а их очистка от органики перед переработкой очень трудоемка.',
    color: '#14b8a6',
    imageUrl: 'https://images.unsplash.com/photo-1520188740392-67eb51101115?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'flipflop',
    name: 'Резиновый тапочек',
    material: 'Вспененный полиуретан / Резина',
    decomposition: '50-80 лет',
    cause: 'Синтетическая пена медленно крошится под воздействием солнца и соленой воды, превращаясь в токсичный микропластик.',
    impact: 'Впитывает токсины из воды. Черепахи и птицы часто откусывают куски ярких тапочек, принимая их за еду, что приводит к гибели.',
    notRecycledReason: 'Тапочки делают из смеси разных материалов (пена, резина, клей), которые почти невозможно разделить для вторичной переработки.',
    color: '#f43f5e',
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
  }
];
function Bottle() {
  return (
    <group scale={1.5}>
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 1.5, 64]} />
        <MeshDistortMaterial color="#aaddff" transmission={0.95} opacity={1} transparent roughness={0.3} thickness={0.1} ior={1.5} clearcoat={1} distort={0.4} speed={0} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.3, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <MeshDistortMaterial color="#aaddff" transmission={0.95} opacity={1} transparent roughness={0.3} thickness={0.1} ior={1.5} clearcoat={1} distort={0.2} speed={0} />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.2, 32]} />
        <meshPhysicalMaterial color="#aaddff" transmission={0.95} opacity={1} transparent roughness={0.05} ior={1.5} />
      </mesh>
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.1, 32]} />
        <meshStandardMaterial color="#2563eb" roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.305, 0.305, 0.6, 64]} />
        <MeshDistortMaterial color="#ffffff" roughness={0.8} distort={0.1} speed={0} />
      </mesh>
    </group>
  );
}

function Can() {
  return (
    <group scale={1.8}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 1.2, 64]} />
        <MeshDistortMaterial color="#a0a0a0" metalness={0.8} roughness={0.6} distort={0.15} speed={0} />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <torusGeometry args={[0.38, 0.04, 32, 64]} />
        <meshStandardMaterial color="#d0d0d0" metalness={1} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.02, 64]} />
        <meshStandardMaterial color="#c0c0c0" metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[0.1, 0.62, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.08, 0.02, 16, 32]} />
        <meshStandardMaterial color="#b0b0b0" metalness={1} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <torusGeometry args={[0.38, 0.04, 32, 64]} />
        <meshStandardMaterial color="#d0d0d0" metalness={1} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.402, 0.402, 0.9, 64]} />
        <MeshDistortMaterial color="#dc2626" metalness={0.4} roughness={0.5} distort={0.1} speed={0} />
      </mesh>
    </group>
  );
}

function Tire() {
  return (
    <group scale={1.5} rotation={[Math.PI / 2, 0, 0]}>
      <mesh>
        <torusGeometry args={[0.8, 0.3, 64, 128]} />
        <meshStandardMaterial color="#111111" roughness={0.95} metalness={0.1} />
      </mesh>

      <mesh>
        <torusGeometry args={[0.81, 0.29, 32, 128]} />
        <meshStandardMaterial color="#0a0a0a" roughness={1} wireframe={true} />
      </mesh>
    
      <mesh>
        <torusGeometry args={[0.5, 0.05, 32, 64]} />
        <meshStandardMaterial color="#333333" roughness={0.8} metalness={0.5} />
      </mesh>
    </group>
  );
}

function Bag() {
  return (
    <group scale={1.5}>
      <mesh position={[0, -0.2, 0]} scale={[1, 1.2, 0.8]}>
        <sphereGeometry args={[0.6, 64, 64]} />
        <MeshWobbleMaterial color="#ffffff" transmission={0.8} opacity={0.6} transparent roughness={0.6} factor={0.6} speed={1} side={2} />
      </mesh>
      <mesh position={[0.3, 0.6, 0]} rotation={[0, 0, Math.PI / 6]} scale={[1, 1.5, 1]}>
        <torusGeometry args={[0.2, 0.02, 16, 64, Math.PI]} />
        <MeshWobbleMaterial color="#ffffff" transmission={0.8} opacity={0.6} transparent roughness={0.6} factor={0.4} speed={1} side={2} />
      </mesh>
      <mesh position={[-0.3, 0.6, 0]} rotation={[0, 0, -Math.PI / 6]} scale={[1, 1.5, 1]}>
        <torusGeometry args={[0.2, 0.02, 16, 64, Math.PI]} />
        <MeshWobbleMaterial color="#ffffff" transmission={0.8} opacity={0.6} transparent roughness={0.6} factor={0.4} speed={1} side={2} />
      </mesh>
    </group>
  );
}

function GlassBottle() {
  return (
    <group scale={1.5}>
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 1.2, 64]} />
        <meshPhysicalMaterial color="#22c55e" transmission={0.98} opacity={1} transparent roughness={0.02} thickness={0.5} ior={1.52} clearcoat={1} />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.3, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial color="#22c55e" transmission={0.98} opacity={1} transparent roughness={0.02} thickness={0.5} ior={1.52} clearcoat={1} />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.5, 32]} />
        <meshPhysicalMaterial color="#22c55e" transmission={0.98} opacity={1} transparent roughness={0.02} thickness={0.5} ior={1.52} clearcoat={1} />
      </mesh>
      <mesh position={[0, 1.05, 0]}>
        <torusGeometry args={[0.12, 0.03, 16, 32]} />
        <meshPhysicalMaterial color="#22c55e" transmission={0.98} opacity={1} transparent roughness={0.02} ior={1.52} />
      </mesh>
    </group>
  );
}

function AppleCore() {
  return (
    <group scale={1.2}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.8, 32]} />
        <meshStandardMaterial color="#fef08a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#ef4444" roughness={0.7} />
      </mesh>
      <mesh position={[0, -0.4, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#ef4444" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.7, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.02, 0.03, 0.3, 16]} />
        <meshStandardMaterial color="#451a03" roughness={1} />
      </mesh>
      <mesh position={[0.12, 0, 0.05]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="#1c1917" roughness={0.5} />
      </mesh>
      <mesh position={[-0.12, 0, -0.05]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="#1c1917" roughness={0.5} />
      </mesh>
    </group>
  );
}

function FishingNet() {
  return (
    <group scale={1.5}>
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <torusKnotGeometry args={[0.4, 0.05, 100, 16]} />
        <MeshWobbleMaterial color="#14b8a6" wireframe={true} transmission={0.5} opacity={0.8} transparent roughness={0.8} factor={0.5} speed={2} />
      </mesh>
    </group>
  );
}

function FlipFlop() {
  return (
    <group scale={1.5}>

      <mesh position={[0, -0.1, 0]} scale={[1, 0.2, 2.2]}>
        <boxGeometry args={[0.6, 0.5, 0.8]} />
        <meshStandardMaterial color="#f43f5e" roughness={0.9} />
      </mesh>

      <mesh position={[-0.15, 0.1, 0.2]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 16]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.6} />
      </mesh>
      <mesh position={[0.15, 0.1, 0.2]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 16]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.2, 0.35]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.6} />
      </mesh>
    </group>
  );
}

export default function Museum() {
  const [activeExhibit, setActiveExhibit] = useState(0);

  const renderModel = () => {
    switch (exhibits[activeExhibit].id) {
      case 'bottle': return <Bottle />;
      case 'can': return <Can />;
      case 'tire': return <Tire />;
      case 'bag': return <Bag />;
      case 'glass': return <GlassBottle />;
      case 'apple': return <AppleCore />;
      case 'net': return <FishingNet />;
      case 'flipflop': return <FlipFlop />;
      default: return <Bottle />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-80px)] bg-slate-900 text-slate-100">
      <div className="flex-1 relative bg-gradient-to-b from-slate-800 to-slate-950 rounded-xl m-4 overflow-hidden shadow-2xl border border-slate-700">
        <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <Environment preset="studio" />
          
          <PresentationControls 
            global 
            rotation={[0, 0.3, 0]} 
            polar={[-Math.PI / 4, Math.PI / 4]} 
            azimuth={[-Math.PI / 2, Math.PI / 2]}
          >
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
              {renderModel()}
            </Float>
          </PresentationControls>
          
          <ContactShadows position={[0, -1.5, 0]} opacity={0.7} scale={10} blur={2.5} far={4} color="#000000" />
        </Canvas>
        
        <div className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-slate-600 text-sm font-medium text-slate-200 flex items-center gap-2">
          <Info size={16} className="text-teal-400" />
          Вращайте модель мышью (Высокодетализированные 3D-рендеры)
        </div>
      </div>

      <div className="w-full md:w-[450px] p-6 bg-slate-800 border-l border-slate-700 overflow-y-auto custom-scrollbar">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <FlaskConical className="text-teal-400" />
          Лаборатория Мусора
        </h2>
        
        <div className="grid grid-cols-2 gap-2 mb-8">
          {exhibits.map((exhibit, index) => (
            <button
              key={exhibit.id}
              onClick={() => setActiveExhibit(index)}
              className={`text-left px-3 py-3 rounded-lg transition-all duration-200 text-sm ${
                activeExhibit === index 
                  ? 'bg-teal-500/20 border-teal-400 border shadow-sm text-teal-100 font-medium' 
                  : 'bg-slate-700/50 border border-transparent text-slate-300 hover:bg-slate-700'
              }`}
            >
              {exhibit.name}
            </button>
          ))}
        </div>

        <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700 shadow-inner space-y-6">
          <h3 className="text-2xl font-bold text-white">
            {exhibits[activeExhibit].name}
          </h3>

          <div className="w-full h-48 rounded-lg overflow-hidden border border-slate-600 shadow-md">
            <img 
              src={exhibits[activeExhibit].imageUrl} 
              alt={exhibits[activeExhibit].name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="flex items-start gap-3 bg-slate-800/80 p-4 rounded-lg border border-slate-600">
            <Info className="text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Материал</span>
              <span className="text-lg font-bold text-cyan-400">
                {exhibits[activeExhibit].material}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-800/80 p-4 rounded-lg border border-slate-600">
            <Clock className="text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Время разложения</span>
              <span className="text-xl font-bold text-rose-400">
                {exhibits[activeExhibit].decomposition}
              </span>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-2 flex items-center gap-2">
              <FlaskConical size={14} /> Причина разложения
            </span>
            <p className="text-slate-300 leading-relaxed text-sm bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              {exhibits[activeExhibit].cause}
            </p>
          </div>
          
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2 flex items-center gap-2">
              <AlertTriangle size={14} /> Влияние на океан
            </span>
            <p className="text-slate-300 leading-relaxed text-sm bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              {exhibits[activeExhibit].impact}
            </p>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-2 flex items-center gap-2">
              <Recycle size={14} /> Почему не перерабатывают?
            </span>
            <p className="text-slate-300 leading-relaxed text-sm bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              {exhibits[activeExhibit].notRecycledReason}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

