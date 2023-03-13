import {
  ChakraTheme,
  ComponentStyleConfig,
  extendTheme,
} from "@chakra-ui/react";

// Global styles
const styles: ChakraTheme["styles"] = {
  global: {
    "html, body": {
      color: "font.secondary",
      backgroundColor: "background.primary",
    },
  },
};

const fonts: ChakraTheme["fonts"] = {
  body: '"Poppins", sans-serif',
  heading: '"Poppins", sans-serif',
};

const textStylesGeneral = {
  fontWeight: "semibold",
  lineHeight: "shorter",
  color: "font.primary",
};

const textStyles: ChakraTheme["textStyles"] = {
  h1: {
    fontSize: ["2xl", "3xl", "4xl"],
    ...textStylesGeneral,
  },
  h2: {
    fontSize: ["xl", "2xl", "3xl"],
    ...textStylesGeneral,
  },
  h3: {
    fontSize: ["lg", "xl", "2xl"],
    ...textStylesGeneral,
  },
  h4: {
    fontSize: ["md", "lg", "xl"],
    ...textStylesGeneral,
  },
  h5: {
    fontSize: ["sm", "md", "lg"],
    ...textStylesGeneral,
  },
  h6: {
    fontSize: ["xs", "sm", "md"],
    ...textStylesGeneral,
  },
};

const colors: ChakraTheme["colors"] = {
  font: {
    primary: "white",
    secondary: "#A5A9C5",
  },
  background: {
    primary: "#11090D",
    surface: "rgba(165, 169, 197, 0.25)",
    overlay: "rgba(0, 0, 0, 0.4)",
  },
  semantic: {
    success: "#00FF00",
    error: "#FF0000",
    warning: "#FFA500",
    info: "#0000FF",
  },
};

const layerStyles: ChakraTheme["layerStyles"] = {
  glassSurface: {
    bg: "linear-gradient(180deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0));",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
};

const borderRadius = {
  radii: {
    none: "0",
    sm: "0.125rem",
    base: "1rem",
    md: "1.5rem",
    lg: "2rem",
    "2xl": "2.5rem",
    "3xl": "3rem",
    full: "9999px",
  },
};

// Components
const Heading: ComponentStyleConfig = {
  baseStyle: {
    color: "font.primary",
  },
};

// Variants and sizes override global values, this is a limitiation of Chakra buttons :|
// I preffer use this instead of !important for global styling
const buttonSizes = ["sm", "md", "lg"].reduce(
  (sizes: { [key: string]: any }, size) => {
    sizes[size] = {
      padding: "2em 3em",
    };
    return sizes;
  },
  {}
);

const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: "regular",
    color: "font.primary",
    borderRadius: "base",
  },
  sizes: {
    ...buttonSizes,
    xs: {
      padding: "2em 2.5em",
    },
  },
  variants: {
    primary: {
      layerStyle: "glassSurface",
      backgroundColor: "black",
    },
    tertiary: {
      bg: "transparent",
    },
  },
  defaultProps: {
    variant: "primary",
    size: "sm",
  },
};

const Input: ComponentStyleConfig = {
  variants: {
    default: {
      field: {
        backgroundColor: "background.surface",
        border: "none",
        padding: "2em",
      },
    },
  },
  defaultProps: {
    variant: "default",
  },
};

const Modal: ComponentStyleConfig = {
  baseStyle: {
    overlay: {
      bg: "background.overlay",
    },
    dialog: {
      bg: "background.primary",
    },
    header: {
      color: "font.primary",
    },
  },
};

const Drawer: ComponentStyleConfig = {
  parts: ["dialog", "body", "panels"],
  baseStyle: {
    dialog: {
      bg: "background.primary",
    },
  },
};

const Spinner: ComponentStyleConfig = {
  baseStyle: {
    color: "font.primary",
  },
};

const theme = extendTheme({
  styles,
  fonts,
  textStyles,
  colors,
  layerStyles,
  ...borderRadius,
  components: { Button, Drawer, Heading, Input, Modal, Spinner },
});

export default theme;
