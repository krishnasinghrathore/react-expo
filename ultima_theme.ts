import { createTamagui, createTokens, createTheme } from 'tamagui'

// =============================================================================
// ULTIMA THEME TOKENS (Based on PrimeReact Ultima)
// =============================================================================

const tokens = createTokens({
  // Color palette matching Ultima theme
  color: {
    // Primary colors (Blue theme)
    primary50: '#f5f9ff',
    primary100: '#d0e1fd',
    primary200: '#abc9fb',
    primary300: '#85b2f9',
    primary400: '#609af8',
    primary500: '#3b82f6',
    primary600: '#326fd1',
    primary700: '#295bac',
    primary800: '#204887',
    primary900: '#183462',

    // Surface colors
    surface0: '#ffffff',
    surface50: '#fafafa',
    surface100: '#f5f5f5',
    surface200: '#eeeeee',
    surface300: '#e0e0e0',
    surface400: '#bdbdbd',
    surface500: '#9e9e9e',
    surface600: '#757575',
    surface700: '#616161',
    surface800: '#424242',
    surface900: '#212121',

    // Theme specific surfaces
    surfaceGround: '#eff3f8',
    surfaceSection: '#ffffff',
    surfaceCard: '#ffffff',
    surfaceOverlay: '#ffffff',
    surfaceBorder: '#dfe7ef',
    surfaceHover: '#f6f9fc',

    // Text colors
    textPrimary: '#495057',
    textSecondary: '#6c757d',
    textOnPrimary: '#ffffff',

    // Semantic colors
    success50: '#f4fcf7',
    success100: '#caf1d8',
    success200: '#a0e6ba',
    success300: '#76db9b',
    success400: '#4cd07d',
    success500: '#22c55e',
    success600: '#1da750',
    success700: '#188a42',
    success800: '#136c34',
    success900: '#0e4f26',

    warning50: '#fefbf3',
    warning100: '#faedc4',
    warning200: '#f6de95',
    warning300: '#f2d066',
    warning400: '#eec137',
    warning500: '#eab308',
    warning600: '#c79807',
    warning700: '#a47d06',
    warning800: '#816204',
    warning900: '#5e4803',

    error50: '#fff5f5',
    error100: '#ffd0ce',
    error200: '#ffaca7',
    error300: '#ff8780',
    error400: '#ff6259',
    error500: '#ff3d32',
    error600: '#d9342b',
    error700: '#b32b23',
    error800: '#8c221c',
    error900: '#661814',

    info50: '#f3fbfd',
    info100: '#c3edf5',
    info200: '#94e0ed',
    info300: '#65d2e4',
    info400: '#35c4dc',
    info500: '#06b6d4',
    info600: '#059bb4',
    info700: '#047f94',
    info800: '#036475',
    info900: '#024955',

    // Additional colors
    indigo50: '#f7f7fe',
    indigo100: '#dadafc',
    indigo200: '#bcbdf9',
    indigo300: '#9ea0f6',
    indigo400: '#8183f4',
    indigo500: '#6366f1',
    indigo600: '#5457cd',
    indigo700: '#4547a9',
    indigo800: '#363885',
    indigo900: '#282960',

    purple50: '#fbf7ff',
    purple100: '#ead6fd',
    purple200: '#dab6fc',
    purple300: '#c996fa',
    purple400: '#b975f9',
    purple500: '#a855f7',
    purple600: '#8f48d2',
    purple700: '#763cad',
    purple800: '#5c2f88',
    purple900: '#432263',

    // Sidebar colors (dark)
    sidebarBg: '#1e293b',
    sidebarText: '#cbd5e1',
    sidebarTextHover: '#ffffff',
    sidebarActive: '#3b82f6',
    sidebarActiveText: '#ffffff',
    sidebarBorder: '#334155',
  },

  // Spacing scale
  space: {
    0: 0,
    0.5: 2,
    1: 4,
    1.5: 6,
    2: 8,
    2.5: 10,
    3: 12,
    3.5: 14,
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
  },

  // Font sizes
  size: {
    0: 0,
    1: 12,
    2: 14,
    3: 16,
    4: 18,
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
  },

  // Border radius
  radius: {
    0: 0,
    1: 3,
    2: 6,
    3: 8,
    4: 12,
    5: 16,
    6: 20,
    7: 24,
    8: 32,
    9: 40,
    10: 48,
    full: 1000,
  },

  // Z-index
  zIndex: {
    0: 0,
    1: 100,
    2: 200,
    3: 300,
    4: 400,
    5: 500,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    max: 2147483647,
  },
})

