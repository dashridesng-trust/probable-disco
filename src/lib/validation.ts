import type { Rule } from 'antd/es/form';

export const requiredReasonRule: Rule[] = [
  { required: true, message: 'Reason is required for audit and compliance logging' },
  { min: 5, message: 'Reason must be at least 5 characters long' },
  { max: 500, message: 'Reason cannot exceed 500 characters' },
];

export const validPlateNumberRule: Rule[] = [
  { required: true, message: 'License plate number is required' },
  {
    pattern: /^[A-Z]{2,3}[ -]?[0-9]{3}[ -]?[A-Z]{2}$/i,
    message: 'Must be a valid Nigerian license plate format (e.g. ABC-123XY)',
  },
];
