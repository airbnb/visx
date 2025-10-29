/* eslint-disable */

/**
 * Custom script to extract component documentation from TypeScript files
 * This generates a JSON file that matches the react-docgen-typescript-loader format
 * for compatibility with the existing demo site.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';
import glob from 'fast-glob';

interface PropInfo {
  // e.g., { value: '5' }
  defaultValue?: { value?: unknown };
  // JSDoc description
  description?: string;
  // Prop
  name: string;
  // Is the prop required
  required: boolean;
  // e.g., { name: 'string' }
  type?: { name: string };
}

interface ParamInfo {
  // Parameter
  name: string;
  // JSDoc description
  description?: string;
  // e.g., { name: 'string' }
  type?: { name: string };
  // e.g., { value: '5' }
  defaultValue?: { value?: unknown };
}

interface DocGenInfo {
  // Overall component/function description
  description?: string;
  // Display name of the component/function
  displayName?: string;
  // For components/hooks - their props/return values
  props: { [propName: string]: PropInfo };
  // For utility functions - their parameters and return type
  kind?: 'component' | 'hook' | 'function';
  // Function parameters
  parameters?: ParamInfo[];
  // Function return type
  returnType?: string;
  // Source file information for "View Source" links
  filePath?: string;
  // 1-indexed line number
  lineNumber?: number;
}

// Mapping of component name to its documentation
interface ComponentDocs {
  [componentName: string]: DocGenInfo;
}

// Mapping of package name to its components' documentation
interface PackageDocs {
  [packageName: string]: ComponentDocs;
}

/**
 * Extract JSDoc comment from a node
 */
function extractJSDocComment(node: ts.Node): string | undefined {
  const sourceFile = node.getSourceFile();
  const fullText = sourceFile.getFullText();

  // Get leading comments
  const commentRanges = ts.getLeadingCommentRanges(fullText, node.getFullStart());
  if (!commentRanges || commentRanges.length === 0) {
    return undefined;
  }

  // Get the last comment (closest to the node)
  const lastComment = commentRanges[commentRanges.length - 1];
  let commentText = fullText.substring(lastComment.pos, lastComment.end);

  // Clean up JSDoc comment
  commentText = commentText
    .replace(/^\/\*\*/, '') // Remove opening /**
    .replace(/\*\/$/, '') // Remove closing */
    .split('\n')
    .map((line) => line.trim().replace(/^\* ?/, '')) // Remove leading * from each line
    .join('\n')
    .trim();

  return commentText || undefined;
}

/**
 * Get a readable type string from a ts.Type
 */
function getTypeString(type: ts.Type, checker: ts.TypeChecker): string {
  // Get the type string, but clean it up for readability
  const typeString = checker.typeToString(type, undefined, ts.TypeFormatFlags.NoTruncation);

  // Clean up React types
  return typeString
    .replace(/import\(".*?"\)\./g, '') // Remove import paths
    .replace(/React\./g, ''); // Remove React. prefix
}

/**
 * Extract default values from function parameter destructuring
 * e.g., function Foo({ bar = 5, baz = 'hello' }) => { bar: '5', baz: "'hello'" }
 */
function extractParameterDefaults(
  functionNode: ts.FunctionDeclaration | ts.ArrowFunction | ts.FunctionExpression,
): Map<string, string> {
  const defaults = new Map<string, string>();

  if (!functionNode.parameters || functionNode.parameters.length === 0) {
    return defaults;
  }

  // Get the first parameter (props parameter)
  const propsParam = functionNode.parameters[0];

  // Check if it's a destructuring binding pattern
  if (propsParam.name && ts.isObjectBindingPattern(propsParam.name)) {
    propsParam.name.elements.forEach((element) => {
      if (ts.isBindingElement(element) && element.initializer) {
        const paramName = element.name.getText();
        const defaultValue = element.initializer.getText();
        defaults.set(paramName, defaultValue);
      }
    });
  }

  return defaults;
}

/**
 * Extract function parameters as ParamInfo[]
 */
function extractFunctionParameters(
  functionNode: ts.FunctionDeclaration | ts.ArrowFunction | ts.FunctionExpression,
  checker: ts.TypeChecker,
): ParamInfo[] {
  const parameters: ParamInfo[] = [];

  if (!functionNode.parameters || functionNode.parameters.length === 0) {
    return parameters;
  }

  functionNode.parameters.forEach((param) => {
    const paramName = param.name.getText();

    let paramType: ts.Type | undefined;
    if (param.type) {
      paramType = checker.getTypeFromTypeNode(param.type);
    }

    let defaultValue: { value?: unknown } | undefined;
    if (param.initializer) {
      defaultValue = { value: param.initializer.getText() };
    }

    // Try to extract JSDoc for the parameter
    const jsDocComment = extractJSDocComment(param);

    parameters.push({
      name: paramName,
      description: jsDocComment,
      type: paramType ? { name: getTypeString(paramType, checker) } : undefined,
      defaultValue,
    });
  });

  return parameters;
}