// =============================================================================
// LIGHT THEME
// =============================================================================

const lightTheme = createTheme({
  // Background colors
  background: tokens.color.surfaceGround,
  backgroundHover: tokens.color.surfaceHover,
  backgroundPress: tokens.color.surface100,
  backgroundFocus: tokens.color.surface100,
  backgroundStrong: tokens.color.surface0,
  backgroundTransparent: 'transparent',

  // Card/surface colors
  color: tokens.color.textPrimary,
  colorHover: tokens.color.textPrimary,
  colorPress: tokens.color.textPrimary,
  colorFocus: tokens.color.textPrimary,
  colorTransparent: 'transparent',

  // Border colors
  borderColor: tokens.color.surfaceBorder,
  borderColorHover: tokens.color.surface300,
  borderColorPress: tokens.color.surface400,
  borderColorFocus: tokens.color.primary500,

  // Primary colors
  primary: tokens.color.primary500,
  primaryHover: tokens.color.primary600,
  primaryPress: tokens.color.primary700,
  primaryFocus: tokens.color.primary400,

  // Secondary colors
  secondary: tokens.color.surface500,
  secondaryHover: tokens.color.surface600,
  secondaryPress: tokens.color.surface700,
  secondaryFocus: tokens.color.surface400,

  // Success colors
  success: tokens.color.success500,
  successHover: tokens.color.success600,
  successPress: tokens.color.success700,
  successFocus: tokens.color.success400,

  // Warning colors
  warning: tokens.color.warning500,
  warningHover: tokens.color.warning600,
  warningPress: tokens.color.warning700,
  warningFocus: tokens.color.warning400,

  // Error colors
  error: tokens.color.error500,
  errorHover: tokens.color.error600,
  errorPress: tokens.color.error700,
  errorFocus: tokens.color.error400,

  // Info colors
  info: tokens.color.info500,
  infoHover: tokens.color.info600,
  infoPress: tokens.color.info700,
  infoFocus: tokens.color.info400,

  // Sidebar colors
  sidebarBackground: tokens.color.sidebarBg,
  sidebarText: tokens.color.sidebarText,
  sidebarTextHover: tokens.color.sidebarTextHover,
  sidebarActive: tokens.color.sidebarActive,
  sidebarActiveText: tokens.color.sidebarActiveText,
  sidebarBorder: tokens.color.sidebarBorder,

  // Surface variations
  surfaceCard: tokens.color.surfaceCard,
  surfaceSection: tokens.color.surfaceSection,
  surfaceOverlay: tokens.color.surfaceOverlay,

  // Text variations
  textPrimary: tokens.color.textPrimary,
  textSecondary: tokens.color.textSecondary,
  textOnPrimary: tokens.color.textOnPrimary,

  // Grays
  gray1: tokens.color.surface50,
  gray2: tokens.color.surface100,
  gray3: tokens.color.surface200,
  gray4: tokens.color.surface300,
  gray5: tokens.color.surface400,
  gray6: tokens.color.surface500,
  gray7: tokens.color.surface600,
  gray8: tokens.color.surface700,
  gray9: tokens.color.surface800,
  gray10: tokens.color.surface900,
  gray11: tokens.color.textSecondary,
  gray12: tokens.color.textPrimary,

  // Additional semantic colors
  green1: tokens.color.success50,
  green2: tokens.color.success100,
  green3: tokens.color.success200,
  green4: tokens.color.success300,
  green5: tokens.color.success400,
  green6: tokens.color.success500,
  green7: tokens.color.success600,
  green8: tokens.color.success700,
  green9: tokens.color.success800,
  green10: tokens.color.success900,
  green11: tokens.color.success700,
  green12: tokens.color.success900,

  blue1: tokens.color.primary50,
  blue2: tokens.color.primary100,
  blue3: tokens.color.primary200,
  blue4: tokens.color.primary300,
  blue5: tokens.color.primary400,
  blue6: tokens.color.primary500,
  blue7: tokens.color.primary600,
  blue8: tokens.color.primary700,
  blue9: tokens.color.primary800,
  blue10: tokens.color.primary900,
  blue11: tokens.color.primary700,
  blue12: tokens.color.primary900,

  red1: tokens.color.error50,
  red2: tokens.color.error100,
  red3: tokens.color.error200,
  red4: tokens.color.error300,
  red5: tokens.color.error400,
  red6: tokens.color.error500,
  red7: tokens.color.error600,
  red8: tokens.color.error700,
  red9: tokens.color.error800,
  red10: tokens.color.error900,
  red11: tokens.color.error700,
  red12: tokens.color.error900,

  yellow1: tokens.color.warning50,
  yellow2: tokens.color.warning100,
  yellow3: tokens.color.warning200,
  yellow4: tokens.color.warning300,
  yellow5: tokens.color.warning400,
  yellow6: tokens.color.warning500,
  yellow7: tokens.color.warning600,
  yellow8: tokens.color.warning700,
  yellow9: tokens.color.warning800,
  yellow10: tokens.color.warning900,
  yellow11: tokens.color.warning700,
  yellow12: tokens.color.warning900,

  purple1: tokens.color.purple50,
  purple2: tokens.color.purple100,
  purple3: tokens.color.purple200,
  purple4: tokens.color.purple300,
  purple5: tokens.color.purple400,
  purple6: tokens.color.purple500,
  purple7: tokens.color.purple600,
  purple8: tokens.color.purple700,
  purple9: tokens.color.purple800,
  purple10: tokens.color.purple900,
  purple11: tokens.color.purple700,
  purple12: tokens.color.purple900,

  // Shadow colors
  shadowColor: tokens.color.surface900,
  shadowColorHover: tokens.color.surface800,
  shadowColorPress: tokens.color.surface700,
  shadowColorFocus: tokens.color.primary500,
})

