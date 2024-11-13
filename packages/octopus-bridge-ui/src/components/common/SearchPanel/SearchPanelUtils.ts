import { twMerge } from 'tailwind-merge'

export const panelWrapperClassnames = twMerge(
  'h-[10rem] w-full bg-[#1D1D2B] text-white   w-screen',
  'sm:h-auto sm:w-auto sm:min-w-[448px] sm:gap-3 sm:rounded sm:shadow-modal'
)

export function onPopoverClose() {
  document.body.classList.remove('overflow-hidden', 'sm:overflow-visible')
}

export function onPopoverButtonClick() {
  document.body.classList.add('overflow-hidden', 'sm:overflow-visible')
}
