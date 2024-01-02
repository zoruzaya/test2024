// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/forgot-password`
  | `/forgot-password/email-sent`
  | `/login`
  | `/notifications`
  | `/notifications/:id`
  | `/notifications/:id/edit`
  | `/notifications/new`
  | `/settings`
  | `/update-password`
  | `/users`
  | `/users/:id/edit`
  | `/users/new`

export type Params = {
  '/notifications/:id': { id: string }
  '/notifications/:id/edit': { id: string }
  '/users/:id/edit': { id: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
