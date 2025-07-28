// Enhanced Theme Configuration for Ant Design React Application
// This configuration covers all aspects needed for a large-scale project

// Color palette configuration
const colorPalette = {
  // Primary colors
  primary: {
    50: '#e6f4ff',
    100: '#bae0ff',
    200: '#91caff',
    300: '#69b1ff',
    400: '#4096ff',
    500: '#1677ff', // Main primary
    600: '#0958d9',
    700: '#003eb3',
    800: '#002c8c',
    900: '#001d66',
  },
  
  // Secondary colors
  secondary: {
    50: '#e6fff9',
    100: '#b3ffec',
    200: '#80ffe0',
    300: '#4dffd3',
    400: '#1affc7',
    500: '#00e6b8', // Main secondary
    600: '#00b394',
    700: '#008070',
    800: '#004d4c',
    900: '#001a28',
  },
  
  // Neutral/Gray colors
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#f0f0f0',
    300: '#d9d9d9',
    400: '#bfbfbf',
    500: '#8c8c8c',
    600: '#595959',
    700: '#434343',
    800: '#262626',
    900: '#141414',
  },
  
  // Status colors
  success: {
    50: '#f6ffed',
    100: '#d9f7be',
    200: '#b7eb8f',
    300: '#95de64',
    400: '#73d13d',
    500: '#52c41a', // Main success
    600: '#389e0d',
    700: '#237804',
    800: '#135200',
    900: '#092b00',
  },
  
  warning: {
    50: '#fffbe6',
    100: '#fff1b8',
    200: '#ffe58f',
    300: '#ffd666',
    400: '#ffc53d',
    500: '#faad14', // Main warning
    600: '#d48806',
    700: '#ad6800',
    800: '#874d00',
    900: '#613400',
  },
  
  error: {
    50: '#fff2f0',
    100: '#ffccc7',
    200: '#ffa39e',
    300: '#ff7875',
    400: '#ff4d4f',
    500: '#f5222d', // Main error
    600: '#cf1322',
    700: '#a8071a',
    800: '#820014',
    900: '#5c0011',
  },
  
  info: {
    50: '#e6f4ff',
    100: '#bae0ff',
    200: '#91caff',
    300: '#69b1ff',
    400: '#4096ff',
    500: '#1677ff', // Main info
    600: '#0958d9',
    700: '#003eb3',
    800: '#002c8c',
    900: '#001d66',
  },
};

// Typography configuration
const typography = {
  fontFamily: {
    primary: '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    secondary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    display: '"Poppins", "DM Sans", sans-serif',
  },
  
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
    '8xl': 96,
    '9xl': 128,
  },
  
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
};

// Spacing configuration
const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  44: 176,
  48: 192,
  52: 208,
  56: 224,
  60: 240,
  64: 256,
  72: 288,
  80: 320,
  96: 384,
};

// Border radius configuration
const borderRadius = {
  none: 0,
  sm: 2,
  base: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  full: 9999,
};

// Shadow configuration
const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
};

// Animation configuration
const animations = {
  duration: {
    fastest: 150,
    faster: 200,
    fast: 250,
    normal: 300,
    slow: 500,
    slower: 750,
    slowest: 1000,
  },
  
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    linear: 'linear',
    bounceIn: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    bounceOut: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
};

// Z-index configuration
const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

// Breakpoints configuration
const breakpoints = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  '2xl': 1600,
};

