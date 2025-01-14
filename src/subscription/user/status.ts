import { get } from '../../common/request'
import type { SubscriptionUserStatusObject } from './types'

/**
 * Get users’ subscription groups.
 *
 * Use these endpoints to list and get the subscription groups of a certain user.
 *
 * {@link https://www.braze.com/docs/api/endpoints/subscription_groups/get_list_user_subscription_groups/}
 *
 * @param apiUrl - Braze REST endpoint.
 * @param apiKey - Braze API key.
 * @param body - Request parameters.
 * @returns - Braze response.
 */
export function status(apiUrl: string, apiKey: string, body: SubscriptionUserStatusObject) {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  }

  const params = new URLSearchParams()

  ;(['external_id', 'email', 'phone'] as const).forEach((key) => {
    if (Array.isArray(body[key])) {
      ;(body[key] as string[]).forEach((value) => params.append(key, value))
    } else if (body[key]) {
      params.append(key, body[key] as string)
    }
  })

  if (body.limit) {
    params.append('limit', body.limit.toString())
  }

  if (body.offset) {
    params.append('offset', body.offset.toString())
  }

  return get(`${apiUrl}/subscription/user/status?${params}`, {}, options)
}
