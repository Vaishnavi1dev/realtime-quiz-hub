declare module 'ogl' {
  export class Renderer {
    gl: WebGLRenderingContext;
    constructor(options?: any);
    setSize(width: number, height: number): void;
    render(options: { scene: any }): void;
  }

  export class Program {
    uniforms: Record<string, { value: any }>;
    constructor(gl: WebGLRenderingContext, options: {
      vertex: string;
      fragment: string;
      uniforms?: Record<string, { value: any }>;
    });
  }

  export class Mesh {
    constructor(gl: WebGLRenderingContext, options: {
      geometry: any;
      program: Program;
    });
  }

  export class Triangle {
    constructor(gl: WebGLRenderingContext);
  }

  export class Vec2 {
    constructor(x?: number, y?: number);
    set(x: number, y: number): this;
    x: number;
    y: number;
  }
}
