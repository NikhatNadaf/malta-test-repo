import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../public/404.json";
function Custom404() {
  return (
    <div className="justify-center py-32 flex flex-col items-center">
      <Lottie
        className="h-96"
        animationData={loadingAnimation}
        loop={true}
        autoplay={true}
      />
      <p className="text-3xl uppercase font-bold text-muted-foreground">OOPS! You've travelled so far</p>
    </div>
  );
}

export default Custom404;
