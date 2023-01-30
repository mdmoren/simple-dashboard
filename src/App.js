function App() {
  console.log(`${process.env.REACT_APP_TEST_KEY}`);

  return (
    <div className="flex justify-center items-center font-bold text-5xl w-full h-screen">
      {`${process.env.REACT_APP_TEST_KEY}`}
    </div>
  );
}

export default App;
