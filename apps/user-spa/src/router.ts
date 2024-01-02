// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/forgot-password`
  | `/forgot-password/email-sent`
  | `/login`
  | `/mypage`
  | `/mypage/edit`
  | `/notifications`
  | `/notifications/:id`
  | `/phone_confirm`
  | `/phone_confirm_code`
  | `/signup`
  | `/update-password`

export type Params = {
  '/notifications/:id': { id: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