// =============================================================================
// DARK THEME
// =============================================================================

const darkTheme = createTheme({
  // Background colors
  background: tokens.color.surface900,
  backgroundHover: tokens.color.surface800,
  backgroundPress: tokens.color.surface700,
  backgroundFocus: tokens.color.surface700,
  backgroundStrong: tokens.color.surface800,
  backgroundTransparent: 'transparent',

  // Card/surface colors
  color: tokens.color.surface50,
  colorHover: tokens.color.surface50,
  colorPress: tokens.color.surface50,
  colorFocus: tokens.color.surface50,
  colorTransparent: 'transparent',

  // Border colors
  borderColor: tokens.color.surface700,
  borderColorHover: tokens.color.surface600,
  borderColorPress: tokens.color.surface500,
  borderColorFocus: tokens.color.primary500,

  // Primary colors (same as light)
  primary: tokens.color.primary500,
  primaryHover: tokens.color.primary400,
  primaryPress: tokens.color.primary300,
  primaryFocus: tokens.color.primary600,

  // Secondary colors
  secondary: tokens.color.surface400,
  secondaryHover: tokens.color.surface300,
  secondaryPress: tokens.color.surface200,
  secondaryFocus: tokens.color.surface500,

  // Success colors
  success: tokens.color.success500,
  successHover: tokens.color.success400,
  successPress: tokens.color.success300,
  successFocus: tokens.color.success600,

  // Warning colors
  warning: tokens.color.warning500,
  warningHover: tokens.color.warning400,
  warningPress: tokens.color.warning300,
  warningFocus: tokens.color.warning600,

  // Error colors
  error: tokens.color.error500,
  errorHover: tokens.color.error400,
  errorPress: tokens.color.error300,
  errorFocus: tokens.color.error600,

  // Info colors
  info: tokens.color.info500,
  infoHover: tokens.color.info400,
  infoPress: tokens.color.info300,
  infoFocus: tokens.color.info600,

  // Sidebar colors (darker in dark mode)
  sidebarBackground: tokens.color.surface900,
  sidebarText: tokens.color.surface300,
  sidebarTextHover: tokens.color.surface50,
  sidebarActive: tokens.color.primary500,
  sidebarActiveText: tokens.color.surface50,
  sidebarBorder: tokens.color.surface700,

  // Surface variations
  surfaceCard: tokens.color.surface800,
  surfaceSection: tokens.color.surface800,
  surfaceOverlay: tokens.color.surface800,

  // Text variations
  textPrimary: tokens.color.surface50,
  textSecondary: tokens.color.surface300,
  textOnPrimary: tokens.color.surface50,

  // Grays (inverted)
  gray1: tokens.color.surface800,
  gray2: tokens.color.surface700,
  gray3: tokens.color.surface600,
  gray4: tokens.color.surface500,
  gray5: tokens.color.surface400,
  gray6: tokens.color.surface300,
  gray7: tokens.color.surface200,
  gray8: tokens.color.surface100,
  gray9: tokens.color.surface50,
  gray10: tokens.color.surface0,
  gray11: tokens.color.surface300,
  gray12: tokens.color.surface50,

  // Additional semantic colors (same as light)
  green1: tokens.color.success50,
  green2: tokens.color.success100,
  green3: tokens.color.success200,
  green4: tokens.color.success300,
  green5: tokens.color.success400,
  green6: tokens.color.success500,
  green7: tokens.color.success600,
  green8: tokens.color.success700,
  green9: tokens.color.success800,
  green10: tokens.color.success900,
  green11: tokens.color.success400,
  green12: tokens.color.success100,

  blue1: tokens.color.primary50,
  blue2: tokens.color.primary100,
  blue3: tokens.color.primary200,
  blue4: tokens.color.primary300,
  blue5: tokens.color.primary400,
  blue6: tokens.color.primary500,
  blue7: tokens.color.primary600,
  blue8: tokens.color.primary700,
  blue9: tokens.color.primary800,
  blue10: tokens.color.primary900,
  blue11: tokens.color.primary400,
  blue12: tokens.color.primary100,

  red1: tokens.color.error50,
  red2: tokens.color.error100,
  red3: tokens.color.error200,
  red4: tokens.color.error300,
  red5: tokens.color.error400,
  red6: tokens.color.error500,
  red7: tokens.color.error600,
  red8: tokens.color.error700,
  red9: tokens.color.error800,
  red10: tokens.color.error900,
  red11: tokens.color.error400,
  red12: tokens.color.error100,

  yellow1: tokens.color.warning50,
  yellow2: tokens.color.warning100,
  yellow3: tokens.color.warning200,
  yellow4: tokens.color.warning300,
  yellow5: tokens.color.warning400,
  yellow6: tokens.color.warning500,
  yellow7: tokens.color.warning600,
  yellow8: tokens.color.warning700,
  yellow9: tokens.color.warning800,
  yellow10: tokens.color.warning900,
  yellow11: tokens.color.warning400,
  yellow12: tokens.color.warning100,

  purple1: tokens.color.purple50,
  purple2: tokens.color.purple100,
  purple3: tokens.color.purple200,
  purple4: tokens.color.purple300,
  purple5: tokens.color.purple400,
  purple6: tokens.color.purple500,
  purple7: tokens.color.purple600,
  purple8: tokens.color.purple700,
  purple9: tokens.color.purple800,
  purple10: tokens.color.purple900,
  purple11: tokens.color.purple400,
  purple12: tokens.color.purple100,

  // Shadow colors
  shadowColor: tokens.color.surface0,
  shadowColorHover: tokens.color.surface100,
  shadowColorPress: tokens.color.surface200,
  shadowColorFocus: tokens.color.primary500,
})

