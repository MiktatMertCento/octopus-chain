import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type SearchPanelTableProps = {
  searchInputPlaceholder: string
  searchInputValue: string
  searchInputOnChange: React.ChangeEventHandler<HTMLInputElement>
  SearchInputButton?: React.JSX.Element
  onSubmit?: React.FormEventHandler<HTMLFormElement>
  errorMessage: string
  dataCy?: string
  isDialog: boolean
}

export const SearchPanelTable = ({
  searchInputPlaceholder,
  searchInputValue,
  searchInputOnChange,
  SearchInputButton,
  onSubmit = event => {
    event.preventDefault()
  },
  errorMessage,
  children,
  dataCy,
  isDialog
}: PropsWithChildren<SearchPanelTableProps>) => {
  return (
    <div className="z-20 flex h-full w-[calc(100vw_-_60px)] flex-col gap-3 opacity-100 md:w-full">
      <form onSubmit={onSubmit} className="flex flex-col">
        <div className="flex items-stretch gap-2">
          <div className="relative flex h-full w-full grow items-center rounded     bg-black/30 px-2 text-white shadow-input">
            <MagnifyingGlassIcon className="h-4 w-4 shrink-0" />
            <input
              type="search"
              placeholder={searchInputPlaceholder}
              value={searchInputValue}
              onChange={searchInputOnChange}
              className="h-full w-full bg-transparent p-2 text-sm font-light placeholder:text-xs placeholder:text-white"
            />
          </div>
          {SearchInputButton}
        </div>
        {!!errorMessage && (
          <p className="text-xs text-red-400">{errorMessage}</p>
        )}
      </form>
      <div
        // className={twMerge(
        //   'sm:shadow-search-panel h-[calc(100vh_-_200px)] rounded   bg-[#161618] opacity-100 sm:bg-[#161618]/30 md:h-[calc(100vh_-_390px)]',
        //   isDialog ? 'md:max-h-[700px]' : 'md:max-h-[200px]'
        // )}
        className={twMerge(
          'sm:shadow-search-panel h-[20rem] rounded   bg-[#161618] opacity-100 sm:bg-[#161618]/30 md:h-[20rem]'
        )}
        data-cy={dataCy}
      >
        {children}
      </div>
    </div>
  )
}
