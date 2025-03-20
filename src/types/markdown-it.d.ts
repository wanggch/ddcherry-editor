declare module 'markdown-it' {
  interface MarkdownItOptions {
    html?: boolean;
    xhtmlOut?: boolean;
    breaks?: boolean;
    langPrefix?: string;
    linkify?: boolean;
    typographer?: boolean;
    quotes?: string;
    highlight?: (str: string, lang: string) => string | undefined;
  }

  interface MarkdownItUtils {
    escapeHtml: (str: string) => string;
  }

  class MarkdownIt {
    constructor(options?: MarkdownItOptions | string);
    render: (content: string) => string;
    utils: MarkdownItUtils;
  }

  export default MarkdownIt;
} 