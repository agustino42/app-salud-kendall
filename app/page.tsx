'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from 'react';
import DailyEntry from './components/DailyEntry';
import HealthAnalysis from './components/HealthAnalysis';
import InitialDataForm, { InitialData } from './components/InitialDataForm';
import { kendallCorrelation } from './utils/kendall';

interface DailyData {
  date: string;
  weight: number;
  sleepHours: number;
  stressLevel: number;
  waterIntake: number;
  exerciseMinutes: number;
  moodRating: number;
}

export default function Home() {
  const [initialData, setInitialData] = useState<InitialData | null>(null);
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [correlation, setCorrelation] = useState<number | null>(null);

  useEffect(() => {
    if (initialData) {
      const last7Days = Array.from({length: 7}, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split('T')[0];
      }).reverse();

      setDailyData(last7Days.map(date => ({ 
        date, 
        weight: initialData.initialWeight, 
        sleepHours: initialData.sleepGoal,
        stressLevel: 5,
        waterIntake: 0,
        exerciseMinutes: 0,
        moodRating: 5
      })));
    }
  }, [initialData]);

  const handleDailyDataChange = (date: string, field: keyof DailyData, value: number) => {
    setDailyData(dailyData.map(entry => 
      entry.date === date ? { ...entry, [field]: value } : entry
    ));
  };

  const handleInitialDataSubmit = (data: InitialData) => {
    setInitialData(data);
  };

  const handleSaveData = () => {
    const weights = dailyData.map(entry => entry.weight);
    const sleepHours = dailyData.map(entry => entry.sleepHours);
    const correlationValue = kendallCorrelation(weights, sleepHours);
    setCorrelation(correlationValue);
    setShowAnalysis(true);
  };

  const handleBackToForm = () => {
    setShowAnalysis(false);
  };

  const handleNewUser = () => {
    setInitialData(null);
    setDailyData([]);
    setShowAnalysis(false);
    setCorrelation(null);
  };

  if (!initialData) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Seguimiento de Salud Avanzado</h1>
        <Card>
          <CardHeader>
            <CardTitle>Datos Iniciales</CardTitle>
            <CardDescription>Por favor, ingresa tus datos iniciales para comenzar el seguimiento</CardDescription>
          </CardHeader>
          <CardContent>
            <InitialDataForm onSubmit={handleInitialDataSubmit} />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showAnalysis) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Análisis de Salud</h1>
        <div className="space-x-4 mb-4">
          <Button onClick={handleBackToForm}>Volver al formulario</Button>
          <Button onClick={handleNewUser} variant="outline">Nuevo Usuario</Button>
        </div>
        <HealthAnalysis initialData={initialData} dailyData={dailyData} correlation={correlation} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Seguimiento de Salud Avanzado</h1>
      <div className="space-x-4 mb-4">
        <Button onClick={handleBackToForm}>Volver a datos iniciales</Button>
        <Button onClick={handleNewUser} variant="outline">Nuevo Usuario</Button>
      </div>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Ingresa tus datos diarios</CardTitle>
          <CardDescription>Registra tu información de salud para los últimos 7 días</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {dailyData.map(entry => (
            <DailyEntry
              key={entry.date}
              date={entry.date}
              weight={entry.weight}
              sleepHours={entry.sleepHours}
              stressLevel={entry.stressLevel}
              waterIntake={entry.waterIntake}
              exerciseMinutes={entry.exerciseMinutes}
              moodRating={entry.moodRating}
              onWeightChange={(date, value) => handleDailyDataChange(date, 'weight', value)}
              onSleepHoursChange={(date, value) => handleDailyDataChange(date, 'sleepHours', value)}
              onStressLevelChange={(date, value) => handleDailyDataChange(date, 'stressLevel', value)}
              onWaterIntakeChange={(date, value) => handleDailyDataChange(date, 'waterIntake', value)}
              onExerciseMinutesChange={(date, value) => handleDailyDataChange(date, 'exerciseMinutes', value)}
              onMoodRatingChange={(date, value) => handleDailyDataChange(date, 'moodRating', value)}
            />
          ))}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveData}>Guardar y Ver Análisis</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

