import { useEffect, forwardRef, useRef, useCallback } from "react";

const Viewer = forwardRef(({ rotX, rotY, srcModel, srcModelIOS }, ref) => {
    const modelRef = ref;
    const containerProgressBarRef = useRef(null);
    const progressBarRef = useRef(null);
    const preLoadedValue = useRef(0);

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

        return () => {
            if (!modelRef.current) return;
            modelRef.current?.removeEventListener("error", handleError);
            modelRef.current?.removeEventListener("progress", handleProgressBar);
        };
    }, [handleProgressBar]);

    return (
        <>
            <model-viewer
                style={{
                    width: "100%",
                    height: "100%",
                    zIndex: "40",
                }}
                src={`./${srcModel}`}
                ios-src={`./${srcModelIOS}`}
                alt="Viewer"
                field-of-view="35deg"
                camera-controls={true}
                ar={true}
                ar-modes="webxr scene-viewer quick-look"
                ar-scale="auto"
                camera-orbit={`${rotX}deg ${rotY}deg auto`}
                shadow-intensity="1"
                exposure="0.75"
                // disable-zoom={false}
                disable-tap={true}
                xr-environment
                environment-image="neutral"
                ref={modelRef}
            >
                <span slot="ar-button" id="ar-button">
                    <img src="./ar-logo.svg" width={24} height={24} alt="ar logo" />
                </span>
                <div ref={containerProgressBarRef} id="container-progress-bar" style={{ backgroundColor: "#000000" }}>
                    <span ref={progressBarRef} id="custom-progress-bar">
                        0%
                    </span>
                </div>
            </model-viewer>
        </>
    );
});

export default Viewer;
