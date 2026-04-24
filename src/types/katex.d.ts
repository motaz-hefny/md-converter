declare module 'katex' {
  export function render(
    tex: string,
    element: HTMLElement,
    options?: {
      throwOnError?: boolean;
      displayMode?: boolean;
      output?: 'html' | 'mathml' | 'htmlAndMathml';
    }
  ): void;
}
