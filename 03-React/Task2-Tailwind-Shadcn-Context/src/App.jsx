import FullScreenWrapper from "@/utils/components/FullScreenWrapper";
import Navbar from "./Components/Navbar";
import ShowProducts from "./Components/ShowProducts";

function App() {
  return (
    <>
      <Navbar />
      <FullScreenWrapper notop className="py-4">
        <h1 className="py-4 text-2xl font-semibold ">TOP COLLECTIONS</h1>
        <ShowProducts />
      </FullScreenWrapper>
    </>
  );
}

export default App;
