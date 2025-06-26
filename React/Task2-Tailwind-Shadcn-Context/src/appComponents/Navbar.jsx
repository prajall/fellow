import React, { useContext } from "react";
import FullScreenWrapper from "../utils/components/FullScreenWrapper";
import { CartContext } from "../contexts/CartContext";
import { Button } from "../components/ui/button";

const Navbar = () => {
  return (
    <div>
      <FullScreenWrapper>hey</FullScreenWrapper>
      <FullScreenWrapper notop>
        <Button>Help</Button>
      </FullScreenWrapper>
    </div>
  );
};

export default Navbar;
