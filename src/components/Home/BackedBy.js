import React from "react";
import { ReactComponent as MapImg } from "../../images/MapImg.svg";

function BackedBy() {
  return (
    <div className="backed-by">
      <div className="backed-title">
        <h3>Backed By a Powerful Marketing Agency</h3>
      </div>
      <p style={{ paddingBottom: "20px" }}>
        Jump right into post launch marketing services in a flash built right
        into this platform.{" "}
      </p>
      <div className="map-img">
        <MapImg />
      </div>
    </div>
  );
}

export default BackedBy;
