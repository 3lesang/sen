import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useEffect } from "react";

export default function Tour() {
  useEffect(() => {
    const driverObj = driver({
      animate: true,
      allowClose: true,
    });

    const startTour = () => {
      const target = document.getElementById("cate");

      if (target) {
        driverObj.highlight({ element: target });
      }
    };

    const trigger = document.getElementById("start-tour");

    if (trigger) {
      trigger.addEventListener("click", startTour);
    }

    return () => {
      if (trigger) {
        trigger.removeEventListener("click", startTour);
      }
    };
  });

  return null;
}
