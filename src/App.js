function App() {
  return (
    <div className="flex justify-center items-center font-bold text-5xl w-full h-screen">
      {process.env.REACT_WEATHER_KEY || "Failed"}
    </div>
  );
}

export default App;
