import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from 'react';

// Funciones auxiliares para mostrar emojis según los valores ingresados

// Determina el emoji para el nivel de estrés basado en una escala de 1-10
const getStressEmoji = (level: number) => {
  if (level <= 3) return "😌"; // Nivel bajo de estrés
  if (level <= 6) return "😐"; // Nivel moderado de estrés
  return "😫"; // Nivel alto de estrés
};

// Determina el emoji para el consumo de agua basado en la cantidad de vasos
const getWaterEmoji = (glasses: number) => {
  if (glasses <= 2) return "🚰"; // Consumo muy bajo
  if (glasses <= 4) return "💧"; // Consumo moderado
  if (glasses <= 6) return "🥤"; // Buen consumo
  return "🌊"; // Excelente consumo
};

// Determina el emoji según el peso del usuario
const getWeightEmoji = (weight: number) => {
  if (weight <= 40) return "🦴"; // Peso bajo
  if (weight <= 80) return "💪"; // Peso saludable
  return "🍔"; // Sobrepeso
};

// Determina el emoji según el estado de ánimo en una escala de 1-10
const getMoodEmoji = (level: number) => {
  if (level <= 3) return "😢"; // Estado de ánimo bajo
  if (level <= 6) return "😐"; // Estado de ánimo neutral
  return "😊"; // Buen estado de ánimo
};

// Determina el emoji según las horas de sueño
const getSleepEmoji = (hours: number) => {
  if (hours <= 4) return "😱"; // Muy poco sueño
  if (hours <= 6) return "😫"; // Sueño insuficiente
  if (hours <= 8) return "😴"; // Sueño normal
  return "💤"; // Mucho sueño
};

// Interfaz que define las propiedades que recibe el componente
interface DailyEntryProps {
  date: string;                  // Fecha del registro
  weight: number;                // Peso en kg
  sleepHours: number;           // Horas de sueño
  stressLevel: number;          // Nivel de estrés (1-10)
  waterIntake: number;          // Vasos de agua
  exerciseMinutes: number;      // Minutos de ejercicio
  moodRating: number;           // Estado de ánimo (1-10)
  // Funciones para manejar cambios en cada campo
  onWeightChange: (date: string, weight: number) => void;
  onSleepHoursChange: (date: string, hours: number) => void;
  onStressLevelChange: (date: string, level: number) => void;
  onWaterIntakeChange: (date: string, intake: number) => void;
  onExerciseMinutesChange: (date: string, minutes: number) => void;
  onMoodRatingChange: (date: string, rating: number) => void;
}

// Componente principal que muestra el formulario de entrada diaria
const DailyEntry: React.FC<DailyEntryProps> = ({ 
  date, 
  weight = 0, 
  sleepHours = 0, 
  stressLevel = 5,
  waterIntake = 0,
  exerciseMinutes = 0,
  moodRating = 5,
  onWeightChange, 
  onSleepHoursChange,
  onStressLevelChange,
  onWaterIntakeChange,
  onExerciseMinutesChange,
  onMoodRatingChange
}) => {
  return (
    <Card>
      <CardHeader>
        {/* Muestra la fecha en formato largo en español */}
        <CardTitle>{new Date(date).toLocaleDateString('es-ES', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Grid responsivo que se ajusta según el tamaño de pantalla */}

        {/* Campo de peso con emoji dinámico */}
        <div className="space-y-2">
          <Label htmlFor={`weight-${date}`}>Peso (kg) {getWeightEmoji(weight)}</Label>
          <Input
            id={`weight-${date}`}
            type="number"
            value={weight || ''}
            onChange={(e) => onWeightChange(date, parseFloat(e.target.value))}
            placeholder="Peso en kg"
          />
        </div>

        {/* Campos similares para sueño, agua, ejercicio, estrés y estado de ánimo */}
        {/* Cada campo incluye su propio emoji dinámico y maneja sus cambios */}
        <div className="space-y-2">
          <Label htmlFor={`sleep-${date}`}>Horas de sueño {getSleepEmoji(sleepHours)}</Label>
          <Input
            id={`sleep-${date}`}
            type="number"
            value={sleepHours || ''}
            onChange={(e) => onSleepHoursChange(date, parseFloat(e.target.value))}
            placeholder="Horas de sueño"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`water-${date}`}>Consumo de agua (vasos) {getWaterEmoji(waterIntake)}</Label>
          <Input
            id={`water-${date}`}
            type="number"
            value={waterIntake || ''}
            onChange={(e) => onWaterIntakeChange(date, parseFloat(e.target.value))}
            placeholder="Vasos de agua"
          />
        </div>
        <div>
          <Label htmlFor={`exercise-${date}`}>Minutos de ejercicio</Label>
          <Input
            id={`exercise-${date}`}
            type="number"
            value={exerciseMinutes || ''}
            onChange={(e) => onExerciseMinutesChange(date, parseFloat(e.target.value))}
            placeholder="Minutos de ejercicio"
          />
        </div>
        <div className="space-y-2">
          <Label>Nivel de Estrés {getStressEmoji(stressLevel)}</Label>
          <Input
            type="number"
            min="1"
            max="10"
            value={stressLevel}
            onChange={(e) => onStressLevelChange(date, Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label>Estado de Ánimo {getMoodEmoji(moodRating)}</Label>
          <Input
            type="number"
            min="1"
            max="10"
            value={moodRating}
            onChange={(e) => onMoodRatingChange(date, Number(e.target.value))}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyEntry;

