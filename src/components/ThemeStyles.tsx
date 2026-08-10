import { themeToCssVariables } from "@/config/theme";

/** Injects theme colors as CSS custom properties on :root */
export function ThemeStyles() {
  const vars = themeToCssVariables();
  const css = `:root { ${Object.entries(vars)
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ")} }`;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
