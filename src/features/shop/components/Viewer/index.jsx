import { useEffect, forwardRef, useRef, useState, useCallback } from "react";

import { useScreenSize } from "../../../../hooks/useScreenSize";

const Viewer = forwardRef(
    ({ rotX, rotY, srcModel, srcModelIOS, srcPoster, setCursorFn = false, modelLoaded = false }, ref) => {
        const { screenWidth } = useScreenSize();
        const modelRef = ref;
        const containerProgressBarRef = useRef(null);
        const progressBarRef = useRef(null);
        const modelPosterRef = useRef(null);
        const preLoadedValue = useRef(0);
        const [isModelLoaded, setIsModelLoaded] = useState(modelLoaded);

        const handleMouseLeave = () => {
            if (!modelRef.current) return;

            let currentRotX;
            let currentRotY;
            const targetRotX = Math.abs(rotX);
            const targetRotY = Math.abs(rotY);

            // Retrieve the current camera orbit values
            const orbit = modelRef.current.getAttribute("camera-orbit").split(" ");
            currentRotY = parseFloat(orbit[0]);
            currentRotX = parseFloat(orbit[1]);

            const animate = () => {
                // Calculate the difference between the current and target rotations
                const diffX = targetRotX - currentRotX;
                const diffY = targetRotY - currentRotY;

                // Adjust the current rotations slightly towards the target
                currentRotX += diffX * 0.1;
                currentRotY += diffY * 0.1;

                // Apply the new rotations
                modelRef.current.setAttribute("camera-orbit", `${currentRotY}deg ${currentRotX}deg auto`);

                // Continue animating until the difference is negligible
                if (Math.abs(diffX) > 0.1 || Math.abs(diffY) > 0.1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        };

        const handleMouseMove = (event) => {
            if (!modelRef.current) return;

            const rect = modelRef.current.getBoundingClientRect();

            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate the difference between the center of the model-viewer and the mouse position
            const diffX = (mouseX - centerX) / centerX;
            const diffY = (mouseY - centerY) / centerY;

            // Convert the difference in screen space to a rotation in degrees
            const sensitivity = 60;

            // Adjust the base azimuth and polar angles by the calculated differences
            const finalRotX = rotX + diffY * -sensitivity; // Vertical mouse movement affects rotation around the X-axis
            const finalRotY = rotY - diffX * sensitivity; // Horizontal mouse movement affects rotation around the Y-axis

            modelRef.current.setAttribute("camera-orbit", `${finalRotY}deg ${finalRotX}deg auto`);
        };

        const handleProgressBar = useCallback((event) => {
            if (!modelRef.current) return;
            if (!progressBarRef.current || !containerProgressBarRef.current) return;

            let loaded = 0;
            const { totalProgress } = event.detail;
            loaded = (Math.round(totalProgress * 10) / 10) * 100;

            if (loaded > preLoadedValue.current) {
                progressBarRef.current.textContent = `${loaded}%`;
                preLoadedValue.current = loaded;
            }

            if (loaded === 100) {
                progressBarRef.current.style = "display:none";
                containerProgressBarRef.current.style = "opacity: 0; z-index: -1";
                preLoadedValue.current = 0;
            }
        }, []);

        const handleError = (event) => {
            throw new Error("Error trying to load the model. " + event.detail.sourceError.message);
        };

        useEffect(() => {
            if (!modelRef.current) return;

            modelRef.current.addEventListener("error", handleError);

            modelRef.current.addEventListener("progress", handleProgressBar);

            if (!setCursorFn) {
                return;
            }
            modelRef.current.addEventListener("mousemove", handleMouseMove);
            modelRef.current.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                if (!modelRef.current) return;
                modelRef.current?.removeEventListener("error", handleError);
                modelRef.current?.removeEventListener("progress", handleProgressBar);

                if (!setCursorFn) {
                    return;
                }
                modelRef.current?.removeEventListener("mousemove", handleMouseMove);
                modelRef.current?.removeEventListener("mouseleave", handleMouseLeave);
            };
        }, [handleProgressBar, handleMouseMove, handleMouseLeave]);

        return (
            <>
                <model-viewer
                    style={{
                        width: "100%",
                        height: "100%",
                        zIndex: "40",
                        display: `${isModelLoaded ? "block" : "none"}`,
                    }}
                    src={`./${srcModel}`}
                    ios-src={`./${srcModelIOS}`}
                    alt="Viewer"
                    {...(!setCursorFn
                        ? { "camera-controls": true, "field-of-view": "25deg" }
                        : { "field-of-view": "10deg" })}
                    ar={true}
                    ar-modes="webxr scene-viewer quick-look"
                    ar-scale="auto"
                    camera-orbit={`${rotX}deg ${rotY}deg auto`}
                    shadow-intensity="1"
                    exposure="0.75"
                    disable-zoom={true}
                    disable-tap={true}
                    xr-environment
                    environment-image="neutral"
                    ref={modelRef}
                >
                    <span slot="ar-button" id="ar-button">
                        <img src="./ar-logo.svg" width={24} height={24} alt="ar logo" />
                    </span>
                    <div
                        ref={containerProgressBarRef}
                        id="container-progress-bar"
                        style={{ backgroundColor: "#000000" }}
                    >
                        <span ref={progressBarRef} id="custom-progress-bar">
                            0%
                        </span>
                    </div>
                </model-viewer>

                <div
                    ref={modelPosterRef}
                    id="lazy-load-poster"
                    style={{
                        backgroundImage: `url("./${srcPoster}")`,
                        display: `${isModelLoaded ? "none" : "block"}`,
                    }}
                >
                    <div
                        id="button-load-model"
                        onClick={() => {
                            modelPosterRef.current.style = "display:none;";
                            setIsModelLoaded(true);
                        }}
                    >
                        3D
                    </div>
                </div>
            </>
        );
    }
);

export default Viewer;
