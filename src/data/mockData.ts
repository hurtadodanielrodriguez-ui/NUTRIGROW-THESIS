import { Recipe, Project, Testimonial, UserProfile } from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'usr_001',
  name: 'Usuario NutriGrow',
  email: 'usuario@nutrigrow.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
  bio: 'Apasionado de la nutrición consciente, los superalimentos y la jardinería de microgreens en casa.',
  goal: 'salud_integral',
  activityLevel: 'activo',
  heightCm: 172,
  weightKg: 66.0,
  targetWeightKg: 63.0,
  dailyCalories: 2150,
  consumedCalories: 1450,
  proteinGrams: 98,
  targetProteinGrams: 125,
  carbsGrams: 140,
  targetCarbsGrams: 195,
  fatGrams: 45,
  targetFatGrams: 62,
  waterGlasses: 6,
  targetWaterGlasses: 8,
  streakDays: 14,
  joinedDate: 'Julio 2026',
  notificationsEnabled: true,
  theme: 'light',
  language: 'es',
  dietaryPreferences: ['Comida Real', 'Superalimentos', 'Bajo en Sodio'],
  allergies: ['Sin mariscos'],
  microgreensHarvestedCount: 18,
  chlorophyllGramsEstimated: 450
};

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'rec_1',
    title: 'Bowl Verde de Avena & Chía con Espirulina',
    category: 'desayunos',
    categoryLabel: 'Desayunos Energéticos',
    prepTimeMinutes: 15,
    calories: 380,
    protein: 18,
    carbs: 52,
    fats: 11,
    difficulty: 'Fácil',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&auto=format&fit=crop&q=80',
    description: 'Comienza tu mañana con una explosión de antioxidantes, clorofila y energía sostenida.',
    ingredients: [
      '1/2 taza de avena en hojuelas sin gluten',
      '1 taza de bebida vegetal de almendras sin azúcar',
      '1 cucharadita de espirulina en polvo orgánica',
      '1 cucharada de semillas de chía hidratadas',
      '1/2 plátano congelado',
      'Toppings: rodajas de kiwi, semillas de cáñamo y coco tostado'
    ],
    instructions: [
      'Licúa la bebida vegetal con el plátano y la espirulina hasta obtener un tono verde esmeralda uniforme.',
      'En un tazón, mezcla la avena y las semillas de chía.',
      'Vierte el licuado sobre la mezcla seca y revuelve suavemente. Deja reposar 5 minutos.',
      'Decora con los toppings frescos y disfruta de inmediato.'
    ],
    tags: ['Vegano', 'Alto en Fibra', 'Superalimentos'],
    rating: 4.9,
    reviewsCount: 84,
    isFavorite: true
  },
  {
    id: 'rec_2',
    title: 'Tostada de Centeno con Aguacate & Brotes Vivos',
    category: 'desayunos',
    categoryLabel: 'Desayunos Energéticos',
    prepTimeMinutes: 10,
    calories: 320,
    protein: 12,
    carbs: 34,
    fats: 16,
    difficulty: 'Fácil',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=80',
    description: 'Grasas saludables y microgreens frescos cosechados de tu propio proyecto NutriGrow.',
    ingredients: [
      '2 rebanadas de pan de centeno artesanal 100% masa madre',
      '1 aguacate Hass maduro',
      '1 puñado de microgreens de rábano y brócoli recién cosechados',
      '1 cucharadita de aceite de oliva virgen extra',
      'Pizca de sal marina en escamas y hojuelas de chile seco',
      'Zumo de 1/2 lima'
    ],
    instructions: [
      'Tuesta las rebanadas de pan de centeno hasta que estén crujientes y doradas.',
      'En un plato, machaca el aguacate con un tenedor junto al zumo de lima y sal marina.',
      'Unta generosamente la pasta de aguacate sobre las tostadas.',
      'Corona con abundante capa de microgreens frescos, un hilo de aceite de oliva y chile.'
    ],
    tags: ['Microgreens', 'Grasas Buenas', 'Rápido'],
    rating: 4.8,
    reviewsCount: 112,
    isFavorite: false
  },
  {
    id: 'rec_3',
    title: 'Bowl Mediterráneo de Quinoa Real & Salmón Crujiente',
    category: 'almuerzos',
    categoryLabel: 'Almuerzos Balanceados',
    prepTimeMinutes: 25,
    calories: 520,
    protein: 38,
    carbs: 46,
    fats: 19,
    difficulty: 'Intermedio',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    description: 'Equilibrio maestro de aminoácidos esenciales, ácidos grasos Omega-3 y micronutrientes.',
    ingredients: [
      '150g de filete de salmón salvaje con piel',
      '1 taza de quinoa real cocida en caldo de verduras',
      '1 taza de hojas de espinaca baby fresca',
      '1/2 taza de tomates cherry cortados por la mitad',
      '1/4 taza de pepino persa en cubitos',
      'Aderezo: 1 cda de tahini, zumo de limón, ajo rallado y agua tibia'
    ],
    instructions: [
      'Sella el salmón a la plancha a fuego medio-alto durante 4 min por el lado de la piel hasta que quede crocante.',
      'Cocina 2 minutos más por el lado opuesto y reserva.',
      'Dispone la base de quinoa y espinacas en un plato hondo grande.',
      'Distribuye los tomates, pepino y el filete de salmón.',
      'Baña con el aderezo cremoso de tahini y limón.'
    ],
    tags: ['Omega-3', 'Alto en Proteína', 'Antiinflamatorio'],
    rating: 5.0,
    reviewsCount: 145,
    isFavorite: true
  },
  {
    id: 'rec_4',
    title: 'Bowl Macrobiótico de Lentejas Beluga & Calabaza Asada',
    category: 'almuerzos',
    categoryLabel: 'Almuerzos Balanceados',
    prepTimeMinutes: 30,
    calories: 460,
    protein: 24,
    carbs: 68,
    fats: 9,
    difficulty: 'Fácil',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80',
    description: 'Riqueza vegetal terrosa con carbohidratos complejos de absorción lenta.',
    ingredients: [
      '1 taza de lentejas beluga (caviar negro vegetal) cocidas al dente',
      '1 taza de calabaza moscada en cubos asada con romero y tomillo',
      '1/2 taza de col rizada kale masajeada con limón',
      '2 cucharadas de semillas de calabaza tostadas',
      'Vinagreta de mostaza Dijon antigua y vinagre de manzana bio'
    ],
    instructions: [
      'Asa la calabaza en el horno a 200°C con un hilo de AOVE y hierbas aromáticas durante 20 min.',
      'Masajea la col kale con unas gotas de limón para suavizar su textura fibrosa.',
      'Ensambla la cama de lentejas, la calabaza caramelizada y el kale.',
      'Rocía con la vinagreta de Dijon y espolvorea las semillas de calabaza crujientes.'
    ],
    tags: ['Plant-Based', 'Hierro & Fibra', 'Sin Gluten'],
    rating: 4.7,
    reviewsCount: 67,
    isFavorite: false
  },
  {
    id: 'rec_5',
    title: 'Crema Sedosa de Calabacín, Puerro & Espinacas',
    category: 'cenas',
    categoryLabel: 'Cenas Ligeras',
    prepTimeMinutes: 20,
    calories: 220,
    protein: 8,
    carbs: 22,
    fats: 10,
    difficulty: 'Fácil',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80',
    description: 'Ligera, depurativa y perfecta para inducir un descanso reparador y digestión óptima.',
    ingredients: [
      '2 calabacines medianos con su piel verde',
      '1 puerro tierno picado finamente',
      '2 tazas de espinacas tiernas',
      '500ml de caldo vegetal suave',
      '2 cucharadas de levadura nutricional (sabor a queso suave)',
      '1 cucharada de aceite de oliva virgen extra'
    ],
    instructions: [
      'Rehoga el puerro en una olla mediana con el aceite de oliva a fuego bajo durante 5 min.',
      'Añade el calabacín troceado y el caldo vegetal. Cocina a fuego medio por 12 minutos.',
      'Retira del fuego, incorpora las espinacas frescas y la levadura nutricional.',
      'Tritura a máxima potencia con una batidora de inmersión hasta lograr una emulsión ultra suave y brillante.'
    ],
    tags: ['Digestión Ligera', 'Bajo en Calorías', 'Keto Friendly'],
    rating: 4.9,
    reviewsCount: 96,
    isFavorite: true
  },
  {
    id: 'rec_6',
    title: 'Pechuga de Pavo a las Finas Hierbas con Espárragos',
    category: 'cenas',
    categoryLabel: 'Cenas Ligeras',
    prepTimeMinutes: 18,
    calories: 290,
    protein: 34,
    carbs: 8,
    fats: 12,
    difficulty: 'Fácil',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&auto=format&fit=crop&q=80',
    description: 'Proteína magra de alto valor biológico con espárragos trigueros diuréticos.',
    ingredients: [
      '180g de solomillo o pechuga de pavo orgánico',
      '1 manojo de espárragos trigueros frescos',
      '1 diente de ajo laminado',
      'Hierbas provenzales secas (orégano, tomillo, romero)',
      '1 cucharada de aceite de oliva'
    ],
    instructions: [
      'Condimenta el pavo con sal, pimienta negra y las hierbas provenzales.',
      'En una sartén antiadherente caliente, dora los espárragos con el ajo laminado por 6 minutos.',
      'Cocina el pavo a fuego medio durante 4 minutos por lado hasta que esté jugoso.',
      'Sirve caliente con unas gotas de limón sobre los espárragos.'
    ],
    tags: ['Alto en Proteína', 'Bajo en Carbohidratos', 'Rápido'],
    rating: 4.8,
    reviewsCount: 78,
    isFavorite: false
  },
  {
    id: 'rec_7',
    title: 'Energy Balls de Matcha, Dátiles Medjool & Almendra',
    category: 'snacks',
    categoryLabel: 'Snacks Saludables',
    prepTimeMinutes: 15,
    calories: 140,
    protein: 5,
    carbs: 18,
    fats: 6,
    difficulty: 'Fácil',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=800&auto=format&fit=crop&q=80',
    description: 'Bocados de energía pura sin azúcares refinados con el poder antioxidante del té verde matcha.',
    ingredients: [
      '1 taza de dátiles Medjool deshuesados',
      '1 taza de harina de almendras o almendras crudas trituradas',
      '2 cucharaditas de té matcha ceremonial en polvo',
      '1 cucharada de aceite de coco virgen derretido',
      'Pizca de vainilla en polvo y coco rallado para rebozar'
    ],
    instructions: [
      'Coloca los dátiles, la harina de almendras, el matcha y el aceite de coco en un procesador de alimentos.',
      'Tritura hasta formar una masa compacta y maleable.',
      'Forma bolitas con las palmas de las manos del tamaño de una nuez.',
      'Pásalas por coco rallado o matcha extra y refrigera por 30 minutos.'
    ],
    tags: ['Sin Azúcar Añadido', 'Snack Energético', 'Meal Prep'],
    rating: 5.0,
    reviewsCount: 130,
    isFavorite: true
  },
  {
    id: 'rec_8',
    title: 'Batido Verde Alcalino "NutriGlow Elixir"',
    category: 'bebidas',
    categoryLabel: 'Bebidas & Batidos Detox',
    prepTimeMinutes: 5,
    calories: 110,
    protein: 3,
    carbs: 21,
    fats: 1,
    difficulty: 'Fácil',
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800&auto=format&fit=crop&q=80',
    description: 'Hidratación celular profunda con clorofila pura, manzana verde y jengibre fresco.',
    ingredients: [
      '1 pepino mediano sin piel',
      '1 manzana verde ácida Granny Smith',
      '1 puñado generoso de espinacas frescas',
      '1 tallo de apio fresco',
      '1 trocito de 2cm de raíz de jengibre fresco',
      'Zumo de 1 lima y 300ml de agua de coco o agua pura fría'
    ],
    instructions: [
      'Lava todos los vegetales y córtalos en trozos medianos.',
      'Introduce los ingredientes en el vaso de la licuadora junto con el agua de coco y el zumo de lima.',
      'Bate a máxima velocidad durante 60 segundos hasta conseguir una textura sedosa.',
      'Sirve inmediatamente con cubitos de hielo para preservar todas sus enzimas activas.'
    ],
    tags: ['Detox', 'Hidratación', 'Inmunidad'],
    rating: 4.9,
    reviewsCount: 210,
    isFavorite: true
  },
  {
    id: 'rec_9',
    title: 'Pancakes Proteicos de Avena & Plátano con Frutos del Bosque',
    category: 'desayunos',
    categoryLabel: 'Desayunos Energéticos',
    prepTimeMinutes: 15,
    calories: 360,
    protein: 22,
    carbs: 48,
    fats: 8,
    difficulty: 'Fácil',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&auto=format&fit=crop&q=80',
    description: 'Tortitas esponjosas sin harinas refinadas ni azúcares añadidos, colmadas de antioxidantes.',
    ingredients: [
      '1 taza de avena en hojuelas molida',
      '1 plátano maduro machacado',
      '2 huevos camperos ecológicos',
      '1/2 taza de bebida vegetal de avena',
      '1 cucharadita de canela de Ceilán en polvo',
      '1 taza de arándanos y frambuesas frescas para servir'
    ],
    instructions: [
      'Bate en un bol los huevos, el plátano machacado, la avena molida y la canela hasta homogeneizar.',
      'Calienta una sartén antiadherente con unas gotas de aceite de coco a fuego medio.',
      'Vierte 3 cucharadas de masa por pancake y cocina 2 minutos por lado hasta dorar.',
      'Sirve apilados acompañados de frutos rojos frescos y un toque de canela extra.'
    ],
    tags: ['Alto en Proteína', 'Sin Azúcar Refinado', 'Desayuno Fitness'],
    rating: 4.9,
    reviewsCount: 94,
    isFavorite: true
  },
  {
    id: 'rec_10',
    title: 'Omelette Vegetal con Espinacas Baby, Champiñones & Feta',
    category: 'desayunos',
    categoryLabel: 'Desayunos Energéticos',
    prepTimeMinutes: 12,
    calories: 290,
    protein: 21,
    carbs: 6,
    fats: 19,
    difficulty: 'Fácil',
    image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800&auto=format&fit=crop&q=80',
    description: 'Desayuno bajo en carbohidratos, saciante y rico en colina, luteína y minerales bioactivos.',
    ingredients: [
      '3 huevos camperos',
      '1 taza de espinacas tiernas frescas',
      '1/2 taza de champiñones laminados dorados',
      '30g de queso feta desmoronado',
      '1 cucharadita de aceite de oliva virgen extra',
      'Pizca de sal marina, pimienta y microgreens de albahaca'
    ],
    instructions: [
      'Saltea los champiñones y las espinacas en la sartén con el aceite de oliva hasta que reduzcan.',
      'Bate los huevos con sal y pimienta y viértelos sobre los vegetales.',
      'Cocina a fuego suave durante 3 minutos, esparce el queso feta en el centro y dobla por la mitad.',
      'Corona con microgreens de albahaca fresca y sirve caliente.'
    ],
    tags: ['Keto', 'Bajo en Carbohidratos', 'Rápido'],
    rating: 4.8,
    reviewsCount: 76,
    isFavorite: false
  },
  {
    id: 'rec_11',
    title: 'Parfait Probiótico de Yogur Griego, Granola de Quinoa & Mango',
    category: 'desayunos',
    categoryLabel: 'Desayunos Energéticos',
    prepTimeMinutes: 8,
    calories: 310,
    protein: 19,
    carbs: 40,
    fats: 9,
    difficulty: 'Fácil',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80',
    description: 'Cuidado de la microbiota intestinal con probióticos vivos y fibra prebiótica crujiente.',
    ingredients: [
      '1 taza de yogur griego natural sin azúcar añadido',
      '1/2 taza de mango maduro cortado en dados pequeños',
      '3 cucharadas de granola horneada con quinoa y semillas de calabaza',
      '1 cucharadita de semillas de chía',
      'Hojas de menta fresca para perfumar'
    ],
    instructions: [
      'En un vaso o copa de cristal, añade una primera capa de yogur griego cremoso.',
      'Agrega una capa generosa de dados de mango fresco.',
      'Espolvorea la granola de quinoa crocante y las semillas de chía.',
      'Repite las capas y finaliza decorando con unas hojas de menta recién cortadas.'
    ],
    tags: ['Probiótico', 'Salud Intestinal', 'Vegetariano'],
    rating: 4.9,
    reviewsCount: 105,
    isFavorite: false
  },
  {
    id: 'rec_12',
    title: 'Ensalada Thai de Pollo al Limoncillo con Microgreens de Cilantro',
    category: 'almuerzos',
    categoryLabel: 'Almuerzos Balanceados',
    prepTimeMinutes: 20,
    calories: 430,
    protein: 36,
    carbs: 28,
    fats: 16,
    difficulty: 'Fácil',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    description: 'Frescura cítrica y explosión aromática con brotes tiernos, lima kaffir y aderezo de sésamo.',
    ingredients: [
      '160g de pechuga de pollo a la plancha fileteada',
      '2 tazas de mix de hojas verdes y col morada rallada',
      '1/2 mango verde cortado en juliana',
      '1 puñado de microgreens de cilantro fresco',
      '2 cucharadas de cacahuates tostados triturados',
      'Aderezo: zumo de 1 lima, 1 cdta de aceite de sésamo, jengibre rallado y salsa tamari'
    ],
    instructions: [
      'Mezcla en un tazón amplio la col morada, las hojas verdes y las tiras de mango.',
      'Emulsiona el aliño thai batiendo el zumo de lima, aceite de sésamo, tamari y jengibre.',
      'Añade el pollo templado cortado en tiras finas y baña con el aderezo.',
      'Corona con abundante lluvia de microgreens de cilantro y los cacahuates crocantes.'
    ],
    tags: ['Antiinflamatorio', 'Alto en Proteína', 'Exótico'],
    rating: 5.0,
    reviewsCount: 162,
    isFavorite: true
  },
  {
    id: 'rec_13',
    title: 'Poké Bowl de Atún Fresco con Arroz Integral, Edamames & Wakame',
    category: 'almuerzos',
    categoryLabel: 'Almuerzos Balanceados',
    prepTimeMinutes: 20,
    calories: 490,
    protein: 39,
    carbs: 54,
    fats: 14,
    difficulty: 'Intermedio',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    description: 'Omega-3 de máxima biodisponibilidad marina junto con algas remineralizantes y edamames.',
    ingredients: [
      '140g de lomo de atún rojo calidad sashimi cortado en dados',
      '1 taza de arroz integral cocido con vinagre de arroz',
      '1/2 taza de edamames cocidos al vapor y desvainados',
      '1/4 taza de ensalada de alga wakame hidratada',
      '1/2 aguacate maduro laminado',
      'Semillas de sésamo negro tostado y cebollino picado'
    ],
    instructions: [
      'Marina los dados de atún 10 minutos con una cucharadita de tamari y aceite de sésamo.',
      'Sirve el arroz integral templado en la base de un bol hondo.',
      'Organiza en secciones armónicas el atún marinado, los edamames, el aguacate y el alga wakame.',
      'Espolvorea las semillas de sésamo negro y el cebollino antes de disfrutar.'
    ],
    tags: ['Omega-3', 'Pescado Azul', 'Rico en Yodo'],
    rating: 4.9,
    reviewsCount: 188,
    isFavorite: true
  },
  {
    id: 'rec_14',
    title: 'Wrap Integral de Falafel Horneado con Hummus & Verduras',
    category: 'almuerzos',
    categoryLabel: 'Almuerzos Balanceados',
    prepTimeMinutes: 25,
    calories: 420,
    protein: 16,
    carbs: 58,
    fats: 13,
    difficulty: 'Fácil',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&auto=format&fit=crop&q=80',
    description: 'Proteína vegetal de legumbres horneadas, sin frituras, envuelta en tortilla de espelta.',
    ingredients: [
      '1 tortilla grande de trigo integral o espelta artesanal',
      '4 falafels caseros horneados de garbanzo, perejil y comino',
      '2 cucharadas de hummus tradicional de garbanzo y tahini',
      '1/2 taza de rúcula salvaje y pepino en rodajas finas',
      'Tomates cherry confitados y salsa de yogur o tahini suave'
    ],
    instructions: [
      'Calienta ligeramente la tortilla en la sartén para volverla flexible.',
      'Unta la superficie central con el hummus cremoso.',
      'Coloca los falafels dorados tibios y aplástalos suavemente con un tenedor.',
      'Añade la rúcula, pepino y tomates, rocía con salsa de tahini y enrolla apretando los extremos.'
    ],
    tags: ['Vegano', 'Horneado', 'Meal Prep'],
    rating: 4.8,
    reviewsCount: 82,
    isFavorite: false
  },
  {
    id: 'rec_15',
    title: 'Filete de Lubina al Horno sobre Cama de Puerros y Tomatitos',
    category: 'cenas',
    categoryLabel: 'Cenas Ligeras',
    prepTimeMinutes: 22,
    calories: 280,
    protein: 32,
    carbs: 10,
    fats: 11,
    difficulty: 'Fácil',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80',
    description: 'Pescado blanco magro cocinado en papillote aromático con vegetales dulces caramelizados.',
    ingredients: [
      '1 filete limpio de lubina salvaje (aprox. 180g)',
      '1 puerro cortado en tiras juliana muy finas',
      '1 taza de tomates cherry cortados por la mitad',
      '1 ramita de eneldo fresco y rodajas de limón',
      '1 cucharada de aceite de oliva virgen extra y vino blanco seco'
    ],
    instructions: [
      'Precalienta el horno a 190°C y prepara una bandeja con papel vegetal.',
      'Crea una cama con el puerro y los tomates cherry salpimentados con un chorrito de aceite.',
      'Coloca la lubina encima con la piel hacia abajo, corona con el eneldo y rodajas de limón.',
      'Hornea durante 15 minutos hasta que el pescado esté tierno, jugoso y translúcido.'
    ],
    tags: ['Digestión Óptima', 'Bajo en Grasa', 'Cena Ligera'],
    rating: 5.0,
    reviewsCount: 114,
    isFavorite: true
  },
  {
    id: 'rec_16',
    title: 'Salteado Wok de Tofu Crujiente con Brócoli, Sésamo & Jengibre',
    category: 'cenas',
    categoryLabel: 'Cenas Ligeras',
    prepTimeMinutes: 18,
    calories: 310,
    protein: 21,
    carbs: 18,
    fats: 14,
    difficulty: 'Fácil',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    description: 'Fitoquímicos protectores del brócoli potenciados con proteína vegetal dorada y jengibre.',
    ingredients: [
      '180g de tofu firme prensado y cortado en dados',
      '2 tazas de floretes de brócoli fresco',
      '1 diente de ajo laminado y 1 cdta de jengibre fresco rallado',
      '1 cucharada de aceite de sésamo virgen',
      '2 cucharadas de salsa tamari y 1 cdta de semillas de sésamo tostadas'
    ],
    instructions: [
      'En un wok o sartén bien caliente, dora los dados de tofu con el aceite de sésamo por 6 minutos.',
      'Retira el tofu y saltea el brócoli junto con el ajo y jengibre por 4 minutos a fuego vivo.',
      'Reincorpora el tofu, agrega la salsa tamari y remueve vigorosamente para glasear todo el salteado.',
      'Sirve inmediatamente salpicado con semillas de sésamo crujientes.'
    ],
    tags: ['Vegano', 'Sulforafano', 'Anti-inflamatorio'],
    rating: 4.8,
    reviewsCount: 91,
    isFavorite: false
  },
  {
    id: 'rec_17',
    title: 'Hamburguesa Vegetal de Lentejas & Setas con Brotes Vivos',
    category: 'cenas',
    categoryLabel: 'Cenas Ligeras',
    prepTimeMinutes: 25,
    calories: 340,
    protein: 19,
    carbs: 42,
    fats: 9,
    difficulty: 'Intermedio',
    image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=800&auto=format&fit=crop&q=80',
    description: 'Sabor umami profundo de setas silvestres con la riqueza terrosa de las lentejas pardinas.',
    ingredients: [
      '1 taza de lentejas pardinas cocidas escurridas',
      '1 taza de champiñones Portobello picados finos y salteados',
      '2 cucharadas de copos de avena triturados para ligar',
      '1 cucharadita de cebolla en polvo, orégano y levadura nutricional',
      'Acompañamiento: hojas de lechuga roble, tomate fresco y microgreens de rábano'
    ],
    instructions: [
      'Tritura ligeramente las lentejas y las setas en un procesador manteniendo cierta textura.',
      'Mezcla con la avena molida y las especias, y da forma a 2 medallones compactos.',
      'Cocina a la plancha a fuego medio durante 4 minutos por lado hasta que la costra esté dorada.',
      'Emplata al plato sobre hojas verdes frescas y corona con abundante dosis de microgreens vivos.'
    ],
    tags: ['Plant-Based', 'Rico en Fibra', 'Proteína Vegetal'],
    rating: 4.9,
    reviewsCount: 135,
    isFavorite: false
  },
  {
    id: 'rec_18',
    title: 'Hummus de Remolacha Asada con Bastones de Pepino y Zanahoria',
    category: 'snacks',
    categoryLabel: 'Snacks Saludables',
    prepTimeMinutes: 10,
    calories: 180,
    protein: 7,
    carbs: 23,
    fats: 7,
    difficulty: 'Fácil',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    description: 'Vibrante color fucsia repleto de óxido nítrico para favorecer la circulación y rendimiento.',
    ingredients: [
      '1 taza de garbanzos cocidos pelados',
      '1 remolacha mediana asada o cocida',
      '1 cucharada de tahini tostado',
      'Zumo de 1/2 limón y 1 diente de ajo pequeño',
      'Bastones frescos de pepino, zanahoria y apio verde'
    ],
    instructions: [
      'Coloca los garbanzos, la remolacha troceada, el tahini, limón y sal en el vaso batidor.',
      'Tritura a potencia alta añadiendo 2 cucharadas de agua helada hasta lograr una crema sedosa.',
      'Sirve en un bol decorado con un hilo de AOVE y semillas de cáñamo.',
      'Acompaña con los bastones crujientes de vegetales frescos.'
    ],
    tags: ['Óxido Nítrico', 'Color Terapéutico', 'Snack Saludable'],
    rating: 4.9,
    reviewsCount: 142,
    isFavorite: true
  },
  {
    id: 'rec_19',
    title: 'Pudín de Chía con Cacao Puro 100%, Almendras & Frambuesas',
    category: 'snacks',
    categoryLabel: 'Snacks Saludables',
    prepTimeMinutes: 10,
    calories: 195,
    protein: 8,
    carbs: 17,
    fats: 11,
    difficulty: 'Fácil',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=800&auto=format&fit=crop&q=80',
    description: 'Magnesio celular y Omega-3 vegetal en un postre reconfortante y saludable.',
    ingredients: [
      '3 cucharadas de semillas de chía orgánicas',
      '1 taza de bebida vegetal de almendras sin endulzar',
      '1 cucharada de cacao puro en polvo crudo (criollo)',
      '1 cucharadita de extracto de vainilla puro',
      'Frambuesas frescas y almendras laminadas para topping'
    ],
    instructions: [
      'Mezcla la bebida de almendras con el cacao puro y la vainilla con un batidor de mano.',
      'Agrega las semillas de chía y remueve durante 2 minutos continuos para evitar grumos.',
      'Deja reposar en la nevera durante al menos 2 horas o toda la noche para que gelifique.',
      'Sirve en un frasco con las frambuesas ácidas y las almendras crujientes.'
    ],
    tags: ['Magnesio', 'Antioxidantes', 'Sin Gluten'],
    rating: 5.0,
    reviewsCount: 160,
    isFavorite: false
  },
  {
    id: 'rec_20',
    title: 'Leche Dorada "Golden Milk" con Cúrcuma, Jengibre & Canela',
    category: 'bebidas',
    categoryLabel: 'Bebidas & Batidos Detox',
    prepTimeMinutes: 7,
    calories: 95,
    protein: 2,
    carbs: 11,
    fats: 5,
    difficulty: 'Fácil',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80',
    description: 'Bebida ayurvédica legendaria con curcumina activa, pimienta negra para biodisponibilidad y especias.',
    ingredients: [
      '1 taza de leche vegetal de coco o almendras cremosa',
      '1 cucharadita de cúrcuma orgánica en polvo',
      '1/2 cucharadita de canela de Ceilán en rama o molida',
      '1/4 cucharadita de jengibre en polvo',
      'Una pizca de pimienta negra recién molida (esencial para absorber la curcumina)',
      '1/2 cucharadita de aceite de coco virgen'
    ],
    instructions: [
      'Calienta la leche vegetal en un cazo pequeño a fuego medio sin que llegue a hervir.',
      'Añade la cúrcuma, canela, jengibre, pimienta negra y el aceite de coco virgen.',
      'Bate con un espumador de leche hasta que espume y tome un color oro brillante.',
      'Vierte en tu taza favorita y disfruta caliente para calmar el cuerpo antes de dormir o por la tarde.'
    ],
    tags: ['Anti-inflamatorio', 'Curcumina', 'Bebida Relajante'],
    rating: 5.0,
    reviewsCount: 230,
    isFavorite: true
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj_1',
    title: 'Cultivo de Microgreens en Casa',
    description: 'Guía paso a paso para cultivar brotes vivos de rábano, brócoli y mostaza en tu cocina para enriquecer tus comidas diarias.',
    category: 'Cultivo',
    progress: 75,
    startDate: '15 Jul 2026',
    targetDate: '10 Ago 2026',
    status: 'en_progreso',
    badgeIcon: 'Sprout',
    colorTag: '#0E5C36',
    tasks: [
      { id: 't1', title: 'Preparar bandeja de germinación y sustrato orgánico', completed: true },
      { id: 't2', title: 'Sembrar semillas de rábano rojo y brócoli', completed: true },
      { id: 't3', title: 'Riego con atomizador dos veces al día (fase oscura)', completed: true },
      { id: 't4', title: 'Exponer a luz natural indirecta al 4to día', completed: false },
      { id: 't5', title: 'Primera cosecha para tus ensaladas NutriGrow', completed: false }
    ]
  },
  {
    id: 'proj_2',
    title: 'Reto 21 Días: Cero Azúcares Añadidos',
    description: 'Reeduca tu paladar, estabiliza tus niveles de glucosa en sangre y multiplica tu energía vital eliminando azúcares ultraprocesados.',
    category: 'Hábitos',
    progress: 60,
    startDate: '01 Ago 2026',
    targetDate: '22 Ago 2026',
    status: 'en_progreso',
    badgeIcon: 'Zap',
    colorTag: '#70B873',
    tasks: [
      { id: 't21', title: 'Limpieza de despensa: retirar salsas y snacks industriales', completed: true },
      { id: 't22', title: 'Semana 1: Reemplazar bebidas azucaradas por infusiones frías', completed: true },
      { id: 't23', title: 'Semana 2: Identificar azúcares ocultos en etiquetas nutricionales', completed: true },
      { id: 't24', title: 'Semana 3: Disfrutar el dulzor natural de frutas enteras y canela', completed: false },
      { id: 't25', title: 'Evaluación final de energía, claridad mental y digestión', completed: false }
    ]
  },
  {
    id: 'proj_3',
    title: 'Meal Prep Semanal: Batch Cooking de Éxito',
    description: 'Aprende a cocinar en 2 horas todo el menú de la semana con técnicas de conservación al vacío y combinaciones equilibradas.',
    category: 'Meal Prep',
    progress: 40,
    startDate: '12 Ago 2026',
    targetDate: '15 Sep 2026',
    status: 'en_progreso',
    badgeIcon: 'Boxes',
    colorTag: '#0E5C36',
    tasks: [
      { id: 't31', title: 'Planificar menú semanal usando el recetario NutriGrow', completed: true },
      { id: 't32', title: 'Lista de compras inteligente en mercado local', completed: true },
      { id: 't33', title: 'Cocinar bases: quinoa, lentejas, verduras al vapor y aderezos', completed: false },
      { id: 't34', title: 'Almacenar en recipientes herméticos de vidrio etiquetados', completed: false }
    ]
  },
  {
    id: 'proj_4',
    title: 'Huerto Urbano de Hierbas Aromáticas',
    description: 'Crea tu rincón medicinal y culinario con albahaca genovesa, romero, menta piperita y orégano fresco.',
    category: 'Cultivo',
    progress: 100,
    startDate: '05 Jul 2026',
    targetDate: '30 Jul 2026',
    status: 'completado',
    badgeIcon: 'Leaf',
    colorTag: '#70B873',
    tasks: [
      { id: 't41', title: 'Seleccionar macetas con buen drenaje', completed: true },
      { id: 't42', title: 'Trasplantar plántulas orgánicas', completed: true },
      { id: 't43', title: 'Instalar sistema de riego por mecha autorregulado', completed: true },
      { id: 't44', title: 'Poda de estimulación y uso en recetas frescas', completed: true }
    ]
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test_1',
    name: 'Dra. Elena Vasconcelos',
    role: 'Médico Nutricionista & Investigadora',
    city: 'Madrid, España',
    avatar: 'https://images.unsplash.com/photo-1594824813583-294b0d061c56?w=400&auto=format&fit=crop&q=80',
    comment: 'NutriGrow no es otra app de contar calorías vacías. Integra la alimentación vegetal viva, el autocultivo y la nutrición antiinflamatoria de una manera tan armoniosa y elegante que la recomiendo a todos mis pacientes.',
    rating: 5,
    tag: 'Salud Médica',
    date: 'Hace 3 días'
  },
  {
    id: 'test_2',
    name: 'Mateo Sandoval',
    role: 'Triatleta & Diseñador de Producto',
    city: 'Bogotá, Colombia',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    comment: 'La interfaz es una obra de arte y las recetas me han ayudado a mantener un rendimiento deportivo del 100% sin pesadez. El proyecto de microgreens en mi departamento fue facilísimo de seguir.',
    rating: 5,
    tag: 'Rendimiento',
    date: 'Hace 1 semana'
  },
  {
    id: 'test_3',
    name: 'Valeria Rivas',
    role: 'Emprendedora & Madre de Familia',
    city: 'Ciudad de México',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    comment: 'El planificador semanal y la sección de recetas ligeras cambiaron por completo las cenas en mi casa. Nos sentimos con más vitalidad y la estética verde es simplemente un deleite diario.',
    rating: 5,
    tag: 'Estilo de Vida',
    date: 'Hace 2 semanas'
  },
  {
    id: 'test_4',
    name: 'Carlos Benítez',
    role: 'Chef Vegetal & Sommelier de Té',
    city: 'Santiago, Chile',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    comment: 'El enfoque en ingredientes vivos y frescos es el futuro de la gastronomía saludable. NutriGrow hace accesible la alta cocina nutricional para cualquier persona.',
    rating: 5,
    tag: 'Gastronomía',
    date: 'Hace 3 semanas'
  }
];
