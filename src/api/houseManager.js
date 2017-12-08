import fetch from '@/utils/fetch'

export function getHouseList (data) {
  return fetch({
    url: '/house/list',
    method: 'get',
    data
  })
}
