import React from 'react'
import './App.css'
import { useState } from 'react'
function App() {
  const [area, setArea] = useState('');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!area.trim()) return;

  setLoading(true);
  setError('');
  setMeals([]);

  try {
    const API_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
    const response = await fetch(API_URL);
    const data = await response.json();
    
    console.log('API Response:', data);
    
    if (data.meals && data.meals.length > 0) {
      setMeals(data.meals);
    } else {
      setError(`No meals found for "${area}". Try other areas like Canadian, Italian, Chinese, etc.`);
    }
  } catch (err) {
    setError('Failed to fetch meals. Please try again.');
    console.error('Error:', err);
  } finally {
    setLoading(false);
  }
};

return (
  <div className="p-6 max-w-4xl mx-auto">
    <form onSubmit={handleSubmit} className="mb-6">
      <h1 className="text-3xl font-bold mb-4">Search Meals by Area</h1>
      <div className="flex gap-3 mb-4">
        <input 
          type="text" 
          value={area} 
          onChange={(e) => setArea(e.target.value)} 
          placeholder='Enter area (e.g., Canadian, Italian, Chinese)' 
          className='border p-2 rounded bg-zinc-400/20 flex-1' 
        />
        <button 
          type='submit' 
          disabled={!area.trim() || loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>

    {error && (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
      </div>
    )}

    {meals.length > 0 && (
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Found {meals.length} meals from {area}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {meals.map((meal) => (
            <div key={meal.idMeal} className="border rounded-lg p-4 shadow-md">
              <img 
                src={meal.strMealThumb} 
                alt={meal.strMeal}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h3 className="font-semibold text-lg mb-2">{meal.strMeal}</h3>
              <p className="text-gray-600">ID: {meal.idMeal}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);
}
export default App;