import fetch from '@/utils/fetch'

export function getPersonList (data) {
    return fetch({
        url: '/person/list',
        method: 'get',
        data
    })
}
