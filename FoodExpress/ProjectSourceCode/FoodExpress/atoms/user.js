import {atom} from 'recoil'

export const currentUserState = atom({
    key: 'currentUserState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
  });