// Main Ant Design theme configuration
export const customTheme = {
  // Basic tokens
  colorPrimary: colorPalette.primary[500],
  colorSuccess: colorPalette.success[500],
  colorWarning: colorPalette.warning[500],
  colorError: colorPalette.error[500],
  colorInfo: colorPalette.info[500],
  
  // Typography
  fontFamily: typography.fontFamily.primary,
  fontSize: typography.fontSize.base,
  fontSizeHeading1: typography.fontSize['5xl'],
  fontSizeHeading2: typography.fontSize['4xl'],
  fontSizeHeading3: typography.fontSize['3xl'],
  fontSizeHeading4: typography.fontSize['2xl'],
  fontSizeHeading5: typography.fontSize.xl,
  fontSizeHeading6: typography.fontSize.lg,
  fontSizeLG: typography.fontSize.md,
  fontSizeSM: typography.fontSize.sm,
  fontSizeXL: typography.fontSize.lg,
  
  // Line heights
  lineHeight: typography.lineHeight.normal,
  lineHeightHeading1: typography.lineHeight.tight,
  lineHeightHeading2: typography.lineHeight.tight,
  lineHeightHeading3: typography.lineHeight.tight,
  lineHeightHeading4: typography.lineHeight.snug,
  lineHeightHeading5: typography.lineHeight.snug,
  lineHeightHeading6: typography.lineHeight.snug,
  lineHeightLG: typography.lineHeight.relaxed,
  lineHeightSM: typography.lineHeight.normal,
  
  // Spacing
  margin: spacing[4],
  marginLG: spacing[6],
  marginSM: spacing[3],
  marginXL: spacing[8],
  marginXS: spacing[2],
  marginXXL: spacing[12],
  marginXXS: spacing[1],
  
  padding: spacing[4],
  paddingLG: spacing[6],
  paddingSM: spacing[3],
  paddingXL: spacing[8],
  paddingXS: spacing[2],
  paddingXXL: spacing[12],
  paddingXXS: spacing[1],
  
  // Border radius
  borderRadius: borderRadius.md,
  borderRadiusLG: borderRadius.lg,
  borderRadiusOuter: borderRadius.base,
  borderRadiusSM: borderRadius.sm,
  borderRadiusXS: borderRadius.sm,
  
  // Control heights
  controlHeight: 32,
  controlHeightLG: 40,
  controlHeightSM: 24,
  controlHeightXS: 16,
  
  // Layout
  layoutHeaderHeight: 64,
  layoutFooterHeight: 64,
  layoutSiderWidth: 200,
  layoutTriggerHeight: 48,
  
  // Animation
  motionDurationFast: `${animations.duration.fast}ms`,
  motionDurationMid: `${animations.duration.normal}ms`,
  motionDurationSlow: `${animations.duration.slow}ms`,
  motionEaseInOut: animations.easing.easeInOut,
  motionEaseInOutCirc: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
  motionEaseOut: animations.easing.easeOut,
  motionEaseOutBack: 'cubic-bezier(0.12, 0.4, 0.29, 1.46)',
  motionEaseOutCirc: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
  motionEaseOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
  
  // Box shadow
  boxShadow: shadows.base,
  boxShadowPopoverArrow: shadows.sm,
  boxShadowCard: shadows.md,
  boxShadowDrawerRight: shadows.xl,
  boxShadowDrawerLeft: shadows.xl,
  boxShadowDrawerUp: shadows.xl,
  boxShadowDrawerDown: shadows.xl,
  boxShadowTabsDropdown: shadows.lg,
  
  // Screen sizes
  screenXS: breakpoints.xs,
  screenSM: breakpoints.sm,
  screenMD: breakpoints.md,
  screenLG: breakpoints.lg,
  screenXL: breakpoints.xl,
  screenXXL: breakpoints['2xl'],
  
  // Z-index
  zIndexBase: zIndex.base,
  zIndexPopupBase: zIndex.dropdown,
  
  // Wireframe (set to false for styled components)
  wireframe: false,
  
  // Component-specific overrides
  components: {
    // Button component
    Button: {
      borderRadius: borderRadius.md,
      controlHeight: 40,
      controlHeightLG: 48,
      controlHeightSM: 32,
      fontWeight: typography.fontWeight.medium,
      paddingInline: spacing[4],
      paddingInlineLG: spacing[6],
      paddingInlineSM: spacing[3],
    },
    
    // Input component
    Input: {
      borderRadius: borderRadius.md,
      controlHeight: 40,
      controlHeightLG: 48,
      controlHeightSM: 32,
      paddingInline: spacing[3],
      paddingInlineLG: spacing[4],
      paddingInlineSM: spacing[2],
    },
    
    // Card component
    Card: {
      borderRadius: borderRadius.lg,
      boxShadow: shadows.base,
      paddingLG: spacing[6],
      padding: spacing[5],
      paddingSM: spacing[4],
    },
    
    // Table component
    Table: {
      borderRadius: borderRadius.md,
      cellPaddingBlock: spacing[3],
      cellPaddingInline: spacing[4],
      headerBg: colorPalette.neutral[50],
      headerColor: colorPalette.neutral[800],
      headerSortActiveBg: colorPalette.neutral[100],
      headerSortHoverBg: colorPalette.neutral[75],
    },
    
    // Menu component
    Menu: {
      borderRadius: borderRadius.base,
      itemBorderRadius: borderRadius.base,
      itemHeight: 40,
      itemMarginBlock: 2,
      itemMarginInline: 4,
      itemPaddingInline: spacing[3],
      subMenuItemBorderRadius: borderRadius.base,
    },
    
    // Modal component
    Modal: {
      borderRadius: borderRadius.lg,
      contentBg: '#ffffff',
      headerBg: '#ffffff',
      footerBg: '#ffffff',
      padding: spacing[6],
      paddingLG: spacing[8],
    },
    
    // Drawer component
    Drawer: {
      borderRadius: borderRadius.lg,
      padding: spacing[6],
      paddingLG: spacing[8],
    },
    
    // Notification component
    Notification: {
      borderRadius: borderRadius.lg,
      padding: spacing[4],
      paddingLG: spacing[5],
    },
    
    // Message component
    Message: {
      borderRadius: borderRadius.lg,
      contentPadding: `${spacing[2]}px ${spacing[4]}px`,
    },
    
    // Tabs component
    Tabs: {
      borderRadius: borderRadius.md,
      cardBg: colorPalette.neutral[50],
      cardHeight: 40,
      cardPadding: `${spacing[2]}px ${spacing[4]}px`,
      horizontalItemGutter: spacing[8],
      horizontalItemPadding: `${spacing[3]}px 0`,
      inkBarColor: colorPalette.primary[500],
      itemActiveColor: colorPalette.primary[500],
      itemColor: colorPalette.neutral[600],
      itemHoverColor: colorPalette.primary[400],
      itemSelectedColor: colorPalette.primary[500],
      titleFontSize: typography.fontSize.base,
      titleFontSizeLG: typography.fontSize.md,
      titleFontSizeSM: typography.fontSize.sm,
    },
    
    // Form component
    Form: {
      itemMarginBottom: spacing[6],
      labelColor: colorPalette.neutral[800],
      labelFontSize: typography.fontSize.base,
      labelHeight: 32,
      verticalLabelPadding: `0 0 ${spacing[2]}px`,
    },
    
    // Select component
    Select: {
      borderRadius: borderRadius.md,
      controlHeight: 40,
      controlHeightLG: 48,
      controlHeightSM: 32,
      optionPadding: `${spacing[2]}px ${spacing[3]}px`,
      singleItemHeightLG: 40,
      singleItemHeightSM: 32,
    },
    
    // DatePicker component
    DatePicker: {
      borderRadius: borderRadius.md,
      controlHeight: 40,
      controlHeightLG: 48,
      controlHeightSM: 32,
    },
    
    // Upload component
    Upload: {
      borderRadius: borderRadius.md,
    },
    
    // Progress component
    Progress: {
      borderRadius: borderRadius.full,
      lineBorderRadius: borderRadius.full,
      circleTextFontSize: typography.fontSize.xl,
      circleTextFontSizeSM: typography.fontSize.base,
    },
    
    // Avatar component
    Avatar: {
      borderRadius: borderRadius.full,
      containerSize: 32,
      containerSizeLG: 40,
      containerSizeSM: 24,
      fontSize: typography.fontSize.base,
      fontSizeLG: typography.fontSize.lg,
      fontSizeSM: typography.fontSize.sm,
    },
    
    // Badge component
    Badge: {
      borderRadius: borderRadius.full,
      fontSize: typography.fontSize.xs,
      fontSizeSM: 10,
      height: 20,
      heightSM: 16,
      padding: `0 ${spacing[2]}px`,
      paddingSM: `0 ${spacing[1]}px`,
    },
    
    // Tag component
    Tag: {
      borderRadius: borderRadius.base,
      fontSize: typography.fontSize.sm,
      fontSizeSM: typography.fontSize.xs,
      lineHeight: typography.lineHeight.snug,
      padding: `${spacing[1]}px ${spacing[2]}px`,
      paddingSM: `0 ${spacing[1]}px`,
    },
    
    // Tooltip component
    Tooltip: {
      borderRadius: borderRadius.md,
      fontSize: typography.fontSize.sm,
      padding: `${spacing[2]}px ${spacing[3]}px`,
    },
    
    // Popover component
    Popover: {
      borderRadius: borderRadius.lg,
      fontSize: typography.fontSize.base,
      minWidth: 177,
      padding: spacing[3],
      paddingLG: spacing[4],
    },
    
    // Collapse component
    Collapse: {
      borderRadius: borderRadius.md,
      contentPadding: `${spacing[4]}px ${spacing[4]}px`,
      headerPadding: `${spacing[3]}px ${spacing[4]}px`,
    },
    
    // Timeline component
    Timeline: {
      dotBorderWidth: 2,
      itemPaddingBottom: spacing[5],
      tailColor: colorPalette.neutral[300],
      tailWidth: 2,
    },
    
    // Steps component
    Steps: {
      borderRadius: borderRadius.full,
      dotSize: 32,
      dotSizeSM: 24,
      fontSize: typography.fontSize.base,
      fontSizeSM: typography.fontSize.sm,
      iconSize: 16,
      iconSizeSM: 12,
      titleLineHeight: typography.lineHeight.snug,
    },
    
    // Anchor component
    Anchor: {
      borderRadius: borderRadius.base,
      fontSize: typography.fontSize.base,
      linkPadding: `${spacing[1]}px 0`,
    },
    
    // BackTop component
    BackTop: {
      borderRadius: borderRadius.full,
      fontSize: typography.fontSize.lg,
      height: 40,
      width: 40,
    },
    
    // Affix component
    Affix: {
      borderRadius: borderRadius.md,
    },
    
    // Layout component
    Layout: {
      bodyBg: '#ffffff',
      footerBg: colorPalette.neutral[50],
      footerPadding: `${spacing[6]}px ${spacing[12]}px`,
      headerBg: '#ffffff',
      headerHeight: 64,
      headerPadding: `0 ${spacing[12]}px`,
      lightSiderBg: '#ffffff',
      lightTriggerBg: '#ffffff',
      lightTriggerColor: colorPalette.neutral[600],
      siderBg: colorPalette.neutral[800],
      triggerBg: colorPalette.neutral[700],
      triggerColor: '#ffffff',
      triggerHeight: 48,
      zeroTriggerHeight: 42,
      zeroTriggerWidth: 36,
    },
    
    // Breadcrumb component
    Breadcrumb: {
      borderRadius: borderRadius.base,
      fontSize: typography.fontSize.base,
      fontSizeSM: typography.fontSize.sm,
      itemColor: colorPalette.neutral[600],
      lastItemColor: colorPalette.neutral[800],
      linkColor: colorPalette.neutral[600],
      linkHoverColor: colorPalette.primary[500],
      separatorColor: colorPalette.neutral[400],
      separatorMargin: spacing[2],
    },
  },
};

