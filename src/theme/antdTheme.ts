import type { ThemeConfig } from 'antd';
import { theme } from 'antd';
import { ROUTIC_COLORS } from './colors';

/**
 * Routic Light Theme (Default)
 * Strictly utilizes the approved 21 HEX colors.
 */
export const routicLightTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // Brand & Intent
    colorPrimary: ROUTIC_COLORS.BRIGHT_ORANGE,
    colorSuccess: ROUTIC_COLORS.GOLDEN_AMBER,
    colorWarning: ROUTIC_COLORS.GOLDEN_AMBER,
    colorError: ROUTIC_COLORS.BRIGHT_ORANGE,
    colorInfo: ROUTIC_COLORS.ROYAL_NAVY,

    // Typography
    colorTextBase: ROUTIC_COLORS.DEEP_NAVY,
    colorTextSecondary: ROUTIC_COLORS.SLATE_GRAY,
    colorTextTertiary: ROUTIC_COLORS.MUTED_BLUE_GRAY,
    colorTextQuaternary: ROUTIC_COLORS.COOL_GRAY,

    // Surfaces & Backgrounds
    colorBgBase: ROUTIC_COLORS.WHITE,
    colorBgContainer: ROUTIC_COLORS.WHITE,
    colorBgElevated: ROUTIC_COLORS.OFF_WHITE_GRAY,
    colorBgLayout: ROUTIC_COLORS.FRAME_BACKGROUND_GRAY,

    // Borders & Lines
    colorBorder: ROUTIC_COLORS.LIGHT_BLUE_GRAY,
    colorBorderSecondary: ROUTIC_COLORS.COOL_LIGHT_GRAY,

    // Control & Form
    controlItemBgHover: ROUTIC_COLORS.SOFT_OFF_WHITE,
    controlItemBgActive: ROUTIC_COLORS.PALE_LAVENDER,
    borderRadius: 8,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
  components: {
    Layout: {
      headerBg: ROUTIC_COLORS.WHITE,
      bodyBg: ROUTIC_COLORS.FRAME_BACKGROUND_GRAY,
      siderBg: ROUTIC_COLORS.DEEP_NAVY,
      triggerBg: ROUTIC_COLORS.MIDNIGHT_BLUE,
      triggerColor: ROUTIC_COLORS.WHITE,
    },
    Menu: {
      darkItemBg: ROUTIC_COLORS.DEEP_NAVY,
      darkSubMenuItemBg: ROUTIC_COLORS.DARK_NAVY,
      darkItemSelectedBg: ROUTIC_COLORS.ROYAL_NAVY,
      darkItemSelectedColor: ROUTIC_COLORS.WHITE,
      darkItemColor: ROUTIC_COLORS.PALE_LAVENDER,
      darkItemHoverBg: ROUTIC_COLORS.MIDNIGHT_BLUE,
      darkItemHoverColor: ROUTIC_COLORS.WHITE,
    },
    Table: {
      headerBg: ROUTIC_COLORS.OFF_WHITE_GRAY,
      headerColor: ROUTIC_COLORS.DEEP_NAVY,
      rowHoverBg: ROUTIC_COLORS.SOFT_OFF_WHITE,
      borderColor: ROUTIC_COLORS.COOL_LIGHT_GRAY,
      headerBorderRadius: 8,
    },
    Card: {
      colorBgContainer: ROUTIC_COLORS.WHITE,
      colorBorderSecondary: ROUTIC_COLORS.PALE_GRAY,
    },
    Button: {
      primaryColor: ROUTIC_COLORS.WHITE,
      defaultBg: ROUTIC_COLORS.WHITE,
      defaultBorderColor: ROUTIC_COLORS.LIGHT_BLUE_GRAY,
      defaultColor: ROUTIC_COLORS.DEEP_NAVY,
    },
    Tag: {
      defaultBg: ROUTIC_COLORS.OFF_WHITE_GRAY,
      defaultColor: ROUTIC_COLORS.DEEP_NAVY,
    },
    Modal: {
      headerBg: ROUTIC_COLORS.WHITE,
      contentBg: ROUTIC_COLORS.WHITE,
    },
    Drawer: {
      colorBgElevated: ROUTIC_COLORS.WHITE,
    },
  },
};

