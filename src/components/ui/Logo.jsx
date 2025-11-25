export default function Logo({ className = "w-64" }) {
  return (
    <img 
      src="/logo.svg" 
      alt="Keyframe Global" 
      className={`${className} select-none`}
    />
  );
}