import UserAgent from 'user-agents'

const getUserAgent = (): UserAgent => new UserAgent([/Chrome/, {
  deviceCategory: 'desktop',
  platform: 'Win32'
}])

export { getUserAgent }
