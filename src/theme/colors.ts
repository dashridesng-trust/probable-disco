/**
 * Routic Admin Portal — Strict 21-Color HEX Palette.
 *
 * ABSOLUTE RULE: No other color values (HEX, RGB, HSL, named CSS colors)
 * are permitted in this application. Every visual element must map to
 * one of these 21 tokens.
 */

export const ROUTIC_COLORS = {
  BRIGHT_ORANGE: '#FF5B1A',
  GOLDEN_AMBER: '#F5A623',
  DEEP_NAVY: '#07153F',
  DARK_NAVY: '#0C1636',
  MIDNIGHT_BLUE: '#0B1C50',
  ROYAL_NAVY: '#172B66',
  SLATE_GRAY: '#687189',
  MUTED_BLUE_GRAY: '#8B91A3',
  COOL_GRAY: '#9097A9',
  MEDIUM_GRAY: '#949AAB',
  SILVER_GRAY: '#9AA0AF',
  MUTED_LAVENDER: '#AEB7D5',
  PALE_LAVENDER: '#CBD2E7',
  LIGHT_BLUE_GRAY: '#CDD3E0',
  LIGHT_GRAY: '#DFE2E9',
  COOL_LIGHT_GRAY: '#E2E5EB',
  PALE_GRAY: '#E8EAF0',
  FRAME_BACKGROUND_GRAY: '#E9EBEF',
  OFF_WHITE_GRAY: '#EEF0F4',
  SOFT_OFF_WHITE: '#F5F6F8',
  WHITE: '#FFFFFF',
} as const;

export type RouticColorName = keyof typeof ROUTIC_COLORS;
export type RouticColorHex = (typeof ROUTIC_COLORS)[RouticColorName];

/**
 * Validates that an arbitrary string is one of the approved 21 HEX colors.
 */
export function isApprovedColor(hex: string): hex is RouticColorHex {
  return Object.values(ROUTIC_COLORS).includes(hex.toUpperCase() as RouticColorHex);
}