/**
 * Extract props information from a ts.Type
 */
function extractPropsFromType(
  type: ts.Type,
  checker: ts.TypeChecker,
  sourceFile: ts.SourceFile,
  parameterDefaults?: Map<string, string>,
): { [propName: string]: PropInfo } {
  const props: { [propName: string]: PropInfo } = {};

  // Get properties from the type
  const properties = type.getProperties();

  for (const prop of properties) {
    const propName = prop.getName();

    // Skip internal React props
    if (
      propName === 'children' &&
      prop.declarations?.[0]?.getSourceFile().fileName.includes('node_modules')
    ) {
      continue;
    }

    // Skip props from node_modules (inherited HTML/SVG props)
    if (prop.declarations?.some((decl) => decl.getSourceFile().fileName.includes('node_modules'))) {
      continue;
    }

    // Skip props without declarations
    if (!prop.declarations || prop.declarations.length === 0) {
      continue;
    }

    const propType = checker.getTypeOfSymbolAtLocation(prop, prop.declarations[0]);
    const propDeclaration = prop.declarations[0];

    // Check if required (not optional)
    const isOptional = (prop.flags & ts.SymbolFlags.Optional) !== 0;
    const required = !isOptional;

    // Get JSDoc comment
    const description = propDeclaration ? extractJSDocComment(propDeclaration) : undefined;

    // Get default value if available
    let defaultValue: { value?: unknown } | undefined;

    // First check function parameter defaults
    if (parameterDefaults && parameterDefaults.has(propName)) {
      defaultValue = { value: parameterDefaults.get(propName) };
    }
    // Then check property declaration initializers
    else if (
      propDeclaration &&
      ts.isPropertyDeclaration(propDeclaration) &&
      propDeclaration.initializer
    ) {
      const initText = propDeclaration.initializer.getText();
      defaultValue = { value: initText };
    }

    props[propName] = {
      name: propName,
      required,
      description,
      type: { name: getTypeString(propType, checker) },
      defaultValue,
    };
  }

  return props;
}

/**
 * Determine what kind of export this is
 */
function getExportKind(name: string): 'component' | 'hook' | 'function' {
  if (name.startsWith('use')) return 'hook';
  // Simple heuristic: starts with capital = component, lowercase = function
  if (name[0] === name[0].toUpperCase()) return 'component';
  return 'function';
}

/**
 * Get the relative file path and line number for a node
 */
function getSourceLocation(node: ts.Node): { filePath: string; lineNumber: number } {
  const sourceFile = node.getSourceFile();
  const { line } = sourceFile.getLineAndCharacterOfPosition(node.getStart());

  // Get path relative to repo root (remove everything before /packages/)
  const fullPath = sourceFile.fileName;
  const match = fullPath.match(/packages\/(.+)$/);
  const filePath = match ? match[1] : fullPath;

  return {
    filePath,
    lineNumber: line + 1, // Line numbers are 0-indexed, GitHub uses 1-indexed
  };
}

/**
 * Extract component documentation from a source file
 */
