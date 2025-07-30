"use client"

import { useState } from "react"
import { Utensils, Dumbbell, Target, Clock, Zap } from "lucide-react" // Importing icons
import HeroPages from "../components/hero-pages/HeroPages" // Import the new HeroPages component



export default function FitnessClubTracker() {
  // Nutrition Calculator State
  const [foodInput, setFoodInput] = useState("")
  const [nutritionResult, setNutritionResult] = useState(null)
  const [nutritionLoading, setNutritionLoading] = useState(false)
  const [nutritionError, setNutritionError] = useState(null)

  // Exercise Suggestion State
  const [goalInput, setGoalInput] = useState("muscle_gain") // Default goal
  const [exercises, setExercises] = useState([])
  const [exercisesLoading, setExercisesLoading] = useState(false)
  const [exercisesError, setExercisesError] = useState(null)
  const [exercisePlanDescription, setExercisePlanDescription] = useState("") // New state for plan description

  const handleCalculateNutrition = async () => {
    if (!foodInput.trim()) {
      setNutritionError("Please enter a food item.")
      setNutritionResult(null)
      return
    }

    setNutritionLoading(true)
    setNutritionError(null)
    setNutritionResult(null)

     setNutritionResult(null)

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const lowerCaseInput = foodInput.toLowerCase()
      let nutritionData = null

      if (lowerCaseInput.includes("apple")) {
        nutritionData = {
          foodName: "Apple (1 medium, 182g)",
          servingSize: "1 medium apple (182g)",
          calories: 95,
          macronutrients: {
            protein: { value: 0.5, unit: "g", percentage: 2 },
            carbohydrates: { value: 25.1, unit: "g", percentage: 91 },
            fat: { value: 0.3, unit: "g", percentage: 3 },
            fiber: { value: 4.4, unit: "g", percentage: 18 },
            sugar: { value: 18.9, unit: "g", percentage: null }
          },
          micronutrients: {
            vitaminC: { value: 8.4, unit: "mg", dailyValue: 9 },
            potassium: { value: 195, unit: "mg", dailyValue: 4 },
            vitaminK: { value: 4, unit: "mcg", dailyValue: 3 },
            calcium: { value: 11, unit: "mg", dailyValue: 1 }
          },
          healthScore: 85,
          category: "Fruit",
          benefits: ["High in fiber", "Rich in antioxidants", "Low calorie", "Heart healthy"],
          warnings: [],
          glycemicIndex: 36,
          recommendation: "Excellent choice for a healthy snack. The fiber content helps with satiety and blood sugar control."
        }
      } else if (lowerCaseInput.includes("chicken breast")) {
        nutritionData = {
          foodName: "Chicken Breast (100g, cooked)",
          servingSize: "100g cooked, skinless",
          calories: 165,
          macronutrients: {
            protein: { value: 31, unit: "g", percentage: 75 },
            carbohydrates: { value: 0, unit: "g", percentage: 0 },
            fat: { value: 3.6, unit: "g", percentage: 20 },
            fiber: { value: 0, unit: "g", percentage: 0 },
            sugar: { value: 0, unit: "g", percentage: null }
          },
          micronutrients: {
            niacin: { value: 14.8, unit: "mg", dailyValue: 92 },
            phosphorus: { value: 220, unit: "mg", dailyValue: 18 },
            selenium: { value: 27.6, unit: "mcg", dailyValue: 50 },
            vitaminB6: { value: 0.9, unit: "mg", dailyValue: 53 }
          },
          healthScore: 92,
          category: "Lean Protein",
          benefits: ["Complete protein source", "Muscle building", "Low in saturated fat", "High in B vitamins"],
          warnings: [],
          glycemicIndex: 0,
          recommendation: "Perfect for muscle building and weight management. Excellent source of complete protein with all essential amino acids."
        }
      } else if (lowerCaseInput.includes("pizza")) {
        nutritionData = {
          foodName: "Pizza Slice (1 slice, cheese)",
          servingSize: "1 slice (107g)",
          calories: 285,
          macronutrients: {
            protein: { value: 12.2, unit: "g", percentage: 17 },
            carbohydrates: { value: 35.6, unit: "g", percentage: 50 },
            fat: { value: 10.4, unit: "g", percentage: 33 },
            fiber: { value: 2.5, unit: "g", percentage: 10 },
            sugar: { value: 3.8, unit: "g", percentage: null }
          },
          micronutrients: {
            calcium: { value: 144, unit: "mg", dailyValue: 11 },
            sodium: { value: 640, unit: "mg", dailyValue: 28 },
            iron: { value: 1.6, unit: "mg", dailyValue: 9 },
            vitaminA: { value: 75, unit: "mcg", dailyValue: 8 }
          },
          healthScore: 45,
          category: "Processed Food",
          benefits: ["Source of calcium", "Provides energy"],
          warnings: ["High in sodium", "High in saturated fat", "Processed ingredients"],
          glycemicIndex: 80,
          recommendation: "Enjoy in moderation as part of a balanced diet. Consider whole wheat crust and vegetable toppings for better nutrition."
        }
      } else if (lowerCaseInput.includes("broccoli")) {
        nutritionData = {
          foodName: "Broccoli (1 cup, chopped)",
          servingSize: "1 cup chopped (91g)",
          calories: 25,
          macronutrients: {
            protein: { value: 3, unit: "g", percentage: 48 },
            carbohydrates: { value: 5, unit: "g", percentage: 40 },
            fat: { value: 0.3, unit: "g", percentage: 5 },
            fiber: { value: 2.3, unit: "g", percentage: 9 },
            sugar: { value: 1.5, unit: "g", percentage: null }
          },
          micronutrients: {
            vitaminC: { value: 81.2, unit: "mg", dailyValue: 90 },
            vitaminK: { value: 92.5, unit: "mcg", dailyValue: 77 },
            folate: { value: 57, unit: "mcg", dailyValue: 14 },
            potassium: { value: 288, unit: "mg", dailyValue: 6 }
          },
          healthScore: 95,
          category: "Cruciferous Vegetable",
          benefits: ["Anti-inflammatory", "Cancer-fighting compounds", "High in antioxidants", "Supports immune system"],
          warnings: [],
          glycemicIndex: 10,
          recommendation: "Superfood! One of the most nutrient-dense vegetables. Steam lightly to preserve nutrients."
        }
      } else if (lowerCaseInput.includes("salmon")) {
        nutritionData = {
          foodName: "Salmon Fillet (100g, cooked)",
          servingSize: "100g cooked fillet",
          calories: 208,
          macronutrients: {
            protein: { value: 25.4, unit: "g", percentage: 49 },
            carbohydrates: { value: 0, unit: "g", percentage: 0 },
            fat: { value: 12.4, unit: "g", percentage: 51 },
            fiber: { value: 0, unit: "g", percentage: 0 },
            sugar: { value: 0, unit: "g", percentage: null }
          },
          micronutrients: {
            omega3: { value: 2.3, unit: "g", dailyValue: null },
            vitaminD: { value: 526, unit: "IU", dailyValue: 66 },
            vitaminB12: { value: 2.8, unit: "mcg", dailyValue: 117 },
            selenium: { value: 36.5, unit: "mcg", dailyValue: 66 }
          },
          healthScore: 94,
          category: "Fatty Fish",
          benefits: ["Heart healthy omega-3s", "Brain health support", "Anti-inflammatory", "High quality protein"],
          warnings: ["Potential mercury content"],
          glycemicIndex: 0,
          recommendation: "Excellent choice for heart and brain health. Rich in omega-3 fatty acids that reduce inflammation."
        }
      } else {
        throw new Error("Food not found in database")
      }

      setNutritionResult(nutritionData)
    } catch (error) {
      setNutritionError(`Nutrition data not found for "${foodInput}". Try: apple, chicken breast, pizza, broccoli, or salmon.`)
      console.error("Nutrition calculation error:", error)
    } finally {
      setNutritionLoading(false)
    }
  }

  const handleGetExercises = async () => {
    setExercisesLoading(true)
    setExercisesError(null)
    setExercises([])
    setExercisePlanDescription("") // Clear previous description

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      let simulatedExercises = []
      let planDescription = ""

      if (goalInput === "muscle_gain") {
        planDescription =
          "Build muscle with compound movements and progressive overload. Train 3-4 times per week, focusing on heavy weights with 6-12 reps. Rest 48-72 hours between training the same muscle groups. Eat in a caloric surplus with adequate protein (1.6-2.2g per kg body weight)."
        simulatedExercises = [
          {
            id: 101,
            name: "Deadlifts",
            description: "The king of all exercises! Works your entire posterior chain including glutes, hamstrings, and back. Start with lighter weight to master the form.",
            imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop",
            sets: "4 sets",
            reps: "6-8 reps",
            intensity: "High"
          },
          {
            id: 102,
            name: "Barbell Bench Press",
            description: "Classic chest builder that also works shoulders and triceps. Control the weight down and press explosively up.",
            imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&auto=format&fit=crop",
            sets: "4 sets",
            reps: "8-10 reps",
            intensity: "High"
          },
          {
            id: 103,
            name: "Barbell Squats",
            description: "Build massive legs and core strength. Focus on sitting back and driving through your heels. Go as deep as your mobility allows.",
            imageUrl: "https://media.istockphoto.com/id/1149242776/photo/mature-strong-man-lifting-weights-at-cross-training.jpg?s=612x612&w=0&k=20&c=pqhlsg9QHdSccbjzL0aVTbELRibJj6levS9N7jKDHy0=",
            sets: "4 sets",
            reps: "8-12 reps",
            intensity: "High"
          },
          {
            id: 104,
            name: "Pull-ups/Chin-ups",
            description: "Ultimate upper body exercise for back and biceps. Use assistance bands if needed, or add weight when you're strong enough.",
            imageUrl: "https://media.istockphoto.com/id/1159168752/photo/woman-athlete-doing-pull-ups.jpg?s=612x612&w=0&k=20&c=qD23R9afAj-8oc7HGGbXn6Uv2BPHE2RWqZjK-QcC2AQ=",
            sets: "3 sets",
            reps: "6-12 reps",
            intensity: "High"
          },
          {
            id: 105,
            name: "Overhead Press",
            description: "Build strong shoulders and core stability. Press the weight straight up while keeping your core tight.",
            imageUrl: "https://cdn.shopify.com/s/files/1/0449/8453/3153/files/Barbell-Row_1024x1024.jpg?v=1662081583",
            sets: "3 sets",
            reps: "8-10 reps",
            intensity: "Medium"
          },
          {
            id: 106,
            name: "Barbell Rows",
            description: "Build a thick, strong back. Keep your core tight and pull the bar to your lower chest/upper abdomen.",
            imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop",
            sets: "3 sets",
            reps: "8-12 reps",
            intensity: "Medium"
          }
        ]
      } else if (goalInput === "weight_loss") {
        planDescription =
          "Burn calories and boost metabolism with high-intensity exercises. Combine cardio with strength training 4-5 times per week. Focus on compound movements and circuit training. Create a caloric deficit through diet and exercise for sustainable weight loss."
        simulatedExercises = [
          {
            id: 201,
            name: "Burpees",
            description: "Full-body fat burner! Combines squat, plank, push-up, and jump. The ultimate calorie torcher that builds strength and endurance.",
            imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop",
            sets: "3 rounds",
            reps: "30 seconds on, 30 seconds rest",
            intensity: "Very High"
          },
          {
            id: 202,
            name: "Mountain Climbers",
            description: "High-intensity cardio that targets your core and gets your heart pumping. Keep your hips level and drive those knees fast!",
            imageUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=400&auto=format&fit=crop",
            sets: "4 rounds",
            reps: "45 seconds on, 15 seconds rest",
            intensity: "High"
          },
          {
            id: 203,
            name: "Kettlebell Swings",
            description: "Explosive hip movement that burns tons of calories while building posterior chain strength. Power comes from your hips, not arms!",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQjkjgVKCzj8sn_SATXbfrQKaOLxERJqYz0A&s",
            sets: "4 sets",
            reps: "20-30 reps",
            intensity: "High"
          },
          {
            id: 204,
            name: "High-Intensity Intervals",
            description: "Sprint intervals on bike, treadmill, or outdoors. Short bursts of maximum effort followed by recovery periods.",
            imageUrl: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=400&auto=format&fit=crop",
            sets: "6-8 intervals",
            reps: "30s sprint, 90s recovery",
            intensity: "Very High"
          },
          {
            id: 205,
            name: "Thrusters",
            description: "Combines squat and overhead press for maximum calorie burn. Works your entire body and keeps your heart rate elevated.",
            imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop",
            sets: "3 sets",
            reps: "15-20 reps",
            intensity: "High"
          },
          {
            id: 206,
            name: "Jump Rope",
            description: "Classic cardio that improves coordination and burns serious calories. Start with 30-second intervals and build up endurance.",
            imageUrl: "https://media.istockphoto.com/id/1132338411/photo/strong-caucasian-boxer-girl-in-sportswear-jumping-rope-in-gym.jpg?s=612x612&w=0&k=20&c=LkMfiGFgbhlA2VJaOoCRfIZOurOIiGGeJpnI4Agy0QY=",
            sets: "5 rounds",
            reps: "60 seconds on, 30 seconds rest",
            intensity: "Medium"
          }
        ]
      }
      setExercises(simulatedExercises)
      setExercisePlanDescription(planDescription)
    } catch (error) {
      setExercisesError("Error getting exercises. Please try again.")
      console.error("Simulated exercise error:", error)
    } finally {
      setExercisesLoading(false)
    }
  }

  const getHealthScoreColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-100"
    if (score >= 60) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  const getMacroColor = (macro) => {
    switch (macro) {
      case "protein": return "bg-blue-500"
      case "carbohydrates": return "bg-green-500"
      case "fat": return "bg-yellow-500"
      default: return "bg-gray-500"
    }
  }

  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case "Very High": return "text-red-600 bg-red-50"
      case "High": return "text-orange-600 bg-orange-50"
      case "Medium": return "text-yellow-600 bg-yellow-50"
      default: return "text-green-600 bg-green-50"
    }
  }

  const getGoalInfo = () => {
    if (goalInput === "muscle_gain") {
      return {
        icon: <Dumbbell className="h-6 w-6" />,
        title: "Muscle Gain",
        description: "Build strength and size with compound movements",
        color: "text-blue-600 bg-blue-50"
      }
    } else {
      return {
        icon: <Zap className="h-6 w-6" />,
        title: "Weight Loss",
        description: "Burn calories and boost metabolism",
        color: "text-red-600 bg-red-50"
      }
    }
  }

  return (
    
    <div className="min-h-screen bg-gray-50">
      <HeroPages page="Fitness Tracker" />
      <div className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
        {/* Enhanced Nutrition Calculator Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold text-center text-gray-600 mb-6">Food Nutrition Calculator</h2>
          <p className="text-md text-center text-gray-400 mb-8">
            Enter a food item (e.g., "apple", "chicken breast", "pizza") to get comprehensive nutritional breakdown.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="e.g., apple, chicken breast, pizza, broccoli, salmon"
              value={foodInput}
              onChange={(e) => setFoodInput(e.target.value)}
              className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              onKeyPress={(e) => e.key === 'Enter' && handleCalculateNutrition()}
              aria-label="Enter food item"
            />
            <button
              onClick={handleCalculateNutrition}
              disabled={nutritionLoading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-md transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl border border-primary"
            >
              {nutritionLoading ? (
                "Analyzing..."
              ) : (
                <>
                  <Utensils className="h-5 w-5" /> Analyze Nutrition
                </>
              )}
            </button>
          </div>

          {nutritionError && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
              <p>{nutritionError}</p>
            </div>
          )}

          {nutritionResult && (
            <div className="mt-4">
              {/* Food Header */}
              <div className="bg-gray-100 rounded-md p-4 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">{nutritionResult.foodName}</h3>
                    <p className="text-gray-600">Serving size: {nutritionResult.servingSize}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {nutritionResult.category}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-xl font-bold text-primary">{nutritionResult.calories} cal</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-2 rounded-md ${getHealthScoreColor(nutritionResult.healthScore)}`}>
                      <div className="text-lg font-bold">{nutritionResult.healthScore}</div>
                      <div className="text-xs font-medium">Health Score</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Macronutrients */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  Macronutrients Breakdown
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  {Object.entries(nutritionResult.macronutrients).map(([key, data]) => (
                    <div key={key} className="bg-gray-50 rounded-md p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        {data.percentage && (
                          <span className="text-xs text-gray-500">{data.percentage}%</span>
                        )}
                      </div>
                      <div className="text-lg font-bold text-gray-700">
                        {data.value}{data.unit}
                      </div>
                      {data.percentage && (
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className={`h-2 rounded-full ${getMacroColor(key)}`}
                            style={{ width: `${Math.min(data.percentage, 100)}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Micronutrients */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Key Micronutrients</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(nutritionResult.micronutrients).map(([key, data]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <span className="font-medium text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <div className="text-right">
                        <div className="font-semibold text-gray-700">
                          {data.value}{data.unit}
                        </div>
                        {data.dailyValue && (
                          <div className="text-xs text-gray-500">
                            {data.dailyValue}% DV
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Health Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Benefits */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">
                    Health Benefits
                  </h4>
                  <div className="space-y-2">
                    {nutritionResult.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Info */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">
                    Additional Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Glycemic Index</span>
                      <span className="font-medium text-gray-700">{nutritionResult.glycemicIndex}</span>
                    </div>
                    {nutritionResult.warnings.length > 0 && (
                      <div>
                        <span className="text-orange-600 font-medium text-sm">Considerations:</span>
                        {nutritionResult.warnings.map((warning, index) => (
                          <div key={index} className="text-orange-600 text-sm mt-1">{warning}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div className="bg-primary/10 border border-primary/20 rounded-md p-4">
                <h4 className="font-semibold text-primary mb-2">Nutritionist Recommendation</h4>
                <p className="text-gray-600">{nutritionResult.recommendation}</p>
              </div>
            </div>
          )}
        </div>

        </div>
          {/* Exercise Suggestion Section - Enhanced */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-600 mb-4">Personalized Exercise Plan</h2>
              <p className="text-md text-gray-400">
                Choose your fitness goal and get a customized workout plan with detailed instructions
              </p>
            </div>

            {/* Goal Selection with Visual Cards */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Select Your Fitness Goal
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md ${
                    goalInput === "muscle_gain" 
                      ? "border-blue-500 bg-blue-50 shadow-md" 
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-25"
                  }`}
                  onClick={() => setGoalInput("muscle_gain")}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg transition-all duration-300 ${goalInput === "muscle_gain" ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-blue-100"}`}>
                      <Dumbbell className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700">Muscle Gain</h4>
                      <p className="text-sm text-gray-500">Build strength and muscle mass</p>
                    </div>
                  </div>
                </div>

                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md ${
                    goalInput === "weight_loss" 
                      ? "border-red-500 bg-red-50 shadow-md" 
                      : "border-gray-200 hover:border-red-300 hover:bg-red-25"
                  }`}
                  onClick={() => setGoalInput("weight_loss")}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg transition-all duration-300 ${goalInput === "weight_loss" ? "bg-red-500 text-white" : "bg-gray-100 hover:bg-red-100"}`}>
                      {goalInput !== "weight_loss" && <Zap className="h-6 w-6" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700">Weight Loss</h4>
                      <p className="text-sm text-gray-500">Burn calories and lose fat</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleGetExercises}
                disabled={exercisesLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-6 rounded-md transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl border border-primary"
              >
                {exercisesLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Getting Your Personalized Plan...
                  </>
                ) : (
                  <>
                    <Target className="h-5 w-5" />
                    Get My {getGoalInfo().title} Plan
                  </>
                )}
              </button>
            </div>

            {exercisesError && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
                <p>{exercisesError}</p>
              </div>
            )}

            {/* Exercise Plan Description */}
            {exercisePlanDescription && (
              <div className={`mt-6 p-6 rounded-lg border-l-4 ${getGoalInfo().color.replace('text-', 'border-').split(' ')[0]}`}>
                <div className="flex items-center gap-3 mb-3">
                  {getGoalInfo().icon}
                  <h3 className="text-xl font-bold text-gray-700">Your {getGoalInfo().title} Plan</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{exercisePlanDescription}</p>
              </div>
            )}

            {/* Exercise Cards */}
            {exercises.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Your Exercise Routine ({exercises.length} exercises)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {exercises.map((ex, index) => (
                    <div key={ex.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                      <div className="relative">
                        <img
                          src={ex.imageUrl || "/placeholder.svg"}
                          alt={ex.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-3 left-3 bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-600">
                          #{index + 1}
                        </div>
                        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold ${getIntensityColor(ex.intensity)}`}>
                          {ex.intensity}
                        </div>
                      </div>
                      
                      <div className="p-5">
                        <h4 className="text-xl font-bold text-gray-800 mb-2">{ex.name}</h4>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{ex.description}</p>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center bg-white p-2 rounded">
                            <span className="text-sm font-medium text-gray-600">Sets:</span>
                            <span className="text-sm font-semibold text-gray-800">{ex.sets}</span>
                          </div>
                          <div className="flex justify-between items-center bg-white p-2 rounded">
                            <span className="text-sm font-medium text-gray-600">Reps:</span>
                            <span className="text-sm font-semibold text-gray-800">{ex.reps}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800 font-medium">
                    💡 <strong>Pro Tip:</strong> Rest 2-3 minutes between sets for strength exercises, and 30-60 seconds for cardio exercises. 
                    Always warm up before starting and cool down afterward!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
          </div>
  )
}
