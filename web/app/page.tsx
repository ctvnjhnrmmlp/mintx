'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import MINTX from '@/constants/mintx';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { writeContract: approve } = useWriteContract();
  const { writeContract: mint } = useWriteContract();

  const { data: allowance } = useReadContract({
    address: MINTX.FUNGIBLE_ADDRESS as `0x${string}`,
    abi: MINTX.FUNGIBLE_ABI,
    functionName: 'allowance',
    args: [address, MINTX.NON_FUNGIBLE_ADDRESS],
  });

  const handleMint = async () => {
    if (!allowance) {
      approve({
        address: MINTX.FUNGIBLE_ADDRESS as `0x${string}`,
        abi: MINTX.FUNGIBLE_ABI,
        functionName: 'approve',
        args: [MINTX.NON_FUNGIBLE_ADDRESS, 500],
      });
    }

    mint({
      address: MINTX.NON_FUNGIBLE_ADDRESS as `0x${string}`,
      abi: MINTX.NON_FUNGIBLE_ABI,
      functionName: 'mint',
    });
  };

  return (
    <main className='bg-black'>
      <section className='flex justify-center items-center min-h-screen outline'>
        <div className='flex flex-col justify-center items-center h-full'>
          <div>
            <Card className='bg-black p-20 border border-zinc-700'>
              <CardHeader>
                <CardTitle className='text-8xl font-bold text-center text-white'>
                  MintX
                </CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className='flex flex-col justify-center items-center gap-4'>
                <ConnectButton />
                {isConnected && (
                  <Button
                    onClick={handleMint}
                    className='px-4 py-6 bg-white text-black font-bold text-xl'
                  >
                    Mint Now
                  </Button>
                )}
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