function extractComponentDocs(sourceFile: ts.SourceFile, checker: ts.TypeChecker): ComponentDocs {
  const docs: ComponentDocs = {};
  const allVariableDeclarations = new Map<string, ts.VariableDeclaration>();
  const allFunctionDeclarations = new Map<string, ts.FunctionDeclaration>();

  function visit(node: ts.Node) {
    // Collect all variable declarations for later lookup (for export default cases)
    if (ts.isVariableStatement(node)) {
      node.declarationList.declarations.forEach((decl) => {
        if (ts.isVariableDeclaration(decl) && decl.name && ts.isIdentifier(decl.name)) {
          allVariableDeclarations.set(decl.name.text, decl);
        }
      });
    }

    // Collect all function declarations for later lookup (for export default cases)
    if (ts.isFunctionDeclaration(node) && node.name) {
      allFunctionDeclarations.set(node.name.text, node);
    }
    // Look for class components (handle both export class and class that's exported as default)
    if (ts.isClassDeclaration(node) && node.name) {
      const componentName = node.name.text;
      const kind = getExportKind(componentName);
      const description = extractJSDocComment(node);

      // Check if it has a heritage clause (extends Component)
      if (node.heritageClauses) {
        for (const clause of node.heritageClauses) {
          for (const type of clause.types) {
            // Get the type arguments (props type is usually the first)
            if (type.typeArguments && type.typeArguments.length > 0) {
              const propsTypeNode = type.typeArguments[0];
              const propsType = checker.getTypeFromTypeNode(propsTypeNode);
              const props = extractPropsFromType(propsType, checker, sourceFile);
              const { filePath, lineNumber } = getSourceLocation(node);

              docs[componentName] = {
                displayName: componentName,
                description,
                kind,
                props,
                filePath,
                lineNumber,
              };
              break;
            }
          }
        }
      }
    }

    // Look for exported functions (components, hooks, utilities)
    if (
      ts.isFunctionDeclaration(node) &&
      node.modifiers?.some((mod) => mod.kind === ts.SyntaxKind.ExportKeyword) &&
      node.name
    ) {
      const exportName = node.name.text;
      const kind = getExportKind(exportName);
      const description = extractJSDocComment(node);

      const { filePath, lineNumber } = getSourceLocation(node);

      if (kind === 'function') {
        // Utility function - extract parameters and return type
        const parameters = extractFunctionParameters(node, checker);
        let returnType: string | undefined;
        if (node.type) {
          const returnTypeObj = checker.getTypeFromTypeNode(node.type);
          returnType = getTypeString(returnTypeObj, checker);
        }

        docs[exportName] = {
          displayName: exportName,
          description,
          kind,
          props: {},
          parameters,
          returnType,
          filePath,
          lineNumber,
        };
      } else {
        // Component or hook - extract props/return type
        const isHook = kind === 'hook';
        let propsType: ts.Type | undefined;

        if (isHook && node.type) {
          // Get return type from type annotation for hooks
          propsType = checker.getTypeFromTypeNode(node.type);
        } else {
          // Get the first parameter (props) for components
          const propsParam = node.parameters[0];
          if (propsParam?.type) {
            propsType = checker.getTypeFromTypeNode(propsParam.type);
          }
        }

        if (propsType) {
          // Extract parameter defaults for components (not hooks)
          const parameterDefaults = isHook ? undefined : extractParameterDefaults(node);
          const props = extractPropsFromType(propsType, checker, sourceFile, parameterDefaults);

          docs[exportName] = {
            displayName: exportName,
            description,
            kind,
            props,
            filePath,
            lineNumber,
          };
        }
      }
    }

    // Look for exported variable declarations (arrow functions)
    if (
      ts.isVariableStatement(node) &&
      node.modifiers?.some((mod) => mod.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      node.declarationList.declarations.forEach((decl) => {
        if (ts.isVariableDeclaration(decl) && decl.name && ts.isIdentifier(decl.name)) {
          const exportName = decl.name.text;
          const kind = getExportKind(exportName);
          const description = extractJSDocComment(node);

          // Check if it's a function (arrow function, React.FC, or React.forwardRef)
          if (
            decl.initializer &&
            (ts.isArrowFunction(decl.initializer) || ts.isCallExpression(decl.initializer))
          ) {
            // Try to get props type from the type annotation or generic
            let propsType: ts.Type | undefined;
            let functionNode: ts.ArrowFunction | ts.FunctionExpression | undefined;

            if (decl.type) {
              // Has explicit type annotation
              const declType = checker.getTypeFromTypeNode(decl.type);
              // If it's a React component type, extract the props type argument
              const typeArgs = (declType as any).typeArguments;
              if (typeArgs && typeArgs.length > 0) {
                propsType = typeArgs[0];
              }
            } else if (ts.isArrowFunction(decl.initializer)) {
              // Arrow function, get first parameter type
              functionNode = decl.initializer;
              const propsParam = decl.initializer.parameters[0];
              if (propsParam?.type) {
                propsType = checker.getTypeFromTypeNode(propsParam.type);
              }
            } else if (ts.isCallExpression(decl.initializer)) {
              // Could be React.forwardRef or other HOC
              // Check if it has type arguments (e.g., React.forwardRef<HTMLDivElement, TooltipProps>)
              if (decl.initializer.typeArguments && decl.initializer.typeArguments.length >= 2) {
                // For forwardRef, the second type argument is the props type
                propsType = checker.getTypeFromTypeNode(decl.initializer.typeArguments[1]);
              } else if (decl.initializer.arguments.length > 0) {
                // Try to extract from the arrow function passed to forwardRef
                const firstArg = decl.initializer.arguments[0];
                if (ts.isArrowFunction(firstArg) || ts.isFunctionExpression(firstArg)) {
                  functionNode = firstArg;
                  const propsParam = firstArg.parameters[0];
                  if (propsParam?.type) {
                    propsType = checker.getTypeFromTypeNode(propsParam.type);
                  }
                }
              }
            }

            if (propsType) {
              // Extract parameter defaults if we have a function node
              const parameterDefaults = functionNode
                ? extractParameterDefaults(functionNode)
                : undefined;
              const props = extractPropsFromType(propsType, checker, sourceFile, parameterDefaults);
              const { filePath, lineNumber } = getSourceLocation(decl);

              docs[exportName] = {
                displayName: exportName,
                description,
                kind,
                props,
                filePath,
                lineNumber,
              };
            }
          }
        }
      });
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  // Handle export default statements for functions/components not caught above
  sourceFile.forEachChild((node) => {
    if (ts.isExportAssignment(node) && !node.isExportEquals && ts.isIdentifier(node.expression)) {
      const exportedName = node.expression.text;
      const kind = getExportKind(exportedName);

      // Check if it's a function declaration
      const funcDecl = allFunctionDeclarations.get(exportedName);
      if (funcDecl && !docs[exportedName]) {
        const description = extractJSDocComment(funcDecl);
        const { filePath, lineNumber } = getSourceLocation(funcDecl);

        if (kind === 'function') {
          // Utility function - extract parameters and return type
          const parameters = extractFunctionParameters(funcDecl, checker);
          let returnType: string | undefined;
          if (funcDecl.type) {
            const returnTypeObj = checker.getTypeFromTypeNode(funcDecl.type);
            returnType = getTypeString(returnTypeObj, checker);
          }

          docs[exportedName] = {
            displayName: exportedName,
            description,
            kind,
            props: {},
            parameters,
            returnType,
            filePath,
            lineNumber,
          };
        } else {
          // Component or hook
          const isHook = kind === 'hook';
          let propsType: ts.Type | undefined;

          if (isHook && funcDecl.type) {
            // Get return type from type annotation
            propsType = checker.getTypeFromTypeNode(funcDecl.type);
          } else {
            // Get the first parameter (props) for components
            const propsParam = funcDecl.parameters[0];
            if (propsParam?.type) {
              propsType = checker.getTypeFromTypeNode(propsParam.type);
            }
          }

          if (propsType) {
            // Extract parameter defaults for components (not hooks)
            const parameterDefaults = isHook ? undefined : extractParameterDefaults(funcDecl);
            const props = extractPropsFromType(propsType, checker, sourceFile, parameterDefaults);

            docs[exportedName] = {
              displayName: exportedName,
              description,
              kind,
              props,
              filePath,
              lineNumber,
            };
          }
        }
      }

      // Check if it's a variable declaration
      const decl = allVariableDeclarations.get(exportedName);
      if (decl && decl.initializer && !docs[exportedName]) {
        // Process this variable declaration as if it were exported
        if (ts.isArrowFunction(decl.initializer) || ts.isCallExpression(decl.initializer)) {
          const description = extractJSDocComment(decl);
          let propsType: ts.Type | undefined;
          let functionNode: ts.ArrowFunction | ts.FunctionExpression | undefined;

          if (decl.type) {
            const declType = checker.getTypeFromTypeNode(decl.type);
            const typeArgs = (declType as any).typeArguments;
            if (typeArgs && typeArgs.length > 0) {
              propsType = typeArgs[0];
            }
          } else if (ts.isArrowFunction(decl.initializer)) {
            functionNode = decl.initializer;
            const propsParam = decl.initializer.parameters[0];
            if (propsParam?.type) {
              propsType = checker.getTypeFromTypeNode(propsParam.type);
            }
          } else if (ts.isCallExpression(decl.initializer)) {
            // Handle React.forwardRef
            if (decl.initializer.typeArguments && decl.initializer.typeArguments.length >= 2) {
              propsType = checker.getTypeFromTypeNode(decl.initializer.typeArguments[1]);
            } else if (decl.initializer.arguments.length > 0) {
              const firstArg = decl.initializer.arguments[0];
              if (ts.isArrowFunction(firstArg) || ts.isFunctionExpression(firstArg)) {
                functionNode = firstArg;
                const propsParam = firstArg.parameters[0];
                if (propsParam?.type) {
                  propsType = checker.getTypeFromTypeNode(propsParam.type);
                }
              }
            }
          }

          if (propsType) {
            // Extract parameter defaults if we have a function node
            const parameterDefaults = functionNode
              ? extractParameterDefaults(functionNode)
              : undefined;
            const props = extractPropsFromType(propsType, checker, sourceFile, parameterDefaults);
            const { filePath, lineNumber } = getSourceLocation(decl);

            docs[exportedName] = {
              displayName: exportedName,
              description,
              kind,
              props,
              filePath,
              lineNumber,
            };
          }
        }
      }
    }
  });

  return docs;
}

/**
 * Extract export name mappings from index.ts
 * e.g., "export { default as LegendLinear } from './legends/Linear'" -> { Linear: 'LegendLinear' }
 */
function extractExportNameMappings(indexPath: string): Map<string, string> {
  const mappings = new Map<string, string>();

  if (!fs.existsSync(indexPath)) {
    return mappings;
  }

  const sourceFile = ts.createSourceFile(
    indexPath,
    fs.readFileSync(indexPath, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
  );

  sourceFile.forEachChild((node) => {
    // Handle: export { default as ExportName } from './path'
    if (
      ts.isExportDeclaration(node) &&
      node.moduleSpecifier &&
      node.exportClause &&
      ts.isNamedExports(node.exportClause)
    ) {
      node.exportClause.elements.forEach((element) => {
        if (element.propertyName && element.propertyName.text === 'default' && element.name) {
          // Get the source file path from the module specifier
          const modulePath = (node.moduleSpecifier as ts.StringLiteral).text;
          // Extract the original component name from the path (e.g., './legends/Linear' -> 'Linear')
          const originalName = path.basename(modulePath);
          const exportedName = element.name.text;
          mappings.set(originalName, exportedName);
        }
      });
    }
  });

  return mappings;
}

/**
 * Generate documentation for all visx packages
 */
function generateDocsForPackages(): PackageDocs {
  const allDocs: PackageDocs = {};

  // Find all visx packages
  const packagePaths = glob.sync('packages/visx-*/package.json', {
    ignore: [
      '**/node_modules/**',
      'packages/visx-demo/**',
      'packages/visx-vendor/**',
      'packages/visx-visx/**',
    ],
  });

  for (const packagePath of packagePaths) {
    const packageDir = path.dirname(packagePath);
    const packageName = path.basename(packageDir);

    console.log(`Processing ${packageName}...`);

    // Find all component files in src/
    const srcFiles = glob.sync(`${packageDir}/src/**/*.{ts,tsx}`, {
      ignore: ['**/*.test.ts', '**/*.test.tsx', '**/test/**'],
    });

    // Create a TypeScript program for this package
    const tsConfigPath = path.join(packageDir, 'tsconfig.json');
    const configFile = ts.readConfigFile(tsConfigPath, ts.sys.readFile);
    const parsedConfig = ts.parseJsonConfigFileContent(configFile.config, ts.sys, packageDir);

    const program = ts.createProgram(srcFiles, parsedConfig.options);
    const checker = program.getTypeChecker();

    const packageDocs: ComponentDocs = {};

    for (const sourceFile of program.getSourceFiles()) {
      // Only process files in this package
      if (
        sourceFile.fileName.includes(packageDir) &&
        !sourceFile.fileName.includes('node_modules')
      ) {
        const fileDocs = extractComponentDocs(sourceFile, checker);
        Object.assign(packageDocs, fileDocs);
      }
    }

    // Remap component names based on index.ts exports
    const indexPath = path.join(packageDir, 'src/index.ts');
    const exportMappings = extractExportNameMappings(indexPath);

    if (exportMappings.size > 0) {
      const remappedDocs: ComponentDocs = {};
      Object.entries(packageDocs).forEach(([originalName, docInfo]) => {
        const exportedName = exportMappings.get(originalName) || originalName;
        remappedDocs[exportedName] = {
          ...docInfo,
          displayName: exportedName,
        };
      });
      Object.assign(packageDocs, remappedDocs);

      // Remove old names that were remapped
      exportMappings.forEach((exportedName, originalName) => {
        if (exportedName !== originalName && packageDocs[originalName]) {
          delete packageDocs[originalName];
        }
      });
    }

    if (Object.keys(packageDocs).length > 0) {
      allDocs[`@visx/${packageName.replace('visx-', '')}`] = packageDocs;
    }
  }

  return allDocs;
}

/**
 * Main script execution
 */
function main() {
  console.log('Generating component documentation...');

  const docs = generateDocsForPackages();

  // Write to output file
  const outputPath = path.join(__dirname, '../packages/visx-demo/src/generated/docs.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(docs, null, 2));

  const totalComponents = Object.values(docs).reduce(
    (sum, pkg) => sum + Object.keys(pkg).length,
    0,
  );

  console.log(
    `✓ Generated documentation for ${totalComponents} components across ${
      Object.keys(docs).length
    } packages`,
  );
  console.log(`✓ Output written to ${outputPath}`);
}

main();
