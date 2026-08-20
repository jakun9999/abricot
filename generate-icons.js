import fs from "fs";
import path from "path";

// Configuration des dossiers
const SVG_DIR = path.join(__dirname, "src/svg-raw"); // Où tu déposes tes fichiers .svg
const OUTPUT_DIR = path.join(__dirname, "components/ui/icons"); // Où seront générés tes .tsx

// Utilitaires de nommage (ex: "shopping-bag.svg" -> "ShoppingBagIcon")
const toPascalCase = (str) =>
  str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[a-z]/, (chr) => chr.toUpperCase());

const sanitizeFileName = (name) => name.replace(/\.svg$/i, "");

function transformSvgToReact(svgContent, componentName) {
  let cleanedSvg = svgContent
    // Supprime la déclaration XML si présente
    .replace(/<\?xml.*\?>/gi, "")
    // Remplace les attributs HTML par leur équivalent JSX/React
    .replace(/stroke-width=/g, "strokeWidth=")
    .replace(/stroke-linecap=/g, "strokeLinecap=")
    .replace(/stroke-linejoin=/g, "strokeLinejoin=")
    .replace(/fill-rule=/g, "fillRule=")
    .replace(/clip-rule=/g, "clipRule=")
    .replace(/clip-path=/g, "clipPath=")
    // Remplace les couleurs fixes par currentColor
    .replace(/fill="(?!none)[^"]*"/gi, 'fill="currentColor"')
    .replace(/stroke="(?!none)[^"]*"/gi, 'stroke="currentColor"');

  // Injecte width="1em", height="1em" et {...props} dans la balise <svg>
  cleanedSvg = cleanedSvg.replace(
    /<svg([^>]*)>/,
    `<svg$1 width="1em" height="1em" fill="none" {...props}>`,
  );

  return `import * as React from "react";
import type { SVGProps } from "react";

export const ${componentName} = (props: SVGProps<SVGSVGElement>) => (
${cleanedSvg.trim()}
);

export default ${componentName};
`;
}

function generate() {
  if (!fs.existsSync(SVG_DIR)) {
    fs.mkdirSync(SVG_DIR, { recursive: true });
    console.log(
      `📁 Dossier source créé : ${SVG_DIR}. Dépose tes fichiers .svg dedans !`,
    );
    return;
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = fs.readdirSync(SVG_DIR).filter((file) => file.endsWith(".svg"));

  if (files.length === 0) {
    console.log(`⚠️ Aucun fichier .svg trouvé dans ${SVG_DIR}`);
    return;
  }

  const indexExports = [];

  files.forEach((file) => {
    const rawName = sanitizeFileName(file);
    const componentName = `${toPascalCase(rawName)}Icon`;
    const filePath = path.join(SVG_DIR, file);
    const svgContent = fs.readFileSync(filePath, "utf8");

    const tsxCode = transformSvgToReact(svgContent, componentName);
    const outputPath = path.join(OUTPUT_DIR, `${componentName}.tsx`);

    fs.writeFileSync(outputPath, tsxCode, "utf8");
    indexExports.push(
      `export { default as ${componentName} } from "./${componentName}";`,
    );
    console.log(`✅ Généré : ${componentName}.tsx`);
  });

  // Génère un fichier index.ts pour tout importer facilement
  fs.writeFileSync(
    path.join(OUTPUT_DIR, "index.ts"),
    indexExports.join("\n"),
    "utf8",
  );
  console.log(
    `\n🎉 ${files.length} icônes générées dans ${OUTPUT_DIR} avec un index.ts !`,
  );
}

generate();
