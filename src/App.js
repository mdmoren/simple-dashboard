function App() {
  const key = process.env.WEATHER_KEY || "Failed";

  console.log(process.env.WEATHER_KEY);

  return (
    <div className="flex justify-center items-center font-bold text-5xl w-full h-screen">
      {key}
    </div>
  );
}

export default App;
