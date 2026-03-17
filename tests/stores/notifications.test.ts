import { freshPinia } from '../helpers'
import { useNotificationsStore } from '@/stores/notifications'

describe('useNotificationsStore', () => {
  beforeEach(() => {
    freshPinia()
  })

  it('computes unreadCount', () => {
    const store = useNotificationsStore()
    const unread = store.notifications.filter((notification) => !notification.read).length
    expect(store.unreadCount).toBe(unread)
    expect(store.unreadCount).toBeGreaterThan(0)
  })

  it('computes hasUnread', () => {
    const store = useNotificationsStore()
    expect(store.hasUnread).toBe(true)
  })

  it('getByUser filters by userId', () => {
    const store = useNotificationsStore()
    const userNotifs = store.getByUser('u2')
    expect(userNotifs.every((notification) => notification.userId === 'u2')).toBe(true)
    expect(userNotifs.length).toBeGreaterThan(0)
  })

  it('markAsRead marks a single notification', () => {
    const store = useNotificationsStore()
    store.notifications.push({
      id: 'n-banho-thor',
      userId: 'u2',
      message: 'Agendamento de Banho para Thor confirmado!',
      read: false,
      createdAt: '2025-02-15',
    })
    store.markAsRead('n-banho-thor')
    expect(store.notifications.find((notification) => notification.id === 'n-banho-thor')?.read).toBe(true)
  })

  it('markAllAsRead marks all notifications for a user', () => {
    const store = useNotificationsStore()
    store.notifications.push(
      {
        id: 'n-hospedagem-luna',
        userId: 'u-carlos',
        message: 'Hospedagem de Luna começa amanhã às 08:00.',
        read: false,
        createdAt: '2025-02-14',
      },
      {
        id: 'n-cupom-aplicado',
        userId: 'u-carlos',
        message: 'Cupom MORADA10 aplicado com sucesso no seu pedido.',
        read: false,
        createdAt: '2025-02-13',
      },
    )
    store.markAllAsRead('u-carlos')
    const userNotifs = store.getByUser('u-carlos')
    expect(userNotifs.every((notification) => notification.read)).toBe(true)
  })
})
