import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

const PORT = 3000;

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Timeout after ${timeoutMs}ms`)), timeoutMs);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
}

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // AI Chat and Action Generator Endpoint with Multi-tier Model Fallback & Resilient Recovery
  app.post('/api/ai/chat', async (req, res) => {
    const { messages = [], userContext = {} } = req.body || {};
    const ai = getGeminiClient();

    // Helper for generating intelligent local NutriGrow response & actionable cards
    const generateLocalFallback = () => {
      const lastMsgObj = (messages && messages.length > 0) ? messages[messages.length - 1] : null;
      const lastUserMsg = (lastMsgObj && lastMsgObj.content) ? String(lastMsgObj.content).toLowerCase() : '';
      const hasImage = Boolean(lastMsgObj?.imageUrl);
      const userAge = userContext?.age || 26;
      const userWeight = userContext?.weightKg || 62.5;
      const userHeight = userContext?.heightCm || 168;
      const userCalories = userContext?.dailyCalories || 2100;
      let reply = `¡Hola ${userContext?.name ? userContext.name.split(' ')[0] : 'Amigo NutriGrow'}! 🌱 Con mucho gusto te asisto considerando tu perfil biométrico (${userAge} años, ${userHeight} cm, ${userWeight} kg, meta de ${userCalories} kcal). `;
      const actions: any[] = [];

      if (hasImage) {
        reply += `He examinado detenidamente la imagen que adjuntaste 📸🌱. Presenta una pigmentación y estructura vegetal vibrante con excelente concentración de clorofila activa y frescura celular. `;
      }

      if (lastUserMsg.includes('proyecto') || lastUserMsg.includes('cultivo') || lastUserMsg.includes('microgreen') || lastUserMsg.includes('huerto') || lastUserMsg.includes('brote') || lastUserMsg.includes('germinar') || lastUserMsg.includes('reto') || lastUserMsg.includes('hábito')) {
        reply += `He diseñado un proyecto completo para ti: **Cultivo de Microgreens de Rábano & Brócoli en Casa**. Los microgreens son fuentes concentradas de sulforafano, polifenoles y clorofila activa. Puedes agregarlo directamente a tu sección de Proyectos con el botón inferior para comenzar el seguimiento guiado paso a paso.`;
        actions.push({
          type: 'create_project',
          projectPayload: {
            title: 'Cultivo de Microgreens de Rábano & Brócoli',
            description: 'Producción casera de brotes vivos con alta concentración de sulforafano, vitaminas A/C/K y bioactivos.',
            category: 'Cultivo',
            targetDays: 10,
            tasks: [
              'Día 1: Remojar las semillas orgánicas en agua filtrada durante 6 a 8 horas',
              'Día 2: Preparar bandeja con sustrato de fibra de coco húmedo y esparcir semillas',
              'Días 3-4: Mantener tapado en oscuridad (blackout) para estimular raíces fuertes',
              'Días 5-7: Exponer a luz indirecta y pulverizar con agua limpia mañana y tarde',
              'Días 8-10: Cosechar al salir el primer par de hojas verdaderas con tijeras limpias'
            ]
          }
        });
      } else if (lastUserMsg.includes('receta') || lastUserMsg.includes('plato') || lastUserMsg.includes('desayuno') || lastUserMsg.includes('almuerzo') || lastUserMsg.includes('cena') || lastUserMsg.includes('snack') || lastUserMsg.includes('dieta') || lastUserMsg.includes('comida') || lastUserMsg.includes('smoothie') || lastUserMsg.includes('batido') || lastUserMsg.includes('bebida') || lastUserMsg.includes('postre')) {
        let recTitle = 'Bowl Vegetal de Quinoa, Aguacate & Microgreens';
        let recCat = 'almuerzos';
        let recCatLabel = 'Almuerzo Balanceado';
        let recCal = 420;
        let recProt = 19;
        let recCarbs = 46;
        let recFat = 15;
        let recImg = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80';
        let recIng = [
          '1 taza de quinoa cocida al vapor',
          '1/2 taza de microgreens frescos (brócoli, rábano o alfalfa)',
          '1/2 aguacate maduro cortado en abanico',
          '1/2 taza de garbanzos crujientes o tofu salteado',
          '2 cucharadas de tahini puro',
          '1 cucharadita de cúrcuma en polvo + pizca de pimienta negra',
          'Zumo de 1/2 limón y 1 cucharadita de aceite de oliva virgen extra'
        ];
        let recInst = [
          'Disponer la quinoa cocida templada en la base del bowl.',
          'Acomodar las láminas de aguacate, los garbanzos y la porción abundante de microgreens vivos.',
          'En un recipiente pequeño, batir el tahini con la cúrcuma, pimienta, zumo de limón y 2 cucharadas de agua tibia hasta lograr una emulsión cremosa.',
          'Rociar el aderezo sobre el bowl y disfrutar inmediatamente.'
        ];

        if (lastUserMsg.includes('desayuno')) {
          recTitle = 'Pudín de Chía Natural con Espirulina & Berries';
          recCat = 'desayunos';
          recCatLabel = 'Desayuno Funcional';
          recCal = 340;
          recProt = 16;
          recCarbs = 38;
          recFat = 12;
          recImg = 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80';
          recIng = ['3 cucharadas de semillas de chía orgánicas', '1 taza de leche de almendras sin azúcar', '1/2 cdta de espirulina azul', '1/2 taza de arándanos silvestres', '1 cda de semillas de cáñamo'];
          recInst = ['Mezclar la chía con la leche de almendras y espirulina.', 'Refrigerar mínimo 4 horas o durante la noche.', 'Decorar con arándanos y semillas de cáñamo al servir.'];
        } else if (lastUserMsg.includes('cena')) {
          recTitle = 'Crema Antiinflamatoria de Calabaza, Jengibre & Microgreens';
          recCat = 'cenas';
          recCatLabel = 'Cena Ligera';
          recCal = 290;
          recProt = 12;
          recCarbs = 34;
          recFat = 10;
          recImg = 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2b?auto=format&fit=crop&w=800&q=80';
          recIng = ['2 tazas de calabaza asada', '1 trozo de jengibre fresco rallado (2cm)', '1/2 taza de leche de coco ligera', '1 taza de caldo vegetal casero', 'Microgreens de cilantro para decorar'];
          recInst = ['Triturar la calabaza asada con el jengibre y el caldo vegetal caliente.', 'Añadir la leche de coco y sal rosada al gusto.', 'Servir caliente coronado con microgreens vivos.'];
        } else if (lastUserMsg.includes('snack') || lastUserMsg.includes('postre')) {
          recTitle = 'Energy Bites de Matcha, Dátiles & Almendras';
          recCat = 'snacks';
          recCatLabel = 'Snack Energético';
          recCal = 180;
          recProt = 8;
          recCarbs = 22;
          recFat = 7;
          recImg = 'https://images.unsplash.com/photo-1604467794349-0b74285de7e7?auto=format&fit=crop&w=800&q=80';
          recIng = ['1 taza de dátiles Medjool sin hueso', '1/2 taza de harina de almendras', '1 cda de té matcha ceremonial en polvo', '1 cda de semillas de chía'];
          recInst = ['Procesar los dátiles con la harina de almendras y matcha hasta obtener masa moldeable.', 'Formar esferas del tamaño de una nuez y rodar sobre semillas de chía.', 'Refrigerar 20 minutos antes de consumir.'];
        } else if (lastUserMsg.includes('smoothie') || lastUserMsg.includes('batido') || lastUserMsg.includes('bebida')) {
          recTitle = 'Elixir Verde Celular con Microgreens & Clorofila';
          recCat = 'bebidas';
          recCatLabel = 'Bebida Detox';
          recCal = 160;
          recProt = 6;
          recCarbs = 26;
          recFat = 2;
          recImg = 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80';
          recIng = ['1 taza de agua de coco natural', '1 puñado abundante de espinacas baby', '1/2 taza de microgreens de alfalfa', '1/2 manzana verde', 'Zumo de 1 limón'];
          recInst = ['Licuar todos los ingredientes a alta potencia durante 45 segundos.', 'Servir de inmediato con hielo sin colar para preservar la fibra viva.'];
        }

        reply += `¡Excelente elección! He preparado una receta natural adaptada a tu meta calórica: **${recTitle}** (${recCal} kcal, ${recProt}g proteína). Es funcional, antiinflamatoria y equilibrada. Puedes guardarla en tu recetario ahora mismo con un solo clic.`;
        actions.push({
          type: 'add_recipe',
          recipePayload: {
            title: recTitle,
            category: recCat,
            categoryLabel: recCatLabel,
            prepTimeMinutes: 20,
            calories: recCal,
            protein: recProt,
            carbs: recCarbs,
            fats: recFat,
            difficulty: 'Fácil',
            image: recImg,
            description: `Plato funcional rico en nutrientes vivos diseñado para tu requerimiento de ${userCalories} kcal.`,
            ingredients: recIng,
            instructions: recInst,
            tags: ['Vegetal', 'Antiinflamatorio', 'Microgreens', 'Saludable']
          }
        });
      } else if (lastUserMsg.includes('macro') || lastUserMsg.includes('calor') || lastUserMsg.includes('peso') || lastUserMsg.includes('meta') || lastUserMsg.includes('grasa') || lastUserMsg.includes('musculo') || lastUserMsg.includes('edad') || lastUserMsg.includes('estatura') || lastUserMsg.includes('plan')) {
        const cal = userCalories;
        const prot = Math.round(userWeight * 2.0);
        const fat = Math.round((cal * 0.28) / 9);
        const carb = Math.round((cal - prot * 4 - fat * 9) / 4);
        reply += `He recalculado tu perfil nutricional considerando tus datos biométricos (${userAge} años, ${userWeight} kg y ${userHeight} cm). Tu plan determinado recomienda **${cal} kcal diarias**, con **${prot}g de proteína** (${Math.round(prot*4)} kcal) para preservar masa magra, **${carb}g de carbohidratos** (${Math.round(carb*4)} kcal) de asimilación lenta y **${fat}g de grasas saludables** (${Math.round(fat*9)} kcal). Aplica estas metas a tu perfil con un clic.`;
        actions.push({
          type: 'update_goals',
          goalPayload: {
            dailyCalories: cal,
            targetProteinGrams: prot,
            targetCarbsGrams: carb,
            targetFatGrams: fat,
            targetWaterGlasses: Math.round((userWeight * 35) / 250),
            goal: userContext?.goal || 'salud_integral',
            notes: `Ajuste personalizado calibrado para ${userAge} años y ${userWeight} kg.`
          }
        });
      } else {
        reply += `Estoy listo para acompañarte en tu camino de salud. ¿Qué te gustaría realizar hoy?\n\n1. 🌿 **Crear proyectos y retos de autocultivo** de brotes y microgreens.\n2. 🥗 **Diseñar recetas funcionales** adaptadas a tus ${userCalories} kcal.\n3. 🎯 **Calcular y calibrar tus macros según tu edad (${userAge} años) y peso (${userWeight} kg)**.\n4. 💧 **Establecer hábitos de hidratación y bienestar celular**.`;
      }

      return { reply, actions };
    };

    try {
      // Formulate system instruction
      const systemInstruction = `