// CSS root variables for theme colors, typography, and spacing
export const themeRootCss = `
  :root {
    /* Color Palette */
    --primary-50: ${colorPalette.primary[50]};
    --primary-100: ${colorPalette.primary[100]};
    --primary-200: ${colorPalette.primary[200]};
    --primary-300: ${colorPalette.primary[300]};
    --primary-400: ${colorPalette.primary[400]};
    --primary-500: ${colorPalette.primary[500]};
    --primary-600: ${colorPalette.primary[600]};
    --primary-700: ${colorPalette.primary[700]};
    --primary-800: ${colorPalette.primary[800]};
    --primary-900: ${colorPalette.primary[900]};
    
    --secondary-50: ${colorPalette.secondary[50]};
    --secondary-100: ${colorPalette.secondary[100]};
    --secondary-200: ${colorPalette.secondary[200]};
    --secondary-300: ${colorPalette.secondary[300]};
    --secondary-400: ${colorPalette.secondary[400]};
    --secondary-500: ${colorPalette.secondary[500]};
    --secondary-600: ${colorPalette.secondary[600]};
    --secondary-700: ${colorPalette.secondary[700]};
    --secondary-800: ${colorPalette.secondary[800]};
    --secondary-900: ${colorPalette.secondary[900]};
    
    --neutral-50: ${colorPalette.neutral[50]};
    --neutral-100: ${colorPalette.neutral[100]};
    --neutral-200: ${colorPalette.neutral[200]};
    --neutral-300: ${colorPalette.neutral[300]};
    --neutral-400: ${colorPalette.neutral[400]};
    --neutral-500: ${colorPalette.neutral[500]};
    --neutral-600: ${colorPalette.neutral[600]};
    --neutral-700: ${colorPalette.neutral[700]};
    --neutral-800: ${colorPalette.neutral[800]};
    --neutral-900: ${colorPalette.neutral[900]};
    
    --success-50: ${colorPalette.success[50]};
    --success-500: ${colorPalette.success[500]};
    --success-600: ${colorPalette.success[600]};
    
    --warning-50: ${colorPalette.warning[50]};
    --warning-500: ${colorPalette.warning[500]};
    --warning-600: ${colorPalette.warning[600]};
    
    --error-50: ${colorPalette.error[50]};
    --error-500: ${colorPalette.error[500]};
    --error-600: ${colorPalette.error[600]};
    
    --info-50: ${colorPalette.info[50]};
    --info-500: ${colorPalette.info[500]};
    --info-600: ${colorPalette.info[600]};
    
    /* Typography */
    --font-family-primary: ${typography.fontFamily.primary};
    --font-family-secondary: ${typography.fontFamily.secondary};
    --font-family-mono: ${typography.fontFamily.mono};
    --font-family-display: ${typography.fontFamily.display};
    
    --font-size-xs: ${typography.fontSize.xs}px;
    --font-size-sm: ${typography.fontSize.sm}px;
    --font-size-base: ${typography.fontSize.base}px;
    --font-size-md: ${typography.fontSize.md}px;
    --font-size-lg: ${typography.fontSize.lg}px;
    --font-size-xl: ${typography.fontSize.xl}px;
    --font-size-2xl: ${typography.fontSize['2xl']}px;
    --font-size-3xl: ${typography.fontSize['3xl']}px;
    --font-size-4xl: ${typography.fontSize['4xl']}px;
    --font-size-5xl: ${typography.fontSize['5xl']}px;
    --font-size-6xl: ${typography.fontSize['6xl']}px;
    
    --font-weight-thin: ${typography.fontWeight.thin};
    --font-weight-light: ${typography.fontWeight.light};
    --font-weight-normal: ${typography.fontWeight.normal};
    --font-weight-medium: ${typography.fontWeight.medium};
    --font-weight-semibold: ${typography.fontWeight.semibold};
    --font-weight-bold: ${typography.fontWeight.bold};
    --font-weight-extrabold: ${typography.fontWeight.extrabold};
    
    --line-height-tight: ${typography.lineHeight.tight};
    --line-height-snug: ${typography.lineHeight.snug};
    --line-height-normal: ${typography.lineHeight.normal};
    --line-height-relaxed: ${typography.lineHeight.relaxed};
    --line-height-loose: ${typography.lineHeight.loose};
    
    /* Spacing */
    --spacing-0: ${spacing[0]}px;
    --spacing-1: ${spacing[1]}px;
    --spacing-2: ${spacing[2]}px;
    --spacing-3: ${spacing[3]}px;
    --spacing-4: ${spacing[4]}px;
    --spacing-5: ${spacing[5]}px;
    --spacing-6: ${spacing[6]}px;
    --spacing-8: ${spacing[8]}px;
    --spacing-10: ${spacing[10]}px;
    --spacing-12: ${spacing[12]}px;
    --spacing-16: ${spacing[16]}px;
    --spacing-20: ${spacing[20]}px;
    --spacing-24: ${spacing[24]}px;
    --spacing-32: ${spacing[32]}px;
    --spacing-40: ${spacing[40]}px;
    --spacing-48: ${spacing[48]}px;
    --spacing-64: ${spacing[64]}px;
    --spacing-80: ${spacing[80]}px;
    --spacing-96: ${spacing[96]}px;
    
    /* Border Radius */
    --border-radius-none: ${borderRadius.none}px;
    --border-radius-sm: ${borderRadius.sm}px;
    --border-radius-base: ${borderRadius.base}px;
    --border-radius-md: ${borderRadius.md}px;
    --border-radius-lg: ${borderRadius.lg}px;
    --border-radius-xl: ${borderRadius.xl}px;
    --border-radius-2xl: ${borderRadius['2xl']}px;
    --border-radius-3xl: ${borderRadius['3xl']}px;
    --border-radius-full: ${borderRadius.full}px;
    
    /* Shadows */
    --shadow-sm: ${shadows.sm};
    --shadow-base: ${shadows.base};
    --shadow-md: ${shadows.md};
    --shadow-lg: ${shadows.lg};
    --shadow-xl: ${shadows.xl};
    --shadow-2xl: ${shadows['2xl']};
    --shadow-inner: ${shadows.inner};
    
    /* Animation */
    --duration-fastest: ${animations.duration.fastest}ms;
    --duration-fast: ${animations.duration.fast}ms;
    --duration-normal: ${animations.duration.normal}ms;
    --duration-slow: ${animations.duration.slow}ms;
    --duration-slowest: ${animations.duration.slowest}ms;
    
    --easing-ease: ${animations.easing.ease};
    --easing-ease-in: ${animations.easing.easeIn};
    --easing-ease-out: ${animations.easing.easeOut};
    --easing-ease-in-out: ${animations.easing.easeInOut};
    --easing-bounce-in: ${animations.easing.bounceIn};
    --easing-bounce-out: ${animations.easing.bounceOut};
    
    /* Z-Index */
    --z-index-dropdown: ${zIndex.dropdown};
    --z-index-sticky: ${zIndex.sticky};
    --z-index-modal: ${zIndex.modal};
    --z-index-popover: ${zIndex.popover};
    --z-index-tooltip: ${zIndex.tooltip};
    --z-index-toast: ${zIndex.toast};
    
    /* Breakpoints */
    --breakpoint-xs: ${breakpoints.xs}px;
    --breakpoint-sm: ${breakpoints.sm}px;
    --breakpoint-md: ${breakpoints.md}px;
    --breakpoint-lg: ${breakpoints.lg}px;
    --breakpoint-xl: ${breakpoints.xl}px;
    --breakpoint-2xl: ${breakpoints['2xl']}px;
  }
`;

