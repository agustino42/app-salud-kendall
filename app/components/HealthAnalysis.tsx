import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useEmblaCarousel from 'embla-carousel-react';
import Link from "next/link";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { InitialData } from "./InitialDataForm";

interface HealthAnalysisProps {
  initialData: InitialData;
  dailyData: any[];
  correlation: number | null;
}

const getWeightStatus = (weight: number) => {
  if (weight <= 40) return "bajo peso";
  if (weight <= 80) return "peso saludable";
  return "sobrepeso";
};

const getDietRecommendation = (weightStatus: string) => {
  const diets = {
    "bajo peso": {
      title: "Dieta para Aumentar Peso de Manera Saludable",
      meals: [
        "🍳 Desayuno: Avena con plátano, nueces y mantequilla de maní",
        "🥪 Media mañana: Batido de proteínas con frutas",
        "🍚 Almuerzo: Pollo con arroz integral y aguacate",
        "🥛 Merienda: Yogur con granola y miel",
        "🍖 Cena: Salmón con papas y vegetales salteados"
      ]
    },
    "peso saludable": {
      title: "Dieta de Mantenimiento Balanceada",
      meals: [
        "🥣 Desayuno: Tazón de frutas con yogur y semillas",
        "🍎 Media mañana: Manzana con almendras",
        "🥗 Almuerzo: Ensalada con proteína magra",
        "🥕 Merienda: Palitos de zanahoria con hummus",
        "🐟 Cena: Pescado al horno con verduras"
      ]
    },
    "sobrepeso": {
      title: "Dieta para Reducción Saludable de Peso",
      meals: [
        "🍵 Desayuno: Té verde con tostada integral y huevo",
        "🍊 Media mañana: Naranja",
        "🥗 Almuerzo: Ensalada grande con atún",
        "🥒 Merienda: Pepino y tomates cherry",
        "🍗 Cena: Pechuga de pollo con vegetales al vapor"
      ]
    }
  };
  return diets[weightStatus as keyof typeof diets];
};

const getHealthScore = (data: any) => {
  let score = {
    sueño: (data.sleepHours >= 7 && data.sleepHours <= 9) ? 100 : (data.sleepHours * 100) / 8,
    agua: (data.waterIntake * 100) / 8,
    ejercicio: (data.exerciseMinutes * 100) / 30,
    estres: ((10 - data.stressLevel) * 100) / 10,
    animo: (data.moodRating * 100) / 10
  };
  
  return Object.entries(score).map(([key, value]) => ({
    nombre: key,
    valor: Math.min(100, Math.max(0, value))
  }));
};

/**
 * Proporciona una interpretación detallada de la correlación y recomendaciones de salud
 * @param correlation - Valor de correlación Kendall
 * @returns Objeto con información detallada de la interpretación
 */