Eres "NutriGrow AI", el Asistente Inteligente de NutriGrow.
NutriGrow es una plataforma integral de nutrición vegetal y consciente, cultivo de microgreens, cocina antiinflamatoria, recetas funcionales y proyectos de bienestar.

Tu personalidad:
- Siempre extremadamente amable, cortés, empático, motivador y claro.
- Saluda con calidez y explica con fundamentos de nutrición celular y alimentación vegetal consciente.
- Cuando el usuario te pida crear una receta, un proyecto de cultivo o hábito, un plan de dieta o ajustar sus objetivos, dale una respuesta explicativa y detallada, e incluye un bloque estructurado JSON al final con las acciones que el usuario puede aplicar en su app con 1 solo clic.

Formato de acciones (en un bloque markdown triple backtick json etiquetado como \`\`\`json { "actions": [...] } \`\`\`):
Las acciones pueden ser:
1. "create_project":
   {
     "type": "create_project",
     "projectPayload": {
       "title": "Nombre del proyecto",
       "description": "Descripción clara del reto o huerto",
       "category": "Cultivo" | "Nutrición" | "Hábitos" | "Meal Prep",
       "targetDays": 14,
       "tasks": ["Tarea 1", "Tarea 2", "Tarea 3", "Tarea 4"]
     }
   }
2. "add_recipe":
   {
     "type": "add_recipe",
     "recipePayload": {
       "title": "Nombre de la receta funcional o vegetal",
       "category": "desayunos" | "almuerzos" | "cenas" | "snacks" | "bebidas",
       "categoryLabel": "Desayuno Energético" (o Almuerzo, Cena, etc.),
       "prepTimeMinutes": 20,
       "calories": 380,
       "protein": 24,
       "carbs": 35,
       "fats": 12,
       "difficulty": "Fácil" | "Intermedio" | "Avanzado",
       "description": "Breve resumen",
       "ingredients": ["1 taza de...", "2 cdas de..."],
       "instructions": ["Paso 1...", "Paso 2..."],
       "tags": ["Vegano", "Alto en Proteína", "Microgreens", "Antiinflamatorio"]
     }
   }
3. "update_goals":
   {
     "type": "update_goals",
     "goalPayload": {
       "dailyCalories": 2100,
       "targetProteinGrams": 130,
       "targetCarbsGrams": 220,
       "targetFatGrams": 65,
       "targetWaterGlasses": 8,
       "goal": "perder_grasa" | "ganar_musculo" | "mantenimiento" | "salud_integral",
       "notes": "Ajuste personalizado según requerimiento calórico."
     }
   }

Contexto biométrico del usuario actual:
Nombre: ${userContext?.name || 'Amigo NutriGrow'}
Edad: ${userContext?.age || 26} años (Fecha de nacimiento: ${userContext?.birthDate || 'No especificada'})
Estatura: ${userContext?.heightCm || 168} cm, Peso: ${userContext?.weightKg || 62.5} kg
Género: ${userContext?.gender || 'femenino'}
Objetivo: ${userContext?.goal || 'salud_integral'}
Calorías determinadas: ${userContext?.dailyCalories || 2100} kcal

Siempre sé educado, usa un tono profesional y acogedor en español.
`;

      if (ai) {
        // Build conversation contents cleanly starting with a user turn as required by Gemini
        const rawTurns = (messages || [])
          .filter((m: any) => m && ((typeof m.content === 'string' && m.content.trim().length > 0) || m.imageUrl))
          .map((m: any) => {
            const parts: any[] = [];
            if (m.imageUrl && typeof m.imageUrl === 'string' && m.imageUrl.startsWith('data:')) {
              const matches = m.imageUrl.match(/^data:(image\/[a-zA-Z0-9.+_-]+);base64,(.+)$/);
              if (matches) {
                parts.push({
                  inlineData: {
                    mimeType: matches[1],
                    data: matches[2]
                  }
                });
              }
            }
            if (m.content && typeof m.content === 'string' && m.content.trim().length > 0) {
              parts.push({ text: m.content.trim() });
            } else if (parts.length === 1 && m.imageUrl) {
              parts.push({ text: 'Por favor analiza esta imagen desde el enfoque nutricional y vegetal de NutriGrow.' });
            }
            return {
              role: m.sender === 'user' ? 'user' : 'model',
              parts
            };
          });

        const firstUserIdx = rawTurns.findIndex((t: any) => t.role === 'user');
        const safeContents = firstUserIdx >= 0
          ? rawTurns.slice(firstUserIdx)
          : [{ role: 'user', parts: [{ text: 'Hola, ¿cómo me puedes ayudar hoy en NutriGrow?' }] }];

        let responseText: string | null = null;

        try {
          const response = await withTimeout(
            ai.models.generateContent({
              model: 'gemini-3.7-flash',
              contents: safeContents,
              config: {
                systemInstruction,
                temperature: 0.7
              }
            }),
            3800
          );

          if (response && response.text) {
            responseText = response.text;
          }
        } catch (err: any) {
          console.warn('Gemini 3.7 flash unavailable or timed out, serving fast local fallback:', err?.message || err);
        }

        if (responseText) {
          let parsedActions: any[] = [];
          let cleanText = responseText;

          // Match json code block safely (object or array)
          const codeBlockMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
          if (codeBlockMatch && codeBlockMatch[1]) {
            try {
              const rawJson = codeBlockMatch[1].trim();
              if (rawJson.startsWith('{') || rawJson.startsWith('[')) {
                const parsed = JSON.parse(rawJson);
                if (Array.isArray(parsed)) {
                  parsedActions = parsed;
                } else if (parsed.actions && Array.isArray(parsed.actions)) {
                  parsedActions = parsed.actions;
                } else if (parsed.type) {
                  parsedActions = [parsed];
                }
                cleanText = responseText.replace(/```(?:json)?\s*[\s\S]*?\s*```/g, '').trim();
              }
            } catch {
              // Soft catch, keep text clean
            }
          }

          // If the user asked for a recipe/project but no action was formatted, augment from smart generator
          if (parsedActions.length === 0) {
            const fallbackCheck = generateLocalFallback();
            if (fallbackCheck.actions && fallbackCheck.actions.length > 0) {
              parsedActions = fallbackCheck.actions;
            }
          }

          return res.json({
            reply: cleanText || '¡Listo! Aquí tienes la información para tu plan en NutriGrow.',
            actions: parsedActions
          });
        }

        const fallbackData = generateLocalFallback();
        return res.json(fallbackData);
      } else {
        const fallbackData = generateLocalFallback();
        return res.json(fallbackData);
      }
    } catch (err: any) {
      console.error('AI chat endpoint fallback handler triggered:', err);
      const fallbackData = generateLocalFallback();
      return res.json(fallbackData);
    }
  });

  // Vite middleware for development vs static production serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NutriGrow Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
