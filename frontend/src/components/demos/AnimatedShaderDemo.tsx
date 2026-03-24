import AnoAI from "../../components/ui/animated-shader-background";

const DemoOne = () => {
  return (
    <div className="w-full h-[500px] bg-black rounded-2xl overflow-hidden relative">
      <AnoAI/>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 className="text-white text-4xl font-bold tracking-tight">Animated Shader Background</h2>
      </div>
    </div>
  );
};

export { DemoOne };
