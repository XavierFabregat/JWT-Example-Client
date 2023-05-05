
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: "src/graphql/Queries/*.graphql",
  generates: {
    "src/graphql/hooks/index.tsx": {
      // preset: "client",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo"
      ],
      config: {
        withHOC: false,
        withComponent: false,
        withHooks: true
      }
    }
  }
};

export default config;