// =============================================================================
// TAMAGUI CONFIGURATION
// =============================================================================

export const ultimaConfig = createTamagui({
  tokens,
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
  defaultTheme: 'light',
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands: {
    // Layout
    f: 'flex',
    fd: 'flexDirection',
    fw: 'flexWrap',
    ai: 'alignItems',
    ac: 'alignContent',
    jc: 'justifyContent',
    as: 'alignSelf',
    fg: 'flexGrow',
    fs: 'flexShrink',
    fb: 'flexBasis',
    pos: 'position',
    zi: 'zIndex',
    t: 'top',
    b: 'bottom',
    l: 'left',
    r: 'right',
    
    // Spacing
    p: 'padding',
    pt: 'paddingTop',
    pb: 'paddingBottom',
    pl: 'paddingLeft',
    pr: 'paddingRight',
    px: 'paddingHorizontal',
    py: 'paddingVertical',
    m: 'margin',
    mt: 'marginTop',
    mb: 'marginBottom',
    ml: 'marginLeft',
    mr: 'marginRight',
    mx: 'marginHorizontal',
    my: 'marginVertical',
    
    // Sizing
    w: 'width',
    h: 'height',
    maw: 'maxWidth',
    mah: 'maxHeight',
    miw: 'minWidth',
    mih: 'minHeight',
    
    // Borders
    br: 'borderRadius',
    bw: 'borderWidth',
    btw: 'borderTopWidth',
    bbw: 'borderBottomWidth',
    blw: 'borderLeftWidth',
    brw: 'borderRightWidth',
    bc: 'borderColor',
    
    // Colors
    bg: 'backgroundColor',
    c: 'color',
    
    // Typography
    ff: 'fontFamily',
    fs: 'fontSize',
    fw: 'fontWeight',
    lh: 'lineHeight',
    ls: 'letterSpacing',
    ta: 'textAlign',
    tt: 'textTransform',
    td: 'textDecorationLine',
    
    // Other
    o: 'opacity',
    ov: 'overflow',
    pe: 'pointerEvents',
    us: 'userSelect',
    cur: 'cursor',
  },
  fonts: {
    body: {
      family: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      size: tokens.size,
      lineHeight: {
        1: 16,
        2: 20,
        3: 24,
        4: 28,
        5: 32,
        6: 36,
        7: 40,
        8: 48,
        9: 56,
        10: 64,
      },
      weight: {
        300: '300',
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800',
        900: '900',
      },
    },
    heading: {
      family: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      size: tokens.size,
      lineHeight: {
        1: 20,
        2: 24,
        3: 28,
        4: 32,
        5: 36,
        6: 40,
        7: 48,
        8: 56,
        9: 64,
        10: 72,
      },
      weight: {
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800',
        900: '900',
      },
    },
  },
  animations: {
    bouncy: {
      type: 'spring',
      damping: 10,
      mass: 0.9,
      stiffness: 100,
    },
    lazy: {
      type: 'spring',
      damping: 20,
      stiffness: 60,
    },
    quick: {
      type: 'spring',
      damping: 20,
      mass: 1.2,
      stiffness: 250,
    },
    tooltip: {
      type: 'spring',
      damping: 10,
      mass: 0.9,
      stiffness: 100,
    },
  },
  media: {
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  },
})

export type UltimaConfig = typeof ultimaConfig
export default ultimaConfig