const getCorrelationStatus = (correlation: number | null) => {
  if (correlation === null) return { 
    status: "Sin datos", 
    color: "#94a3b8", 
    emoji: "❓",
    description: "No hay suficientes datos para realizar un análisis",
    recommendation: "Continúa registrando tus datos diariamente para obtener un análisis más preciso"
  };

  const absCorr = Math.abs(correlation);
  const isPositive = correlation > 0;
  
  if (absCorr >= 0.7) return { 
    status: "Muy Alta", 
    color: "#22c55e",
    emoji: "🌟",
    description: isPositive 
      ? "Existe una relación muy fuerte entre tu peso y horas de sueño. Cuando duermes más, tu peso tiende a aumentar significativamente."
      : "Existe una relación muy fuerte inversa entre tu peso y horas de sueño. Cuando duermes más, tu peso tiende a disminuir significativamente.",
    recommendation: isPositive 
      ? "Es importante mantener un equilibrio. Aunque dormir bien es esencial, considera complementar tu rutina de sueño con ejercicio regular y una dieta balanceada para mantener un peso saludable."
      : "Tu patrón de sueño parece estar ayudando en el control de peso. Mantén estos buenos hábitos de sueño y considera consultar con un profesional de la salud para optimizar tu rutina.",
    healthImpact: "El sueño afecta significativamente tu metabolismo y los niveles hormonales que regulan el apetito y el peso corporal."
  };

  if (absCorr >= 0.5) return { 
    status: "Alta", 
    color: "#84cc16",
    emoji: "✨",
    description: isPositive
      ? "Hay una relación considerable entre tus patrones de sueño y peso. Las horas que duermes están influyendo en tu peso de manera notable."
      : "Hay una relación considerable inversa entre tus patrones de sueño y peso. Más horas de sueño parecen ayudar a mantener un peso más bajo.",
    recommendation: isPositive
      ? "Evalúa tu rutina nocturna y considera ajustar tus horarios de comida. Evita comer justo antes de dormir y mantén un horario regular de sueño."
      : "Tu patrón de sueño está contribuyendo positivamente a tu salud. Mantén esta rutina y considera incorporar ejercicios de relajación antes de dormir.",
    healthImpact: "Un buen patrón de sueño puede mejorar tu metabolismo y ayudar en la regulación del peso corporal."
  };

  if (absCorr >= 0.3) return { 
    status: "Moderada", 
    color: "#eab308",
    emoji: "⭐",
    description: isPositive
      ? "Existe una relación moderada entre tus horas de sueño y peso. Hay otros factores que también están influyendo en tu peso."
      : "Existe una relación moderada inversa entre tus horas de sueño y peso. El sueño podría estar ayudando en tu control de peso junto con otros factores.",
    recommendation: "Considera llevar un registro más detallado de otros factores como tu dieta y nivel de actividad física para entender mejor qué influye en tu peso.",
    healthImpact: "El sueño es uno de varios factores que influyen en tu salud. Una aproximación integral que incluya dieta y ejercicio puede ser más efectiva."
  };

  if (absCorr >= 0.1) return { 
    status: "Baja", 
    color: "#f97316",
    emoji: "⚠️",
    description: "La relación entre tu sueño y peso es débil. Probablemente hay otros factores más importantes influyendo en tu peso.",
    recommendation: "Enfócate en otros aspectos de tu estilo de vida como la dieta y el ejercicio. Aunque el sueño es importante, no parece ser el factor principal en tu caso.",
    healthImpact: "Considera evaluar otros aspectos de tu salud que puedan tener mayor impacto en tu peso."
  };

  return { 
    status: "Muy Baja", 
    color: "#ef4444",
    emoji: "❌",
    description: "No hay una relación significativa entre tus horas de sueño y tu peso.",
    recommendation: "Enfócate en otros aspectos de tu salud como la alimentación y el ejercicio. El sueño, aunque importante para tu salud general, no parece estar afectando directamente tu peso.",
    healthImpact: "Mantén buenos hábitos de sueño por sus beneficios generales para la salud, pero considera que otros factores pueden ser más relevantes para tu peso."
  };
};

