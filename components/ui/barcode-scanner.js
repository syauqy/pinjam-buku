import React, { useEffect } from "react";
import Quagga from "@ericblade/quagga2";

/**
 * @typedef {object} BarcodeScannerProps
 * @property {function(data: object): void} onDetected
 */

/**
 * @param {BarcodeScannerProps} props
 * @returns {JSX.Element}
 * @constructor
 */
const BarcodeScanner = function (props) {
  const { onDetected, stop } = props;

  useEffect(() => {
    Quagga.onDetected(onDetected);
    Quagga.onProcessed(function (result) {
      const video = document.querySelector("#interactive video");
      if (!video) return;
      let drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;
      const scale =
        video.clientWidth / parseInt(drawingCanvas.getAttribute("width"));

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            parseInt(drawingCanvas.getAttribute("width")),
            parseInt(drawingCanvas.getAttribute("height"))
          );
          result.boxes
            .filter(function (box) {
              return box !== result.box;
            })
            .forEach(function (box) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: "green",
                lineWidth: 2,
              });
            });
        }

        if (result.box) {
          const box = result.box.map((b) => [scale * b[0], scale * b[1]]);
          Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
            color: "#00F",
            lineWidth: 2,
          });
        }

        if (result.codeResult && result.codeResult.code) {
          const line = result.line.map((c) => ({
            x: scale * c.x,
            y: scale * c.y,
          }));
          Quagga.ImageDebug.drawPath(line, { x: "x", y: "y" }, drawingCtx, {
            color: "red",
            lineWidth: 3,
          });
        }
      }
    });

    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          constraints: {
            width: { min: 640 },
            height: { min: 480 },
            facingMode: "environment",
            aspectRatio: { min: 1, max: 2 },
          },
        },
        locate: true,
        locator: {
          patchSize: "medium",
          halfSample: true,
        },
        frequency: 10,
        decoder: {
          readers: [
            "ean_reader",
            "code_93_reader",

            "code_128_reader",
            "ean_8_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "codabar_reader",
            "upc_reader",
            "upc_e_reader",
            "i2of5_reader",
            "2of5_reader",
          ],
          multiple: false,
        },
      },
      function (err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
      }
    );
  }, [onDetected]);

  useEffect(() => {
    if (stop == true) {
      console.log("stop");
      Quagga.stop();
    }
  }, [stop]);

  return <div id="interactive" className="viewport"></div>;
};

export default BarcodeScanner;
