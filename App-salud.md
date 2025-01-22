
# 📘 Sistema de Seguimiento de Salud - Manual Técnico y de Usuario

## 📋 Índice
1. [Introducción](#1-introducción)
2. [Arquitectura del Sistema](#2-arquitectura-del-sistema)
3. [Componentes Principales](#3-componentes-principales)
4. [Guía de Uso](#4-guía-de-uso)
5. [Tecnologías Implementadas](#5-tecnologías-implementadas)
6. [Funcionalidades Detalladas](#6-funcionalidades-detalladas)

## 1. Introducción

### ¿Qué es?
Una aplicación web moderna diseñada para el seguimiento y análisis integral de la salud, utilizando análisis estadístico avanzado (correlación de Kendall) para encontrar patrones entre diferentes métricas de salud.

### ¿Para qué sirve?
- 📊 Monitoreo diario de métricas de salud
- 📈 Análisis de correlaciones entre peso y sueño
- 💡 Generación de recomendaciones personalizadas
- 📉 Visualización de tendencias de salud
- 🥗 Planificación nutricional

## 2. Arquitectura del Sistema

### Estructura de Componentes

## 📋 Características Principales

- Registro diario de métricas de salud
- Análisis de correlación entre peso y sueño
- Recomendaciones personalizadas
- Visualización de datos mediante gráficos
- Plan nutricional personalizado
- Recursos y artículos de salud

## 🔍 Secciones de la Aplicación

### 1. Datos Iniciales
- Registro de peso inicial
- Establecimiento de metas de sueño
- Configuración de objetivos personales

### 2. Registro Diario
Seguimiento diario de:
- 📏 Peso corporal
- 😴 Horas de sueño
- 💧 Consumo de agua
- 🏃‍♂️ Minutos de ejercicio
- 😊 Nivel de estrés
- 🌟 Estado de ánimo

### 3. Análisis de Salud
- Gráficos de tendencias
- Correlación Kendall
- Recomendaciones personalizadas
- Plan nutricional

## 📈 Correlación de Kendall

La correlación de Kendall (τ) es una medida estadística que evalúa la relación entre dos variables. En esta aplicación, se utiliza para analizar la relación entre el peso y las horas de sueño.

### Interpretación de Resultados

| Rango de Correlación | Interpretación | Nivel |
|---------------------|----------------|-------|
| 70% - 100% | Correlación muy alta | 🌟 Excelente |
| 50% - 69% | Correlación alta | ✨ Muy Bueno |
| 30% - 49% | Correlación moderada | ⭐ Bueno |
| 10% - 29% | Correlación baja | ⚠️ Regular |
| 0% - 9% | Correlación muy baja | ❌ Bajo |

### Significado de la Correlación
- **Correlación Positiva**: Cuando aumentan las horas de sueño, el peso tiende a aumentar
- **Correlación Negativa**: Cuando aumentan las horas de sueño, el peso tiende a disminuir
- **Sin Correlación**: No hay una relación clara entre el sueño y el peso

## 🥗 Plan Nutricional

El sistema genera recomendaciones nutricionales basadas en:
- Peso actual
- Nivel de actividad física
- Consumo de agua
- Objetivos personales

### Tipos de Dietas
1. **Bajo Peso**
   - Enfoque en aumento saludable de peso
   - Mayor proporción de carbohidratos y proteínas

2. **Peso Saludable**
   - Dieta balanceada de mantenimiento
   - Distribución equilibrada de macronutrientes

3. **Sobrepeso**
   - Plan de reducción saludable
   - Énfasis en proteínas y vegetales

## 💻 Tecnologías Utilizadas

- Next.js
- TypeScript
- Tailwind CSS
- Recharts (visualización de datos)
- Embla Carousel

## 🚀 Cómo Empezar


 Instala las dependencias:
 Inicia el servidor de desarrollo:

## componentes principales

app/
├── components/
│ ├ DailyEntry.tsx = Entrada de datos diarios
│ ├ HealthAnalysis.tsx = Análisis y visualizaciones
│ └── InitialDataForm.tsx = Formulario inicial
├── utils/
│ └── kendall.ts # Cálculos estadísticos
└── page.tsx # Página principal

## 3. Componentes Principales

### 3.1 DailyEntry Entrada de datos diarios
- **Función**: Captura de datos diarios de salud
- **Campos**:
  - ⚖️ Peso corporal
  - 😴 Horas de sueño
  - 😰 Nivel de estrés (1-10)
  - 💧 Consumo de agua
  - 🏃‍♂️ Minutos de ejercicio
  - 😊 Estado de ánimo (1-10)

### 3.2 HealthAnalysis Análisis y visualizaciones
- **Función**: Análisis y visualización de datos
- **Características**:
  - 📊 Gráficos de tendencias
  - 🔢 Cálculo de correlaciones
  - 💡 Recomendaciones personalizadas
  - 🍽️ Plan nutricional
  - 📈 Comparativas con datos iniciales

### 3.3 InitialDataForm Formulario inicial
- **Función**: Configuración inicial del usuario
- **Datos Recolectados**:
  - Peso inicial
  - Meta de sueño
  - Objetivos de salud

## 4. Guía de Uso

### 4.1 Primeros Pasos
1. Completar formulario inicial
2. Establecer metas personales
3. Comenzar registro diario

### 4.2 Registro Diario
1. Ingresar peso del día
2. Registrar horas de sueño
3. Indicar nivel de estrés
4. Anotar consumo de agua
5. Registrar ejercicio realizado
6. Evaluar estado de ánimo

## 5. Tecnologías Implementadas

### Frontend
- **Next.js** 13: Framework React moderno
- **TypeScript**: Tipado estático para mejor mantenibilidad
- **Tailwind CSS**: Sistema de diseño utilitario
- **Recharts**: Biblioteca de visualización de datos
- **Embla Carousel**: Carrusel optimizado para React

### Análisis de Datos
- **Correlación Kendall**: Análisis estadístico robusto
- **Algoritmos de Recomendación**: Sistema personalizado basado en datos

## 6. Funcionalidades Detalladas

### 6.1 Análisis Estadístico
- 📊 Correlación entre variables
- 📈 Tendencias temporales
- 🔍 Patrones de comportamiento

### 6.2 Sistema de Recomendaciones
- 🎯 Basado en datos históricos
- 👤 Personalizado según objetivos
- 🔄 Actualización dinámica

### 6.3 Plan Nutricional
- 🍽️ Cálculo de calorías
- 🥗 Distribución de macronutrientes
- 💧 Recomendaciones de hidratación

### 6.4 Visualización de Datos
- 📈 Gráficos lineales
- 🥧 Gráficos circulares
- 📊 Indicadores de progreso
## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Example Color | ![#0a192f](https://via.placeholder.com/10/0a192f?text=+) #0a192f |
| Example Color | ![#f8f8f8](https://via.placeholder.com/10/f8f8f8?text=+) #f8f8f8 |
| Example Color | ![#00b48a](https://via.placeholder.com/10/00b48a?text=+) #00b48a |
| Example Color | ![#00d1a0](https://via.placeholder.com/10/00b48a?text=+) #00d1a0 |

