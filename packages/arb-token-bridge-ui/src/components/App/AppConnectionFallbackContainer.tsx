import metamaskLogo from '@/icons/MetamaskLogo.svg'
import Image from 'next/image'

function WalletConnectWarning() {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center text-white ">
        <h1 className="text-[2.5rem] font-black  ">Get Started</h1>

        <div>
          <Image
            src={metamaskLogo}
            width={200}
            height={200}
            alt="walletLogo"
            className=" "
          />
        </div>
      </div>
    </>
  )
}
export function AppConnectionFallbackContainer({
  children
}: {
  children?: React.ReactNode
}) {
  return (
    <div className="flex w-full flex-col items-center    justify-center pt-4   ">
      <WalletConnectWarning />
      {children}
    </div>
  )
}