/**
 * Routic Dark Theme (Toggleable)
 * Strictly utilizes the approved 21 HEX colors.
 */
export const routicDarkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    // Brand & Intent
    colorPrimary: ROUTIC_COLORS.BRIGHT_ORANGE,
    colorSuccess: ROUTIC_COLORS.GOLDEN_AMBER,
    colorWarning: ROUTIC_COLORS.GOLDEN_AMBER,
    colorError: ROUTIC_COLORS.BRIGHT_ORANGE,
    colorInfo: ROUTIC_COLORS.MUTED_LAVENDER,

    // Typography
    colorTextBase: ROUTIC_COLORS.SOFT_OFF_WHITE,
    colorTextSecondary: ROUTIC_COLORS.MUTED_LAVENDER,
    colorTextTertiary: ROUTIC_COLORS.MUTED_BLUE_GRAY,
    colorTextQuaternary: ROUTIC_COLORS.SLATE_GRAY,

    // Surfaces & Backgrounds
    colorBgBase: ROUTIC_COLORS.DARK_NAVY,
    colorBgContainer: ROUTIC_COLORS.DEEP_NAVY,
    colorBgElevated: ROUTIC_COLORS.MIDNIGHT_BLUE,
    colorBgLayout: ROUTIC_COLORS.DARK_NAVY,

    // Borders & Lines
    colorBorder: ROUTIC_COLORS.ROYAL_NAVY,
    colorBorderSecondary: ROUTIC_COLORS.MIDNIGHT_BLUE,

    // Control & Form
    controlItemBgHover: ROUTIC_COLORS.MIDNIGHT_BLUE,
    controlItemBgActive: ROUTIC_COLORS.ROYAL_NAVY,
    borderRadius: 8,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
  components: {
    Layout: {
      headerBg: ROUTIC_COLORS.DEEP_NAVY,
      bodyBg: ROUTIC_COLORS.DARK_NAVY,
      siderBg: ROUTIC_COLORS.DARK_NAVY,
      triggerBg: ROUTIC_COLORS.MIDNIGHT_BLUE,
      triggerColor: ROUTIC_COLORS.WHITE,
    },
    Menu: {
      darkItemBg: ROUTIC_COLORS.DARK_NAVY,
      darkSubMenuItemBg: ROUTIC_COLORS.DEEP_NAVY,
      darkItemSelectedBg: ROUTIC_COLORS.ROYAL_NAVY,
      darkItemSelectedColor: ROUTIC_COLORS.WHITE,
      darkItemColor: ROUTIC_COLORS.MUTED_LAVENDER,
      darkItemHoverBg: ROUTIC_COLORS.MIDNIGHT_BLUE,
      darkItemHoverColor: ROUTIC_COLORS.WHITE,
    },
    Table: {
      headerBg: ROUTIC_COLORS.MIDNIGHT_BLUE,
      headerColor: ROUTIC_COLORS.WHITE,
      rowHoverBg: ROUTIC_COLORS.ROYAL_NAVY,
      borderColor: ROUTIC_COLORS.MIDNIGHT_BLUE,
      headerBorderRadius: 8,
    },
    Card: {
      colorBgContainer: ROUTIC_COLORS.DEEP_NAVY,
      colorBorderSecondary: ROUTIC_COLORS.ROYAL_NAVY,
    },
    Button: {
      primaryColor: ROUTIC_COLORS.WHITE,
      defaultBg: ROUTIC_COLORS.MIDNIGHT_BLUE,
      defaultBorderColor: ROUTIC_COLORS.ROYAL_NAVY,
      defaultColor: ROUTIC_COLORS.WHITE,
    },
    Tag: {
      defaultBg: ROUTIC_COLORS.MIDNIGHT_BLUE,
      defaultColor: ROUTIC_COLORS.PALE_LAVENDER,
    },
    Modal: {
      headerBg: ROUTIC_COLORS.DEEP_NAVY,
      contentBg: ROUTIC_COLORS.DEEP_NAVY,
    },
    Drawer: {
      colorBgElevated: ROUTIC_COLORS.DEEP_NAVY,
    },
  },
};
