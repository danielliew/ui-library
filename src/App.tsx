import Button from "./lib/components/Button";

function App() {
  return (
    <div className="App">
      <h1>Ui Library</h1>
      <hr />

      <div>
        <h2>Button</h2>
        <Button onClick={() => console.log("hi")}>Default</Button>
        <Button type="solid" onClick={() => console.log("hi")}>
          Solid
        </Button>
        <Button disabled onClick={() => console.log("hi")}>
          Disabled
        </Button>
        <Button size="sm" onClick={() => console.log("hi")}>small</Button>
        <Button size="lg" onClick={() => console.log("hi")}>large</Button>
      </div>
    </div>
  );
}

export default App;
