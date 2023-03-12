import { ComponentStyleConfig, extendTheme } from "@chakra-ui/react";

// Global styles
const styles = {
  global: {
    "html, body": {
      color: "font.secondary",
      backgroundColor: "backgrounds.primary",
    },
  },
};

const fonts = {
  body: '"Poppins", sans-serif',
  heading: '"Poppins", sans-serif',
};

const colors = {
  font: {
    primary: "white",
    secondary: "#A5A9C5",
  },
  background: {
    primary: "11090D",
    surface: "rbga(165,169,197,0.25)",
    overlay: "rgba(0, 0, 0, 0.4)",
  },
  semantic: {
    success: "#00FF00",
    error: "#FF0000",
    warning: "#FFA500",
    info: "#0000FF",
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
    borderRadius: "1.25em",
  },
  sizes: {
    ...buttonSizes,
    xs: {
      padding: "2em 2.5em",
    },
  },
  defaultProps: {
    variant: "solid",
    size: "sm",
  },
};

const Modal: ComponentStyleConfig = {
  baseStyle: {
    overlay: {
      bg: "backgrounds.overlay",
    },
    dialog: {
      bg: "backgrounds.primary",
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
      bg: "backgrounds.primary",
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
  colors,
  components: { Button, Drawer, Heading, Modal, Spinner },
});

export default theme;
