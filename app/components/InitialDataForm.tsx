import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState } from 'react';

export interface InitialData {
  age: number;
  height: number;
  initialWeight: number;
  gender: 'male' | 'female' | 'other';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  sleepGoal: number;
  weightGoal: 'lose' | 'maintain' | 'gain';
  dietType: 'omnivore' | 'vegetarian' | 'vegan' | 'keto' | 'paleo';
  healthConditions: string[];
}

interface InitialDataFormProps {
  onSubmit: (data: InitialData) => void;
}

const InitialDataForm: React.FC<InitialDataFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<InitialData>({
    age: 0,
    height: 0,
    initialWeight: 0,
    gender: 'male',
    activityLevel: 'moderate',
    sleepGoal: 8,
    weightGoal: 'maintain',
    dietType: 'omnivore',
    healthConditions: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="age">Edad</Label>
          <Input id="age" name="age" type="number" required onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="height">Altura (cm)</Label>
          <Input id="height" name="height" type="number" required onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="initialWeight">Peso inicial (kg)</Label>
          <Input id="initialWeight" name="initialWeight" type="number" required onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="sleepGoal">Meta de horas de sueño</Label>
          <Input id="sleepGoal" name="sleepGoal" type="number" required onChange={handleChange} defaultValue={8} />
        </div>
      </div>
      
      <div>
        <Label>Género</Label>
        <RadioGroup defaultValue="male" onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value as 'male' | 'female' | 'other' }))}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male">Masculino</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female">Femenino</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other">Otro</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div>
        <Label htmlFor="activityLevel">Nivel de actividad</Label>
        <Select onValueChange={(value) => setFormData(prev => ({ ...prev, activityLevel: value as InitialData['activityLevel'] }))}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona tu nivel de actividad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sedentary">Sedentario</SelectItem>
            <SelectItem value="light">Ligeramente activo</SelectItem>
            <SelectItem value="moderate">Moderadamente activo</SelectItem>
            <SelectItem value="active">Activo</SelectItem>
            <SelectItem value="very-active">Muy activo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="weightGoal">Meta de peso</Label>
        <Select onValueChange={(value) => setFormData(prev => ({ ...prev, weightGoal: value as InitialData['weightGoal'] }))}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona tu meta de peso" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lose">Perder peso</SelectItem>
            <SelectItem value="maintain">Mantener peso</SelectItem>
            <SelectItem value="gain">Ganar peso</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="dietType">Tipo de dieta</Label>
        <Select onValueChange={(value) => setFormData(prev => ({ ...prev, dietType: value as InitialData['dietType'] }))}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona tu tipo de dieta" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="omnivore">Omnívoro</SelectItem>
            <SelectItem value="vegetarian">Vegetariano</SelectItem>
            <SelectItem value="vegan">Vegano</SelectItem>
            <SelectItem value="keto">Keto</SelectItem>
            <SelectItem value="paleo">Paleo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="healthConditions">Condiciones de salud (separadas por coma)</Label>
        <Input 
          id="healthConditions" 
          name="healthConditions" 
          onChange={(e) => setFormData(prev => ({ ...prev, healthConditions: e.target.value.split(',').map(item => item.trim()) }))}
        />
      </div>
      
      <Button type="submit">Guardar datos iniciales</Button>
    </form>
  );
};

export default InitialDataForm;

