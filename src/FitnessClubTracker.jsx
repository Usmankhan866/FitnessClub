"use client"

// Placeholder for toast function if not using a specific hook
const toast = ({ title, description, variant }) => {
  console.log(`Toast: ${title} - ${description} (Variant: ${variant || "default"})`)
  // In a real app, you'd integrate a toast library here (e.g., react-hot-toast, shadcn/ui's toast)
}

export default function FitnessClubTracker() {
  const [weightData, setWeightData] = useState([])
  const [nutritionData, setNutritionData] = useState([])
  const [loading, setLoading] = useState(false)

  // Form states
  const [newWeight, setNewWeight] = useState("")
  const [newBodyFat, setNewBodyFat] = useState("")
  const [newMuscleMass, setNewMuscleMass] = useState("")
  const [newCalories, setNewCalories] = useState("")
  const [newProtein, setNewProtein] = useState("")
  const [newCarbs, setNewCarbs] = useState("")
  const [newFat, setNewFat] = useState("")

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedWeightData = localStorage.getItem("fitnessClubWeightData")
    const savedNutritionData = localStorage.getItem("fitnessClubNutritionData")

    if (savedWeightData) {
      setWeightData(JSON.parse(savedWeightData))
    }
    if (savedNutritionData) {
      setNutritionData(JSON.parse(savedNutritionData))
    }
  }, [])

  // Save data to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("fitnessClubWeightData", JSON.stringify(weightData))
  }, [weightData])

  useEffect(() => {
    localStorage.setItem("fitnessClubNutritionData", JSON.stringify(nutritionData))
  }, [nutritionData])

  // Simulate API call for weight data
  const fetchWeightFromAPI = async () => {
    setLoading(true)
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate API response
      const mockWeightData = {
        id: Date.now().toString(),
        date: new Date().toISOString().split("T")[0],
        weight: Math.round((70 + Math.random() * 20) * 10) / 10,
        bodyFat: newBodyFat ? Math.round((15 + Math.random() * 10) * 10) / 10 : undefined,
        muscleMass: newMuscleMass ? Math.round((40 + Math.random() * 10) * 10) / 10 : undefined,
      }

      setWeightData((prev) => [mockWeightData, ...prev])
      toast({
        title: "Weight data fetched",
        description: "Successfully retrieved weight data from API",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch weight data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Simulate API call for nutrition data
  const fetchNutritionFromAPI = async () => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockMeals = [
        { id: "1", name: "Breakfast", calories: 450, protein: 25, carbs: 40, fat: 18 },
        { id: "2", name: "Lunch", calories: 650, protein: 35, carbs: 55, fat: 22 },
        { id: "3", name: "Dinner", calories: 580, protein: 40, carbs: 45, fat: 20 },
      ]

      const mockNutritionData = {
        id: Date.now().toString(),
        date: new Date().toISOString().split("T")[0],
        calories: mockMeals.reduce((sum, meal) => sum + meal.calories, 0),
        protein: mockMeals.reduce((sum, meal) => sum + meal.protein, 0),
        carbs: mockMeals.reduce((sum, meal) => sum + meal.carbs, 0),
        fat: mockMeals.reduce((sum, meal) => sum + meal.fat, 0),
        meals: mockMeals,
      }

      setNutritionData((prev) => [mockNutritionData, ...prev])
      toast({
        title: "Nutrition data fetched",
        description: "Successfully retrieved nutrition data from API",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch nutrition data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Add manual weight entry
  const addWeightEntry = () => {
    if (!newWeight) return

    const entry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      weight: Number.parseFloat(newWeight),
      bodyFat: newBodyFat ? Number.parseFloat(newBodyFat) : undefined,
      muscleMass: newMuscleMass ? Number.parseFloat(newMuscleMass) : undefined,
    }

    setWeightData((prev) => [entry, ...prev])
    setNewWeight("")
    setNewBodyFat("")
    setNewMuscleMass("")

    toast({
      title: "Weight entry added",
      description: "Your weight data has been recorded",
    })
  }

  // Add manual nutrition entry
  const addNutritionEntry = () => {
    if (!newCalories || !newProtein || !newCarbs || !newFat) return

    const entry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      calories: Number.parseFloat(newCalories),
      protein: Number.parseFloat(newProtein),
      carbs: Number.parseFloat(newCarbs),
      fat: Number.parseFloat(newFat),
      meals: [],
    }

    setNutritionData((prev) => [entry, ...prev])
    setNewCalories("")
    setNewProtein("")
    setNewCarbs("")
    setNewFat("")

    toast({
      title: "Nutrition entry added",
      description: "Your nutrition data has been recorded",
    })
  }

  // Export data to CSV
  const exportToCSV = (type) => {
    let csvContent = ""
    let filename = ""

    if (type === "weight") {
      csvContent = "Date,Weight (kg),Body Fat (%),Muscle Mass (kg)\n"
      weightData.forEach((entry) => {
        csvContent += `${entry.date},${entry.weight},${entry.bodyFat || ""},${entry.muscleMass || ""}\n`
      })
      filename = "fitness_club_weight_data.csv"
    } else {
      csvContent = "Date,Calories,Protein (g),Carbs (g),Fat (g)\n"
      nutritionData.forEach((entry) => {
        csvContent += `${entry.date},${entry.calories},${entry.protein},${entry.carbs},${entry.fat}\n`
      })
      filename = "fitness_club_nutrition_data.csv"
    }

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Export successful",
      description: `${type} data exported to ${filename}`,
    })
  }

  // Export data to JSON
  const exportToJSON = () => {
    const data = {
      weightData,
      nutritionData,
      exportDate: new Date().toISOString(),
      gym: "Fitness Club",
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "fitness_club_data.json")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Export successful",
      description: "All data exported to fitness_club_data.json",
    })
  }

  const getWeightTrend = () => {
    if (weightData.length < 2) return null
    const latest = weightData[0].weight
    const previous = weightData[1].weight
    return latest > previous ? "up" : latest < previous ? "down" : "stable"
  }

  const getAverageCalories = () => {
    if (nutritionData.length === 0) return 0
    return Math.round(nutritionData.reduce((sum, entry) => sum + entry.calories, 0) / nutritionData.length)
  }

  return (
    <div className="min-h-screen bg-white text-gray-600 font-sans">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Replaced Next.js Image with standard <img> */}
              <img src="/logo.png" alt="Fitness Club Logo" width={120} height={60} className="h-12 w-auto" />
            </div>
            <div className="flex items-center space-x-2">
              <Dumbbell className="h-5 w-5 text-red" />
              <span className="text-sm font-medium text-gray-600">Member Dashboard</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-600 to-gray-600 bg-clip-text text-transparent">
              Fitness Tracker Dashboard
            </h1>
            <p className="text-gray-200 mt-2">Track your weight and nutrition progress at Fitness Club</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => exportToCSV("weight")}
              variant="outline"
              className="border-gray-100 hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Weight CSV
            </Button>
            <Button
              onClick={() => exportToCSV("nutrition")}
              variant="outline"
              className="border-gray-100 hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Nutrition CSV
            </Button>
            <Button onClick={exportToJSON} className="bg-red hover:bg-red/90">
              <Download className="w-4 h-4 mr-2" />
              Export All JSON
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white border-gray-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Current Weight</CardTitle>
              <Activity className="h-4 w-4 text-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">
                {weightData.length > 0 ? `${weightData[0].weight} kg` : "No data"}
              </div>
              {getWeightTrend() && (
                <div className="flex items-center text-xs text-gray-250 mt-1">
                  {getWeightTrend() === "up" ? (
                    <TrendingUp className="w-3 h-3 mr-1 text-red" />
                  ) : getWeightTrend() === "down" ? (
                    <TrendingDown className="w-3 h-3 mr-1 text-green-500" />
                  ) : null}
                  {getWeightTrend() === "up" ? "Increased" : getWeightTrend() === "down" ? "Decreased" : "Stable"}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Body Fat</CardTitle>
              <Activity className="h-4 w-4 text-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">
                {weightData.length > 0 && weightData[0].bodyFat ? `${weightData[0].bodyFat}%` : "No data"}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg Calories</CardTitle>
              <Apple className="h-4 w-4 text-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{getAverageCalories()}</div>
              <p className="text-xs text-gray-250">per day</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Entries</CardTitle>
              <Activity className="h-4 w-4 text-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{weightData.length + nutritionData.length}</div>
              <p className="text-xs text-gray-250">records</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="weight" className="space-y-4">
          <TabsList className="bg-gray-50 border-gray-100">
            <TabsTrigger value="weight" className="data-[state=active]:bg-red data-[state=active]:text-white">
              Weight Tracking
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="data-[state=active]:bg-red data-[state=active]:text-white">
              Nutrition Tracking
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weight" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weight Data Input */}
              <Card className="bg-white border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-600">Add Weight Data</CardTitle>
                  <CardDescription className="text-gray-200">Fetch from API or add manually</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button onClick={fetchWeightFromAPI} disabled={loading} className="w-full bg-red hover:bg-red/90">
                    {loading ? "Fetching..." : "Fetch from API"}
                  </Button>

                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="weight" className="text-gray-600">
                        Weight (kg)
                      </Label>
                      <Input
                        id="weight"
                        type="number"
                        value={newWeight}
                        onChange={(e) => setNewWeight(e.target.value)}
                        placeholder="Enter weight"
                        className="bg-white border-gray-100 text-gray-600 placeholder:text-gray-250"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bodyFat" className="text-gray-600">
                        Body Fat (%)
                      </Label>
                      <Input
                        id="bodyFat"
                        type="number"
                        value={newBodyFat}
                        onChange={(e) => setNewBodyFat(e.target.value)}
                        placeholder="Enter body fat percentage"
                        className="bg-white border-gray-100 text-gray-600 placeholder:text-gray-250"
                      />
                    </div>
                    <div>
                      <Label htmlFor="muscleMass" className="text-gray-600">
                        Muscle Mass (kg)
                      </Label>
                      <Input
                        id="muscleMass"
                        type="number"
                        value={newMuscleMass}
                        onChange={(e) => setNewMuscleMass(e.target.value)}
                        placeholder="Enter muscle mass"
                        className="bg-white border-gray-100 text-gray-600 placeholder:text-gray-250"
                      />
                    </div>
                    <Button onClick={addWeightEntry} className="w-full bg-red hover:bg-red/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Entry
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Weight History */}
              <Card className="bg-white border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-600">Weight History</CardTitle>
                  <CardDescription className="text-gray-200">Your recent weight measurements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {weightData.length === 0 ? (
                      <p className="text-gray-200 text-center py-4">No weight data available</p>
                    ) : (
                      weightData.map((entry) => (
                        <div
                          key={entry.id}
                          className="flex justify-between items-center p-3 border border-gray-100 rounded-lg bg-gray-50"
                        >
                          <div>
                            <p className="font-medium text-gray-600">{entry.weight} kg</p>
                            <p className="text-sm text-gray-250">{entry.date}</p>
                          </div>
                          <div className="text-right">
                            {entry.bodyFat && (
                              <Badge variant="secondary" className="mr-1 bg-red/20 text-red border-red/30">
                                {entry.bodyFat}% BF
                              </Badge>
                            )}
                            {entry.muscleMass && (
                              <Badge variant="outline" className="border-gray-300 text-gray-600">
                                {entry.muscleMass}kg MM
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Nutrition Data Input */}
              <Card className="bg-white border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-600">Add Nutrition Data</CardTitle>
                  <CardDescription className="text-gray-200">Fetch from API or add manually</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button onClick={fetchNutritionFromAPI} disabled={loading} className="w-full bg-red hover:bg-red/90">
                    {loading ? "Fetching..." : "Fetch from API"}
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="calories" className="text-gray-600">
                        Calories
                      </Label>
                      <Input
                        id="calories"
                        type="number"
                        value={newCalories}
                        onChange={(e) => setNewCalories(e.target.value)}
                        placeholder="Calories"
                        className="bg-white border-gray-100 text-gray-600 placeholder:text-gray-250"
                      />
                    </div>
                    <div>
                      <Label htmlFor="protein" className="text-gray-600">
                        Protein (g)
                      </Label>
                      <Input
                        id="protein"
                        type="number"
                        value={newProtein}
                        onChange={(e) => setNewProtein(e.target.value)}
                        placeholder="Protein"
                        className="bg-white border-gray-100 text-gray-600 placeholder:text-gray-250"
                      />
                    </div>
                    <div>
                      <Label htmlFor="carbs" className="text-gray-600">
                        Carbs (g)
                      </Label>
                      <Input
                        id="carbs"
                        type="number"
                        value={newCarbs}
                        onChange={(e) => setNewCarbs(e.target.value)}
                        placeholder="Carbs"
                        className="bg-white border-gray-100 text-gray-600 placeholder:text-gray-250"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fat" className="text-gray-600">
                        Fat (g)
                      </Label>
                      <Input
                        id="fat"
                        type="number"
                        value={newFat}
                        onChange={(e) => setNewFat(e.target.value)}
                        placeholder="Fat"
                        className="bg-white border-gray-100 text-gray-600 placeholder:text-gray-250"
                      />
                    </div>
                  </div>
                  <Button onClick={addNutritionEntry} className="w-full bg-red hover:bg-red/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Entry
                  </Button>
                </CardContent>
              </Card>

              {/* Nutrition History */}
              <Card className="bg-white border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-600">Nutrition History</CardTitle>
                  <CardDescription className="text-gray-200">Your recent nutrition intake</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {nutritionData.length === 0 ? (
                      <p className="text-gray-200 text-center py-4">No nutrition data available</p>
                    ) : (
                      nutritionData.map((entry) => (
                        <div key={entry.id} className="p-3 border border-gray-100 rounded-lg bg-gray-50">
                          <div className="flex justify-between items-center mb-2">
                            <p className="font-medium text-gray-600">{entry.calories} calories</p>
                            <p className="text-sm text-gray-250">{entry.date}</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="secondary" className="bg-red/20 text-red border-red/30">
                              P: {entry.protein}g
                            </Badge>
                            <Badge variant="secondary" className="bg-red/20 text-red border-red/30">
                              C: {entry.carbs}g
                            </Badge>
                            <Badge variant="secondary" className="bg-red/20 text-red border-red/30">
                              F: {entry.fat}g
                            </Badge>
                          </div>
                          {entry.meals.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {entry.meals.map((meal) => (
                                <div key={meal.id} className="text-xs text-gray-250">
                                  {meal.name}: {meal.calories} cal
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="border-t border-gray-100 pt-8 mt-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              {/* Replaced Next.js Image with standard <img> */}
              <img
                src="/logo-footer.png"
                alt="Fitness Club Footer Logo"
                width={100}
                height={50}
                className="h-10 w-auto"
              />
              <div className="text-sm text-gray-600">
                <p>© 2024 Fitness Club. All rights reserved.</p>
                <p>Track your fitness journey with us.</p>
              </div>
            </div>
            <div className="text-sm text-gray-250">
              <p>Data stored locally in your browser</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