// Additional utility exports for easier access
export const theme = {
  colors: colorPalette,
  typography,
  spacing,
  borderRadius,
  shadows,
  animations,
  zIndex,
  breakpoints,
};

// Dark theme configuration (optional)
export const darkTheme = {
  ...customTheme,
  
  // Override colors for dark mode
  colorBgBase: colorPalette.neutral[900],
  colorBgContainer: colorPalette.neutral[800],
  colorBgElevated: colorPalette.neutral[700],
  colorBgLayout: colorPalette.neutral[900],
  colorBgSpotlight: colorPalette.neutral[600],
  colorBorder: colorPalette.neutral[600],
  colorBorderSecondary: colorPalette.neutral[700],
  colorFill: colorPalette.neutral[700],
  colorFillSecondary: colorPalette.neutral[600],
  colorFillTertiary: colorPalette.neutral[500],
  colorFillQuaternary: colorPalette.neutral[400],
  colorText: colorPalette.neutral[100],
  colorTextSecondary: colorPalette.neutral[300],
  colorTextTertiary: colorPalette.neutral[400],
  colorTextQuaternary: colorPalette.neutral[500],
  
  components: {
    ...customTheme.components,
    
    // Override specific components for dark mode
    Layout: {
      ...customTheme.components.Layout,
      bodyBg: colorPalette.neutral[900],
      headerBg: colorPalette.neutral[800],
      footerBg: colorPalette.neutral[800],
      lightSiderBg: colorPalette.neutral[800],
      siderBg: colorPalette.neutral[700],
    },
    
    Card: {
      ...customTheme.components.Card,
      colorBg: colorPalette.neutral[800],
      colorBorderSecondary: colorPalette.neutral[600],
    },
    
    Table: {
      ...customTheme.components.Table,
      headerBg: colorPalette.neutral[800],
      headerColor: colorPalette.neutral[100],
      colorBgContainer: colorPalette.neutral[900],
    },
    
    Modal: {
      ...customTheme.components.Modal,
      contentBg: colorPalette.neutral[800],
      headerBg: colorPalette.neutral[800],
      footerBg: colorPalette.neutral[800],
    },
    
    Drawer: {
      ...customTheme.components.Drawer,
      colorBg: colorPalette.neutral[800],
    },
  },
};

