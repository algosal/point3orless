// utils/load-scripts.ts
export function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(`Failed to load script: ${src}`);
    document.head.appendChild(script);
  });
}
