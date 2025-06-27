import { useTransition } from "react";
import "./App.css";
import { useCounterStore } from "./store";

function App() {
  const increment = useCounterStore((state) => state.incrementCounter);
  const decrement = useCounterStore((state) => state.decrementCounter);
  const counter = useCounterStore((state) => state.counter);
  const object = useCounterStore((store) => state.counter);

  console.log(useCounterStore());

  const Component = () => {
    return (
      <p>
        Counter: {counter}
        <button onClick={increment}>Inc</button>
        <button onClick={decrement}>Dec</button>
      </p>
    );
  };

  const withLoading = (Component) => {
    return (props) => {
      const loading = Math.random() > 0.5;
      if (loading) {
        return <p>loading</p>;
      }
      return <Component />;
    };
  };

  const NewComponent = withLoading(Component);

  return (
    <>
      {/* <NewComponent message="hi" /> */}
      <Component />
    </>
  );
}

export default App;
