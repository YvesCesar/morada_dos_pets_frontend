/**
 * Cores centralizadas para badges de serviço e status
 */

export const SERVICE_COLORS: Record<string, { bg: string; text: string }> = {
  'Dog Spa': { bg: '#C7A841', text: '#1e1e1e' },
  'Hospedagem': { bg: '#544033', text: '#ffffff' },
  'Dog Táxi': { bg: '#327D9B', text: '#ffffff' },
}

export const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  confirmado: { bg: '#F0FDF4', text: '#00A63E' },
  pendente: { bg: '#FEFCE8', text: '#D08700' },
  cancelado: { bg: '#FEF2F2', text: '#A31C0A' },
}