// Dark theme CSS variables
export const darkThemeRootCss = `
  :root[data-theme="dark"] {
    /* Dark mode color overrides */
    --color-bg-base: ${colorPalette.neutral[900]};
    --color-bg-container: ${colorPalette.neutral[800]};
    --color-bg-elevated: ${colorPalette.neutral[700]};
    --color-text-primary: ${colorPalette.neutral[100]};
    --color-text-secondary: ${colorPalette.neutral[300]};
    --color-text-tertiary: ${colorPalette.neutral[400]};
    --color-border: ${colorPalette.neutral[600]};
    --color-border-secondary: ${colorPalette.neutral[700]};
  }
`;

// Responsive breakpoint utilities
export const mediaQueries = {
  xs: `@media (max-width: ${breakpoints.xs - 1}px)`,
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  '2xl': `@media (min-width: ${breakpoints['2xl']}px)`,
  
  // Between breakpoints
  smOnly: `@media (min-width: ${breakpoints.sm}px) and (max-width: ${breakpoints.md - 1}px)`,
  mdOnly: `@media (min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`,
  lgOnly: `@media (min-width: ${breakpoints.lg}px) and (max-width: ${breakpoints.xl - 1}px)`,
  xlOnly: `@media (min-width: ${breakpoints.xl}px) and (max-width: ${breakpoints['2xl'] - 1}px)`,
  
  // Mobile first
  mobile: `@media (max-width: ${breakpoints.md - 1}px)`,
  tablet: `@media (min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`,
  desktop: `@media (min-width: ${breakpoints.lg}px)`,
};