const getNutritionalPlan = (weight: number, waterIntake: number, exerciseMinutes: number) => {
  const baseCalories = weight * 24; // Calorías base por peso
  const activityFactor = exerciseMinutes > 30 ? 1.3 : 1.2;
  const recommendedCalories = Math.round(baseCalories * activityFactor);
  
  const macronutrients = {
    lowWeight: { protein: 30, carbs: 50, fats: 20 },
    normal: { protein: 25, carbs: 45, fats: 30 },
    overweight: { protein: 35, carbs: 35, fats: 30 }
  };

  const waterRecommendation = Math.max(8, Math.round(weight * 0.033)); // Mínimo 8 vasos
  const waterDeficit = waterRecommendation - waterIntake;

  const type = weight <= 40 ? 'lowWeight' : weight <= 80 ? 'normal' : 'overweight';
  const macros = macronutrients[type];

  return {
    calorias: recommendedCalories,
    macros,
    aguaNecesaria: waterDeficit > 0 ? `Necesitas beber ${waterDeficit} vasos más de agua al día` : 'Tu consumo de agua es adecuado',
    datosMacros: [
      { nombre: 'Proteínas', valor: macros.protein },
      { nombre: 'Carbohidratos', valor: macros.carbs },
      { nombre: 'Grasas', valor: macros.fats }
    ],
    distribucionCalorias: [
      { nombre: 'Desayuno', valor: 0.25 },
      { nombre: 'Media Mañana', valor: 0.15 },
      { nombre: 'Almuerzo', valor: 0.30 },
      { nombre: 'Merienda', valor: 0.10 },
      { nombre: 'Cena', valor: 0.20 }
    ].map(comida => ({
      ...comida,
      calorias: Math.round(recommendedCalories * comida.valor)
    }))
  };
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const getScoreColor = (score: number) => {
  if (score >= 80) return '#22c55e'; // Verde para excelente
  if (score >= 60) return '#eab308'; // Amarillo para bueno
  if (score >= 40) return '#f97316'; // Naranja para regular
  return '#ef4444'; // Rojo para bajo
};

const getScoreLabel = (score: number) => {
  if (score >= 80) return '¡Excelente! 🌟';
  if (score >= 60) return 'Bueno 👍';
  if (score >= 40) return 'Regular 😐';
  return 'Necesita mejorar ⚠️';
};

const HealthAnalysis: React.FC<HealthAnalysisProps> = ({
  initialData,
  dailyData,
  correlation
}) => {
  const lastEntry = dailyData[dailyData.length - 1];
  const weightStatus = getWeightStatus(lastEntry.weight);
  const dietPlan = getDietRecommendation(weightStatus);
  const nutritionalPlan = getNutritionalPlan(lastEntry.weight, lastEntry.waterIntake, lastEntry.exerciseMinutes);
  const healthScores = getHealthScore(lastEntry);
  
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    loop: true,
    skipSnaps: false,
    dragFree: true
  });

  const healthArticles = [
    {
      title: "Importancia del Sueño en la Salud",
      url: "https://www.sleepfoundation.org/",
      description: "Descubre por qué dormir bien es fundamental para tu salud",
      image: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?q=80&w=2070&auto=format&fit=crop",
      tag: "🌙 Descanso"
    },
    {
      title: "Ejercicios para Principiantes",
      url: "https://www.acefitness.org/",
      description: "Rutinas simples para comenzar tu viaje fitness",
      image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=2074&auto=format&fit=crop",
      tag: "💪 Ejercicio"
    },
    {
      title: "Nutrición Balanceada",
      url: "https://www.nutrition.gov/",
      description: "Guía completa de alimentación saludable",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop",
      tag: "🥗 Nutrición"
    },
    {
      title: "Manejo del Estrés",
      url: "https://www.mayoclinic.org/",
      description: "Técnicas efectivas para manejar el estrés diario",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2099&auto=format&fit=crop",
      tag: "🧘‍♂️ Bienestar"
    },
    {
      title: "Hidratación y Salud",
      url: "https://www.cdc.gov/healthywater/",
      description: "La importancia de mantenerse hidratado",
      image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=1988&auto=format&fit=crop",
      tag: "�� Hidratación"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Indicadores de Salud 📊</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={healthScores} barSize={60}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="nombre" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#666', fontSize: 12 }}
                />
                <YAxis 
                  domain={[0, 100]} 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#666', fontSize: 12 }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-background p-3 border rounded-lg shadow-lg">
                          <p className="font-semibold">{data.nombre}</p>
                          <p className="text-sm">Puntuación: {data.valor.toFixed(1)}%</p>
                          <p className="text-sm font-medium" style={{ color: getScoreColor(data.valor) }}>
                            {getScoreLabel(data.valor)}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="valor" 
                  name="Puntuación (%)"
                >
                  {healthScores.map((entry, index) => (
                    <Cell 
                      key={`celda-${index}`} 
                      fill={getScoreColor(entry.valor)}
                      style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))' }}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {healthScores.map((puntuacion, index) => (
              <div 
                key={index}
                className="p-4 rounded-lg border"
                style={{ borderColor: getScoreColor(puntuacion.valor) }}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">{puntuacion.nombre}</h4>
                  <span 
                    className="text-sm font-medium px-2 py-1 rounded"
                    style={{ backgroundColor: getScoreColor(puntuacion.valor), color: 'white' }}
                  >
                    {puntuacion.valor.toFixed(1)}%
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {getScoreLabel(puntuacion.valor)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tendencias de Salud 📈</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#8884d8" 
                  name="Peso (kg)" 
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="sleepHours" 
                  stroke="#82ca9d" 
                  name="Horas de sueño" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-secondary rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Correlación Kendall</h3>
                {correlation !== null && (
                  <div className="flex items-center gap-4">
                    <div 
                      className="h-24 w-24 rounded-full flex items-center justify-center text-2xl font-bold"
                      style={{ 
                        backgroundColor: getCorrelationStatus(correlation).color,
                        color: 'white'
                      }}
                    >
                      {Math.abs(correlation * 100).toFixed(1)}%
                    </div>
                    <div>
                      <p className="text-lg font-medium flex items-center gap-2">
                        {getCorrelationStatus(correlation).emoji} 
                        Correlación {getCorrelationStatus(correlation).status}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {correlation > 0 ? "Positiva" : "Negativa"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 bg-secondary rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Interpretación Detallada</h3>
                <div className="space-y-4">
                  <p className="text-sm leading-relaxed">
                    {getCorrelationStatus(correlation).description}
                  </p>
                  <div className="mt-4 space-y-3">
                    <div className="p-4 bg-white/50 rounded-lg">
                      <h4 className="font-medium mb-2">💡 Recomendación</h4>
                      <p className="text-sm text-muted-foreground">
                        {getCorrelationStatus(correlation).recommendation}
                      </p>
                    </div>
                    <div className="p-4 bg-white/50 rounded-lg">
                      <h4 className="font-medium mb-2">🏥 Impacto en la Salud</h4>
                      <p className="text-sm text-muted-foreground">
                        {getCorrelationStatus(correlation).healthImpact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="p-3 text-left">Rango de Correlación</th>
                    <th className="p-3 text-left">Interpretación</th>
                    <th className="p-3 text-left">Nivel</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="hover:bg-muted/50">
                    <td className="p-3">70% - 100%</td>
                    <td className="p-3">Correlación muy alta</td>
                    <td className="p-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Excelente 🌟
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="p-3">50% - 69%</td>
                    <td className="p-3">Correlación alta</td>
                    <td className="p-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-lime-100 text-lime-800">
                        Muy Bueno ✨
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="p-3">30% - 49%</td>
                    <td className="p-3">Correlación moderada</td>
                    <td className="p-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Bueno ⭐
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="p-3">10% - 29%</td>
                    <td className="p-3">Correlación baja</td>
                    <td className="p-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        Regular ⚠️
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="p-3">0% - 9%</td>
                    <td className="p-3">Correlación muy baja</td>
                    <td className="p-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Bajo ❌
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Análisis General de Salud</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Correlación entre peso y sueño: {correlation?.toFixed(2)}
          </p>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Recomendaciones Personalizadas 🎯</h3>
            <ul className="list-disc pl-5 space-y-2">
              {lastEntry.sleepHours < 7 && (
                <li>Intenta dormir al menos 7-8 horas para mejorar tu salud general</li>
              )}
              {lastEntry.waterIntake < 8 && (
                <li>Aumenta tu consumo de agua a 8 vasos diarios mínimo</li>
              )}
              {lastEntry.exerciseMinutes < 30 && (
                <li>Procura hacer al menos 30 minutos de ejercicio diario</li>
              )}
              {lastEntry.stressLevel > 6 && (
                <li>Considera practicar técnicas de relajación o meditación</li>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Plan Nutricional Personalizado 🍽️</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Distribución de Macronutrientes</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={nutritionalPlan.datosMacros}
                      dataKey="valor"
                      nameKey="nombre"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ nombre, valor }) => `${nombre}: ${valor}%`}
                    >
                      {nutritionalPlan.datosMacros.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Distribución Calórica Diaria</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={nutritionalPlan.distribucionCalorias}
                      dataKey="calorias"
                      nameKey="nombre"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ nombre, calorias }) => `${nombre}: ${calorias} cal`}
                    >
                      {nutritionalPlan.distribucionCalorias.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="p-4 bg-secondary rounded-lg">
              <h4 className="font-semibold mb-2">Calorías Recomendadas</h4>
              <p>{nutritionalPlan.calorias} calorías por día</p>
            </div>
            
            <div className="p-4 bg-secondary rounded-lg">
              <h4 className="font-semibold mb-2">Hidratación</h4>
              <p>{nutritionalPlan.aguaNecesaria}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Plan de Comidas Sugerido</h4>
              <ul className="space-y-2">
                {dietPlan.meals.map((meal, index) => (
                  <li key={index} className="p-2 bg-secondary rounded-lg">
                    {meal}
                    <span className="block text-sm text-muted-foreground">
                      {nutritionalPlan.distribucionCalorias[index].calorias} calorías
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Artículos y Recursos de Bienestar 📚</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-hidden -mx-6" ref={emblaRef}>
            <div className="flex gap-6 px-6">
              {healthArticles.map((article, index) => (
                <div 
                  key={index} 
                  className="flex-[0_0_320px] min-w-0"
                >
                  <div className="relative group overflow-hidden rounded-xl aspect-[4/5] bg-gradient-to-br from-primary/5 to-primary/10">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
                      style={{ 
                        backgroundImage: `url(${article.image})`,
                        backgroundSize: 'cover',
                        filter: 'brightness(0.9)',
                      }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
                    
                    <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                      <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium shadow-lg">
                        {article.tag}
                      </span>
                      
                      <div className="transform transition-transform duration-500 group-hover:translate-y-0">
                        <h3 className="text-xl font-bold mb-3 text-white/90">{article.title}</h3>
                        <p className="text-sm text-white/75 mb-4 line-clamp-2">{article.description}</p>
                        <Link 
                          href={article.url}
                          target="_blank"
                          className="inline-flex items-center gap-2 text-sm font-semibold bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-full backdrop-blur-sm"
                        >
                          Leer más
                          <svg 
                            className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M14 5l7 7m0 0l-7 7m7-7H3" 
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthAnalysis;

