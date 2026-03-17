import { useInputMasks } from '@/composables/useInputMasks'

describe('useInputMasks', () => {
  const { formatDate, formatCPF, formatPhone, formatCEP, formatDisplayDate, formatCurrency } =
    useInputMasks()

  describe('formatDate', () => {
    it('returns digits only for 1-2 chars', () => {
      expect(formatDate('1')).toBe('1')
      expect(formatDate('12')).toBe('12')
    })

    it('adds slash after day (3-4 digits)', () => {
      expect(formatDate('123')).toBe('12/3')
      expect(formatDate('1204')).toBe('12/04')
    })

    it('formats full date DD/MM/YYYY', () => {
      expect(formatDate('15061995')).toBe('15/06/1995')
    })

    it('strips non-digit characters', () => {
      expect(formatDate('15/06/1995')).toBe('15/06/1995')
      expect(formatDate('ab12cd34ef5678')).toBe('12/34/5678')
    })

    it('truncates beyond 8 digits', () => {
      expect(formatDate('1506199599')).toBe('15/06/1995')
    })
  })

  describe('formatCPF', () => {
    it('returns digits only for 1-3 chars', () => {
      expect(formatCPF('123')).toBe('123')
    })

    it('adds dots progressively', () => {
      expect(formatCPF('1234')).toBe('123.4')
      expect(formatCPF('123456')).toBe('123.456')
      expect(formatCPF('1234567')).toBe('123.456.7')
      expect(formatCPF('123456789')).toBe('123.456.789')
    })

    it('formats full CPF 000.000.000-00', () => {
      expect(formatCPF('12345678900')).toBe('123.456.789-00')
    })

    it('strips non-digit characters', () => {
      expect(formatCPF('123.456.789-00')).toBe('123.456.789-00')
    })
  })

  describe('formatPhone', () => {
    it('returns empty string for empty input', () => {
      expect(formatPhone('')).toBe('')
    })

    it('adds parenthesis for area code', () => {
      expect(formatPhone('1')).toBe('(1')
      expect(formatPhone('11')).toBe('(11')
    })

    it('formats with space after area code', () => {
      expect(formatPhone('119')).toBe('(11) 9')
      expect(formatPhone('1199999')).toBe('(11) 99999')
    })

    it('formats full phone (00) 00000-0000', () => {
      expect(formatPhone('11987654321')).toBe('(11) 98765-4321')
    })
  })

  describe('formatCEP', () => {
    it('returns digits only for 1-5 chars', () => {
      expect(formatCEP('0100')).toBe('0100')
      expect(formatCEP('01001')).toBe('01001')
    })

    it('formats full CEP 00000-000', () => {
      expect(formatCEP('01001000')).toBe('01001-000')
    })
  })

  describe('formatDisplayDate', () => {
    it('converts YYYY-MM-DD to DD/MM/YYYY', () => {
      expect(formatDisplayDate('2025-02-10')).toBe('10/02/2025')
    })
  })

  describe('formatCurrency', () => {
    it('formats value as BRL currency', () => {
      const result = formatCurrency(119.8)
      expect(result).toContain('119')
      expect(result).toContain('80')
    })

    it('formats zero', () => {
      const result = formatCurrency(0)
      expect(result).toContain('0')
    })
  })
})
