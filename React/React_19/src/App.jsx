import { useTransition } from "react";
import "./App.css";

function App() {
  const Component = () => {
    return <p>Component</p>;
  };

  const withLoading = (Component) => {
    return (props) => {
      console.log(props.message);
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
      <NewComponent message="hi" />
      <Component />
    </>
  );
}

export default App;