// CSS-in-JS styled-components helpers
export const styledHelpers = {
  // Flexbox utilities
  flex: {
    center: 'display: flex; align-items: center; justify-content: center;',
    start: 'display: flex; align-items: center; justify-content: flex-start;',
    end: 'display: flex; align-items: center; justify-content: flex-end;',
    between: 'display: flex; align-items: center; justify-content: space-between;',
    around: 'display: flex; align-items: center; justify-content: space-around;',
    column: 'display: flex; flex-direction: column;',
    columnCenter: 'display: flex; flex-direction: column; align-items: center; justify-content: center;',
  },
  
  // Grid utilities
  grid: {
    center: 'display: grid; place-items: center;',
    cols: (cols) => `display: grid; grid-template-columns: repeat(${cols}, 1fr);`,
    gap: (size) => `gap: ${spacing[size] || size}px;`,
  },
  
  // Position utilities
  position: {
    absolute: 'position: absolute;',
    relative: 'position: relative;',
    fixed: 'position: fixed;',
    sticky: 'position: sticky;',
    absoluteCenter: 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);',
  },
  
  // Text utilities
  text: {
    center: 'text-align: center;',
    left: 'text-align: left;',
    right: 'text-align: right;',
    truncate: 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis;',
    wrap: 'word-wrap: break-word; word-break: break-word;',
  },
  
  // Transition utilities
  transition: {
    all: `transition: all ${animations.duration.normal}ms ${animations.easing.easeInOut};`,
    colors: `transition: color ${animations.duration.fast}ms ${animations.easing.easeInOut}, background-color ${animations.duration.fast}ms ${animations.easing.easeInOut}, border-color ${animations.duration.fast}ms ${animations.easing.easeInOut};`,
    transform: `transition: transform ${animations.duration.normal}ms ${animations.easing.easeInOut};`,
    opacity: `transition: opacity ${animations.duration.fast}ms ${animations.easing.easeInOut};`,
  },
  
  // Hover effects
  hover: {
    lift: `
      transition: transform ${animations.duration.fast}ms ${animations.easing.easeInOut}, box-shadow ${animations.duration.fast}ms ${animations.easing.easeInOut};
      &:hover {
        transform: translateY(-2px);
        box-shadow: ${shadows.lg};
      }
    `,
    scale: `
      transition: transform ${animations.duration.fast}ms ${animations.easing.easeInOut};
      &:hover {
        transform: scale(1.05);
      }
    `,
    glow: (color = colorPalette.primary[500]) => `
      transition: box-shadow ${animations.duration.fast}ms ${animations.easing.easeInOut};
      &:hover {
        box-shadow: 0 0 20px ${color}33;
      }
    `,
  },
  
  // Scrollbar styling
  scrollbar: {
    hidden: `
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }
    `,
    styled: `
      &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      &::-webkit-scrollbar-track {
        background: ${colorPalette.neutral[100]};
        border-radius: ${borderRadius.full}px;
      }
      &::-webkit-scrollbar-thumb {
        background: ${colorPalette.neutral[300]};
        border-radius: ${borderRadius.full}px;
        &:hover {
          background: ${colorPalette.neutral[400]};
        }
      }
    `,
  },
};

// Export everything for easy importing
export {
  colorPalette,
  typography,
  spacing,
  borderRadius,
  shadows,
  animations,
  zIndex,
  breakpoints,
};
